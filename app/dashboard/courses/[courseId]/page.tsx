'use client';

export default function CoursePage({ params }: { params: { courseId: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Course: {params.courseId}</h1>
      <p>This is working!</p>
    </div>
  );
}
