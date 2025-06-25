'use client';

import { useState } from 'react';

export default function AnalyzePage() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Analyze Trading Screenshot</h1>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {result && (
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm">
          {result}
        </pre>
      )}
    </main>
  );
}
