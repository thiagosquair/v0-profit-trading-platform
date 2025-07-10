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

    // NOTE: analyzeAssessment function looks like a client-side helper, 
    // so it’s NOT used here and should be removed or relocated.
    // If you want it here, define it outside of POST or in another file.

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
      retake_number: 1, // This would be calculated based on previous assessment_
