export default function CoursePage({ params }: { params: { courseId: string } }) {
  return (
    <div className="p-8">
      <h1>Course ID: {params.courseId}</h1>
      <p>Route is working!</p>
    </div>
  );
}
