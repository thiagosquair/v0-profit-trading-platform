// Enhanced Dashboard Sidebar with Dynamic Translation Support
'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Brain,
  BarChart3,
  Camera,
  BookOpen,
  PenTool,
  MessageSquare,
  Hammer,
  Activity,
  GitPullRequest,
  Trophy,
  TrendingUp,
  ClipboardList,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useLanguage } from './enhanced_language_hook';
import { SidebarLanguageSwitcher } from './enhanced_language_switcher';

export function EnhancedDashboardSidebar() {
  const { profile, getRemainingUsage } = useUser();
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const navigation = [
    {
      name: t('nav.overview', 'Overview'),
      href: '/dashboard',
      icon: BarChart3,
    },
    {
      name: t('nav.aiCoach', 'AI Coach'),
      href: '/dashboard/coach',
      icon: Brain,
    },
    {
      name: t('nav.assessment', 'Trader Assessment'),
      href: '/dashboard/assessment',
      icon: ClipboardList,
      isNew: true,
      description: t('assessment.subtitle', 'Discover your trading psychology profile')
    },
    {
      name: t('nav.analysis', 'Screenshot Analysis'),
      href: '/dashboard/analysis',
      icon: Camera,
      showUsage: true,
      usageType: 'screenshot_analysis' as const,
    },
    {
      name: t('nav.tradeBuilder', 'Trade Builder'),
      href: '/dashboard/trade-builder',
      icon: Hammer,
      showUsage: true,
      usageType: 'trade_builder' as const,
    },
    {
      name: t('nav.exercises', 'Interactive Exercises'),
      href: '/dashboard/exercises',
      icon: Activity,
    },
    {
      name: t('nav.patterns', 'Behavioral Patterns'),
      href: '/dashboard/patterns',
      icon: GitPullRequest,
    },
    {
      name: t('nav.courses', 'Psychology Courses'),
      href: '/dashboard/courses',
      icon: BookOpen,
    },
    {
      name: t('nav.journal', 'Reflection Journal'),
      href: '/dashboard/journal',
      icon: PenTool,
    },
    {
      name: t('nav.insights', 'Coaching Insights'),
      href: '/dashboard/insights',
      icon: MessageSquare,
    },
    {
      name: t('nav.careerBuilder', 'Funded Career Builder'),
      href: '/dashboard/career-builder',
      icon: Trophy,
    },
    {
      name: t('nav.progress', 'Progress Tracking'),
      href: '/dashboard/progress',
      icon: TrendingUp,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const renderUsageBadge = (usageType: 'screenshot_analysis' | 'trade_builder') => {
    const remaining = getRemainingUsage(usageType);
    if (remaining === null) return null;

    return (
      <Badge 
        variant={remaining > 0 ? 'secondary' : 'destructive'} 
        className="ml-auto text-xs"
      >
        {remaining}
      </Badge>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col fixed inset-y-0 z-50 lg:flex">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center flex-shrink-0 px-4 mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            {t('dashboard.title', 'MaxTrades Dashboard')}
          </h1>
        </div>

        {/* Welcome Message */}
        {profile && (
          <div className="px-4 mb-6">
            <p className="text-sm text-gray-600">
              {t('dashboard.welcome', 'Welcome back')}, {profile.name || profile.email}
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  ${active
                    ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                    active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="truncate">{item.name}</span>
                    
                    {/* New Badge */}
                    {item.isNew && (
                      <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-800">
                        {t('dashboard.newFeature', 'NEW')}
                      </Badge>
                    )}
                    
                    {/* Usage Badge */}
                    {item.showUsage && renderUsageBadge(item.usageType)}
                  </div>
                  
                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Language Switcher */}
        <div className="px-4 mt-6">
          <Separator className="mb-4" />
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('language.current', 'Current Language')}
            </p>
            <SidebarLanguageSwitcher className="w-full" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 mt-6 space-y-2">
          <Separator className="mb-4" />
          
          <Link
            href="/dashboard/settings"
            className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Settings className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
            {t('common.settings', 'Settings')}
          </Link>
          
          <Link
            href="/dashboard/help"
            className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <HelpCircle className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
            {t('common.help', 'Help & Support')}
          </Link>
        </div>

        {/* Language Info */}
        <div className="px-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-lg">{language === 'en' ? '🇺🇸' : language === 'pt-BR' ? '🇧🇷' : language === 'es' ? '🇪🇸' : '🇫🇷'}</span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-xs font-medium text-blue-900">
                  {language === 'en' ? 'English' : 
                   language === 'pt-BR' ? 'Português (Brasil)' :
                   language === 'es' ? 'Español' : 'Français'}
                </p>
                <p className="text-xs text-blue-700">
                  {t('language.aiSupported', 'AI features supported')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
