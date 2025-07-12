// Course Progress Tracking Types

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  subject: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
  startedAt?: Date;
  completedAt?: Date;
  nextUnlockDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleProgress {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  isCompleted: boolean;
  completedAt?: Date;
  timeSpent: number; // in minutes
  createdAt: Date;
}

export interface SubjectUnlock {
  id: string;
  userId: string;
  subject: string;
  lastCompletedCourse?: string;
  lastCompletionDate?: Date;
  nextUnlockDate?: Date;
  coursesCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEnrollment {
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: CourseProgress;
  moduleProgress: ModuleProgress[];
}

export interface UserCourseStats {
  totalCoursesCompleted: number;
  totalTimeSpent: number; // in minutes
  subjectProgress: {
    [subjectId: string]: {
      coursesCompleted: number;
      totalCourses: number;
      nextUnlockDate?: Date;
      canEnrollNew: boolean;
    };
  };
  currentStreak: number; // days of consecutive learning
  certificates: string[]; // course IDs with certificates earned
}

export interface TimeGatingStatus {
  canEnroll: boolean;
  reason?: 'available' | 'time_locked' | 'prerequisites_missing' | 'already_enrolled';
  unlockDate?: Date;
  daysRemaining?: number;
  missingPrerequisites?: string[];
}

export interface LearningSession {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  completed: boolean;
}

// API Response Types
export interface CourseProgressResponse {
  success: boolean;
  data?: CourseProgress;
  error?: string;
}

export interface UserStatsResponse {
  success: boolean;
  data?: UserCourseStats;
  error?: string;
}

export interface TimeGatingResponse {
  success: boolean;
  data?: TimeGatingStatus;
  error?: string;
}

// Course Learning State
export interface CourseLearningState {
  currentCourse?: string;
  currentModule?: string;
  isPlaying: boolean;
  playbackSpeed: number;
  volume: number;
  lastPosition: number; // for video/audio content
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'course_completion' | 'streak' | 'subject_mastery' | 'time_milestone';
  requirement: number;
  unlockedAt?: Date;
}

export interface UserAchievements {
  userId: string;
  achievements: Achievement[];
  totalPoints: number;
  level: number;
  nextLevelPoints: number;
}

// Notification Types
export interface CourseNotification {
  id: string;
  userId: string;
  type: 'course_unlocked' | 'reminder' | 'achievement' | 'streak_broken';
  title: string;
  message: string;
  courseId?: string;
  isRead: boolean;
  createdAt: Date;
}

// Learning Analytics
export interface LearningAnalytics {
  userId: string;
  totalLearningTime: number; // in minutes
  averageSessionLength: number; // in minutes
  preferredLearningTimes: number[]; // hours of day (0-23)
  completionRate: number; // percentage
  subjectPreferences: {
    [subjectId: string]: {
      timeSpent: number;
      completionRate: number;
      averageRating: number;
    };
  };
  learningStreak: {
    current: number;
    longest: number;
    lastActivity: Date;
  };
}
