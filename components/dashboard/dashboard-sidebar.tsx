"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Camera, 
  PenTool, 
  Users, 
  Briefcase,
  Lock,
  Crown,
  Zap,
  Star,
  ChevronRight
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { PlanAccessManager, usePlanAccess } from '@/lib/plan-access-utils-enhanced';
import { UpgradePrompt } from '@/components/upgrade-prompt-enhanced';

interface NavigationItem {
  id: string;
  displayName: string;
  href: string;
  icon: React.ComponentType<any>;
  feature: string;
  description?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'overview',
    displayName: 'Dashboard Overview',
    href: '/dashboard',
    icon: BarChart3,
    feature: 'dashboard-overview',
    description: 'Your trading psychology overview'
  },
  {
    id: 'ai-coach',
    displayName: 'AI Psychology Coach',
    href: '/dashboard/ai-coach',
    icon: Brain,
    feature: 'ai-psychology-coach',
    description: 'AI-powered trading psychology guidance'
  },
  {
    id: 'trade-analysis',
    displayName: 'Trade Analysis',
    href: '/dashboard/trade-analysis',
    icon: TrendingUp,
    feature: 'trade-analysis',
    description: 'Analyze your trading decisions'
  },
  {
    id: 'psychology-courses',
    displayName: 'Psychology Courses',
    href: '/dashboard/psychology-courses',
    icon: BookOpen,
    feature: 'psychology-courses',
    description: 'Learn trading psychology fundamentals'
  },
  {
    id: 'exercises',
    displayName: 'Interactive Exercises',
    href: '/dashboard/exercises',
    icon: Target,
    feature: 'interactive-exercises',
    description: 'Practice emotional control techniques'
  },
  {
    id: 'journal',
    displayName: 'Reflection Journal',
    href: '/dashboard/journal',
    icon: PenTool,
    feature: 'reflection-journal',
    description: 'Track your trading emotions and thoughts'
  },
  {
    id: 'screenshot-analysis',
    displayName: 'Screenshot Analysis',
    href: '/dashboard/screenshot-analysis',
    icon: Camera,
    feature: 'screenshot-analysis',
    description: 'AI analysis of your trading screenshots'
  },
  {
    id: 'behavioral-patterns',
    displayName: 'Behavioral Patterns',
    href: '/dashboard/behavioral-patterns',
    icon: Users,
    feature: 'behavioral-patterns',
    description: 'Identify and improve trading patterns'
  },
  {
    id: 'career-builder',
    displayName: 'Funded Career Builder',
    href: '/dashboard/career-builder',
    icon: Briefcase,
    feature: 'funded-career-builder',
    description: 'Build your funded trading career'
  }
];

const planIcons = {
  free: Lock,
  pro: Zap,
  premium: Crown,
  elite: Star
};

const planColors = {
  free: 'text-gray-400',
  pro: 'text-blue-500',
  premium: 'text-purple-500',
  elite: 'text-yellow-500'
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { hasFeatureAccess, getRequiredPlan, getRemainingUsage } = usePlanAccess();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState<{
    show: boolean;
    feature: string;
    requiredPlan: string;
  }>({ show: false, feature: '', requiredPlan: '' });

  const userPlan = user?.subscription?.plan || 'free';
  const planDisplayInfo = PlanAccessManager.getPlanDisplayInfo(userPlan);

  const handleLockedFeatureClick = (item: NavigationItem) => {
    const requiredPlan = getRequiredPlan(item.feature);
    if (requiredPlan) {
      setShowUpgradePrompt({
        show: true,
        feature: item.displayName,
        requiredPlan
      });
    }
  };

  const handleUpgrade = () => {
    // Navigate to upgrade page or open upgrade modal
    window.location.href = '/dashboard/upgrade';
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = pathname === item.href;
    const hasAccess = hasFeatureAccess(userPlan, item.feature);
    const requiredPlan = getRequiredPlan(item.feature);
    const Icon = item.icon;
    const RequiredPlanIcon = requiredPlan ? planIcons[requiredPlan] : null;
    const requiredPlanColor = requiredPlan ? planColors[requiredPlan] : '';

    // Get usage information for limited features
    const remainingUsage = getRemainingUsage(userPlan, item.feature, 0); // You'd pass actual usage here
    const showUsageInfo = item.feature === 'trade-analysis' && typeof remainingUsage === 'number';

    if (hasAccess) {
      return (
        <Link
          key={item.id}
          href={item.href}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            isActive
              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium truncate">{item.displayName}</span>
            {showUsageInfo && (
              <div className="text-xs text-gray-500 mt-1">
                {remainingUsage} remaining this month
              </div>
            )}
          </div>
          {isActive && <ChevronRight className="w-4 h-4 text-blue-700" />}
        </Link>
      );
    }

    // Locked feature
    return (
      <div
        key={item.id}
        onClick={() => handleLockedFeatureClick(item)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group opacity-60 hover:opacity-80"
      >
        <Icon className="w-5 h-5 text-gray-400" />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-gray-400 truncate">{item.displayName}</span>
          <div className="flex items-center gap-1 mt-1">
            {RequiredPlanIcon && (
              <RequiredPlanIcon className={`w-3 h-3 ${requiredPlanColor}`} />
            )}
            <span className="text-xs text-gray-400">
              {requiredPlan?.charAt(0).toUpperCase() + requiredPlan?.slice(1)} Required
            </span>
          </div>
        </div>
        <Lock className="w-4 h-4 text-gray-400" />
      </div>
    );
  };

  return (
    <>
      <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
        {/* Plan Status Header */}
        <div className={`p-4 border-b border-gray-200 ${planDisplayInfo.colors.bg}`}>
          <div className="flex items-center gap-2 mb-2">
            {React.createElement(planIcons[userPlan], { 
              className: `w-5 h-5 ${planDisplayInfo.colors.text}` 
            })}
            <span className={`font-semibold text-sm ${planDisplayInfo.colors.text}`}>
              {planDisplayInfo.name}
            </span>
          </div>
          <div className="text-xs text-gray-600">
            {planDisplayInfo.price === 0 ? 'Free Plan' : `$${planDisplayInfo.price}/month`}
          </div>
          {userPlan !== 'elite' && (
            <button
              onClick={handleUpgrade}
              className="mt-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs py-1 px-2 rounded hover:opacity-90 transition-opacity"
            >
              Upgrade Plan
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </div>
          
          {navigationItems.map(renderNavigationItem)}
        </nav>

        {/* Plan Features Summary */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Your Plan Includes
          </div>
          <div className="space-y-1">
            {planDisplayInfo.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                <span className="truncate">{feature}</span>
              </div>
            ))}
            {planDisplayInfo.features.length > 3 && (
              <div className="text-xs text-gray-500">
                +{planDisplayInfo.features.length - 3} more features
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Prompt Modal */}
      {showUpgradePrompt.show && (
        <UpgradePrompt
          feature={showUpgradePrompt.feature}
          currentPlan={userPlan}
          requiredPlan={showUpgradePrompt.requiredPlan}
          onUpgrade={handleUpgrade}
          variant="modal"
        />
      )}
    </>
  );
}

