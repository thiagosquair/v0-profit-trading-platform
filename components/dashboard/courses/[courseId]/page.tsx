'use client';

import { CourseViewer } from '@/components/courses/course-viewer';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const handleBack = () => {
    window.location.href = '/dashboard/psychology-courses';
  };

  return (
    <div className="container mx-auto py-6">
      <CourseViewer 
        courseId={params.courseId} 
        onBack={handleBack}
      />
    </div>
  );
}
