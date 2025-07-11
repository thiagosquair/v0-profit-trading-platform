// app/api/assessment-analysis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AssessmentResponse, AssessmentResult } from '@/types/assessment';
import { calculateAssessmentScores, generatePersonalityProfile, createAIPrompt } from '@/lib/assessmentAnalysis';

export async function POST(req: NextRequest) {
  try {
    console.log("✅ Assessment analysis API called");

    const body = await req.json();
    const { responses, userId } = body;

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: "Invalid responses data" },
        { status: 400 }
      );
    }

    console.log(`🧠 Processing ${responses.length} responses for user ${userId}`);

    // Calculate scores for each category
    const scores = calculateAssessmentScores(responses);
    console.log("📊 Calculated scores:", scores);

    // Generate personality profile
    const personalityProfile = generatePersonalityProfile(responses, scores);
    console.log("🎯 Generated personality profile:", personalityProfile);

    // Try to get AI analysis
    let aiAnalysis = null;
    try {
      const aiPrompt = createAIPrompt(responses, scores, personalityProfile);
      
      // Check if OpenAI is available
      if (process.env.OPENAI_API_KEY) {
        const { openai } = await import('@/lib/openai');
        
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an expert trading psychology analyst. Provide detailed, professional psychological insights for traders based on their assessment responses."
            },
            {
              role: "user",
              content: aiPrompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        });

        aiAnalysis = completion.choices[0]?.message?.content || null;
        console.log("🤖 AI analysis generated successfully");
      } else {
        console.log("⚠️ OpenAI API key not found, using fallback analysis");
      }
    } catch (aiError) {
      console.error("❌ AI analysis failed:", aiError);
      // Continue without AI analysis
    }

    // Create fallback analysis if AI failed
    if (!aiAnalysis) {
      aiAnalysis = generateFallbackAnalysis(personalityProfile, scores);
      console.log("🔄 Using fallback analysis");
    }

    // Generate recommendations
    const recommendations = generateRecommendations(personalityProfile, scores);

    // Create assessment result
    const assessmentResult: AssessmentResult = {
      id: `assessment_${Date.now()}`,
      user_id: userId,
      scores,
      personality_profile: personalityProfile,
      ai_analysis: aiAnalysis,
      recommendations,
      completion_time_minutes: Math.round(
        (Date.now() - new Date(responses[0]?.timestamp || Date.now()).getTime()) / 60000
      ),
      retake_number: 1, // This should be calculated based on user's previous assessments
      created_at: new Date().toISOString(),
      insights_generated: true
    };

    console.log("✅ Assessment analysis completed successfully");
    return NextResponse.json(assessmentResult, { status: 200 });

  } catch (error) {
    console.error("❌ Error in assessment analysis:", error);
    return NextResponse.json(
      { error: "Failed to process assessment analysis" },
      { status: 500 }
    );
  }
}

function generateFallbackAnalysis(personalityProfile: any, scores: any): string {
  const { risk_profile, trading_style, emotional_type, learning_style } = personalityProfile;
  
  return `Based on your comprehensive trading psychology assessment, here's your personalized analysis:

**Psychological Profile Overview:**
You demonstrate a ${risk_profile.toLowerCase()} approach to risk management with ${trading_style.toLowerCase()} trading tendencies. Your emotional regulation shows ${emotional_type.toLowerCase()} patterns, and you learn best through ${learning_style.toLowerCase()} methods.

**Key Strengths:**
${scores.trading_psychology > 0.7 ? "• Strong foundational trading psychology with good emotional awareness" : ""}
${scores.behavioral_patterns > 0.7 ? "• Excellent behavioral consistency and discipline in trading routines" : ""}
${scores.market_mindset > 0.7 ? "• Well-developed market understanding and analytical thinking" : ""}
${scores.trading_habits > 0.7 ? "• Solid trading habits and systematic approach to the markets" : ""}
${scores.goal_orientation > 0.7 ? "• Clear goal-setting abilities and strong motivation for success" : ""}

**Areas for Development:**
${scores.trading_psychology < 0.6 ? "• Focus on building emotional resilience and stress management techniques" : ""}
${scores.behavioral_patterns < 0.6 ? "• Work on developing more consistent trading behaviors and routines" : ""}
${scores.market_mindset < 0.6 ? "• Enhance market analysis skills and develop a more systematic approach" : ""}
${scores.trading_habits < 0.6 ? "• Establish better pre-market preparation and post-trade analysis routines" : ""}
${scores.goal_orientation < 0.6 ? "• Clarify your trading goals and develop a more structured path to achievement" : ""}

**Personalized Recommendations:**
Your ${emotional_type.toLowerCase()} emotional style suggests you would benefit from ${emotional_type === 'Calm' ? 'maintaining your composure while adding more dynamic strategies' : emotional_type === 'Reactive' ? 'developing better emotional regulation techniques and mindfulness practices' : 'leveraging your adaptability while building more consistent routines'}.

As a ${trading_style.toLowerCase()} trader, focus on ${trading_style === 'Analytical' ? 'balancing your systematic approach with intuitive market feel' : trading_style === 'Intuitive' ? 'adding more systematic analysis to support your natural instincts' : 'optimizing the balance between analysis and intuition in your trading decisions'}.

This assessment provides a foundation for your psychological development as a trader. Regular reassessment will help track your progress and adapt your development plan as you grow.`;
}

function generateRecommendations(personalityProfile: any, scores: any): string[] {
  const recommendations = [];
  
  // Add recommendations based on scores
  if (scores.trading_psychology < 0.6) {
    recommendations.push("Complete the Emotional Control exercises in Interactive Exercises");
    recommendations.push("Start a daily trading journal to track emotional patterns");
  }
  
  if (scores.behavioral_patterns < 0.6) {
    recommendations.push("Establish a consistent pre-market routine");
    recommendations.push("Use the Behavioral Patterns tracker to identify improvement areas");
  }
  
  if (scores.market_mindset < 0.6) {
    recommendations.push("Take the Market Psychology course in Psychology Courses");
    recommendations.push("Practice scenario analysis with the Trade Builder tool");
  }
  
  if (scores.trading_habits < 0.6) {
    recommendations.push("Create a trading checklist and use it consistently");
    recommendations.push("Set up post-trade analysis routine in Reflection Journal");
  }
  
  if (scores.goal_orientation < 0.6) {
    recommendations.push("Define clear short-term and long-term trading goals");
    recommendations.push("Use Progress Tracking to monitor goal achievement");
  }
  
  // Add personality-specific recommendations
  if (personalityProfile.emotional_type === 'Reactive') {
    recommendations.push("Practice mindfulness meditation before trading sessions");
    recommendations.push("Implement cooling-off periods after significant losses");
  }
  
  if (personalityProfile.risk_profile === 'Aggressive') {
    recommendations.push("Review position sizing rules and risk management protocols");
    recommendations.push("Practice conservative trading scenarios in Trade Builder");
  }
  
  // Ensure we have at least 5 recommendations
  while (recommendations.length < 5) {
    const generalRecs = [
      "Review your assessment results monthly to track progress",
      "Engage with the AI Coach for personalized guidance",
      "Complete weekly reflection exercises in Reflection Journal",
      "Set up regular check-ins with your trading performance",
      "Practice visualization techniques for trading success"
    ];
    
    for (const rec of generalRecs) {
      if (!recommendations.includes(rec) && recommendations.length < 7) {
        recommendations.push(rec);
      }
    }
    break;
  }
  
  return recommendations.slice(0, 7); // Return max 7 recommendations
}
