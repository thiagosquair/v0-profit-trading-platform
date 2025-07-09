// lib/assessmentAnalysis.ts
import { AssessmentResponse, AssessmentResult } from '@/types/assessment';
import { assessmentQuestions } from './assessmentData';

export interface AnalysisInput {
  responses: AssessmentResponse[];
  userId: string;
}

export interface CategoryScores {
  tradingPsychology: number;
  behavioralPatterns: number;
  marketMindset: number;
  tradingHabits: number;
  goalOrientation: number;
}

export interface PersonalityProfile {
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  tradingStyle: 'analytical' | 'intuitive' | 'hybrid';
  emotionalType: 'calm' | 'reactive' | 'adaptive';
  learningStyle: 'visual' | 'practical' | 'theoretical';
}

// Calculate scores based on responses
export function calculateCategoryScores(responses: AssessmentResponse[]): CategoryScores {
  const categoryTotals = {
    tradingPsychology: { score: 0, count: 0 },
    behavioralPatterns: { score: 0, count: 0 },
    marketMindset: { score: 0, count: 0 },
    tradingHabits: { score: 0, count: 0 },
    goalOrientation: { score: 0, count: 0 }
  };

  responses.forEach(response => {
    const question = assessmentQuestions.find(q => q.id === response.questionId);
    if (!question) return;

    const categoryKey = question.category === 'trading_psychology' ? 'tradingPsychology' :
                       question.category === 'behavioral_patterns' ? 'behavioralPatterns' :
                       question.category === 'market_mindset' ? 'marketMindset' :
                       question.category === 'trading_habits' ? 'tradingHabits' :
                       'goalOrientation';

    let score = 0;

    // Calculate score based on question type and answer
    if (question.questionType === 'likert') {
      score = (Number(response.answer) / 5) * 100; // Convert 1-5 scale to 0-100
    } else if (question.questionType === 'multiple_choice' || question.questionType === 'scenario') {
      // Assign scores based on answer quality (this would be refined based on psychological research)
      const answerIndex = question.options?.indexOf(response.answer as string) || 0;
      score = ((answerIndex + 1) / (question.options?.length || 1)) * 100;
    } else if (question.questionType === 'ranking') {
      // For ranking questions, score based on order quality
      score = 75; // Default good score for completing ranking
    }

    categoryTotals[categoryKey].score += score;
    categoryTotals[categoryKey].count += 1;
  });

  // Calculate averages
  return {
    tradingPsychology: Math.round(categoryTotals.tradingPsychology.count > 0 
      ? categoryTotals.tradingPsychology.score / categoryTotals.tradingPsychology.count 
      : 0),
    behavioralPatterns: Math.round(categoryTotals.behavioralPatterns.count > 0 
      ? categoryTotals.behavioralPatterns.score / categoryTotals.behavioralPatterns.count 
      : 0),
    marketMindset: Math.round(categoryTotals.marketMindset.count > 0 
      ? categoryTotals.marketMindset.score / categoryTotals.marketMindset.count 
      : 0),
    tradingHabits: Math.round(categoryTotals.tradingHabits.count > 0 
      ? categoryTotals.tradingHabits.score / categoryTotals.tradingHabits.count 
      : 0),
    goalOrientation: Math.round(categoryTotals.goalOrientation.count > 0 
      ? categoryTotals.goalOrientation.score / categoryTotals.goalOrientation.count 
      : 0)
  };
}

// Determine personality profile based on responses
export function determinePersonalityProfile(responses: AssessmentResponse[], scores: CategoryScores): PersonalityProfile {
  // Risk Profile Analysis
  let riskProfile: 'conservative' | 'moderate' | 'aggressive' = 'moderate';
  const riskResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.subcategory === 'risk_tolerance';
  });

  if (riskResponses.length > 0) {
    const avgRiskScore = riskResponses.reduce((sum, r) => {
      if (typeof r.answer === 'string') {
        const question = assessmentQuestions.find(q => q.id === r.questionId);
        const answerIndex = question?.options?.indexOf(r.answer) || 0;
        return sum + answerIndex;
      }
      return sum + (Number(r.answer) || 0);
    }, 0) / riskResponses.length;

    if (avgRiskScore <= 1.5) riskProfile = 'conservative';
    else if (avgRiskScore >= 3.5) riskProfile = 'aggressive';
  }

  // Trading Style Analysis
  let tradingStyle: 'analytical' | 'intuitive' | 'hybrid' = 'hybrid';
  if (scores.marketMindset >= 80) tradingStyle = 'analytical';
  else if (scores.tradingPsychology >= 85 && scores.marketMindset < 70) tradingStyle = 'intuitive';

  // Emotional Type Analysis
  let emotionalType: 'calm' | 'reactive' | 'adaptive' = 'adaptive';
  const emotionalResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.subcategory === 'emotional_control' || question?.subcategory === 'stress_response';
  });

  if (emotionalResponses.length > 0) {
    const avgEmotionalScore = emotionalResponses.reduce((sum, r) => {
      return sum + (Number(r.answer) || 0);
    }, 0) / emotionalResponses.length;

    if (avgEmotionalScore >= 4.5) emotionalType = 'calm';
    else if (avgEmotionalScore <= 2.5) emotionalType = 'reactive';
  }

  // Learning Style Analysis
  let learningStyle: 'visual' | 'practical' | 'theoretical' = 'practical';
  if (scores.tradingHabits >= 85) learningStyle = 'practical';
  else if (scores.marketMindset >= 85) learningStyle = 'theoretical';
  else learningStyle = 'visual';

  return {
    riskProfile,
    tradingStyle,
    emotionalType,
    learningStyle
  };
}

