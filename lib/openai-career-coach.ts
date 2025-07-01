// lib/openai-career-coach.ts
// OpenAI Integration for Funded Career Builder

interface UserProfile {
  currentStage: string
  totalPoints: number
  completedModules: string[]
  accounts: TradingAccount[]
  assessmentScores: Record<string, number>
  tradingHistory?: any[]
}

interface TradingAccount {
  id: string
  provider: string
  size: number
  status: 'active' | 'challenge' | 'failed' | 'passed'
  profit: number
  winRate: number
  riskScore: number
}

interface AIResponse {
  suggestions: AISuggestion[]
  assessment?: AIAssessment
  recommendations?: string[]
}

interface AISuggestion {
  type: 'improvement' | 'opportunity' | 'learning' | 'warning'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  action: string
  reasoning?: string
}

interface AIAssessment {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  nextSteps: string[]
  personalizedPlan: string
}

class OpenAICareerCoach {
  private apiKey: string
  private baseURL = 'https://api.openai.com/v1/chat/completions'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Generate personalized coaching suggestions based on user profile
   */
  async generateCoachingSuggestions(userProfile: UserProfile): Promise<AISuggestion[]> {
    const prompt = this.buildCoachingPrompt(userProfile)
    
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert trading coach specializing in funded trading careers. 
                       Analyze the user's profile and provide 3-5 specific, actionable suggestions 
                       to help them progress in their funded trading journey. Focus on practical 
                       advice based on their current performance and stage.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // Parse AI response into structured suggestions
      return this.parseCoachingSuggestions(aiResponse)
    } catch (error) {
      console.error('Error generating coaching suggestions:', error)
      return this.getFallbackSuggestions(userProfile)
    }
  }

  /**
   * Conduct comprehensive AI assessment of trading skills
   */
  async conductAIAssessment(userProfile: UserProfile, answers: Record<string, any>): Promise<AIAssessment> {
    const prompt = this.buildAssessmentPrompt(userProfile, answers)
    
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a professional trading psychologist and performance analyst. 
                       Conduct a comprehensive assessment of the trader's skills, mindset, and 
                       readiness for funded trading. Provide specific scores, strengths, weaknesses, 
                       and a personalized development plan.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.6,
          max_tokens: 1500
        })
      })

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      return this.parseAssessmentResults(aiResponse)
    } catch (error) {
      console.error('Error conducting AI assessment:', error)
      return this.getFallbackAssessment(userProfile)
    }
  }

  /**
   * Generate personalized learning recommendations
   */
  async generateLearningPath(userProfile: UserProfile): Promise<string[]> {
    const prompt = `
      Based on this trader's profile:
      - Current Stage: ${userProfile.currentStage}
      - Assessment Scores: ${JSON.stringify(userProfile.assessmentScores)}
      - Completed Modules: ${userProfile.completedModules.join(', ')}
      - Account Performance: ${this.summarizeAccountPerformance(userProfile.accounts)}
      
      Recommend 5-7 specific learning modules or topics they should focus on next, 
      ordered by priority. Consider their weaknesses and career stage.
    `

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a trading education specialist. Provide specific, actionable learning recommendations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 800
        })
      })

      const data = await response.json()
      const recommendations = data.choices[0].message.content

      return this.parseLearningRecommendations(recommendations)
    } catch (error) {
      console.error('Error generating learning path:', error)
      return this.getFallbackLearningPath(userProfile)
    }
  }

  /**
   * Analyze trading performance and provide insights
   */
  async analyzePerformance(userProfile: UserProfile, recentTrades?: any[]): Promise<string> {
    const prompt = `
      Analyze this trader's performance:
      - Accounts: ${JSON.stringify(userProfile.accounts)}
      - Recent Trades: ${recentTrades ? JSON.stringify(recentTrades.slice(0, 10)) : 'Not provided'}
      
      Provide insights on:
      1. Performance trends
      2. Risk management effectiveness
      3. Areas for improvement
      4. Specific actionable advice
    `

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a quantitative trading analyst. Provide detailed performance analysis with specific recommendations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.4,
          max_tokens: 1200
        })
      })

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Error analyzing performance:', error)
      return 'Performance analysis temporarily unavailable. Please try again later.'
    }
  }

  // Helper methods
  private buildCoachingPrompt(userProfile: UserProfile): string {
    return `
      Trader Profile:
      - Current Stage: ${userProfile.currentStage}
      - Career Points: ${userProfile.totalPoints}
      - Completed Modules: ${userProfile.completedModules.join(', ')}
      - Assessment Scores: ${JSON.stringify(userProfile.assessmentScores)}
      - Account Summary: ${this.summarizeAccountPerformance(userProfile.accounts)}
      
      Please provide 3-5 specific coaching suggestions to help this trader progress. 
      Each suggestion should include:
      - Type (improvement/opportunity/learning/warning)
      - Title (brief, actionable)
      - Description (specific advice)
      - Priority (high/medium/low)
      - Action (what they should do next)
      
      Format as JSON array.
    `
  }

  private buildAssessmentPrompt(userProfile: UserProfile, answers: Record<string, any>): string {
    return `
      Conduct a comprehensive trading assessment for:
      
      Profile: ${JSON.stringify(userProfile)}
      Assessment Answers: ${JSON.stringify(answers)}
      
      Provide:
      1. Overall score (0-100)
      2. Top 3 strengths
      3. Top 3 weaknesses
      4. 5 specific next steps
      5. Personalized development plan (2-3 sentences)
      
      Format as JSON object.
    `
  }

  private summarizeAccountPerformance(accounts: TradingAccount[]): string {
    const totalProfit = accounts.reduce((sum, acc) => sum + acc.profit, 0)
    const avgWinRate = accounts.reduce((sum, acc) => sum + acc.winRate, 0) / accounts.length
    const avgRiskScore = accounts.reduce((sum, acc) => sum + acc.riskScore, 0) / accounts.length
    
    return `${accounts.length} accounts, $${totalProfit} total profit, ${avgWinRate.toFixed(1)}% avg win rate, ${avgRiskScore.toFixed(1)} avg risk score`
  }

  private parseCoachingSuggestions(aiResponse: string): AISuggestion[] {
    try {
      // Try to parse JSON response
      const parsed = JSON.parse(aiResponse)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (error) {
      // Fallback: parse text response
      console.warn('Could not parse AI response as JSON, using fallback')
    }
    
    return this.getFallbackSuggestions({} as UserProfile)
  }

  private parseAssessmentResults(aiResponse: string): AIAssessment {
    try {
      const parsed = JSON.parse(aiResponse)
      return {
        overallScore: parsed.overallScore || 75,
        strengths: parsed.strengths || [],
        weaknesses: parsed.weaknesses || [],
        nextSteps: parsed.nextSteps || [],
        personalizedPlan: parsed.personalizedPlan || 'Continue developing your trading skills systematically.'
      }
    } catch (error) {
      return this.getFallbackAssessment({} as UserProfile)
    }
  }

  private parseLearningRecommendations(recommendations: string): string[] {
    // Extract recommendations from AI response
    const lines = recommendations.split('\n').filter(line => line.trim())
    return lines.slice(0, 7).map(line => line.replace(/^\d+\.?\s*/, '').trim())
  }

  // Fallback methods for when AI is unavailable
  private getFallbackSuggestions(userProfile: UserProfile): AISuggestion[] {
    return [
      {
        type: 'improvement',
        title: 'Focus on Risk Management',
        description: 'Review your position sizing and ensure you\'re not risking more than 1-2% per trade.',
        priority: 'high',
        action: 'Complete risk management assessment'
      },
      {
        type: 'learning',
        title: 'Study Market Structure',
        description: 'Understanding market structure will improve your entry and exit timing.',
        priority: 'medium',
        action: 'Enroll in market structure course'
      }
    ]
  }

  private getFallbackAssessment(userProfile: UserProfile): AIAssessment {
    return {
      overallScore: 75,
      strengths: ['Risk Management', 'Discipline', 'Learning Attitude'],
      weaknesses: ['Technical Analysis', 'Market Timing', 'Psychology Under Pressure'],
      nextSteps: [
        'Complete advanced technical analysis course',
        'Practice with smaller position sizes',
        'Develop a detailed trading plan',
        'Work on emotional control techniques',
        'Join a trading community for support'
      ],
      personalizedPlan: 'Focus on strengthening your technical analysis skills while maintaining your excellent risk management discipline.'
    }
  }

  private getFallbackLearningPath(userProfile: UserProfile): string[] {
    return [
      'Advanced Risk Management Techniques',
      'Technical Analysis Mastery',
      'Trading Psychology Under Pressure',
      'Market Structure and Order Flow',
      'Backtesting and Strategy Development',
      'News Trading and Fundamentals',
      'Multi-Timeframe Analysis'
    ]
  }
}

