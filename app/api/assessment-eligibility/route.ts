// app/api/assessment-eligibility/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get the most recent completed assessment
    const { data: latestAssessment, error: fetchError } = await supabase
      .from('trader_assessments')
      .select('assessment_date, retake_number')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('assessment_date', { ascending: false })
      .limit(1)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is fine for first-time users
      throw fetchError;
    }

    // If no previous assessment, user is eligible
    if (!latestAssessment) {
      return NextResponse.json({
        eligible: true,
        isFirstAssessment: true,
        daysSinceLastAssessment: 0,
        daysUntilEligible: 0,
        nextEligibleDate: null,
        retakeNumber: 1
      });
    }

    // Calculate days since last assessment
    const lastAssessmentDate = new Date(latestAssessment.assessment_date);
    const daysSinceLastAssessment = Math.floor(
      (Date.now() - lastAssessmentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Check if 30 days have passed
    const eligible = daysSinceLastAssessment >= 30;
    const daysUntilEligible = Math.max(0, 30 - daysSinceLastAssessment);
    
    // Calculate next eligible date
    const nextEligibleDate = new Date(lastAssessmentDate);
    nextEligibleDate.setDate(nextEligibleDate.getDate() + 30);

    return NextResponse.json({
      eligible,
      isFirstAssessment: false,
      daysSinceLastAssessment,
      daysUntilEligible,
      nextEligibleDate: nextEligibleDate.toISOString(),
      retakeNumber: (latestAssessment.retake_number || 0) + 1,
      lastAssessmentDate: latestAssessment.assessment_date
    });

  } catch (error) {
    console.error('Assessment eligibility check error:', error);
    return NextResponse.json(
      { error: 'Failed to check assessment eligibility' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, action } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (action === 'set_reminder') {
      // Get eligibility info
      const eligibilityResponse = await fetch(
        `${request.nextUrl.origin}/api/assessment-eligibility?userId=${userId}`
      );
      const eligibilityData = await eligibilityResponse.json();

      if (eligibilityData.eligible) {
        return NextResponse.json({
          success: false,
          message: 'Assessment is already available'
        });
      }

      // Save reminder preference to user profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          assessment_reminder_enabled: true,
          assessment_reminder_date: eligibilityData.nextEligibleDate
        })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      return NextResponse.json({
        success: true,
        message: 'Reminder set successfully',
        reminderDate: eligibilityData.nextEligibleDate
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Assessment reminder error:', error);
    return NextResponse.json(
      { error: 'Failed to set reminder' },
      { status: 500 }
    );
  }
}
