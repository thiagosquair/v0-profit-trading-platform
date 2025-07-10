// app/enhanced-assessment-results.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useAssessmentAnalysis } from '@/hooks/useAssessmentAnalysis';
import Loader from '@/components/shared/Loader';
import AssessmentChart from '@/components/assessment/AssessmentChart';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import SectionHeading from '@/components/shared/SectionHeading';

const EnhancedAssessmentResults = () => {
  const responses = useAssessmentStore((state) => state.responses);
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);
  const { analyzeAssessment, isAnalyzing, error } = useAssessmentAnalysis();

  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisStage, setAnalysisStage] = useState<'idle' | 'analyzing' | 'complete'>('idle');

  useEffect(() => {
    const fetchAnalysis = async () => {
      setAnalysisStage('analyzing');
      const result = await analyzeAssessment(responses, 'user-123');
      if (result) {
        setAnalysisResult(result);
        setAnalysisStage('complete');
      } else {
        setAnalysisStage('complete');
      }
    };

    if (responses.length > 0) {
      fetchAnalysis();
    }
  }, [responses, analyzeAssessment]);

  if (isAnalyzing || analysisStage === 'analyzing') {
    return (
      <div className="mt-10">
        <Loader text="Analyzing your assessment..." />
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="mt-10 text-center text-red-500">
        Something went wrong. Please try again later.
      </div>
    );
  }

  const {
    assessmentDate,
    retakeNumber,
    scores,
    personalityProfile,
    aiAnalysis,
  } = analysisResult;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between mt-8 mb-6">
        <h2 className="text-3xl font-bold">Assessment Results</h2>
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={resetAssessment}
        >
          Retake Assessment
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-2">Assessment Date: {new Date(assessmentDate).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500 mb-6">Retake Number: {retakeNumber}</p>

      <SectionHeading>Overall Performance</SectionHeading>
      <AssessmentChart scores={scores} />

      <SectionHeading className="mt-10">Personality Profile</SectionHeading>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p><strong>Risk Profile:</strong> {personalityProfile.riskProfile}</p>
        <p><strong>Trading Style:</strong> {personalityProfile.tradingStyle}</p>
        <p className="text-gray-600">{personalityProfile.tradingStyleDescription}</p>
        <p><strong>Emotional Control:</strong> {personalityProfile.emotionalControl}</p>
        <p className="text-gray-600">{personalityProfile.emotionalControlDescription}</p>
        <p><strong>Motivation:</strong> {personalityProfile.motivation}</p>
        <p className="text-gray-600">{personalityProfile.motivationDescription}</p>
      </div>

      <SectionHeading className="mt-10">AI Analysis</SectionHeading>
      <div className="prose max-w-none">
        <MarkdownRenderer content={aiAnalysis} />
      </div>
    </div>
  );
};

export default EnhancedAssessmentResults;
