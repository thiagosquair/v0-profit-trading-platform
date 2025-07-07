'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from 'lucide-react';

export function DashboardSidebar() {
  const { profile, hasFeature, getRemainingUsage, isFeatureEnabled } = useUser();
  const pathname = usePathname();

  const navigation = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: BarChart3,
      feature: null, // Always accessible
    },
    {
      name: "AI Coach",
      href: "/dashboard/coach",
      icon: Brain,
      feature: "ai_psychology_coach",
    },
    {
      name: "Screenshot Analysis",
      href: "/dashboard/analysis",
      icon: Camera,
      feature: "screenshot_analysis",
      showUsage: true,
      usageType: "screenshot_analysis" as const,
    },
    {
      name: "Trade Builder",
      href: "/dashboard/trade-builder",
      icon: Hammer,
      feature: "trade_builder",
      showUsage: true,
      usageType: "trade_builder" as const,
    },
    {
      name: "Interactive Exercises",
      href: "/dashboard/exercises",
      icon: Activity,
      feature: "interactive_exercises",
    },
    {
      name: "Behavioral Patterns",
      href: "/dashboard/patterns",
      icon: GitPullRequest,
      feature: "behavioral_patterns",
    },
    {
      name: "Psychology Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
      feature: "psychology_courses",
    },
    {
      name: "Reflection Journal",
      href: "/dashboard/journal",
      icon: PenTool,
      feature: "reflection_journal",
    },
    {
      name: "Coaching Insights",
      href: "/dashboard/insights",
      icon: MessageSquare,
      feature: "coaching_insights",
    },
    {
      name: "Funded Career Builder",
      href: "/dashboard/career-builder",
      icon: Trophy,
      feature: "funded_career_builder",
    },
    {
      name: "Progress Tracking",
      href: "/dashboard/progress",
      icon: TrendingUp,
      feature: "progress_tracking",
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col fixed inset-y-0 z-50 lg:flex">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900">ProFitz Dashboard</h1>
        </div>

        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            const hasAccess = item.feature ? hasFeature(item.feature) : true;
            const isEnabled = item.feature ? isFeatureEnabled(item.feature) : true;
            const isActive = pathname === item.href;
            
            // Get remaining usage for features that have limits
            const remaining = item.showUsage && item.usageType && hasAccess
              ? getRemainingUsage(item.usageType)
              : null;

            return (
              <div key={item.name}>
                <Link
                  href={hasAccess ? item.href : '#'}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : hasAccess && isEnabled
                      ? 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!hasAccess) {
                      e.preventDefault();
                    }
                  }}
                >
                  <IconComponent className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-blue-500' : hasAccess ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-300'
                  }`} />
                  {item.name}

                  {/* Show usage count for limited features */}
                  {remaining !== null && remaining !== 'unlimited' && hasAccess && (
                    <Badge
                      variant={remaining === 0 ? 'destructive' : 'outline'}
                      className="ml-auto text-xs"
                    >
                      {remaining} left
                    </Badge>
                  )}

                  {/* Show unlimited badge for unlimited features */}
                  {remaining === 'unlimited' && hasAccess && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Unlimited
                    </Badge>
                  )}

                  {/* Show plan requirement for restricted features */}
                  {!hasAccess && item.feature && (
                    <Badge variant="secondary" className="ml-auto text-xs bg-gray-100 text-gray-500">
                      {item.feature === 'funded_career_builder' ? 'Elite' :
                       item.feature === 'coaching_insights' || item.feature === 'behavioral_patterns' ? 'Pro+' :
                       item.feature === 'reflection_journal' || item.feature === 'trade_builder' ? 'Pro+' :
                       'Pro+'}
                    </Badge>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Plan Information and Upgrade Section */}
        {profile && (
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span>Current Plan:</span>
                <Badge 
                  variant={profile.plan === 'free' ? 'secondary' : 'default'}
                  className={`capitalize ${
                    profile.plan === 'elite' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                    profile.plan === 'premium' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' :
                    profile.plan === 'pro' ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' :
                    'bg-gray-100 text-gray-700'
                  }`}
                >
                  {profile.plan}
                </Badge>
              </div>
              
              {/* Show usage stats for current plan */}
              <div className="text-xs text-gray-500 space-y-1">
                {hasFeature('screenshot_analysis') && (
                  <div className="flex justify-between">
                    <span>Screenshot Analysis:</span>
                    <span>
                      {getRemainingUsage('screenshot_analysis') === 'unlimited' 
                        ? 'Unlimited' 
                        : `${getRemainingUsage('screenshot_analysis')} left`}
                    </span>
                  </div>
                )}
                {hasFeature('trade_builder') && (
                  <div className="flex justify-between">
                    <span>Trade Builder:</span>
                    <span>
                      {getRemainingUsage('trade_builder') === 'unlimited' 
                        ? 'Unlimited' 
                        : `${getRemainingUsage('trade_builder')} left`}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/billing">Manage Plan</Link>
              </Button>
              
              {profile.plan !== 'elite' && (
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
                  asChild
                >
                  <Link href="/dashboard/billing?upgrade=true">
                    Upgrade Plan
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
