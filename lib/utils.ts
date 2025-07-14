// utils/translation.ts
'use client';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

// Translation cache to avoid repeated API calls
const translationCache = new Map<string, Record<string, string>>();

export interface TranslationOptions {
  context?: string;
  domain?: 'trading' | 'psychology' | 'general';
}

export async function translateText(
  text: string, 
  targetLanguage: 'pt' | 'es' | 'fr',
  options: TranslationOptions = {}
): Promise<string> {
  const cacheKey = `${text}-${targetLanguage}-${options.context || ''}`;
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)![targetLanguage];
  }

  const languageNames = {
    pt: 'Brazilian Portuguese',
    es: 'Spanish',
    fr: 'French'
  };

  const contextPrompt = options.context ? 
    `Context: ${options.context}\n` : '';
  
  const domainPrompt = options.domain === 'trading' ? 
    'This is trading/financial terminology. Use professional financial language.\n' :
    options.domain === 'psychology' ?
    'This is psychology terminology. Use professional psychological language.\n' : '';

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional translator specializing in trading psychology and financial terminology. Translate the given text to ${languageNames[targetLanguage]}. Maintain the same tone and style. Return only the translation, no explanations.`
        },
        {
          role: "user",
          content: `${contextPrompt}${domainPrompt}Translate this text to ${languageNames[targetLanguage]}:\n\n"${text}"`
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const translation = response.choices[0]?.message?.content?.trim() || text;
    
    // Cache the translation
    if (!translationCache.has(cacheKey)) {
      translationCache.set(cacheKey, {});
    }
    translationCache.get(cacheKey)![targetLanguage] = translation;
    
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}

export async function translateObject<T extends Record<string, any>>(
  obj: T,
  targetLanguage: 'pt' | 'es' | 'fr',
  options: TranslationOptions = {}
): Promise<T> {
  const translated = { ...obj };
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.length > 0) {
      translated[key] = await translateText(value, targetLanguage, options);
    } else if (Array.isArray(value)) {
      translated[key] = await Promise.all(
        value.map(item => 
          typeof item === 'string' ? 
            translateText(item, targetLanguage, options) : 
            item
        )
      );
    }
  }
  
  return translated;
}

// Hook for using translations in components
export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'pt' | 'es' | 'fr'>('en');
  
  const t = async (text: string, options?: TranslationOptions) => {
    if (currentLanguage === 'en') return text;
    return await translateText(text, currentLanguage as 'pt' | 'es' | 'fr', options);
  };

  return { t, currentLanguage, setCurrentLanguage };
}
