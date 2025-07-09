// hooks/useAssessmentEligibility.ts
import { useState, useEffect } from 'react';

export interface AssessmentEligibility {
  eligible: boolean;
  isFirstAssessment: boolean;
  daysSinceLastAssessment: number;
  daysUntilEligible: number;
  nextEligibleDate: string | null;
  retakeNumber: number;
  lastAssessmentDate?: string;
}

interface UseAssessmentEligibilityReturn {
  eligibility: AssessmentEligibility | null;
  isLoading: boolean;
  error: string | null;
  setReminder: () => Promise<boolean>;
  refreshEligibility: () => Promise<void>;
}

export function useAssessmentEligibility(userId: string): UseAssessmentEligibilityReturn {
  const [eligibility, setEligibility] = useState<AssessmentEligibility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEligibility = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/assessment-eligibility?userId=${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check eligibility');
      }

      const data: AssessmentEligibility = await response.json();
      setEligibility(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Assessment eligibility error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const setReminder = async (): Promise<boolean> => {
    if (!userId) return false;

    try {
      const response = await fetch('/api/assessment-eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          action: 'set_reminder'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to set reminder');
      }

      const result = await response.json();
      return result.success;
    } catch (err) {
      console.error('Set reminder error:', err);
      return false;
    }
  };

  const refreshEligibility = async () => {
    await fetchEligibility();
  };

  useEffect(() => {
    fetchEligibility();
  }, [userId]);

  return {
    eligibility,
    isLoading,
    error,
    setReminder,
    refreshEligibility
  };
}
