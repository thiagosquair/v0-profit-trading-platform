'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Play, 
  Star, 
  Users, 
  Clock, 
  Trophy,
  Brain,
  Shield,
  Heart,
  RotateCcw,
  TrendingUp,
  Target
} from 'lucide-react';

// Simple course data - no external imports
const simpleCourses = [
  {
    id: 'TPF-001',
    title: 'Introduction to Trading Psychology',
    description: 'Discover the fundamental principles of trading psychology and how your mind affects your trading decisions.',
    instructor: 'Dr. Sarah Chen',
    duration: 3,
    level: 'beginner',
    rating: 4.8,
    students: 3247,
    subject: 'Trading Psychology Fundamentals',
    isPremium: false,
    icon: Brain
  },
  {
    id: 'RMP-001',
    title: 'Psychology of Risk Perception',
    description: 'Understand how psychological factors influence risk perception and decision-making in trading.',
    instructor: 'Marcus Rodriguez',
    duration: 4,
    level: 'beginner',
    rating: 4.7,
    students: 2543,
    subject: 'Risk Management Psychology',
    isPremium: false,
    icon: Shield
  },
  {
    id: 'ECR-001',
    title: 'Understanding Trading Emotions',
    description: 'Learn to identify, understand, and work with your trading emotions effectively.',
    instructor: 'Emma Thompson',
    duration: 3,
    level: 'beginner',
    rating: 4.6,
    students: 3156,
    subject: 'Emotional Control & Regulation',
    isPremium: false,
    icon: Heart
  },
  {
    id: 'BPH-001',
    title: 'Identifying Trading Patterns',
    description: 'Learn to identify and analyze your behavioral patterns in trading.',
    instructor: 'Dr. Alex Kumar',
    duration: 3,
    level: 'beginner',
    rating: 4.5,
    students: 2456,
    subject: 'Behavioral Patterns & Habits',
    isPremium: false,
    icon: RotateCcw
  }
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Psychology Courses</h1>
        <p className="text-muted-foreground mt-2">
          Master trading psychology with our comprehensive course library
        </p>
      </div>

      {/* Debug Section - Remove after testing */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <h3 className="font-medium text-yellow-800 mb-2">🔧 Debug: Test Course Links</h3>
          <div className="space-y-2">
            <div>
              <Link href="/dashboard/courses/TPF-001" className="text-blue-600 hover:underline">
                Direct Link Test: /dashboard/courses/TPF-001
              </Link>
            </div>
            <div>
              <Link href="/dashboard/courses/RMP-001" className="text-blue-600 hover:underline">
                Direct Link Test: /dashboard/courses/RMP-001
              </Link>
            </div>
          </div>
          <p className="text-sm text-yellow-700 mt-2">
            Try clicking these direct links first to test if the route works
          </p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Learning Time</p>
                <p className="text-2xl font-bold">12h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">5 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">{simpleCourses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simpleCourses.map((course) => {
          const Icon = course.icon;
          
          return (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <Icon className="h-16 w-16 text-blue-600" />
                </div>
                
                {course.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                    Premium
                  </Badge>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Subject:</strong> {course.subject}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Instructor:</strong> {course.instructor}
                  </div>

                  {/* Using Link component instead of Button with onClick */}
                  <Link href={`/dashboard/courses/${course.id}`} className="block">
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Course
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Coming Soon Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            More Courses Coming Soon
          </CardTitle>
          <CardDescription>
            We're continuously adding new courses to help you master trading psychology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Advanced Risk Management</h4>
              <p className="text-sm text-muted-foreground">Master advanced psychological aspects of risk management</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Market Sentiment Analysis</h4>
              <p className="text-sm text-muted-foreground">Learn to read and interpret market psychology</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
