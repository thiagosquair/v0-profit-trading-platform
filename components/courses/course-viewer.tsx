'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  PenTool, 
  HelpCircle,
  ArrowLeft,
  Trophy,
  Target,
  Volume2
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { courses } from '@/lib/course-data';
import { CourseProgress, ModuleProgress } from '@/types/course-progress';

interface CourseViewerProps {
  courseId: string;
  onBack?: () => void;
}

export function CourseViewer({ courseId, onBack }: CourseViewerProps) {
  const [course, setCourse] = useState(courses.find(c => c.id === courseId));
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const { user, profile } = useUser();
  const userId = user?.id || profile?.id || 'demo-user';

  useEffect(() => {
    if (course && userId) {
      loadCourseProgress();
    }
  }, [course, userId]);

  useEffect(() => {
    // Track session start time when module changes
    setSessionStartTime(new Date());
  }, [currentModuleIndex]);

  const loadCourseProgress = async () => {
    try {
      setLoading(true);
      
      // Load course progress
      const progressResponse = await fetch(`/api/courses/progress?userId=${userId}&courseId=${courseId}&action=progress`);
      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        setProgress(progressData.data);
      }

      // Load module progress (you'd implement this endpoint)
      // For now, using mock data
      setModuleProgress([]);
      
    } catch (error) {
      console.error('Error loading course progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeModule = async (moduleId: string) => {
    const timeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60));
    
    try {
      const response = await fetch('/api/courses/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete-module',
          userId,
          courseId,
          moduleId,
          data: { timeSpent }
        })
      });

      if (response.ok) {
        await loadCourseProgress();
        
        // Auto-advance to next module
        if (currentModuleIndex < (course?.modules.length || 0) - 1) {
          setCurrentModuleIndex(currentModuleIndex + 1);
        }
      }
    } catch (error) {
      console.error('Error completing module:', error);
    }
  };

  const completeCourse = async () => {
    try {
      const response = await fetch('/api/courses/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete-course',
          userId,
          courseId
        })
      });

      if (response.ok) {
        await loadCourseProgress();
        // Show completion celebration
      }
    } catch (error) {
      console.error('Error completing course:', error);
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'reading':
        return FileText;
      case 'exercise':
        return PenTool;
      case 'quiz':
        return HelpCircle;
      default:
        return BookOpen;
    }
  };

  const isModuleCompleted = (moduleId: string) => {
    return moduleProgress.some(mp => mp.moduleId === moduleId && mp.isCompleted);
  };

  const getCompletedModulesCount = () => {
    return course?.modules.filter(module => isModuleCompleted(module.id)).length || 0;
  };

  const getCourseProgressPercentage = () => {
    if (!course) return 0;
    return Math.round((getCompletedModulesCount() / course.modules.length) * 100);
  };

  if (!course) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested course could not be found.</p>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>
    );
  }

  const currentModule = course.modules[currentModuleIndex];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">by {course.instructor}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {getCourseProgressPercentage()}%
          </div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm text-muted-foreground">
              {getCompletedModulesCount()} of {course.modules.length} modules
            </span>
          </div>
          <Progress value={getCourseProgressPercentage()} className="h-2" />
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
                {course.modules.map((module, index) => {
                  const Icon = getModuleIcon(module.type);
                  const isCompleted = isModuleCompleted(module.id);
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
              {/* Module Content */}
              <div className="space-y-6">
                {currentModule.type === 'video' && (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Video Player</p>
                        <p className="text-sm opacity-75">
                          {currentModule.videoUrl || 'Video content would be loaded here'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="flex items-center justify-center space-x-4">
                      <Button variant="outline" size="sm">
                        <SkipBack className="h-4 w-4" />
                      </Button>
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
                      <Button variant="outline" size="sm">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {currentModule.type === 'reading' && (
                  <div className="prose max-w-none">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <FileText className="h-8 w-8 text-blue-500 mb-4" />
                      <h3 className="text-lg font-semibold mb-4">Reading Material</h3>
                      {currentModule.content ? (
                        <div className="whitespace-pre-wrap text-gray-700">
                          {currentModule.content}
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          Reading content for "{currentModule.title}" would be displayed here. 
                          This would include comprehensive text, images, and interactive elements 
                          to help you understand the concepts.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentModule.type === 'exercise' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <PenTool className="h-8 w-8 text-blue-500 mb-4" />
                      <h3 className="text-lg font-semibold mb-4">Practical Exercise</h3>
                      {currentModule.exercises && currentModule.exercises.length > 0 ? (
                        <div className="space-y-4">
                          {currentModule.exercises.map((exercise, index) => (
                            <div key={exercise.id} className="bg-white p-4 rounded border">
                              <h4 className="font-medium mb-2">{exercise.title}</h4>
                              <p className="text-gray-600 mb-3">{exercise.description}</p>
                              <div className="space-y-2">
                                <h5 className="font-medium text-sm">Instructions:</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                  {exercise.instructions.map((instruction, i) => (
                                    <li key={i}>{instruction}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-3 text-sm text-blue-600">
                                <Clock className="h-4 w-4 inline mr-1" />
                                Estimated time: {exercise.timeEstimate} minutes
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          Interactive exercise for "{currentModule.title}" would be displayed here.
                          This would include hands-on activities to practice the concepts you've learned.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentModule.type === 'quiz' && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <HelpCircle className="h-8 w-8 text-purple-500 mb-4" />
                      <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>
                      {currentModule.quiz ? (
                        <div className="space-y-4">
                          <p className="text-gray-600 mb-4">
                            Test your understanding with this quiz. You need {currentModule.quiz.passingScore}% to pass.
                          </p>
                          {currentModule.quiz.questions.map((question, index) => (
                            <div key={question.id} className="bg-white p-4 rounded border">
                              <h4 className="font-medium mb-3">
                                Question {index + 1}: {question.question}
                              </h4>
                              {question.type === 'multiple_choice' && question.options && (
                                <div className="space-y-2">
                                  {question.options.map((option, i) => (
                                    <label key={i} className="flex items-center space-x-2 cursor-pointer">
                                      <input type="radio" name={`question-${question.id}`} value={i} />
                                      <span>{option}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                              {question.type === 'true_false' && (
                                <div className="space-y-2">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name={`question-${question.id}`} value="true" />
                                    <span>True</span>
                                  </label>
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name={`question-${question.id}`} value="false" />
                                    <span>False</span>
                                  </label>
                                </div>
                              )}
                            </div>
                          ))}
                          <Button className="w-full">Submit Quiz</Button>
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          Quiz for "{currentModule.title}" would be displayed here.
                          This would include multiple choice, true/false, and short answer questions.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Module Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentModuleIndex(Math.max(0, currentModuleIndex - 1))}
                      disabled={currentModuleIndex === 0}
                    >
                      <SkipBack className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    
                    {currentModuleIndex < course.modules.length - 1 ? (
                      <Button
                        onClick={() => setCurrentModuleIndex(currentModuleIndex + 1)}
                      >
                        Next
                        <SkipForward className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={completeCourse}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        Complete Course
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => completeModule(currentModule.id)}
                    disabled={isModuleCompleted(currentModule.id)}
                  >
                    {isModuleCompleted(currentModule.id) ? (
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
