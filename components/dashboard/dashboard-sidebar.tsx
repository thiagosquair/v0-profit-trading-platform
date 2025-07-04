// components/dashboard/dashboard-sidebar.tsx (updated)
'use client';

import { useUser } from '@/contexts/UserContext';
import { FeatureGate } from '@/components/FeatureGate';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
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

  const navigation = [
   {
    name: "Overview",
    href: "/dashboard",
    icon: BarChart3,
    displayName: "Overview",
  },
  {
    name: "Ai Coach",
    href: "/dashboard/coach",
    icon: Brain,
    displayName: "Ai Coach",
  },
  {
    name: "Screenshot Analysis",
    href: "/dashboard/analysis",
    icon: Camera,
    displayName: "Screenshot Analysis",
  },
  {
    name: "Trade Builder",
    href: "/dashboard/trade-builder",
    icon: Hammer,
    displayName: "Trade Builder",
  },
  {
    name: "Interactive Exercises",
    href: "/dashboard/exercises",
    icon: Activity,
    displayName: "Interactive Exercises",
  },
  {
    name: "Behavioral Patterns",
    href: "/dashboard/patterns",
    icon: GitPullRequest,
    displayName: "Behavioral Patterns",
  },
  {
    name: "Psychology Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    displayName: "Psychology Courses",
  },
  {
    name: "Reflection Journal",
    href: "/dashboard/journal",
    icon: PenTool,
    displayName: "Reflection Journal",
  },
  {
    name: "Coaching Insights",
    href: "/dashboard/insights",
    icon: MessageSquare,
    displayName: "Coaching Insights",
  },
  {
    name: "Funded Career Builder",
    href: "/dashboard/career-builder",
    icon: Trophy,
    displayName: "Funded Career Builder",
  },
  {
    name: "Progress Tracking",
    href: "/dashboard/progress",
    icon: TrendingDown,
    displayName: "Progress Tracking",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

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
            const remaining = item.showUsage && item.feature ? 
              getRemainingUsage(item.feature as 'trade_analyses' | 'trade_builder') : null;

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
                  
                  {/* Show upgrade badge for locked features */}
                  {item.feature && !hasAccess && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Upgrade
                    </Badge>
                  )}
                  
                  {/* Show usage count for limited features */}
                  {remaining !== null && remaining !== 'unlimited' && (
                    <Badge 
                      variant={remaining === 0 ? "destructive" : "outline"} 
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

        {/* Plan information and upgrade button */}
        {profile && (
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">
              Current Plan: <span className="font-semibold capitalize">{profile.plan}</span>
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
