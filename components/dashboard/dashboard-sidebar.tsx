'use client';

import { useUser } from '@/contexts/UserContext';
import { FeatureGate } from '@/components/FeatureGate';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // missing import for <Button>
import {
  Brain,
  BarChart3,
  Camera,
  BookOpen,
  TrendingUp,
  Target,
  Users,
  Trophy,
  PenTool,
  MessageSquare,
  Hammer,
  Activity,
  GitPullRequest,
  Lightbulb,
  TrendingDown,
} from 'lucide-react';

export function DashboardSidebar() {
  const { profile, hasFeature, getRemainingUsage } = useUser();
  const pathname = usePathname();

  const navigation = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      name: "Ai Coach",
      href: "/dashboard/coach",
      icon: Brain,
    },
    {
      name: "Screenshot Analysis",
      href: "/dashboard/analysis",
      icon: Camera,
    },
    {
      name: "Trade Builder",
      href: "/dashboard/trade-builder",
      icon: Hammer,
    },
    {
      name: "Interactive Exercises",
      href: "/dashboard/exercises",
      icon: Activity,
    },
    {
      name: "Behavioral Patterns",
      href: "/dashboard/patterns",
      icon: GitPullRequest,
    },
    {
      name: "Psychology Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      name: "Reflection Journal",
      href: "/dashboard/journal",
      icon: PenTool,
    },
    {
      name: "Coaching Insights",
      href: "/dashboard/insights",
      icon: MessageSquare,
    },
    {
      name: "Funded Career Builder",
      href: "/dashboard/career-builder",
      icon: Trophy,
    },
    {
      name: "Progress Tracking",
      href: "/dashboard/progress",
      icon: TrendingDown,
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
            const remaining =
              item.showUsage && item.feature
                ? getRemainingUsage(item.feature as 'trade_analyses' | 'trade_builder')
                : null;

            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    hasAccess
                      ? 'text-gray-900 hover:bg-gray-50'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <IconComponent className="mr-3 h-6 w-6 flex-shrink-0" />
                  {item.name}

                  {item.feature && !hasAccess && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Upgrade
                    </Badge>
                  )}

                  {remaining !== null && remaining !== 'unlimited' && (
                    <Badge
                      variant={remaining === 0 ? 'destructive' : 'outline'}
                      className="ml-auto text-xs"
                    >
                      {remaining} left
                    </Badge>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {profile && (
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">
              Current Plan:{' '}
              <span className="font-semibold capitalize">{profile.plan}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/billing">Manage Plan</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
