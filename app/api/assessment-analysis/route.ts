// pages/api/assessment-analysis.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { AssessmentResult } from '@/types/assessment';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { responses, userId } = req.body;

  if (!responses || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Placeholder analysis result
  const result: AssessmentResult = {
    assessmentDate: new Date().toISOString(),
    retakeNumber: 1,
    scores: {
      overall: 72,
      discipline: 65,
      confidence: 80,
      emotionalControl: 70,
      riskTolerance: 60,
      strategyAdherence: 75,
    },
    personalityProfile: {
      riskProfile: 'moderate',
      tradingStyle: 'swing',
      tradingStyleDescription: 'You prefer trades that last days to weeks.',
      emotionalControl: 'balanced',
      emotionalControlDescription: 'You manage emotions well under pressure.',
      motivation: 'growth',
      motivationDescription: 'Driven by long-term improvement.',
    },
    aiAnalysis: `## Strengths
- Strong confidence
- Good discipline

## Growth Areas
- Risk tolerance needs improvement

## Recommendations
1. Use stop-loss strategies
2. Keep a trading journal
3. Simulate high-risk scenarios`,
  };

  return res.status(200).json(result);
}
