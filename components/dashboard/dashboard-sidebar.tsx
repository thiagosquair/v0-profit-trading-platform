'use client';

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
  ChevronRight,
  X as CloseIcon,
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { PlanAccessManager, usePlanAccess } from '@/lib/plan-access-utils';

/* ---------------------------------------------------------------------
   Simple modal shown when a user clicks a locked feature
------------------------------------------------------------------------ */
type UpgradePromptProps = {
  feature: string;
  currentPlan: string;
  requiredPlan: string;
  onUpgrade: () => void;
  onClose: () => void;
  variant?: 'modal'; // kept to match caller, not used
};

const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  feature,
  currentPlan,
  requiredPlan,
  onUpgrade,
  onClose,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <button
        aria-label="Close upgrade prompt"
        className="absolute right-2 top-2 rounded p-1 text-gray-500 hover:bg-gray-100"
        onClick={onClose}
      >
        <CloseIcon className="h-4 w-4" />
      </button>

      <h2 className="mb-2 text-lg font-semibold">
        {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} plan
        required
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        <span className="font-medium">{feature}</span> isn’t available on your
        current&nbsp;
        <span className="capitalize">{currentPlan}</span> plan. Upgrade to keep
        going.
      </p>

      <button
        onClick={onUpgrade}
        className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Upgrade now
      </button>
    </div>
  </div>
);

/* ---------------------------------------------------------------------
   Sidebar navigation items & helpers
------------------------------------------------------------------------ */
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
    description: 'Your trading psychology overview',
  },
  {
    id: 'ai-coach',
    displayName: 'AI Psychology Coach',
    href: '/dashboard/ai-coach',
    icon: Brain,
    feature: 'ai-psychology-coach',
    description: 'AI-powered trading psychology guidance',
  },
  {
    id: 'trade-analysis',
    displayName: 'Trade Analysis',
    href: '/dashboard/trade-analysis',
    icon: TrendingUp,
    feature: 'trade-analysis',
    description: 'Analyze your trading decisions',
  },
  {
    id: 'psychology-courses',
    displayName: 'Psychology Courses',
    href: '/dashboard/psychology-courses',
    icon: BookOpen,
    feature: 'psychology-courses',
    description: 'Learn trading psychology fundamentals',
  },
  {
    id: 'exercises',
    displayName: 'Interactive Exercises',
    href: '/dashboard/exercises',
    icon: Target,
    feature: 'interactive-exercises',
    description: 'Practice emotional control techniques',
  },
  {
    id: 'journal',
    displayName: 'Reflection Journal',
    href: '/dashboard/journal',
    icon: PenTool,
    feature: 'reflection-journal',
    description: 'Track your trading emotions and thoughts',
  },
  {
    id: 'screenshot-analysis',
    displayName: 'Screenshot Analysis',
    href: '/dashboard/screenshot-analysis',
    icon: Camera,
    feature: 'screenshot-analysis',
    description: 'AI analysis of your trading screenshots',
  },
  {
    id: 'behavioral-patterns',
    displayName: 'Behavioral Patterns',
    href: '/dashboard/behavioral-patterns',
    icon: Users,
    feature: 'behavioral-patterns',
    description: 'Identify and improve trading patterns',
  },
  {
    id: 'career-builder',
    displayName: 'Funded Career Builder',
    href: '/dashboard/career-builder',
    icon: Briefcase,
    feature: 'funded-career-builder',
    description: 'Build your funded trading career',
  },
];

const planIcons = {
  free: Lock,
  pro: Zap,
  premium: Crown,
  elite: Star,
} as const;

const planColors = {
  free: 'text-gray-400',
  pro: 'text-blue-500',
  premium: 'text-purple-500',
  elite: 'text-yellow-500',
} as const;

