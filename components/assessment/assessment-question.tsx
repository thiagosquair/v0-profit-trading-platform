'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AssessmentQuestion, QuestionType } from '@/types/assessment';
import { categoryInfo } from '@/lib/assessmentData';

interface AssessmentQuestionProps {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string | number | string[]) => void;
  currentAnswer?: string | number | string[];
}

export function AssessmentQuestionComponent({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer,
  currentAnswer 
}: AssessmentQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | string[]>(
    currentAnswer || (question.type === 'ranking' ? [] : '')
  );
  const [draggedItems, setDraggedItems] = useState<string[]>(
    question.type === 'ranking' ? (question.options || []) : []
  );

  const categoryData = categoryInfo[question.category];

  const handleAnswerChange = (answer: string | number | string[]) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const handleLikertChange = (value: string) => {
    const numValue = parseInt(value);
    handleAnswerChange(numValue);
  };

  const handleRankingDrop = (draggedIndex: number, targetIndex: number) => {
    const newItems = [...draggedItems];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    setDraggedItems(newItems);
    handleAnswerChange(newItems);
  };

  const renderMultipleChoice = () => (
    <RadioGroup 
      value={selectedAnswer as string} 
      onValueChange={handleAnswerChange}
      className="space-y-3"
    >
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <RadioGroupItem value={option} id={`option-${index}`} />
          <Label 
            htmlFor={`option-${index}`} 
            className="flex-1 cursor-pointer text-sm leading-relaxed"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderLikertScale = () => {
    const scale = [1, 2, 3, 4, 5];
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    
    return (
      <div className="space-y-4">
        <RadioGroup 
          value={selectedAnswer?.toString()} 
          onValueChange={handleLikertChange}
          className="flex justify-between items-center"
        >
          {scale.map((value, index) => (
            <div key={value} className="flex flex-col items-center space-y-2">
              <div className="flex flex-col items-center">
                <RadioGroupItem value={value.toString()} id={`scale-${value}`} />
                <Label 
                  htmlFor={`scale-${value}`} 
                  className="text-xs text-center cursor-pointer mt-1"
                >
                  {value}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
      </div>
    );
  };

  const renderScenario = () => (
    <div className="space-y-4">
      {question.scenario && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Scenario:</h4>
          <p className="text-blue-700 text-sm">{question.scenario}</p>
        </div>
      )}
      
      <RadioGroup 
        value={selectedAnswer as string} 
        onValueChange={handleAnswerChange}
        className="space-y-3"
      >
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value={option} id={`scenario-${index}`} />
            <Label 
              htmlFor={`scenario-${index}`} 
              className="flex-1 cursor-pointer text-sm leading-relaxed"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const renderRanking = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Drag and drop to rank these items in order of importance (1 = most important):
      </p>
      
      <div className="space-y-2">
        {draggedItems.map((item, index) => (
          <div
            key={item}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
              handleRankingDrop(draggedIndex, index);
            }}
            className="flex items-center gap-3 p-3 bg-white border rounded-lg cursor-move hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              {index + 1}
            </div>
            <span className="flex-1 text-sm">{item}</span>
            <div className="text-gray-400">⋮⋮</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple_choice':
        return renderMultipleChoice();
      case 'likert_scale':
        return renderLikertScale();
      case 'scenario':
        return renderScenario();
      case 'ranking':
        return renderRanking();
      default:
        return renderMultipleChoice();
    }
  };

  const isAnswered = () => {
    if (question.type === 'ranking') {
      return Array.isArray(selectedAnswer) && selectedAnswer.length > 0;
    }
    return selectedAnswer !== '' && selectedAnswer !== undefined && selectedAnswer !== null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-sm">
            {categoryData.icon} {categoryData.name}
          </Badge>
          <span className="text-sm text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
          {question.context && (
            <p className="text-gray-600 text-sm mt-2">{question.context}</p>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderQuestionContent()}
          
          {/* Answer Status */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              {isAnswered() ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Answer recorded</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  <span className="text-sm">Please select an answer</span>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              {Math.round((questionNumber / totalQuestions) * 100)}% complete
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Hint */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          💡 Take your time to think about each question. Your honest responses lead to better insights.
        </p>
      </div>
    </div>
  );
}
