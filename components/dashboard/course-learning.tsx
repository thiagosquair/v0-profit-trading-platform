'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Play, 
  Star, 
  Users, 
  Clock, 
  Lock, 
  CheckCircle, 
  Trophy,
  Calendar,
  Target,
  Zap,
  Brain,
  Shield,
  Heart,
  RotateCcw,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { courses, subjects, getCoursesBySubject, getSubjectById } from '@/lib/course-data';
import { 
  CourseProgress, 
  UserCourseStats, 
  TimeGatingStatus,
  CourseEnrollment 
} from '@/types/course-progress';

interface EnhancedCourseLearningProps {
  onNavigateToCourse?: (courseId: string) => void;
}

export function EnhancedCourseLearning({ onNavigateToCourse }: EnhancedCourseLearningProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('available');
  const [userStats, setUserStats] = useState<UserCourseStats | null>(null);
  const [userProgress, setUserProgress] = useState<CourseProgress[]>([]);
  const [timeGatingDialog, setTimeGatingDialog] = useState<{
    isOpen: boolean;
    course?: any;
    status?: TimeGatingStatus;
  }>({ isOpen: false });
  const [loading, setLoading] = useState(true);
  
  const { user, profile } = useUser();
  const userId = user?.id || profile?.id || 'demo-user';

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Load user stats
      const statsResponse = await fetch(`/api/courses/progress?userId=${userId}&action=stats`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setUserStats(statsData.data);
      }

      // Load user progress
      const progressResponse = await fetch(`/api/courses/progress?userId=${userId}&action=progress`);
      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        setUserProgress(progressData.data || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Set fallback data for demo
      setUserStats({
        totalCoursesCompleted: 2,
        totalTimeSpent: 180,
        subjectProgress: {
          trading_psychology_fundamentals: { coursesCompleted: 1, totalCourses: 4, canEnrollNew: true },
          risk_management_psychology: { coursesCompleted: 1, totalCourses: 4, canEnrollNew: false, nextUnlockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
          emotional_control_regulation: { coursesCompleted: 0, totalCourses: 4, canEnrollNew: true },
          behavioral_patterns_habits: { coursesCompleted: 0, totalCourses: 3, canEnrollNew: true },
          market_psychology_sentiment: { coursesCompleted: 0, totalCourses: 3, canEnrollNew: true },
          advanced_trading_psychology: { coursesCompleted: 0, totalCourses: 2, canEnrollNew: true }
        },
        currentStreak: 5,
        certificates: ['TPF-001', 'RMP-001']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCourseAction = async (course: any) => {
    // Check if user is enrolled
    const enrollment = userProgress.find(p => p.courseId === course.id);
    
    if (enrollment) {
      // Navigate to course content
      if (onNavigateToCourse) {
        onNavigateToCourse(course.id);
      } else {
        window.location.href = `/dashboard/courses/${course.id}`;
      }
      return;
    }

    // Check time gating
    try {
      const response = await fetch(`/api/courses/progress?userId=${userId}&courseId=${course.id}&action=time-gating`);
      if (response.ok) {
        const data = await response.json();
        const timeGating: TimeGatingStatus = data.data;
        
        if (timeGating.canEnroll) {
          await enrollInCourse(course.id);
        } else {
          setTimeGatingDialog({
            isOpen: true,
            course,
            status: timeGating
          });
        }
      }
    } catch (error) {
      console.error('Error checking time gating:', error);
      // Fallback: allow enrollment
      await enrollInCourse(course.id);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      const response = await fetch('/api/courses/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'enroll',
          userId,
          courseId
        })
      });

      if (response.ok) {
        await loadUserData(); // Refresh data
        
        // Navigate to course
        if (onNavigateToCourse) {
          onNavigateToCourse(courseId);
        } else {
          window.location.href = `/dashboard/courses/${courseId}`;
        }
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const getSubjectIcon = (subjectId: string) => {
    const iconMap: { [key: string]: any } = {
      trading_psychology_fundamentals: Brain,
      risk_management_psychology: Shield,
      emotional_control_regulation: Heart,
      behavioral_patterns_habits: RotateCcw,
      market_psychology_sentiment: TrendingUp,
      advanced_trading_psychology: Target
    };
    return iconMap[subjectId] || BookOpen;
  };

  const getSubjectColor = (subjectId: string) => {
    const colorMap: { [key: string]: string } = {
      trading_psychology_fundamentals: 'blue',
      risk_management_psychology: 'green',
      emotional_control_regulation: 'red',
      behavioral_patterns_habits: 'purple',
      market_psychology_sentiment: 'orange',
      advanced_trading_psychology: 'indigo'
    };
    return colorMap[subjectId] || 'gray';
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

  const formatTimeRemaining = (unlockDate: Date) => {
    const now = new Date();
    const diff = unlockDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days < 14) return `${Math.ceil(days / 7)} week${Math.ceil(days / 7) > 1 ? 's' : ''}`;
    return `${Math.ceil(days / 7)} weeks`;
  };

  const filteredCourses = selectedSubject === 'all' 
    ? courses 
    : courses.filter(course => course.subject === selectedSubject);

  const enrolledCourses = courses.filter(course => 
    userProgress.some(p => p.courseId === course.id)
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Psychology Courses</h1>
        <p className="text-muted-foreground mt-2">
          Master trading psychology with our comprehensive course library
        </p>
      </div>

      {/* User Stats Dashboard */}
      {userStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{userStats.totalCoursesCompleted}</p>
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
                  <p className="text-2xl font-bold">{Math.round(userStats.totalTimeSpent / 60)}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold">{userStats.currentStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold">{userStats.certificates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {/* Subject Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubject === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject('all')}
            >
              All Courses
              <Badge variant="secondary" className="ml-2">
                {courses.length}
              </Badge>
            </Button>
            {subjects.map((subject) => {
              const Icon = getSubjectIcon(subject.id);
              const subjectCourses = getCoursesBySubject(subject.id);
              return (
                <Button
                  key={subject.id}
                  variant={selectedSubject === subject.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSubject(subject.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {subject.name}
                  <Badge variant="secondary" className="ml-2">
                    {subjectCourses.length}
                  </Badge>
                </Button>
              );
            })}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const enrollment = userProgress.find(p => p.courseId === course.id);
              const subjectStats = userStats?.subjectProgress[course.subject];
              const isLocked = subjectStats && !subjectStats.canEnrollNew && !enrollment;
              const Icon = getSubjectIcon(course.subject);

              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow relative">
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/20 rounded-lg z-10 flex items-center justify-center">
                      <div className="bg-white rounded-full p-3">
                        <Lock className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                  )}
                  
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                      <Icon className="h-16 w-16 text-blue-600" />
                    </div>
                    
                    {course.isPremium && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                        Premium
                      </Badge>
                    )}
                    
                    {enrollment && (
                      <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                        Enrolled
                      </Badge>
                    )}
                    
                    {userStats?.certificates.includes(course.id) && (
                      <Badge className="absolute bottom-2 right-2 bg-purple-500 text-white">
                        <Trophy className="h-3 w-3 mr-1" />
                        Certified
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

                      {enrollment && enrollment.progressPercentage > 0 && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {enrollment.progressPercentage}%
                            </span>
                          </div>
                          <Progress value={enrollment.progressPercentage} className="h-2" />
                        </div>
                      )}

                      {isLocked && subjectStats?.nextUnlockDate && (
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <Lock className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                          <p className="text-sm text-orange-700 font-medium">
                            Unlocks in {formatTimeRemaining(subjectStats.nextUnlockDate)}
                          </p>
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        variant={enrollment ? 'default' : 'outline'}
                        onClick={() => handleCourseAction(course)}
                        disabled={isLocked}
                      >
                        {enrollment ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            {enrollment.progressPercentage > 0 ? 'Continue' : 'Start Course'}
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Enroll Now
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="enrolled">
          <div className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No enrolled courses yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your learning journey by enrolling in a course
                  </p>
                  <Button onClick={() => setActiveTab('available')}>
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            ) : (
              enrolledCourses.map((course) => {
                const enrollment = userProgress.find(p => p.courseId === course.id);
                const Icon = getSubjectIcon(course.subject);
                
                return (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-8 w-8 text-blue-600" />
                          <div>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>
                              {course.duration} hours • {course.instructor}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {enrollment?.progressPercentage || 0}%
                          </div>
                          <div className="text-sm text-muted-foreground">Complete</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={enrollment?.progressPercentage || 0} className="mb-4" />
                      <div className="flex items-center justify-between">
                        <Button onClick={() => handleCourseAction(course)}>
                          <Play className="h-4 w-4 mr-2" />
                          {enrollment?.progressPercentage === 100 ? 'Review' : 'Continue'}
                        </Button>
                        {userStats?.certificates.includes(course.id) && (
                          <Badge className="bg-purple-100 text-purple-800">
                            <Trophy className="h-3 w-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="space-y-6">
            {subjects.map((subject) => {
              const subjectCourses = getCoursesBySubject(subject.id);
              const Icon = getSubjectIcon(subject.id);
              const subjectStats = userStats?.subjectProgress[subject.id];
              
              return (
                <Card key={subject.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle>{subject.name}</CardTitle>
                          <CardDescription>{subject.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {subjectStats?.coursesCompleted || 0}/{subjectStats?.totalCourses || subjectCourses.length}
                        </div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subjectCourses.map((course) => {
                        const enrollment = userProgress.find(p => p.courseId === course.id);
                        const isCompleted = userStats?.certificates.includes(course.id);
                        
                        return (
                          <div key={course.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              ) : enrollment ? (
                                <div className="h-6 w-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                </div>
                              ) : (
                                <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{course.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {course.level} • {course.duration}h
                              </p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCourseAction(course)}
                            >
                              {isCompleted ? 'Review' : enrollment ? 'Continue' : 'Start'}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Time Gating Dialog */}
      <Dialog open={timeGatingDialog.isOpen} onOpenChange={(open) => setTimeGatingDialog({ ...timeGatingDialog, isOpen: open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-500" />
              Course Temporarily Locked
            </DialogTitle>
            <DialogDescription>
              {timeGatingDialog.status?.reason === 'time_locked' && (
                <div className="space-y-3">
                  <p>
                    You've recently completed a course in this subject. To ensure proper learning 
                    and knowledge retention, you can access the next course in{' '}
                    <span className="font-semibold text-orange-600">
                      {timeGatingDialog.status.unlockDate && formatTimeRemaining(timeGatingDialog.status.unlockDate)}
                    </span>.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">💡 In the meantime:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Explore courses from other subjects</li>
                      <li>• Practice what you've learned</li>
                      <li>• Review your completed courses</li>
                      <li>• Check out the reflection journal</li>
                    </ul>
                  </div>
                  {timeGatingDialog.status.unlockDate && (
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <p className="text-sm text-green-700">
                        <strong>Unlock Date:</strong> {timeGatingDialog.status.unlockDate.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {timeGatingDialog.status?.reason === 'prerequisites_missing' && (
                <div className="space-y-3">
                  <p>This course requires completing prerequisite courses first.</p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Required Prerequisites:</h4>
                    <ul className="text-sm text-orange-700">
                      {timeGatingDialog.status.missingPrerequisites?.map(prereq => (
                        <li key={prereq}>• {courses.find(c => c.id === prereq)?.title || prereq}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setTimeGatingDialog({ isOpen: false })}>
              Understood
            </Button>
            <Button onClick={() => {
              setTimeGatingDialog({ isOpen: false });
              setActiveTab('available');
              setSelectedSubject('all');
            }}>
              Browse Other Courses
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
