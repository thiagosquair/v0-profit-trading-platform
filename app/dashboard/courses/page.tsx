'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use regular Next.js router
import { Card, CardContent } from '@/components/ui/card';
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
  Target
} from 'lucide-react';

// Simple course data
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
  const router = useRouter();

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

  const handleStartCourse = (courseId: string) => {
    console.log('Navigating to:', `/dashboard/courses/${courseId}`);
    router.push(`/dashboard/courses/${courseId}`);
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
              <CardContent className="p-4">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-16 w-16 text-blue-600" />
                  </div>
                  
                  {course.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                      Premium
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>

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

                  <div className="pt-2">
                    <Button 
                      className="w-full" 
                      onClick={() => handleStartCourse(course.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Debug Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">Debug: Direct Navigation Test</h3>
        <div className="space-y-2">
          {simpleCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleStartCourse(course.id)}
              className="block w-full text-left p-2 bg-white rounded border hover:bg-gray-50"
            >
              Test: {course.title} → /dashboard/courses/{course.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