// Generate AI analysis prompt
export function generateAnalysisPrompt(responses: AssessmentResponse[], scores: CategoryScores, profile: PersonalityProfile): string {
  const responsesSummary = responses.map(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return {
      category: question?.category,
      subcategory: question?.subcategory,
      question: question?.questionText,
      answer: r.answer,
      type: question?.questionType
    };
  });

  return `
You are an expert trading psychologist analyzing a comprehensive psychological assessment of a trader. Based on the following data, provide a detailed psychological analysis and personalized recommendations.

ASSESSMENT DATA:
- Trading Psychology Score: ${scores.tradingPsychology}/100
- Behavioral Patterns Score: ${scores.behavioralPatterns}/100
- Market Mindset Score: ${scores.marketMindset}/100
- Trading Habits Score: ${scores.tradingHabits}/100
- Goal Orientation Score: ${scores.goalOrientation}/100

PERSONALITY PROFILE:
- Risk Profile: ${profile.riskProfile}
- Trading Style: ${profile.tradingStyle}
- Emotional Type: ${profile.emotionalType}
- Learning Style: ${profile.learningStyle}

DETAILED RESPONSES:
${JSON.stringify(responsesSummary, null, 2)}

Please provide a comprehensive analysis in the following format:

## PSYCHOLOGICAL PROFILE SUMMARY
Provide a 2-3 paragraph summary of this trader's psychological makeup, highlighting their core strengths and challenges.

## TOP 3 STRENGTHS
List and explain their three strongest psychological assets for trading success.

## TOP 3 GROWTH AREAS
Identify the three most important areas for psychological development, with specific explanations.

## PERSONALIZED RECOMMENDATIONS
Provide 5-7 specific, actionable recommendations tailored to their profile, including:
- Specific exercises or practices
- Behavioral modifications
- Mental frameworks
- Risk management approaches
- Learning strategies

## TRADING STYLE OPTIMIZATION
Based on their personality profile, suggest how they can optimize their trading approach to match their psychological strengths.

## POTENTIAL PSYCHOLOGICAL RISKS
Identify potential psychological pitfalls they should be aware of and strategies to avoid them.

Keep the tone encouraging, professional, and actionable. Focus on practical psychology that can be immediately applied to trading.
`;
}

// Generate insights for coaching system
export function generateCoachingInsights(
  analysisResult: string, 
  scores: CategoryScores, 
  profile: PersonalityProfile
): Array<{
  type: string;
  title: string;
  content: string;
  priority: number;
  category: string;
}> {
  const insights = [];

  // High priority insights based on low scores
  if (scores.tradingPsychology < 60) {
    insights.push({
      type: 'improvement_focus',
      title: 'Strengthen Your Trading Psychology Foundation',
      content: 'Your assessment reveals opportunities to build stronger psychological foundations for trading. Focus on developing emotional control and decision-making frameworks.',
      priority: 1,
      category: 'trading_psychology'
    });
  }

  if (scores.behavioralPatterns < 60) {
    insights.push({
      type: 'behavioral_development',
      title: 'Develop Consistent Trading Behaviors',
      content: 'Building consistent, disciplined trading behaviors will significantly improve your performance. Consider implementing structured routines and habit-tracking systems.',
      priority: 1,
      category: 'behavioral_patterns'
    });
  }

  // Strength-based insights
  const highestScore = Math.max(...Object.values(scores));
  const strongestArea = Object.entries(scores).find(([_, score]) => score === highestScore)?.[0];

  if (strongestArea && highestScore >= 80) {
    insights.push({
      type: 'strength_leverage',
      title: `Leverage Your ${strongestArea.replace(/([A-Z])/g, ' $1').toLowerCase()} Strength`,
      content: `Your strongest area is ${strongestArea}. Build on this foundation to enhance other aspects of your trading psychology.`,
      priority: 2,
      category: strongestArea
    });
  }

  // Personality-specific insights
  if (profile.riskProfile === 'aggressive') {
    insights.push({
      type: 'risk_management',
      title: 'Channel Your Risk Appetite Effectively',
      content: 'Your aggressive risk profile can be a strength when properly managed. Focus on position sizing and systematic risk management to harness this energy productively.',
      priority: 2,
      category: 'risk_management'
    });
  }

  if (profile.emotionalType === 'reactive') {
    insights.push({
      type: 'emotional_regulation',
      title: 'Develop Emotional Regulation Techniques',
      content: 'Your reactive emotional type suggests you feel market movements intensely. Developing mindfulness and emotional regulation techniques will be particularly beneficial.',
      priority: 1,
      category: 'emotional_control'
    });
  }

  return insights;
}
