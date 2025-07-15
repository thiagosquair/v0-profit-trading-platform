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
  ClipboardList,
} from 'lucide-react';

export function DashboardSidebar() {
  const { profile, getRemainingUsage } = useUser();
  const pathname = usePathname();

  const navigation = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      name: "AI Coach",
      href: "/dashboard/coach",
      icon: Brain,
    },
    {
      name: "Trader Assessment",
      href: "/dashboard/assessment",
      icon: ClipboardList,
      isNew: true,
      description: "Discover your trading psychology"
    },
    {
      name: "Screenshot Analysis",
      href: "/dashboard/analysis",
      icon: Camera,
      showUsage: true,
      usageType: "screenshot_analysis" as const,
    },
    {
      name: "Trade Builder",
      href: "/dashboard/trade-builder",
      icon: Hammer,
      showUsage: true,
      usageType: "trade_builder" as const,
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
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col fixed inset-y-0 z-50 lg:flex">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900">MaxTrades Dashboard</h1>
        </div>

        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
            
            // For testing - show unlimited usage for all features
            const remaining = item.showUsage ? 'unlimited' : null;

            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  
                  <div className="flex-1">
                    <div className="flex items-center">
                      {item.name}
                      {item.isNew && (
                        <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </div>

                  {/* Show unlimited badge for testing */}
                  {remaining === 'unlimited' && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Unlimited
                    </Badge>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Plan Information - Show as Elite for testing */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span>Current Plan:</span>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Elite (Testing)
              </Badge>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Screenshot Analysis:</span>
                <span>Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span>Trade Builder:</span>
                <span>Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span>Assessment:</span>
                <span className="text-green-600">Available</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/billing">Manage Plan</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
