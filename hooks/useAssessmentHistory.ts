// hooks/useAssessmentHistory.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface AssessmentHistoryItem {
  id: string;
  assessmentDate: Date;
  overallScore: number;
  categoryScores: {
    tradingPsychology: number;
    behavioralPatterns: number;
    marketMindset: number;
    tradingHabits: number;
    goalOrientation: number;
  };
  personalityProfile: {
    riskProfile: string;
    tradingStyle: string;
    emotionalType: string;
    learningStyle: string;
  };
  retakeNumber: number;
  completionTimeMinutes: number;
}

export interface ProgressComparison {
  currentAssessment: AssessmentHistoryItem;
  previousAssessment?: AssessmentHistoryItem;
  improvements: string[];
  declines: string[];
  overallTrend: 'improving' | 'declining' | 'stable';
  scoreChange: number;
}

interface UseAssessmentHistoryReturn {
  assessmentHistory: AssessmentHistoryItem[];
  latestAssessment: AssessmentHistoryItem | null;
  progressComparison: ProgressComparison | null;
  canRetakeAssessment: boolean;
  daysUntilRetake: number;
  isLoading: boolean;
  error: string | null;
  refreshHistory: () => Promise<void>;
}

export function useAssessmentHistory(userId: string): UseAssessmentHistoryReturn {
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessmentHistory = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('trader_assessments')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('assessment_date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      const formattedHistory: AssessmentHistoryItem[] = (data || []).map(assessment => ({
        id: assessment.id,
        assessmentDate: new Date(assessment.assessment_date),
        overallScore: assessment.scores?.overall || 0,
        categoryScores: {
          tradingPsychology: assessment.scores?.tradingPsychology || 0,
          behavioralPatterns: assessment.scores?.behavioralPatterns || 0,
          marketMindset: assessment.scores?.marketMindset || 0,
          tradingHabits: assessment.scores?.tradingHabits || 0,
          goalOrientation: assessment.scores?.goalOrientation || 0,
        },
        personalityProfile: assessment.personality_profile || {
          riskProfile: 'moderate',
          tradingStyle: 'hybrid',
          emotionalType: 'adaptive',
          learningStyle: 'practical'
        },
        retakeNumber: assessment.retake_number || 1,
        completionTimeMinutes: assessment.completion_time_minutes || 0
      }));

      setAssessmentHistory(formattedHistory);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch assessment history';
      setError(errorMessage);
      console.error('Assessment history fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessmentHistory();
  }, [userId]);

  // Calculate latest assessment
  const latestAssessment = assessmentHistory.length > 0 ? assessmentHistory[0] : null;

  // Calculate progress comparison
  const progressComparison: ProgressComparison | null = (() => {
    if (assessmentHistory.length < 1) return null;

    const current = assessmentHistory[0];
    const previous = assessmentHistory.length > 1 ? assessmentHistory[1] : undefined;

    if (!previous) {
      return {
        currentAssessment: current,
        improvements: [],
        declines: [],
        overallTrend: 'stable',
        scoreChange: 0
      };
    }

    const scoreChange = current.overallScore - previous.overallScore;
    const improvements: string[] = [];
    const declines: string[] = [];

    // Compare category scores
    Object.entries(current.categoryScores).forEach(([category, currentScore]) => {
      const previousScore = previous.categoryScores[category as keyof typeof previous.categoryScores];
      const change = currentScore - previousScore;
      
      if (change > 5) {
        improvements.push(category.replace(/([A-Z])/g, ' $1').toLowerCase());
      } else if (change < -5) {
        declines.push(category.replace(/([A-Z])/g, ' $1').toLowerCase());
      }
    });

    const overallTrend: 'improving' | 'declining' | 'stable' = 
      scoreChange > 5 ? 'improving' : 
      scoreChange < -5 ? 'declining' : 'stable';

    return {
      currentAssessment: current,
      previousAssessment: previous,
      improvements,
      declines,
      overallTrend,
      scoreChange
    };
  })();

  // Calculate retake eligibility
  const canRetakeAssessment = (() => {
    if (!latestAssessment) return true;
    
    const daysSinceLastAssessment = Math.floor(
      (Date.now() - latestAssessment.assessmentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return daysSinceLastAssessment >= 30;
  })();

  const daysUntilRetake = (() => {
    if (!latestAssessment || canRetakeAssessment) return 0;
    
    const daysSinceLastAssessment = Math.floor(
      (Date.now() - latestAssessment.assessmentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return Math.max(0, 30 - daysSinceLastAssessment);
  })();

  const refreshHistory = async () => {
    await fetchAssessmentHistory();
  };

  return {
    assessmentHistory,
    latestAssessment,
    progressComparison,
    canRetakeAssessment,
    daysUntilRetake,
    isLoading,
    error,
    refreshHistory
  };
}
