'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  Brain,
  Target,
  Lightbulb,
  FileText,
  Award
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Course content data
const courseContent = {
  'TPF-001': {
    title: 'Introduction to Trading Psychology',
    description: 'Discover the fundamental principles of trading psychology and how your mind affects your trading decisions.',
    instructor: 'Dr. Sarah Chen',
    duration: 3,
    level: 'beginner',
    modules: [
      {
        id: 1,
        title: 'Understanding Your Trading Mind',
        duration: 45,
        lessons: [
          { id: 1, title: 'The Psychology Behind Trading Decisions', duration: 15, completed: false },
          { id: 2, title: 'Cognitive Biases in Trading', duration: 20, completed: false },
          { id: 3, title: 'Emotional vs Rational Decision Making', duration: 10, completed: false }
        ]
      },
      {
        id: 2,
        title: 'Common Psychological Traps',
        duration: 50,
        lessons: [
          { id: 4, title: 'Fear and Greed in Trading', duration: 20, completed: false },
          { id: 5, title: 'Overconfidence and Its Dangers', duration: 15, completed: false },
          { id: 6, title: 'Analysis Paralysis', duration: 15, completed: false }
        ]
      },
      {
        id: 3,
        title: 'Building Mental Discipline',
        duration: 65,
        lessons: [
          { id: 7, title: 'Developing Trading Rules', duration: 25, completed: false },
          { id: 8, title: 'Sticking to Your Plan', duration: 20, completed: false },
          { id: 9, title: 'Managing Expectations', duration: 20, completed: false }
        ]
      }
    ]
  },
  'RMP-001': {
    title: 'Psychology of Risk Perception',
    description: 'Understand how psychological factors influence risk perception and decision-making in trading.',
    instructor: 'Marcus Rodriguez',
    duration: 4,
    level: 'beginner',
    modules: [
      {
        id: 1,
        title: 'Understanding Risk Psychology',
        duration: 60,
        lessons: [
          { id: 1, title: 'What is Risk Perception?', duration: 20, completed: false },
          { id: 2, title: 'Individual Risk Tolerance', duration: 25, completed: false },
          { id: 3, title: 'Cultural Influences on Risk', duration: 15, completed: false }
        ]
      },
      {
        id: 2,
        title: 'Risk Assessment Biases',
        duration: 70,
        lessons: [
          { id: 4, title: 'Probability Misjudgment', duration: 25, completed: false },
          { id: 5, title: 'Availability Heuristic', duration: 20, completed: false },
          { id: 6, title: 'Anchoring in Risk Assessment', duration: 25, completed: false }
        ]
      },
      {
        id: 3,
        title: 'Practical Risk Management',
        duration: 110,
        lessons: [
          { id: 7, title: 'Position Sizing Psychology', duration: 30, completed: false },
          { id: 8, title: 'Stop Loss Mental Models', duration: 40, completed: false },
          { id: 9, title: 'Portfolio Risk Perception', duration: 40, completed: false }
        ]
      }
    ]
  },
  'ECR-001': {
    title: 'Understanding Trading Emotions',
    description: 'Learn to identify, understand, and work with your trading emotions effectively.',
    instructor: 'Emma Thompson',
    duration: 3,
    level: 'beginner',
    modules: [
      {
        id: 1,
        title: 'Emotional Awareness in Trading',
        duration: 55,
        lessons: [
          { id: 1, title: 'Identifying Your Emotional Patterns', duration: 20, completed: false },
          { id: 2, title: 'The Physiology of Trading Stress', duration: 20, completed: false },
          { id: 3, title: 'Emotional Triggers in Markets', duration: 15, completed: false }
        ]
      },
      {
        id: 2,
        title: 'Managing Trading Emotions',
        duration: 65,
        lessons: [
          { id: 4, title: 'Breathing and Relaxation Techniques', duration: 25, completed: false },
          { id: 5, title: 'Cognitive Reframing Methods', duration: 25, completed: false },
          { id: 6, title: 'Pre-Trade Emotional Preparation', duration: 15, completed: false }
        ]
      },
      {
        id: 3,
        title: 'Emotional Recovery and Growth',
        duration: 60,
        lessons: [
          { id: 7, title: 'Learning from Emotional Mistakes', duration: 20, completed: false },
          { id: 8, title: 'Building Emotional Resilience', duration: 25, completed: false },
          { id: 9, title: 'Long-term Emotional Development', duration: 15, completed: false }
        ]
      }
    ]
  },
  'BPH-001': {
    title: 'Identifying Trading Patterns',
    description: 'Learn to identify and analyze your behavioral patterns in trading.',
    instructor: 'Dr. Alex Kumar',
    duration: 3,
    level: 'beginner',
    modules: [
      {
        id: 1,
        title: 'Behavioral Pattern Recognition',
        duration: 50,
        lessons: [
          { id: 1, title: 'What Are Behavioral Patterns?', duration: 15, completed: false },
          { id: 2, title: 'Tracking Your Trading Behavior', duration: 20, completed: false },
          { id: 3, title: 'Pattern Analysis Tools', duration: 15, completed: false }
        ]
      },
      {
        id: 2,
        title: 'Common Trading Patterns',
        duration: 70,
        lessons: [
          { id: 4, title: 'Revenge Trading Patterns', duration: 25, completed: false },
          { id: 5, title: 'Overtrading Behaviors', duration: 25, completed: false },
          { id: 6, title: 'Risk-Taking Patterns', duration: 20, completed: false }
        ]
      },
      {
        id: 3,
        title: 'Breaking Bad Patterns',
        duration: 60,
        lessons: [
          { id: 7, title: 'Pattern Interruption Techniques', duration: 25, completed: false },
          { id: 8, title: 'Building New Habits', duration: 20, completed: false },
          { id: 9, title: 'Maintaining Positive Changes', duration: 15, completed: false }
        ]
      }
    ]
  }
};

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { courseId } = params;
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(0);

  const course = courseContent[courseId as keyof typeof courseContent];

  useEffect(() => {
    if (course) {
      // Calculate progress
      const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
      const completedLessons = course.modules.reduce((acc, module) => 
        acc + module.lessons.filter(lesson => lesson.completed).length, 0
      );
      setProgress((completedLessons / totalLessons) * 100);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-4">The course "{courseId}" could not be found.</p>
          <Button onClick={() => router.push('/dashboard/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const currentModuleData = course.modules[currentModule];
  const currentLessonData = currentModuleData?.lessons[currentLesson];

  const handleLessonComplete = () => {
    if (currentLessonData) {
      currentLessonData.completed = true;
      
      // Move to next lesson
      if (currentLesson < currentModuleData.lessons.length - 1) {
        setCurrentLesson(currentLesson + 1);
      } else if (currentModule < course.modules.length - 1) {
        setCurrentModule(currentModule + 1);
        setCurrentLesson(0);
      }
    }
  };

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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push('/dashboard/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </div>
        </div>
        <Badge className={getLevelColor(course.level)}>
          {course.level}
        </Badge>
      </div>

      {/* Course Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>
                Instructor: {course.instructor} • Duration: {course.duration} hours
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                {currentLessonData?.title}
              </CardTitle>
              <CardDescription>
                Module {currentModule + 1}: {currentModuleData?.title} • {currentLessonData?.duration} minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Video/Content Area */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{currentLessonData?.title}</h3>
                    <p className="text-gray-600">Psychology Course Content</p>
                    <Button className="mt-4" onClick={handleLessonComplete}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </Button>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="prose max-w-none">
                  <h3>Lesson Overview</h3>
                  <p>
                    This lesson covers the fundamental concepts of {currentLessonData?.title.toLowerCase()}. 
                    You'll learn practical techniques and strategies that you can immediately apply to your trading.
                  </p>
                  
                  <h4>Key Learning Points:</h4>
                  <ul>
                    <li>Understanding the psychological principles behind this concept</li>
                    <li>Practical applications in real trading scenarios</li>
                    <li>Common mistakes and how to avoid them</li>
                    <li>Exercises to reinforce your learning</li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-lg mt-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Pro Tip</h4>
                        <p className="text-blue-700 text-sm">
                          Take notes as you progress through this lesson. The concepts you learn here will build 
                          upon each other throughout the course.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Sidebar */}
        <div className="space-y-6">
          {/* Module Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="space-y-2">
                    <div 
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        moduleIndex === currentModule 
                          ? 'bg-blue-100 border border-blue-300' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setCurrentModule(moduleIndex);
                        setCurrentLesson(0);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Module {module.id}</h4>
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-600">{module.title}</p>
                      <p className="text-xs text-gray-500">{module.duration} minutes</p>
                    </div>
                    
                    {moduleIndex === currentModule && (
                      <div className="ml-4 space-y-1">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                              lessonIndex === currentLesson
                                ? 'bg-blue-50 text-blue-700'
                                : lesson.completed
                                ? 'bg-green-50 text-green-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setCurrentLesson(lessonIndex)}
                          >
                            <div className="flex items-center gap-2">
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Course Notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Practice Exercises
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