// Usage example and integration helper
export class CareerBuilderAI {
  private coach: OpenAICareerCoach
  
  constructor(apiKey: string) {
    this.coach = new OpenAICareerCoach(apiKey)
  }

  async getPersonalizedDashboard(userProfile: UserProfile) {
    const [suggestions, learningPath] = await Promise.all([
      this.coach.generateCoachingSuggestions(userProfile),
      this.coach.generateLearningPath(userProfile)
    ])

    return {
      suggestions,
      learningPath,
      nextActions: this.generateNextActions(suggestions),
      motivationalMessage: this.generateMotivationalMessage(userProfile)
    }
  }

  async conductFullAssessment(userProfile: UserProfile, assessmentAnswers: Record<string, any>) {
    const assessment = await this.coach.conductAIAssessment(userProfile, assessmentAnswers)
    const learningPath = await this.coach.generateLearningPath(userProfile)
    
    return {
      assessment,
      recommendedLearningPath: learningPath,
      estimatedTimeToNextStage: this.estimateTimeToNextStage(assessment, userProfile)
    }
  }

  private generateNextActions(suggestions: AISuggestion[]): string[] {
    return suggestions
      .filter(s => s.priority === 'high')
      .map(s => s.action)
      .slice(0, 3)
  }

  private generateMotivationalMessage(userProfile: UserProfile): string {
    const messages = [
      "You're making great progress on your funded trading journey!",
      "Every successful trader started where you are now. Keep pushing forward!",
      "Your dedication to learning is what separates successful traders from the rest.",
      "Remember: consistency beats perfection in trading.",
      "You're building skills that will serve you for a lifetime."
    ]
    
    return messages[Math.floor(Math.random() * messages.length)]
  }

  private estimateTimeToNextStage(assessment: AIAssessment, userProfile: UserProfile): string {
    const score = assessment.overallScore
    if (score >= 85) return "2-4 weeks with focused effort"
    if (score >= 70) return "1-2 months with consistent practice"
    if (score >= 55) return "2-3 months with dedicated learning"
    return "3-6 months with structured development"
  }
}

export { OpenAICareerCoach, type AISuggestion, type AIAssessment, type UserProfile }

