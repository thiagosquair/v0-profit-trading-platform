"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Star, 
  Circle,
  CheckCircle,
  GripVertical
} from 'lucide-react'
import { AssessmentQuestion } from '@/types/assessment'

interface AssessmentQuestionProps {
  question: AssessmentQuestion
  onAnswer: (questionId: string, answer: string | number | string[]) => void
  currentAnswer?: string | number | string[]
}

export function AssessmentQuestion({ question, onAnswer, currentAnswer }: AssessmentQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | string[]>(currentAnswer || '')
  const [rankingOrder, setRankingOrder] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : question.options || []
  )

  const handleSubmit = () => {
    if (question.questionType === 'ranking') {
      onAnswer(question.id, rankingOrder)
    } else {
      onAnswer(question.id, selectedAnswer)
    }
  }

  const isAnswered = () => {
    if (question.questionType === 'ranking') {
      return rankingOrder.length === question.options?.length
    }
    return selectedAnswer !== '' && selectedAnswer !== undefined
  }

  const moveRankingItem = (fromIndex: number, toIndex: number) => {
    const newOrder = [...rankingOrder]
    const [movedItem] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, movedItem)
    setRankingOrder(newOrder)
  }

  const renderMultipleChoice = () => (
    <RadioGroup 
      value={selectedAnswer as string} 
      onValueChange={(value) => setSelectedAnswer(value)}
      className="space-y-3"
    >
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
          <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
          <Label 
            htmlFor={`option-${index}`} 
            className="flex-1 cursor-pointer text-gray-700 leading-relaxed"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )

  const renderLikertScale = () => {
    const scale = question.likertLabels?.scale || 5
    const scaleValues = Array.from({ length: scale }, (_, i) => i + 1)
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-gray-600 px-2">
          <span>{question.likertLabels?.min}</span>
          <span>{question.likertLabels?.max}</span>
        </div>
        
        <div className="flex justify-between items-center px-2">
          {scaleValues.map((value) => (
            <button
              key={value}
              onClick={() => setSelectedAnswer(value)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                selectedAnswer === value
                  ? 'bg-blue-500 text-white shadow-lg scale-110'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mb-2">
                {selectedAnswer === value ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium">{value}</span>
            </button>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Badge variant="outline" className="text-xs">
            {selectedAnswer ? `Selected: ${selectedAnswer}` : 'Select a rating'}
          </Badge>
        </div>
      </div>
    )
  }

  const renderScenario = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-900 mb-2">Scenario</h4>
        <p className="text-blue-800 leading-relaxed">{question.questionText}</p>
      </div>
      
      <RadioGroup 
        value={selectedAnswer as string} 
        onValueChange={(value) => setSelectedAnswer(value)}
        className="space-y-3"
      >
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <RadioGroupItem value={option} id={`scenario-${index}`} className="mt-1" />
            <Label 
              htmlFor={`scenario-${index}`} 
              className="flex-1 cursor-pointer text-gray-700 leading-relaxed"
            >
              <span className="font-medium text-blue-700">Option {String.fromCharCode(65 + index)}:</span> {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )

  const renderRanking = () => (
    <div className="space-y-4">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-purple-900 mb-2">Instructions</h4>
        <p className="text-purple-800">Drag and drop to rank these items in order of importance (most important at the top):</p>
      </div>
      
      <div className="space-y-2">
        {rankingOrder.map((item, index) => (
          <div
            key={item}
            className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
              <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                {index + 1}
              </Badge>
            </div>
            <span className="flex-1 text-gray-700">{item}</span>
            <div className="flex space-x-1">
              {index > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveRankingItem(index, index - 1)}
                >
                  ↑
                </Button>
              )}
              {index < rankingOrder.length - 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveRankingItem(index, index + 1)}
                >
                  ↓
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderQuestionContent = () => {
    switch (question.questionType) {
      case 'multiple_choice':
        return renderMultipleChoice()
      case 'likert':
        return renderLikertScale()
      case 'scenario':
        return renderScenario()
      case 'ranking':
        return renderRanking()
      default:
        return renderMultipleChoice()
    }
  }

  return (
    <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-900 leading-relaxed mb-3">
              {question.questionType !== 'scenario' && question.questionText}
            </CardTitle>
            {question.subcategory && (
              <Badge variant="outline" className="text-xs">
                {question.subcategory.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Star className={`w-5 h-5 ${isAnswered() ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderQuestionContent()}
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {isAnswered() ? (
              <span className="text-green-600 font-medium">✓ Answer recorded</span>
            ) : (
              <span>Please select an answer to continue</span>
            )}
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={!isAnswered()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
