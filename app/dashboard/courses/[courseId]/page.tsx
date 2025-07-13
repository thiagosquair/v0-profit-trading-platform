export default function CoursePage({ params }: { params: { courseId: string } }) {
  console.log("📘 Course route params:", params);
  console.log("📘 Course ID received:", params?.courseId);

  const { courseId } = params;

  // Add error handling for missing courseId
  if (!courseId) {
    console.error("❌ No courseId provided");
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">Error: Invalid course ID</h1>
        <p>No course ID was provided in the URL parameters.</p>
        <pre>Params: {JSON.stringify(params, null, 2)}</pre>
      </div>
    );
  }

  // Log successful route resolution
  console.log("✅ Course route successfully loaded for:", courseId);

  return (
    <div className="p-6 space-y-4">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <h1 className="text-2xl font-bold">✅ Route is working!</h1>
        <p className="text-lg">Course ID: <strong>{courseId}</strong></p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded">
        <h2 className="font-semibold mb-2">Debug Information:</h2>
        <ul className="space-y-1 text-sm">
          <li>• Route: /dashboard/courses/[courseId]</li>
          <li>• Current courseId: {courseId}</li>
          <li>• Params object: {JSON.stringify(params, null, 2)}</li>
          <li>• Timestamp: {new Date().toISOString()}</li>
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded">
        <h2 className="font-semibold mb-2">Next Steps:</h2>
        <p className="text-sm text-gray-600">
          If you can see this page, the dynamic routing is working correctly. 
          The issue was likely with the previous route implementation.
        </p>
      </div>
    </div>
  );
}
