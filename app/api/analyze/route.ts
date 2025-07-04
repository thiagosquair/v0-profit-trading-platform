// app/api/analyze/route.ts (updated)
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { hasFeatureAccess, getRemainingUsage } from '@/lib/planConfig';
import OpenAI from 'openai';
import { put } from '@vercel/blob';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 500 });
    }

    // Check feature access
    if (!hasFeatureAccess(profile.plan, 'trade_analyses')) {
      return NextResponse.json({ 
        success: false, 
        error: 'Trade analysis not available on your current plan',
        upgradeRequired: true
      }, { status: 403 });
    }

    // Check usage limits
    const remaining = getRemainingUsage(profile.plan, 'trade_analyses', profile.trade_analyses_count);
    
    if (remaining !== 'unlimited' && remaining <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: `Trade analysis limit reached for ${profile.plan} plan. Upgrade to continue.`,
        upgradeRequired: true,
        currentUsage: profile.trade_analyses_count
      }, { status: 403 });
    }

    // Process the image upload and analysis
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Upload image to Vercel Blob Storage
    const blob = await put(file.name, file.stream(), {
      access: 'public',
    });

    const imageUrl = blob.url;

    const prompt = `
You are a professional trading coach and mentor. Analyze the attached screenshot of a completed trade, which includes a projection with entry, stop loss, and take profit levels marked on a charts.

Your role is to provide constructive feedback to help the trader improve.

1. Identify the trade direction (long/short), entry, SL, and TP from the chart.
2. Determine if this was a win or a loss based on price action.
3. Estimate the Risk-to-Reward ratio and comment if it was worth taking.
4. Assess the logic of the setup, market structure, and alignment.
5. Reflect on discipline and execution.
6. Give 2–3 helpful, actionable suggestions.

Keep your tone helpful and coach-like. Mention if anything is unclear in the image.
`;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful trading mentor AI.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const result = chatResponse.choices[0]?.message?.content;

    // Increment usage count
    await supabase
      .from('profiles')
      .update({ 
        trade_analyses_count: profile.trade_analyses_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    // Log the usage event
    await supabase.from('usage_events').insert({
      user_id: user.id,
      feature: 'trade_analyses',
      action: 'analysis_completed',
      metadata: {
        new_count: profile.trade_analyses_count + 1,
        plan: profile.plan,
        image_url: imageUrl
      }
    });

    const newRemaining = remaining === 'unlimited' ? 'unlimited' : remaining - 1;

    return NextResponse.json({ 
      success: true, 
      result,
      usage: {
        current: profile.trade_analyses_count + 1,
        remaining: newRemaining,
        plan: profile.plan
      }
    });

  } catch (error: any) {
    console.error('Trade analysis error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
