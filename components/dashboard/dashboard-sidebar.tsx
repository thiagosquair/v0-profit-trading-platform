"use client";

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { useState, useEffect } from 'react';
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
} from 'lucide-react';

export function DashboardSidebar() {
  const { profile, getRemainingUsage } = useUser();
  const pathname = usePathname();
  const { t } = useLanguage();
  const [, forceUpdate] = useState({});

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const navigation = [
    {
      name: t("nav.overview", "Overview"),
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      name: t("nav.aiCoach", "AI Coach"),
      href: "/dashboard/coach",
      icon: Brain,
    },
    {
      name: t("nav.assessment", "Trader Assessment"),
      href: "/dashboard/assessment",
      icon: ClipboardList,
      isNew: true,
      description: t("nav.assessmentDesc", "Discover your trading psychology")
    },
    {
      name: t("nav.analysis", "Screenshot Analysis"),
      href: "/dashboard/analysis",
      icon: Camera,
      showUsage: true,
      usageType: "screenshot_analysis" as const,
    },
    {
      name: t("nav.progress", "Progress Tracking"),
      href: "/dashboard/progress",
      icon: TrendingUp,
    },
    {
      name: t("nav.exercises", "Interactive Exercises"),
      href: "/dashboard/exercises",
      icon: Activity,
    },
    {
      name: t("nav.patterns", "Behavioral Patterns"),
      href: "/dashboard/patterns",
      icon: GitPullRequest,
    },
    {
      name: t("nav.courses", "Psychology Courses"),
      href: "/dashboard/courses",
      icon: BookOpen,
      isNew: true,
    },
    {
      name: t("nav.journal", "Reflection Journal"),
      href: "/dashboard/journal",
      icon: PenTool,
    },
    {
      name: t("nav.insights", "Coaching Insights"),
      href: "/dashboard/insights",
      icon: MessageSquare,
    },
    {
      name: t("nav.tradeBuilder", "Trade Builder"),
      href: "/dashboard/trade-builder",
      icon: Hammer,
    },
    {
      name: t("nav.marketInsights", "Market Insights"),
      href: "/dashboard/market-insights",
      icon: Trophy,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col overflow-y-auto border-r bg-white px-3 py-4">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("common.dashboard", "Dashboard")}
          </h2>
        </div>
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const remainingUsage = item.showUsage && item.usageType 
              ? getRemainingUsage(item.usageType) 
              : null;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <div className="flex items-center space-x-1">
                      {item.isNew && (
                        <Badge variant="secondary" className="text-xs">
                          {t("common.new", "NEW")}
                        </Badge>
                      )}
                      {remainingUsage !== null && (
                        <Badge variant="outline" className="text-xs">
                          {remainingUsage}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile Section */}
        <div className="border-t pt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {profile?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {profile?.email || t("common.user", "User")}
              </p>
              <p className="text-xs text-gray-500">
                {t("common.profile", "Profile")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
