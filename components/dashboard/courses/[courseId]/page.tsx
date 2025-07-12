// Simple Course Viewer Page - app/dashboard/courses/[courseId]/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  ArrowLeft,
  Trophy,
  Target
} from 'lucide-react';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

// Simple course content data
const courseContent: { [key: string]: any } = {
  'TPF-001': {
    title: 'Introduction to Trading Psychology',
    instructor: 'Dr. Sarah Chen',
    duration: 3,
    modules: [
      {
        id: 'M1',
        title: 'Welcome to Trading Psychology',
        type: 'video',
        duration: 15,
        description: 'Course overview and introduction to key concepts'
      },
      {
        id: 'M2',
        title: 'The Psychology-Performance Connection',
        type: 'video',
        duration: 25,
        description: 'How psychological factors directly impact trading performance'
      },
      {
        id: 'M3',
        title: 'Common Psychological Traps',
        type: 'reading',
        duration: 20,
        description: 'Reading material covering the most frequent mental pitfalls'
      },
      {
        id: 'M4',
        title: 'Knowledge Check',
        type: 'quiz',
        duration: 15,
        description: 'Test your understanding of trading psychology fundamentals'
      }
    ]
  },
  'RMP-001': {
    title: 'Psychology of Risk Perception',
    instructor: 'Marcus Rodriguez',
    duration: 4,
    modules: [
      {
        id: 'M1',
        title: 'Introduction to Risk Psychology',
        type: 'video',
        duration: 30,
        description: 'How psychology shapes our perception of risk'
      },
      {
        id: 'M2',
        title: 'Risk Assessment Biases',
        type: 'reading',
        duration: 25,
        description: 'Understanding common biases in risk evaluation'
      },
      {
        id: 'M3',
        title: 'Practical Risk Exercises',
        type: 'exercise',
        duration: 35,
        description: 'Hands-on exercises to improve risk assessment'
      }
    ]
  }
};

export default function CoursePage({ params }: CoursePageProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const course = courseContent[params.courseId];
  
  if (!course) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested course could not be found.</p>
        <Button onClick={() => window.location.href = '/dashboard/courses'}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>
    );
  }

  const currentModule = course.modules[currentModuleIndex];
  const progressPercentage = Math.round((completedModules.length / course.modules.length) * 100);

  const completeModule = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
    
    // Auto-advance to next module
    if (currentModuleIndex < course.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'reading':
        return FileText;
      case 'exercise':
        return Target;
      case 'quiz':
        return Trophy;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard/courses'}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">by {course.instructor}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedModules.length} of {course.modules.length} modules
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Modules</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {course.modules.map((module: any, index: number) => {
                  const Icon = getModuleIcon(module.type);
                  const isCompleted = completedModules.includes(module.id);
                  const isCurrent = index === currentModuleIndex;
                  
                  return (
                    <button
                      key={module.id}
                      onClick={() => setCurrentModuleIndex(index)}
                      className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                        isCurrent ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Icon className={`h-5 w-5 ${isCurrent ? 'text-blue-500' : 'text-gray-400'}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm truncate ${
                            isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-700'
                          }`}>
                            {module.title}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{module.duration} min</span>
                            <Badge variant="outline" className="text-xs">
                              {module.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(getModuleIcon(currentModule.type), { className: "h-5 w-5" })}
                    {currentModule.title}
                  </CardTitle>
                  <CardDescription>{currentModule.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{currentModule.type}</Badge>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {currentModule.duration} min
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Module Content */}
                {currentModule.type === 'video' && (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Video: {currentModule.title}</p>
                        <p className="text-sm opacity-75">Duration: {currentModule.duration} minutes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <Button 
                        size="lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {currentModule.type === 'reading' && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-4">Reading Material</h3>
                    <p className="text-gray-700 leading-relaxed">
                      This is the reading content for "{currentModule.title}". In a real implementation, 
                      this would contain comprehensive text, images, and interactive elements to help 
                      you understand the psychological concepts being taught.
                    </p>
                    <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-400">
                      <h4 className="font-medium text-blue-800 mb-2">Key Learning Points:</h4>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Understanding psychological factors in trading</li>
                        <li>• Identifying common mental traps</li>
                        <li>• Developing emotional awareness</li>
                        <li>• Building psychological resilience</li>
                      </ul>
                    </div>
                  </div>
                )}

                {currentModule.type === 'exercise' && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <Target className="h-8 w-8 text-blue-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-4">Practical Exercise</h3>
                    <p className="text-gray-700 mb-4">
                      Complete this hands-on exercise to practice the concepts you've learned.
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-2">Exercise: Self-Assessment</h4>
                      <p className="text-gray-600 mb-3">
                        Reflect on your recent trading decisions and identify any psychological patterns.
                      </p>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Instructions:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          <li>Review your last 10 trades</li>
                          <li>Identify emotional states during each trade</li>
                          <li>Note any patterns or recurring themes</li>
                          <li>Write down key insights</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentModule.type === 'quiz' && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <Trophy className="h-8 w-8 text-purple-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>
                    <p className="text-gray-700 mb-4">
                      Test your understanding with this quiz. You need 80% to pass.
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-3">
                        Sample Question: What is the primary factor that distinguishes successful traders?
                      </h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="sample-question" value="0" />
                          <span>Technical analysis skills</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="sample-question" value="1" />
                          <span>Market knowledge</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="sample-question" value="2" />
                          <span>Psychological discipline</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="sample-question" value="3" />
                          <span>Capital amount</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Module Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentModuleIndex(Math.max(0, currentModuleIndex - 1))}
                    disabled={currentModuleIndex === 0}
                  >
                    Previous Module
                  </Button>

                  <Button
                    onClick={() => completeModule(currentModule.id)}
                    disabled={completedModules.includes(currentModule.id)}
                  >
                    {completedModules.includes(currentModule.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>

                  {currentModuleIndex < course.modules.length - 1 ? (
                    <Button
                      onClick={() => setCurrentModuleIndex(currentModuleIndex + 1)}
                    >
                      Next Module
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      disabled={completedModules.length < course.modules.length}
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      Complete Course
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
