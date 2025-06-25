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

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Context processing utilities
export const buildContextString = (context: TradeContext): string => {
  const contextParts: string[] = [];
  
  if (context.experienceLevel) {
    contextParts.push(`Experience: ${context.experienceLevel}`);
  }
  
  if (context.tradingStrategy) {
    contextParts.push(`Strategy: ${context.tradingStrategy}`);
  }
  
  if (context.timeframe) {
    contextParts.push(`Timeframe: ${context.timeframe}`);
  }
  
  if (context.tradeDirection) {
    contextParts.push(`Direction: ${context.tradeDirection}`);
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
    entryReason: formData.get('entryReason') as string || ''
  };
};

// Prompt building utilities
export const buildAnalysisPrompt = (context: TradeContext): string => {
  let prompt = `
You are ProFitz AI, an expert trading coach and technical analyst. Analyze the trading screenshot provided and give specific, actionable feedback.

**User Context:**`;

  if (context.experienceLevel) {
    prompt += `\n- **Experience Level:** ${context.experienceLevel}`;
  }
  
  if (context.tradingStrategy) {
    prompt += `\n- **Trading Strategy:** ${context.tradingStrategy}`;
  }
  
  if (context.timeframe) {
    prompt += `\n- **Chart Timeframe:** ${context.timeframe}`;
  }
  
  if (context.tradeDirection) {
    prompt += `\n- **Intended Trade Direction:** ${context.tradeDirection}`;
  }
  
  if (context.entryReason) {
    prompt += `\n- **Entry Reason:** ${context.entryReason}`;
  }
  
  if (context.marketConditions) {
    prompt += `\n- **Market Conditions:** ${context.marketConditions}`;
  }
  
  if (context.specificQuestions) {
    prompt += `\n- **Specific Questions:** ${context.specificQuestions}`;
  }

  prompt += `

**Analysis Structure Required:**

**1. Trade Summary & Setup Recognition:**
   - **Instrument:** Identify the trading pair/asset from the chart
   - **Timeframe:** Confirm or identify the chart timeframe
   - **Trade Direction:** Determine if this is a Long/Short setup
   - **Entry Point:** Identify the exact entry price level
   - **Stop Loss:** Locate the stop loss level if visible
   - **Take Profit:** Identify take profit targets if visible

**2. Technical Analysis:**
   - **Market Structure:** Describe the overall trend and key levels
   - **Price Action:** Analyze candlestick patterns and price behavior
   - **Support/Resistance:** Identify key levels and their significance
   - **Indicators:** Analyze any visible technical indicators
   - **Volume Analysis:** Comment on volume if visible

**3. Trade Quality Assessment:**
   - **Setup Strength:** Rate the setup quality (1-10) with reasoning
   - **Risk-Reward Ratio:** Calculate and assess the RRR
   - **Probability Assessment:** Estimate success probability based on technicals
   - **Timing:** Evaluate entry timing quality

**4. Personalized Coaching:**
   - **Strengths:** What the trader did well (specific to this trade)
   - **Improvements:** 2-3 specific actionable improvements
   - **Learning Points:** Key lessons from this specific setup
   - **Next Steps:** What to focus on for similar future setups

**5. Reflection Questions:**
   - Ask 1-2 thought-provoking questions to encourage self-analysis

**Important Guidelines:**
- Base analysis ONLY on what's visible in the screenshot
- If information isn't visible, explicitly state this
- Tailor advice to the user's experience level and strategy
- Be specific and actionable, avoid generic advice
- Maintain an encouraging but honest coaching tone`;

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

