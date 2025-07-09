// app/api/assessment-analysis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { 
  calculateCategoryScores, 
  determinePersonalityProfile, 
  generateAnalysisPrompt,
  generateCoachingInsights,
  type AnalysisInput 
} from '@/lib/assessmentAnalysis';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisInput = await request.json();
    const { responses, userId } = body;

    if (!responses || responses.length === 0) {
      return NextResponse.json(
        { error: 'No assessment responses provided' },
        { status: 400 }
      );
    }

    // Calculate scores and personality profile
    const scores = calculateCategoryScores(responses);
    const personalityProfile = determinePersonalityProfile(responses, scores);
    const overallScore = Math.round(
      (scores.tradingPsychology + scores.behavioralPatterns + scores.marketMindset + 
       scores.tradingHabits + scores.goalOrientation) / 5
    );

    // Generate AI analysis
    const analysisPrompt = generateAnalysisPrompt(responses, scores, personalityProfile);
    
    let aiAnalysis = '';
    try {
      if (openai) {
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an expert trading psychologist with 20+ years of experience helping traders develop optimal psychological frameworks for success. Provide detailed, actionable, and encouraging analysis."
            },
            {
              role: "user",
              content: analysisPrompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        });

        aiAnalysis = completion.choices[0]?.message?.content || 'Analysis could not be generated.';
      } else {
        // Fallback analysis if OpenAI is not available
        aiAnalysis = generateFallbackAnalysis(scores, personalityProfile);
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
      aiAnalysis = generateFallbackAnalysis(scores, personalityProfile);
    }

    // Generate coaching insights
    const coachingInsights = generateCoachingInsights(aiAnalysis, scores, personalityProfile);

    // Save assessment result to database
    const assessmentResult = {
      user_id: userId,
      assessment_date: new Date().toISOString(),
      status: 'completed',
      responses: responses,
      scores: {
        overall: overallScore,
        ...scores
      },
      ai_analysis: aiAnalysis,
      personality_profile: personalityProfile,
      completion_time_minutes: Math.round((Date.now() - new Date(responses[0].timestamp).getTime()) / 60000),
      retake_number: 1 // This would be calculated based on previous assessments
    };

    const { data: savedAssessment, error: saveError } = await supabase
      .from('trader_assessments')
      .insert(assessmentResult)
      .select()
      .single();

    if (saveError) {
      console.error('Error saving assessment:', saveError);
      // Continue with response even if save fails
    }

    // Save coaching insights
    if (savedAssessment && coachingInsights.length > 0) {
      const insightsToSave = coachingInsights.map(insight => ({
        user_id: userId,
        assessment_id: savedAssessment.id,
        insight_type: insight.type,
        title: insight.title,
        content: insight.content,
        priority: insight.priority,
        category: insight.category,
        is_read: false
      }));

      await supabase
        .from('coaching_insights')
        .insert(insightsToSave);
    }

    // Prepare response
    const result = {
      id: savedAssessment?.id || 'temp-id',
      userId,
      assessmentDate: new Date(),
      scores: {
        overall: overallScore,
        ...scores
      },
      personalityProfile,
      aiAnalysis,
      coachingInsights,
      retakeNumber: 1
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Assessment analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze assessment' },
      { status: 500 }
    );
  }
}

function generateFallbackAnalysis(scores: any, profile: any): string {
  return `
## PSYCHOLOGICAL PROFILE SUMMARY

Based on your comprehensive assessment, you demonstrate a ${profile.riskProfile} risk profile with a ${profile.tradingStyle} trading approach. Your ${profile.emotionalType} emotional type and ${profile.learningStyle} learning style create a unique psychological framework for trading success.

Your overall psychological foundation shows both strengths and opportunities for growth. With an overall score reflecting solid fundamentals, you're well-positioned to develop into a consistently profitable trader through targeted psychological development.

## TOP 3 STRENGTHS

1. **Goal-Oriented Mindset**: Your strong goal orientation (${scores.goalOrientation}/100) indicates clear vision and motivation for trading success.

2. **Analytical Foundation**: Your market mindset score (${scores.marketMindset}/100) shows good analytical thinking and market understanding.

3. **Psychological Awareness**: Completing this assessment demonstrates self-awareness and commitment to psychological development.

## TOP 3 GROWTH AREAS

1. **Trading Habits Consistency**: Focus on developing more structured and consistent trading routines and habits.

2. **Emotional Regulation**: Strengthen your ability to manage emotions during volatile market conditions.

3. **Behavioral Discipline**: Work on maintaining discipline and avoiding impulsive trading decisions.

## PERSONALIZED RECOMMENDATIONS

1. **Develop a Pre-Market Routine**: Create a structured 15-30 minute routine before each trading session to center yourself and review your plan.

2. **Implement Position Sizing Rules**: Based on your ${profile.riskProfile} risk profile, establish clear position sizing rules that align with your comfort level.

3. **Practice Mindfulness Techniques**: Incorporate 5-10 minutes of mindfulness or breathing exercises into your daily routine to improve emotional control.

4. **Maintain a Trading Journal**: Document not just your trades, but your emotional state and decision-making process for each trade.

5. **Set Weekly Psychology Goals**: Focus on one psychological aspect each week, such as patience, discipline, or emotional control.

## TRADING STYLE OPTIMIZATION

As a ${profile.tradingStyle} trader with ${profile.emotionalType} emotional tendencies, focus on strategies that leverage your analytical strengths while managing emotional responses. Consider longer timeframes if you're reactive, or systematic approaches if you're analytical.

## POTENTIAL PSYCHOLOGICAL RISKS

Be aware of overconfidence after winning streaks, emotional trading during losses, and the tendency to abandon your plan during volatile markets. Develop specific protocols for these situations.

Your journey toward trading psychology mastery is well underway. Focus on consistent daily practices and gradual improvement rather than perfection.
`;
}
