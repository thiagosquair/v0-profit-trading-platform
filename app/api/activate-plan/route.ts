// app/api/activate-plan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { plan, resetUsage = true } = await req.json();

    // Validate plan
    const validPlans = ['free', 'pro', 'premium', 'elite'];
    if (!validPlans.includes(plan)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid plan specified' 
      }, { status: 400 });
    }

    // Call the database function to activate the plan
    const { data, error } = await supabase.rpc('activate_user_plan', {
      user_id: user.id,
      new_plan: plan,
      reset_usage: resetUsage
    });

    if (error) {
      console.error('Error activating plan:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to activate plan' 
      }, { status: 500 });
    }

    // Log the plan activation for analytics
    await supabase.from('usage_events').insert({
      user_id: user.id,
      feature: 'plan_management',
      action: 'plan_activated',
      metadata: {
        new_plan: plan,
        reset_usage: resetUsage,
        activated_at: new Date().toISOString()
      }
    });

    return NextResponse.json({
      success: true,
      message: `Plan activated successfully`,
      data: data
    });

  } catch (error) {
    console.error('Plan activation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
