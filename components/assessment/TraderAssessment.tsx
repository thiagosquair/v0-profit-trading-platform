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
  // FIXED: Changed from 'notStarted' to 'welcome'
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('welcome');
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
        
        // If there's saved progress, resume from where they left off
        if (parsed.currentQuestionIndex > 0) {
          setAssessmentState('in_progress');
        }
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  }, []);

  // Save progress whenever it changes
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

  const pauseAssessment = () => {
    setAssessmentState('paused');
  };

  const resumeAssessment = () => {
    setAssessmentState('in_progress');
  };

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

  const handleQuestionResponse = (response: AssessmentResponse) => {
    const newResponses = [...progress.responses, response];
    const nextQuestionIndex = progress.currentQuestionIndex + 1;
    
    // Check if we've completed all questions
    if (nextQuestionIndex >= assessmentQuestions.length) {
      setProgress(prev => ({
        ...prev,
        responses: newResponses,
        currentQuestionIndex: nextQuestionIndex
      }));
      setAssessmentState('results');
      localStorage.removeItem('trader-assessment-progress'); // Clear saved progress
      return;
    }

    const nextQuestion = assessmentQuestions[nextQuestionIndex];
    const currentCategory = progress.currentCategory;
    const nextCategory = nextQuestion.category;

    // Update progress
    setProgress(prev => ({
      ...prev,
      responses: newResponses,
      currentQuestionIndex: nextQuestionIndex,
      currentCategory: nextCategory,
      completedCategories: currentCategory !== nextCategory && !prev.completedCategories.includes(currentCategory)
        ? [...prev.completedCategories, currentCategory]
        : prev.completedCategories,
      lastSavedAt: new Date()
    }));

    // Show coaching message for category transitions or milestones
    if (currentCategory !== nextCategory) {
      const categoryMessage = coachingMessages.categoryTransitions[nextCategory];
      if (categoryMessage) {
        setCurrentCoachingMessage(categoryMessage);
        setShowCoachingMessage(true);
        setTimeout(() => setShowCoachingMessage(false), 3000);
      }
    } else if ((nextQuestionIndex) % 5 === 0) {
      // Show milestone message every 5 questions
      const milestoneMessages = coachingMessages.milestones;
      const messageIndex = Math.floor(Math.random() * milestoneMessages.length);
      setCurrentCoachingMessage(milestoneMessages[messageIndex]);
      setShowCoachingMessage(true);
      setTimeout(() => setShowCoachingMessage(false), 2500);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (progress.currentQuestionIndex / progress.totalQuestions) * 100;
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
                Resume Assessment
              </Button>
              <Button variant="outline" onClick={restartAssessment} className="border-blue-300 text-blue-700 hover:bg-blue-50">
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <currentCategoryInfo.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="text-blue-700 border-blue-300">
                {currentCategoryInfo.name}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">{currentCategoryInfo.description}</p>
            </div>
          </div>
        )}
      </div>

      {currentQuestion && (
        <QuestionComponent
          question={currentQuestion}
          onResponse={handleQuestionResponse}
          questionNumber={progress.currentQuestionIndex + 1}
          totalQuestions={progress.totalQuestions}
        />
      )}
    </div>
  );
}
