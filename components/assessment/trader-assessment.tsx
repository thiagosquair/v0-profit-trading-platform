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
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import { AssessmentProgress, AssessmentResponse, AssessmentQuestion } from '@/types/assessment';
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
        
        // Resume from where user left off
        if (parsed.responses.length > 0 && parsed.currentQuestionIndex < assessmentQuestions.length) {
          setAssessmentState('in_progress');
        } else if (parsed.responses.length === assessmentQuestions.length) {
          setAssessmentState('completed');
        }
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: AssessmentProgress) => {
    try {
      localStorage.setItem('trader-assessment-progress', JSON.stringify({
        ...newProgress,
        lastSavedAt: new Date()
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const startAssessment = () => {
    setAssessmentState('in_progress');
    const newProgress = {
      ...progress,
      startedAt: new Date(),
      lastSavedAt: new Date()
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const pauseAssessment = () => {
    setAssessmentState('paused');
    saveProgress(progress);
  };

  const resumeAssessment = () => {
    setAssessmentState('in_progress');
  };

  const resetAssessment = () => {
    const resetProgress: AssessmentProgress = {
      currentQuestionIndex: 0,
      totalQuestions: assessmentQuestions.length,
      completedCategories: [],
      currentCategory: assessmentQuestions[0]?.category || 'trading_psychology',
      responses: [],
      startedAt: new Date(),
      lastSavedAt: new Date()
    };
    setProgress(resetProgress);
    setAssessmentState('welcome');
    localStorage.removeItem('trader-assessment-progress');
  };

  const handleQuestionResponse = (response: AssessmentResponse) => {
    const newResponses = [...progress.responses, response];
    const nextQuestionIndex = progress.currentQuestionIndex + 1;
    
    // Check if we've completed a category
    const currentQuestion = assessmentQuestions[progress.currentQuestionIndex];
    const nextQuestion = assessmentQuestions[nextQuestionIndex];
    const categoryCompleted = !nextQuestion || nextQuestion.category !== currentQuestion.category;
    
    let newCompletedCategories = progress.completedCategories;
    if (categoryCompleted && !newCompletedCategories.includes(currentQuestion.category)) {
      newCompletedCategories = [...newCompletedCategories, currentQuestion.category];
    }

    const newProgress: AssessmentProgress = {
      ...progress,
      currentQuestionIndex: nextQuestionIndex,
      responses: newResponses,
      completedCategories: newCompletedCategories,
      currentCategory: nextQuestion?.category || currentQuestion.category,
      lastSavedAt: new Date()
    };

    setProgress(newProgress);
    saveProgress(newProgress);

    // Show coaching message every 5 questions
    if (nextQuestionIndex % 5 === 0 && nextQuestionIndex < assessmentQuestions.length) {
      const messages = coachingMessages.progress;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentCoachingMessage(randomMessage);
      setShowCoachingMessage(true);
    }

    // Check if assessment is complete
    if (nextQuestionIndex >= assessmentQuestions.length) {
      setAssessmentState('completed');
      setTimeout(() => {
        setAssessmentState('results');
      }, 2000);
    }
  };

  const currentQuestion = assessmentQuestions[progress.currentQuestionIndex];
  const progressPercentage = (progress.currentQuestionIndex / progress.totalQuestions) * 100;

  if (assessmentState === 'welcome') {
    return <EnhancedAssessmentWelcome onStartAssessment={startAssessment} />;
  }

  if (assessmentState === 'paused') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Pause className="h-6 w-6 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl text-yellow-900">Assessment Paused</CardTitle>
            <CardDescription className="text-yellow-700">
              Your progress has been saved. You can continue where you left off.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-yellow-700">
                Progress: {progress.currentQuestionIndex} of {progress.totalQuestions} questions completed
              </p>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={resumeAssessment} className="bg-yellow-600 hover:bg-yellow-700">
                <Play className="h-4 w-4 mr-2" />
                Continue Assessment
              </Button>
              <Button variant="outline" onClick={resetAssessment}>
                <RotateCcw className="h-4 w-4 mr-2" />
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
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">Assessment Complete!</h2>
            <p className="text-green-700 mb-6">
              Congratulations! You've completed all {progress.totalQuestions} questions. 
              Our AI is now analyzing your responses to create your personalized trading psychology profile.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span>Preparing your results...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessmentState === 'results') {
    return <EnhancedAssessmentResults responses={progress.responses} />;
  }

  // Coaching message modal
  if (showCoachingMessage) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl text-blue-900">Great Progress!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-blue-700">{currentCoachingMessage}</p>
            <div className="space-y-2">
              <p className="text-sm text-blue-600">
                {progress.currentQuestionIndex} of {progress.totalQuestions} questions completed
              </p>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <Button 
              onClick={() => setShowCoachingMessage(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main assessment interface
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trader Assessment</h1>
            <p className="text-gray-600">
              {categoryInfo[currentQuestion?.category]?.name || 'Assessment'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-blue-700">
              Question {progress.currentQuestionIndex + 1} of {progress.totalQuestions}
            </Badge>
            <Button variant="outline" size="sm" onClick={pauseAssessment}>
              <Pause className="h-4 w-4 mr-2" />
              Save & Continue Later
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      {/* Current question */}
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
