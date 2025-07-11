'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Coffee, Brain, Target, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { categoryInfo } from '@/lib/assessmentData';

interface EnhancedAssessmentWelcomeProps {
  onStart: () => void;
  onContinue?: () => void;
  hasProgress?: boolean;
  progressPercentage?: number;
}

export function EnhancedAssessmentWelcome({ 
  onStart, 
  onContinue, 
  hasProgress = false, 
  progressPercentage = 0 
}: EnhancedAssessmentWelcomeProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            Trader Psychology Assessment
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your unique trading psychology profile and unlock personalized insights 
            to accelerate your trading success.
          </p>
        </CardHeader>
      </Card>

      {/* Progress Card (if user has started) */}
      {hasProgress && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  Welcome Back!
                </h3>
                <p className="text-green-600">
                  You've completed {progressPercentage}% of your assessment
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-700">
                  {progressPercentage}%
                </div>
                <div className="w-24 h-2 bg-green-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preparation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Coffee className="h-5 w-5 text-orange-500" />
            Before You Begin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 font-medium mb-2">
              ☕ Take a moment to get comfortable
            </p>
            <p className="text-orange-700">
              Grab a coffee, find a quiet space, and take a deep breath. This assessment works best 
              when you're relaxed and can think clearly about your trading experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Time Needed</h4>
                <p className="text-gray-600 text-sm">15-20 minutes of focused attention</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Be Honest</h4>
                <p className="text-gray-600 text-sm">Authentic answers lead to better insights</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What You'll Discover */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            What You'll Discover
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Your unique trading personality profile</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Psychological strengths and growth areas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Personalized coaching recommendations</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Risk tolerance and emotional patterns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Behavioral insights and habit analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Actionable strategies for improvement</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5 text-indigo-500" />
            Assessment Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryInfo).map(([key, info]) => (
              <div key={key} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{info.icon}</span>
                  <h4 className="font-medium text-gray-800">{info.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Retake Info */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">🔒 Your Privacy</h4>
              <p className="text-sm text-gray-600">
                Your responses are confidential and used only to generate your personalized 
                insights. No data is shared with third parties.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">🔄 Monthly Retakes</h4>
              <p className="text-sm text-gray-600">
                You can retake this assessment monthly to track your psychological development 
                and see how your trading mindset evolves.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {hasProgress ? (
          <>
            <Button 
              onClick={onContinue} 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              Continue Assessment ({progressPercentage}% complete)
            </Button>
            <Button 
              onClick={onStart} 
              variant="outline" 
              size="lg" 
              className="px-8 py-3"
            >
              Start Over
            </Button>
          </>
        ) : (
          <Button 
            onClick={onStart} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Begin Your Assessment Journey
          </Button>
        )}
      </div>

      {/* Save Progress Note */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          💾 Your progress is automatically saved. You can pause and continue anytime.
        </p>
      </div>
    </div>
  );
}