/* ---------------------------------------------------------------------
   Main sidebar component
------------------------------------------------------------------------ */
export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { hasFeatureAccess, getRequiredPlan, getRemainingUsage } =
    usePlanAccess();

  const [upgradeState, setUpgradeState] = useState<{
    show: boolean;
    feature: string;
    requiredPlan: string;
  }>({ show: false, feature: '', requiredPlan: '' });

  const userPlan = user?.subscription?.plan || 'free';
  const planDisplayInfo = PlanAccessManager.getPlanDisplayInfo(userPlan);

  /* -------------------- helpers -------------------- */
  const handleLockedFeatureClick = (item: NavigationItem) => {
    const requiredPlan = getRequiredPlan(item.feature);
    if (requiredPlan) {
      setUpgradeState({ show: true, feature: item.displayName, requiredPlan });
    }
  };

  const handleUpgrade = () => {
    window.location.href = '/dashboard/upgrade';
  };

  const handleClosePrompt = () =>
    setUpgradeState({ show: false, feature: '', requiredPlan: '' });

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = pathname === item.href;
    const hasAccess = hasFeatureAccess(userPlan, item.feature);
    const requiredPlan = getRequiredPlan(item.feature);
    const Icon = item.icon;
    const RequiredPlanIcon = requiredPlan ? planIcons[requiredPlan] : null;
    const requiredPlanColor = requiredPlan ? planColors[requiredPlan] : '';

    // Usage info (only example for trade‑analysis)
    const remainingUsage = getRemainingUsage(userPlan, item.feature, 0);
    const showUsageInfo =
      item.feature === 'trade-analysis' && typeof remainingUsage === 'number';
- const showUsageInfo = item.feature === 'trade-analysis' && typeof remainingUsage === 'number';
+ const showUsageInfo =
+   (item.feature === 'screenshot-analysis' ||
+    item.feature === 'trade-builder') &&
+   typeof remainingUsage === 'number';
    
    if (hasAccess) {
      return (
        <Link
          key={item.id}
          href={item.href}
          className={`group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
            isActive
              ? 'border-l-4 border-blue-700 bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              isActive ? 'text-blue-700' : 'text-gray-500'
            }`}
          />
          <div className="min-w-0 flex-1">
            <span className="truncate text-sm font-medium">
              {item.displayName}
            </span>
            {showUsageInfo && (
              <div className="mt-1 text-xs text-gray-500">
                {remainingUsage} remaining this month
              </div>
            )}
          </div>
          {isActive && <ChevronRight className="h-4 w-4 text-blue-700" />}
        </Link>
      );
    }

    /* -------- locked feature -------- */
    return (
      <div
        key={item.id}
        onClick={() => handleLockedFeatureClick(item)}
        className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 opacity-60 transition-colors hover:opacity-80"
      >
        <Icon className="h-5 w-5 text-gray-400" />
        <div className="min-w-0 flex-1">
          <span className="truncate text-sm font-medium text-gray-400">
            {item.displayName}
          </span>
          <div className="mt-1 flex items-center gap-1">
            {RequiredPlanIcon && (
              <RequiredPlanIcon
                className={`h-3 w-3 ${requiredPlanColor}`}
              />
            )}
            <span className="text-xs text-gray-400">
              {requiredPlan?.charAt(0).toUpperCase() + requiredPlan?.slice(1)}{' '}
              Required
            </span>
          </div>
        </div>
        <Lock className="h-4 w-4 text-gray-400" />
      </div>
    );
  };

  /* -------------------- render -------------------- */
  return (
    <>
      <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
        {/* Plan badge */}
        <div className={`border-b border-gray-200 p-4 ${planDisplayInfo.colors.bg}`}>
          <div className="mb-2 flex items-center gap-2">
            {React.createElement(planIcons[userPlan], {
              className: `h-5 w-5 ${planDisplayInfo.colors.text}`,
            })}
            <span
              className={`text-sm font-semibold ${planDisplayInfo.colors.text}`}
            >
              {planDisplayInfo.name}
            </span>
          </div>
          <div className="text-xs text-gray-600">
            {planDisplayInfo.price === 0
              ? 'Free Plan'
              : `$${planDisplayInfo.price}/month`}
          </div>
          {userPlan !== 'elite' && (
            <button
              onClick={handleUpgrade}
              className="mt-2 w-full rounded bg-gradient-to-r from-blue-500 to-purple-600 py-1 px-2 text-xs text-white transition-opacity hover:opacity-90"
            >
              Upgrade Plan
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Navigation
          </div>
          {navigationItems.map(renderNavigationItem)}
        </nav>

        {/* Plan feature summary */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Your Plan Includes
          </div>
          <div className="space-y-1">
            {planDisplayInfo.features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <div className="h-1 w-1 rounded-full bg-green-500" />
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

      {upgradeState.show && (
        <UpgradePrompt
          feature={upgradeState.feature}
          currentPlan={userPlan}
          requiredPlan={upgradeState.requiredPlan}
          onUpgrade={handleUpgrade}
          onClose={handleClosePrompt}
          variant="modal"
        />
      )}
    </>
  );
}
