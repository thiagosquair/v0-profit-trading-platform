// Super Simple Test - app/dashboard/courses/[courseId]/page.tsx
'use client';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Course Route Works!</h1>
        <p className="text-xl mb-4">Course ID: <strong>{params.courseId}</strong></p>
        <p className="text-gray-600 mb-8">
          If you can see this page, the route is working correctly!
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Success!</h2>
          <p className="text-green-700">
            The dynamic route <code>/dashboard/courses/[courseId]</code> is functioning properly.
          </p>
        </div>
        
        <button 
          onClick={() => window.location.href = '/dashboard/courses'}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Back to Courses
        </button>
      </div>
    </div>
  );
}
