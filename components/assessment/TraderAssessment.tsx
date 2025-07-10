'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Pause,
  Play,
  RotateCcw,
  CheckCircle,
  Sparkles,
  Target,
  Heart,
  Zap
} from 'lucide-react';

import { AssessmentQuestion, AssessmentProgress, AssessmentResponse } from '@/types/assessment';
import { assessmentQuestions, categoryInfo, coachingMessages } from '@/lib/assessmentData';
import { EnhancedAssessmentWelcome } from './enhanced-assessment-welcome';
import { AssessmentQuestion as QuestionComponent } from './assessment-question';
import { EnhancedAssessmentResults } from './enhanced-assessment-results';

type AssessmentState = 'welcome' | 'in_progress' | 'paused' | 'completed' | 'results';

export function TraderAssessment() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('notStarted'); // just for testing
  const [progress, setProgress] = useState<AssessmentProgress>(() => ({
    currentQuestionIndex: 0,
    totalQuestions: assessmentQuestions.length,
    completedCategories: [],
    currentCategory: assessmentQuestions[0]?.category || 'trading_psychology',
    responses: [],
    startedAt: new Date(),
    lastSavedAt: new Date()
  }));
  const [showCoachingMessage, setShowCoachingMessage] = useState(false);
  const [currentCoachingMessage, setCurrentCoachingMessage] = useState('');

  // Load saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem('trader-assessment-progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress({
          ...parsed,
          startedAt: new Date(parsed.startedAt),
          lastSavedAt: new Date(parsed.lastSavedAt)
        });
        if (parsed.currentQuestionIndex > 0) {
          setAssessmentState('paused');
        }
      }
    } catch (err) {
      console.error('Failed to load saved progress:', err);
    }
  }, []);

  // Save progress on update
  useEffect(() => {
    if (assessmentState === 'in_progress' || assessmentState === 'paused') {
      localStorage.setItem('trader-assessment-progress', JSON.stringify({
        ...progress,
        lastSavedAt: new Date()
      }));
    }
  }, [progress, assessmentState]);

  const startAssessment = () => {
    setAssessmentState('in_progress');
    setProgress(prev => ({
      ...prev,
      startedAt: new Date(),
      lastSavedAt: new Date()
    }));
  };

  const resumeAssessment = () => setAssessmentState('in_progress');

  const pauseAssessment = () => setAssessmentState('paused');

  const restartAssessment = () => {
    localStorage.removeItem('trader-assessment-progress');
    setProgress({
      currentQuestionIndex: 0,
      totalQuestions: assessmentQuestions.length,
      completedCategories: [],
      currentCategory: assessmentQuestions[0]?.category || 'trading_psychology',
      responses: [],
      startedAt: new Date(),
      lastSavedAt: new Date()
    });
    setAssessmentState('welcome');
  };

  const handleQuestionAnswer = (questionId: string, answer: string | number | string[]) => {
    const newResponse: AssessmentResponse = {
      questionId,
      answer,
      timestamp: new Date()
    };

    setProgress(prev => {
      const updatedResponses = [
        ...prev.responses.filter(r => r.questionId !== questionId),
        newResponse
      ];
      const nextIndex = prev.currentQuestionIndex + 1;
      const currentQuestion = assessmentQuestions[prev.currentQuestionIndex];
      const nextQuestion = assessmentQuestions[nextIndex];

      const isNewCategory = nextQuestion && nextQuestion.category !== currentQuestion?.category;

      if (isNewCategory && nextQuestion) {
        const message = coachingMessages.category_transitions[nextQuestion.category] || 'New Category!';
        setCurrentCoachingMessage(message);
        setShowCoachingMessage(true);
        setTimeout(() => setShowCoachingMessage(false), 3000);
      }

      if (nextIndex >= assessmentQuestions.length) {
        setAssessmentState('completed');
        localStorage.removeItem('trader-assessment-progress');
        return {
          ...prev,
          responses: updatedResponses,
          currentQuestionIndex: nextIndex
        };
      }

      return {
        ...prev,
        responses: updatedResponses,
        currentQuestionIndex: nextIndex,
        currentCategory: nextQuestion?.category || prev.currentCategory,
        completedCategories: isNewCategory && currentQuestion
          ? [...new Set([...prev.completedCategories, currentQuestion.category])]
          : prev.completedCategories
      };
    });
  };

  const progressPercentage = progress.totalQuestions
    ? (progress.currentQuestionIndex / progress.totalQuestions) * 100
    : 0;

  const currentQuestion = assessmentQuestions[progress.currentQuestionIndex];
  const currentCategoryInfo = currentQuestion ? categoryInfo[currentQuestion.category] : null;

  // --- RENDER STATES ---

  if (!assessmentQuestions.length) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Trader Assessment</h1>
        <p className="text-red-600">Error: No assessment questions found.</p>
      </div>
    );
  }

  if (assessmentState === 'welcome') {
    return <EnhancedAssessmentWelcome onStartAssessment={startAssessment} />;
  }

  if (assessmentState === 'paused') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Pause className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-blue-900">Assessment Paused</CardTitle>
            <CardDescription className="text-blue-700">
              Your progress has been saved. Resume anytime!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-blue-700">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}% complete</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-blue-600 text-center">
                {progress.currentQuestionIndex} of {progress.totalQuestions} questions completed
              </p>
            </div>
            {currentCategoryInfo && (
              <div className="text-center">
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  Current: {currentCategoryInfo.name}
                </Badge>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Button onClick={resumeAssessment} className="bg-blue-600 hover:bg-blue-700">
                <Play className="mr-2 h-4 w-4" />
                Continue
              </Button>
              <Button variant="outline" onClick={restartAssessment}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessmentState === 'completed') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-900">
              {coachingMessages.completion?.title || 'Assessment Complete'}
            </CardTitle>
            <CardDescription className="text-green-700">
              {coachingMessages.completion?.message || 'Thank you for completing the assessment.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Assessment Complete!</span>
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <Button 
                onClick={() => setAssessmentState('results')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Zap className="mr-2 h-4 w-4" />
                View My Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessmentState === 'results') {
    return <EnhancedAssessmentResults responses={progress.responses} />;
  }

  // --- Default In-Progress Assessment View ---

  return (
    <div className="max-w-4xl mx-auto p-6">
      {showCoachingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mx-auto">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-blue-800 font-medium">{currentCoachingMessage}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Trading Psychology Assessment</h1>
              <p className="text-sm text-gray-600">
                Question {progress.currentQuestionIndex + 1} of {progress.totalQuestions}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={pauseAssessment} size="sm">
            <Pause className="mr-2 h-4 w-4" />
            Save & Continue Later
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {currentCategoryInfo && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-2xl">{currentCategoryInfo.icon}</span>
            <div>
              <Badge variant="outline" className="mb-1">
                {currentCategoryInfo.name}
              </Badge>
              <p className="text-sm text-gray-600">{currentCategoryInfo.description}</p>
            </div>
          </div>
        )}
      </div>

      {currentQuestion && (
        <QuestionComponent
          question={currentQuestion}
          onAnswer={handleQuestionAnswer}
          currentAnswer={progress.responses.find(r => r.questionId === currentQuestion.id)?.answer}
        />
      )}
    </div>
  );
}
