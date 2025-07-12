// API Routes for Course Progress Tracking
// File: app/api/courses/progress/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { CourseProgress, ModuleProgress, SubjectUnlock, TimeGatingStatus, UserCourseStats } from '@/types/course-progress';

// Mock database - replace with actual database calls
let courseProgressDB: CourseProgress[] = [];
let moduleProgressDB: ModuleProgress[] = [];
let subjectUnlocksDB: SubjectUnlock[] = [];

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const courseId = searchParams.get('courseId');
  const action = searchParams.get('action');

  if (!userId) {
    return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
  }

  try {
    switch (action) {
      case 'stats':
        const stats = await getUserCourseStats(userId);
        return NextResponse.json({ success: true, data: stats });

      case 'time-gating':
        if (!courseId) {
          return NextResponse.json({ success: false, error: 'Course ID required for time-gating check' }, { status: 400 });
        }
        const timeGating = await checkTimeGating(userId, courseId);
        return NextResponse.json({ success: true, data: timeGating });

      case 'progress':
        if (courseId) {
          const progress = await getCourseProgress(userId, courseId);
          return NextResponse.json({ success: true, data: progress });
        } else {
          const allProgress = await getAllUserProgress(userId);
          return NextResponse.json({ success: true, data: allProgress });
        }

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Course progress API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, courseId, moduleId, data } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }

    switch (action) {
      case 'enroll':
        if (!courseId) {
          return NextResponse.json({ success: false, error: 'Course ID required' }, { status: 400 });
        }
        const enrollment = await enrollInCourse(userId, courseId);
        return NextResponse.json({ success: true, data: enrollment });

      case 'update-progress':
        if (!courseId) {
          return NextResponse.json({ success: false, error: 'Course ID required' }, { status: 400 });
        }
        const progress = await updateCourseProgress(userId, courseId, data);
        return NextResponse.json({ success: true, data: progress });

      case 'complete-module':
        if (!courseId || !moduleId) {
          return NextResponse.json({ success: false, error: 'Course ID and Module ID required' }, { status: 400 });
        }
        const moduleProgress = await completeModule(userId, courseId, moduleId, data?.timeSpent || 0);
        return NextResponse.json({ success: true, data: moduleProgress });

      case 'complete-course':
        if (!courseId) {
          return NextResponse.json({ success: false, error: 'Course ID required' }, { status: 400 });
        }
        const completion = await completeCourse(userId, courseId);
        return NextResponse.json({ success: true, data: completion });

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Course progress API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Helper Functions

async function getUserCourseStats(userId: string): Promise<UserCourseStats> {
  const userProgress = courseProgressDB.filter(p => p.userId === userId);
  const completedCourses = userProgress.filter(p => p.status === 'completed');
  const userModuleProgress = moduleProgressDB.filter(m => m.userId === userId);
  const totalTimeSpent = userModuleProgress.reduce((total, m) => total + m.timeSpent, 0);

  // Calculate subject progress
  const subjectProgress: { [key: string]: any } = {};
  const subjects = ['trading_psychology_fundamentals', 'risk_management_psychology', 'emotional_control_regulation', 'behavioral_patterns_habits', 'market_psychology_sentiment', 'advanced_trading_psychology'];
  
  for (const subject of subjects) {
    const subjectCourses = userProgress.filter(p => p.subject === subject);
    const completedInSubject = subjectCourses.filter(p => p.status === 'completed');
    const subjectUnlock = subjectUnlocksDB.find(s => s.userId === userId && s.subject === subject);
    
    subjectProgress[subject] = {
      coursesCompleted: completedInSubject.length,
      totalCourses: getCoursesCountBySubject(subject),
      nextUnlockDate: subjectUnlock?.nextUnlockDate,
      canEnrollNew: !subjectUnlock?.nextUnlockDate || new Date() >= subjectUnlock.nextUnlockDate
    };
  }

  return {
    totalCoursesCompleted: completedCourses.length,
    totalTimeSpent,
    subjectProgress,
    currentStreak: calculateCurrentStreak(userId),
    certificates: completedCourses.map(c => c.courseId)
  };
}

async function checkTimeGating(userId: string, courseId: string): Promise<TimeGatingStatus> {
  // Get course info (you'd import this from your course data)
  const course = getCourseById(courseId);
  if (!course) {
    return { canEnroll: false, reason: 'available' };
  }

  // Check if already enrolled
  const existingProgress = courseProgressDB.find(p => p.userId === userId && p.courseId === courseId);
  if (existingProgress) {
    return { canEnroll: false, reason: 'already_enrolled' };
  }

  // Check prerequisites
  if (course.prerequisites && course.prerequisites.length > 0) {
    const completedCourses = courseProgressDB
      .filter(p => p.userId === userId && p.status === 'completed')
      .map(p => p.courseId);
    
    const missingPrereqs = course.prerequisites.filter(prereq => !completedCourses.includes(prereq));
    if (missingPrereqs.length > 0) {
      return { 
        canEnroll: false, 
        reason: 'prerequisites_missing',
        missingPrerequisites: missingPrereqs
      };
    }
  }

  // Check time gating for subject
  const subjectUnlock = subjectUnlocksDB.find(s => s.userId === userId && s.subject === course.subject);
  if (subjectUnlock?.nextUnlockDate && new Date() < subjectUnlock.nextUnlockDate) {
    const daysRemaining = Math.ceil((subjectUnlock.nextUnlockDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));
    return {
      canEnroll: false,
      reason: 'time_locked',
      unlockDate: subjectUnlock.nextUnlockDate,
      daysRemaining
    };
  }

  return { canEnroll: true, reason: 'available' };
}

async function enrollInCourse(userId: string, courseId: string): Promise<CourseProgress> {
  const course = getCourseById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  const timeGating = await checkTimeGating(userId, courseId);
  if (!timeGating.canEnroll) {
    throw new Error(`Cannot enroll: ${timeGating.reason}`);
  }

  const progress: CourseProgress = {
    id: generateId(),
    userId,
    courseId,
    subject: course.subject,
    status: 'in_progress',
    progressPercentage: 0,
    startedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  courseProgressDB.push(progress);
  return progress;
}

async function updateCourseProgress(userId: string, courseId: string, data: Partial<CourseProgress>): Promise<CourseProgress> {
  const progressIndex = courseProgressDB.findIndex(p => p.userId === userId && p.courseId === courseId);
  if (progressIndex === -1) {
    throw new Error('Course progress not found');
  }

  courseProgressDB[progressIndex] = {
    ...courseProgressDB[progressIndex],
    ...data,
    updatedAt: new Date()
  };

  return courseProgressDB[progressIndex];
}

async function completeModule(userId: string, courseId: string, moduleId: string, timeSpent: number): Promise<ModuleProgress> {
  const existingProgress = moduleProgressDB.find(m => 
    m.userId === userId && m.courseId === courseId && m.moduleId === moduleId
  );

  if (existingProgress) {
    existingProgress.isCompleted = true;
    existingProgress.completedAt = new Date();
    existingProgress.timeSpent += timeSpent;
    return existingProgress;
  }

  const moduleProgress: ModuleProgress = {
    id: generateId(),
    userId,
    courseId,
    moduleId,
    isCompleted: true,
    completedAt: new Date(),
    timeSpent,
    createdAt: new Date()
  };

  moduleProgressDB.push(moduleProgress);

  // Update course progress percentage
  await updateCourseProgressPercentage(userId, courseId);

  return moduleProgress;
}

async function completeCourse(userId: string, courseId: string): Promise<CourseProgress> {
  const course = getCourseById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // Update course progress
  const progress = await updateCourseProgress(userId, courseId, {
    status: 'completed',
    progressPercentage: 100,
    completedAt: new Date()
  });

  // Update subject unlock timing
  await updateSubjectUnlock(userId, course.subject, courseId);

  return progress;
}

async function updateSubjectUnlock(userId: string, subject: string, completedCourseId: string): Promise<void> {
  const existingUnlock = subjectUnlocksDB.find(s => s.userId === userId && s.subject === subject);
  const nextUnlockDate = new Date(Date.now() + TWO_WEEKS_MS);

  if (existingUnlock) {
    existingUnlock.lastCompletedCourse = completedCourseId;
    existingUnlock.lastCompletionDate = new Date();
    existingUnlock.nextUnlockDate = nextUnlockDate;
    existingUnlock.coursesCompleted += 1;
    existingUnlock.updatedAt = new Date();
  } else {
    const newUnlock: SubjectUnlock = {
      id: generateId(),
      userId,
      subject,
      lastCompletedCourse: completedCourseId,
      lastCompletionDate: new Date(),
      nextUnlockDate,
      coursesCompleted: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    subjectUnlocksDB.push(newUnlock);
  }
}

async function updateCourseProgressPercentage(userId: string, courseId: string): Promise<void> {
  const course = getCourseById(courseId);
  if (!course) return;

  const completedModules = moduleProgressDB.filter(m => 
    m.userId === userId && m.courseId === courseId && m.isCompleted
  );

  const progressPercentage = Math.round((completedModules.length / course.modules.length) * 100);

  await updateCourseProgress(userId, courseId, { progressPercentage });

  // Auto-complete course if all modules are done
  if (progressPercentage === 100) {
    const progress = courseProgressDB.find(p => p.userId === userId && p.courseId === courseId);
    if (progress && progress.status !== 'completed') {
      await completeCourse(userId, courseId);
    }
  }
}

async function getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
  return courseProgressDB.find(p => p.userId === userId && p.courseId === courseId) || null;
}

async function getAllUserProgress(userId: string): Promise<CourseProgress[]> {
  return courseProgressDB.filter(p => p.userId === userId);
}

function calculateCurrentStreak(userId: string): number {
  // Simplified streak calculation - you'd implement based on daily activity
  const userProgress = moduleProgressDB.filter(m => m.userId === userId && m.isCompleted);
  if (userProgress.length === 0) return 0;

  // Group by date and calculate consecutive days
  const completionDates = userProgress
    .map(m => m.completedAt?.toDateString())
    .filter((date, index, arr) => arr.indexOf(date) === index)
    .sort();

  let streak = 1;
  for (let i = completionDates.length - 2; i >= 0; i--) {
    const current = new Date(completionDates[i + 1]);
    const previous = new Date(completionDates[i]);
    const diffDays = (current.getTime() - previous.getTime()) / (24 * 60 * 60 * 1000);
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Helper functions (you'd import these from your course data)
function getCourseById(courseId: string) {
  // Import and use your course data
  return null; // Placeholder
}

function getCoursesCountBySubject(subject: string): number {
  // Return count of courses in subject
  return 4; // Placeholder
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
