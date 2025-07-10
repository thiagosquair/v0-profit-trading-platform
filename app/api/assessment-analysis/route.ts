import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log("✅ Received POST request to /api/assessment-analysis");

    const body = await req.json();
    const { responses } = body;
    console.log("🧠 Received responses:", responses?.length);

    // Simulated personality profile generation logic
    const personalityProfile = generatePersonalityProfile(responses);

    const assessmentResult = {
      personality_profile: personalityProfile,
      completion_time_minutes: Math.round(
        (Date.now() - new Date(responses[0].timestamp).getTime()) / 60000
      ),
      retake_number: 1,
    };

    console.log("✅ Returning assessment result:", assessmentResult);
    return NextResponse.json(assessmentResult, { status: 200 });
  } catch (error) {
    console.error("❌ Error in assessment analysis:", error);
    return NextResponse.json(
      { error: "Failed to process assessment analysis" },
      { status: 500 }
    );
  }
}

function generatePersonalityProfile(responses: any[]) {
  return {
    openness: 0.7,
    conscientiousness: 0.8,
    extraversion: 0.6,
    agreeableness: 0.75,
    neuroticism: 0.3
  };
}
