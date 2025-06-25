import { TradeContext, SUPPORTED_IMAGE_TYPES, MAX_FILE_SIZE } from './types';

// Validation utilities
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.' 
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: 'File size too large. Maximum size is 10MB.' 
    };
  }

  return { isValid: true };
};

export const validateFormData = (formData: FormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  const image = formData.get('image') as File;
  if (!image) {
    errors.push('Screenshot is required');
  } else {
    const imageValidation = validateImageFile(image);
    if (!imageValidation.isValid) {
      errors.push(imageValidation.error!);
    }
  }

  // Validate required trade data
  const requiredFields = ['instrument', 'entryPrice', 'stopLossPrice', 'takeProfitPrice', 'riskRewardRatio'];
  for (const field of requiredFields) {
    const value = formData.get(field) as string;
    if (!value || value.trim() === '') {
      errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Context processing utilities
export const buildContextString = (context: TradeContext): string => {
  const contextParts: string[] = [];
  
  if (context.instrument) {
    contextParts.push(`Instrument: ${context.instrument}`);
  }
  
  if (context.tradeDirection) {
    contextParts.push(`Direction: ${context.tradeDirection.toUpperCase()}`);
  }
  
  if (context.riskRewardRatio) {
    contextParts.push(`RRR: ${context.riskRewardRatio}`);
  }

  return contextParts.join(' | ');
};

export const extractContextFromFormData = (formData: FormData): TradeContext => {
  return {
    tradingStrategy: formData.get('tradingStrategy') as string || '',
    timeframe: formData.get('timeframe') as string || '',
    marketConditions: formData.get('marketConditions') as string || '',
    specificQuestions: formData.get('specificQuestions') as string || '',
    experienceLevel: formData.get('experienceLevel') as string || 'intermediate',
    tradeDirection: formData.get('tradeDirection') as string || '',
    entryReason: formData.get('entryReason') as string || '',
    // Extract trade data
    instrument: formData.get('instrument') as string || '',
    entryPrice: formData.get('entryPrice') as string || '',
    stopLossPrice: formData.get('stopLossPrice') as string || '',
    takeProfitPrice: formData.get('takeProfitPrice') as string || '',
    riskRewardRatio: formData.get('riskRewardRatio') as string || '',
    percentageAchieved: formData.get('percentageAchieved') as string || ''
  };
};

// Enhanced coaching-focused prompt with trade data integration
export const buildAnalysisPrompt = (context: TradeContext): string => {
  const tradeStatus = context.percentageAchieved ? 
    (parseFloat(context.percentageAchieved) > 0 ? 'CLOSED/PARTIAL' : 'ACTIVE') : 'ACTIVE';

  let prompt = `
You are ProFitz AI, a world-class trading coach and mentor. You're conducting a personalized coaching session with a trader who has shared their trade screenshot and detailed trade information. Your role is to provide encouraging, insightful, and actionable coaching that helps them grow as a trader.

**🎯 TRADER'S TRADE INFORMATION:**
- **Instrument:** ${context.instrument}
- **Trade Direction:** ${context.tradeDirection?.toUpperCase()}
- **Entry Price:** ${context.entryPrice}
- **Stop Loss:** ${context.stopLossPrice}
- **Take Profit:** ${context.takeProfitPrice}
- **Risk:Reward Ratio:** ${context.riskRewardRatio}
- **Trade Status:** ${tradeStatus}`;

  if (context.percentageAchieved) {
    prompt += `\n- **Percentage Achieved:** ${context.percentageAchieved}%`;
  }

  if (context.experienceLevel) {
    prompt += `\n- **Experience Level:** ${context.experienceLevel}`;
  }

  if (context.tradingStrategy) {
    prompt += `\n- **Trading Strategy:** ${context.tradingStrategy}`;
  }

  if (context.timeframe) {
    prompt += `\n- **Timeframe:** ${context.timeframe}`;
  }

  if (context.entryReason) {
    prompt += `\n- **Entry Reasoning:** ${context.entryReason}`;
  }

  if (context.marketConditions) {
    prompt += `\n- **Market Context:** ${context.marketConditions}`;
  }

  if (context.specificQuestions) {
    prompt += `\n- **Specific Questions:** ${context.specificQuestions}`;
  }

  prompt += `

**🔍 YOUR COACHING APPROACH:**
You have access to both the trade screenshot AND the detailed trade data above. Use BOTH sources to provide comprehensive coaching. When analyzing the screenshot, cross-reference it with the provided trade data to ensure accuracy and provide deeper insights.

**📋 COACHING SESSION STRUCTURE:**

**🎯 TRADE VERIFICATION & SETUP ANALYSIS**
- Verify the trade details by examining the screenshot against the provided data
- Analyze the technical setup and entry timing
- Assess the risk management (SL placement and RRR)
- Comment on position sizing considerations

**📊 TECHNICAL ANALYSIS COACHING**
- Examine the chart pattern and market structure
- Analyze the entry point in context of price action
- Evaluate support/resistance levels and their relevance
- Review any indicators visible on the chart
- Assess the overall trade setup quality

**🧠 PSYCHOLOGY & EXECUTION REVIEW**
- Comment on the decision-making process
- Analyze the risk management approach
- Discuss the trade's alignment with good trading principles
- Address any psychological aspects visible in the setup

**💡 PERSONALIZED COACHING FEEDBACK**
- **What You Did Well:** Highlight 2-3 specific strengths in this trade
- **Areas for Growth:** Provide 2-3 actionable improvement suggestions
- **Key Learning Points:** Extract the most important lessons from this trade
- **Next Steps:** Specific actions for future similar setups

**🤔 REFLECTION & GROWTH QUESTIONS**
Ask 2 thought-provoking questions that encourage self-reflection and deeper understanding.

**🎖️ PROGRESS ACKNOWLEDGMENT**
End with encouraging words that acknowledge their commitment to improvement and learning.

**COACHING TONE & STYLE:**
- Be encouraging and supportive while being honest about areas for improvement
- Use specific examples from their trade rather than generic advice
- Speak as a mentor who believes in their potential
- Balance constructive criticism with positive reinforcement
- Make them feel like they're progressing on their trading journey
- Use phrases like "I notice you...", "What I love about this setup is...", "Consider this for next time..."

**CRITICAL INSTRUCTIONS:**
- Always cross-reference the screenshot with the provided trade data
- If there are discrepancies, mention them constructively
- Focus on education and growth, not just analysis
- Make the trader feel coached and mentored, not just analyzed
- Provide specific, actionable advice they can implement immediately
- Acknowledge their commitment to learning and improvement

Begin your coaching session now, using both the screenshot and the detailed trade information provided.`;

  return prompt;
};

// Error handling utilities
export const handleOpenAIError = (error: any): { message: string; status: number } => {
  console.error('OpenAI API Error:', error);
  
  if (error.code === 'rate_limit_exceeded') {
    return {
      message: 'Rate limit exceeded. Please try again later.',
      status: 429
    };
  }
  
  if (error.code === 'invalid_api_key') {
    return {
      message: 'API configuration error',
      status: 500
    };
  }
  
  if (error.code === 'insufficient_quota') {
    return {
      message: 'API quota exceeded. Please check your OpenAI billing.',
      status: 402
    };
  }
  
  return {
    message: 'Analysis failed. Please try again.',
    status: 500
  };
};

// URL validation utility
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Image URL validation failed:', error);
    return false;
  }
};

// Format utilities
export const formatAnalysisResponse = (
  analysis: string,
  context: TradeContext,
  imageUrl: string,
  tokensUsed: number
) => {
  return {
    success: true,
    analysis,
    context,
    imageUrl,
    timestamp: new Date().toISOString(),
    tokensUsed
  };
};

export const formatErrorResponse = (error: string, status: number = 500) => {
  return {
    success: false,
    error,
    timestamp: new Date().toISOString()
  };
};

