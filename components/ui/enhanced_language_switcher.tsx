// Enhanced Language Switcher with Dynamic Translation Support
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from './enhanced_language_hook';
import { LANGUAGES, type Language } from './advanced_translation_system';

interface EnhancedLanguageSwitcherProps {
  variant?: 'header' | 'sidebar' | 'compact' | 'full';
  className?: string;
  showFlag?: boolean;
  showName?: boolean;
  showLoadingState?: boolean;
}

export function EnhancedLanguageSwitcher({ 
  variant = 'header', 
  className,
  showFlag = true,
  showName = true,
  showLoadingState = true
}: EnhancedLanguageSwitcherProps) {
  const { 
    language, 
    setLanguage, 
    t, 
    isTranslating, 
    isCurrentLanguage, 
    getLanguageConfig 
  } = useLanguage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [switchingTo, setSwitchingTo] = useState<Language | null>(null);

  const currentConfig = getLanguageConfig();

  const handleLanguageChange = async (newLanguage: Language) => {
    if (isCurrentLanguage(newLanguage)) return;
    
    setSwitchingTo(newLanguage);
    setIsOpen(false);
    
    // Set language (this will trigger re-translation of components)
    setLanguage(newLanguage);
    
    // Clear switching state after animation
    setTimeout(() => {
      setSwitchingTo(null);
    }, 1000);
  };

  const getButtonContent = () => {
    const isLoading = isTranslating || switchingTo !== null;
    
    if (variant === 'compact') {
      return (
        <div className="flex items-center space-x-1">
          {isLoading && showLoadingState ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Globe className="h-3 w-3" />
          )}
          {showFlag && <span className="text-sm">{currentConfig.flag}</span>}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        {isLoading && showLoadingState ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Globe className="h-4 w-4" />
        )}
        {showFlag && <span>{currentConfig.flag}</span>}
        {showName && (
          <span className="text-sm font-medium">
            {variant === 'full' ? currentConfig.name : currentConfig.code.toUpperCase()}
          </span>
        )}
      </div>
    );
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'sidebar':
        return 'ghost';
      case 'compact':
        return 'outline';
      default:
        return 'ghost';
    }
  };

  const getButtonSize = () => {
    switch (variant) {
      case 'compact':
        return 'sm';
      case 'full':
        return 'default';
      default:
        return 'sm';
    }
  };

  return (
    <div className={cn('relative', className)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={getButtonVariant()} 
            size={getButtonSize()}
            className={cn(
              'transition-all duration-200',
              variant === 'sidebar' && 'w-full justify-start',
              variant === 'compact' && 'px-2',
              isTranslating && 'opacity-75'
            )}
            disabled={isTranslating}
          >
            {getButtonContent()}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-48 p-1"
          sideOffset={5}
        >
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b mb-1">
            {t('language.switch', 'Switch Language')}
          </div>
          
          {LANGUAGES.map((lang) => {
            const isCurrent = isCurrentLanguage(lang.code);
            const isSwitching = switchingTo === lang.code;
            
            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  'flex items-center justify-between space-x-2 cursor-pointer',
                  'transition-all duration-200 hover:bg-accent',
                  isCurrent && 'bg-accent/50',
                  isSwitching && 'bg-primary/10'
                )}
                disabled={isSwitching}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
                
                <div className="flex items-center">
                  {isSwitching ? (
                    <Loader2 className="h-3 w-3 animate-spin text-primary" />
                  ) : isCurrent ? (
                    <Check className="h-3 w-3 text-primary" />
                  ) : null}
                </div>
              </DropdownMenuItem>
            );
          })}
          
          {/* Translation Status */}
          {showLoadingState && (isTranslating || switchingTo) && (
            <div className="px-2 py-1.5 mt-1 border-t">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>
                  {switchingTo 
                    ? `${t('common.loading', 'Loading')} ${LANGUAGES.find(l => l.code === switchingTo)?.name}...`
                    : t('common.loading', 'Loading...')
                  }
                </span>
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Loading Overlay for Full Variant */}
      {variant === 'full' && isTranslating && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
}

// Compact version for tight spaces
export function CompactLanguageSwitcher(props: Omit<EnhancedLanguageSwitcherProps, 'variant'>) {
  return (
    <EnhancedLanguageSwitcher 
      {...props} 
      variant="compact" 
      showName={false}
    />
  );
}

// Sidebar version for navigation
export function SidebarLanguageSwitcher(props: Omit<EnhancedLanguageSwitcherProps, 'variant'>) {
  return (
    <EnhancedLanguageSwitcher 
      {...props} 
      variant="sidebar" 
      showName={true}
    />
  );
}

// Full version with all details
export function FullLanguageSwitcher(props: Omit<EnhancedLanguageSwitcherProps, 'variant'>) {
  return (
    <EnhancedLanguageSwitcher 
      {...props} 
      variant="full" 
      showName={true}
      showFlag={true}
    />
  );
}
