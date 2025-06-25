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

// Enhanced prompt building with better visual analysis instructions
export const buildAnalysisPrompt = (context: TradeContext): string => {
  let prompt = `
You are ProFitz AI, an expert trading coach and technical analyst with specialized expertise in reading TradingView charts and other trading platforms. Your task is to conduct a PRECISE visual analysis of the trading screenshot provided.

**CRITICAL VISUAL ANALYSIS INSTRUCTIONS:**
- You MUST base your entire analysis on what you can ACTUALLY SEE in the screenshot
- If you cannot clearly see specific information, you MUST explicitly state "Not visible in screenshot"
- Do NOT make assumptions or provide generic trading advice
- Focus on the EXACT visual elements present in the image

**USER CONTEXT PROVIDED:**`;

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

**STEP-BY-STEP VISUAL ANALYSIS PROCESS:**

**STEP 1: CHART IDENTIFICATION**
Look at the screenshot and identify:
- What trading platform is being used (TradingView, MT4, etc.)
- What instrument/symbol is being traded (look for symbol in top-left or title)
- What timeframe is displayed (look for timeframe selector/indicator)
- What type of chart (candlestick, line, bar)

**STEP 2: PRICE LEVEL IDENTIFICATION**
Carefully examine the price axis (usually on the right side):
- Current price level
- Any horizontal lines that might indicate support/resistance
- Any drawn trend lines or channels
- Entry, stop loss, and take profit levels if marked

**STEP 3: VISUAL PATTERN RECOGNITION**
Look for specific visual patterns:
- Trend direction (uptrend, downtrend, sideways)
- Key candlestick patterns at important levels
- Breakouts or breakdowns from patterns
- Volume bars if visible

**STEP 4: INDICATOR ANALYSIS**
If technical indicators are visible on the chart:
- Moving averages and their positions relative to price
- Oscillators (RSI, MACD, etc.) and their readings
- Any other custom indicators

**REQUIRED ANALYSIS STRUCTURE:**

**🔍 VISUAL CHART ANALYSIS**

**Chart Details:**
- **Platform:** [State what you can see - TradingView, MT4, etc.]
- **Instrument:** [Read the symbol from the chart - e.g., EURUSD, BTCUSD, AAPL]
- **Timeframe:** [Look for timeframe indicator - 1H, 4H, 1D, etc.]
- **Chart Type:** [Candlestick, line, etc.]

**Price Action Analysis:**
- **Current Price:** [State the exact price you can see]
- **Recent Price Movement:** [Describe what you observe in recent candles]
- **Key Levels:** [Identify any visible support/resistance lines or zones]
- **Trend Analysis:** [Based on visual price movement]

**Technical Setup Evaluation:**
- **Entry Point:** [If visible, state the exact level]
- **Stop Loss:** [If visible, state the exact level]
- **Take Profit:** [If visible, state the exact level]
- **Risk-Reward Ratio:** [Calculate only if both SL and TP are visible]

**Indicator Signals (if visible):**
- **Moving Averages:** [Describe their position relative to price]
- **Oscillators:** [State any visible readings]
- **Volume:** [Comment if volume bars are visible]

**🎯 CONTEXTUAL COACHING ANALYSIS**

**Setup Quality Assessment:**
- **Alignment with Strategy:** [Reference user's stated strategy]
- **Entry Timing:** [Evaluate based on visible price action]
- **Risk Management:** [Assess SL placement if visible]

**Personalized Feedback:**
- **What You Did Well:** [Specific to this setup]
- **Areas for Improvement:** [2-3 actionable suggestions]
- **Strategic Considerations:** [Based on user's experience level]

**🤔 REFLECTION QUESTIONS**
Ask 1-2 specific questions about:
- The decision-making process for this setup
- Risk management approach
- Market context considerations

**CRITICAL REMINDERS:**
- If price levels, indicators, or other elements are NOT clearly visible, state "Not visible in screenshot"
- Reference the user's provided context throughout your analysis
- Be specific about what you can actually see vs. what you're inferring
- Tailor complexity to the user's experience level
- Focus on actionable insights rather than general trading advice

**EXAMPLE OF PRECISE LANGUAGE:**
✅ GOOD: "I can see the price is currently at 1.0875 based on the right-side price axis"
❌ BAD: "The price appears to be around the 1.08 level"

✅ GOOD: "The stop loss level is not clearly marked in this screenshot"
❌ BAD: "You should place your stop loss below support"

Now analyze the provided trading screenshot following this structured approach.`;

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

