// hooks/useAssessmentAnalysis.ts
import { useState } from 'react';
import { AssessmentResponse, AssessmentResult } from '@/types/assessment';

interface UseAssessmentAnalysisReturn {
  analyzeAssessment: (responses: AssessmentResponse[], userId: string) => Promise<AssessmentResult | null>;
  isAnalyzing: boolean;
  error: string | null;
}

export function useAssessmentAnalysis(): UseAssessmentAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeAssessment = async (
    responses: AssessmentResponse[], 
    userId: string
  ): Promise<AssessmentResult | null> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/assessment-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses,
          userId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze assessment');
      }

      const result: AssessmentResult = await response.json();
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Assessment analysis error:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeAssessment,
    isAnalyzing,
    error
  };
}
