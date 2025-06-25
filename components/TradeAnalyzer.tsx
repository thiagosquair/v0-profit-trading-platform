'use client';

import { useState } from 'react';

export default function TradeAnalyzer() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      setImagePreview(reader.result as string);
      setLoading(true);
      setAnalysis(null);

      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Image: base64Data }),
        });

        const data = await res.json();
        if (data.success) {
          setAnalysis(data.result);
        } else {
          setAnalysis(`Error: ${data.error}`);
        }
      } catch (err) {
        setAnalysis('Unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Trade Screenshot Analyzer</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
      />

      {imagePreview && (
        <div>
          <p className="text-sm mt-2 mb-1 text-gray-600">Preview:</p>
          <img src={imagePreview} alt="Uploaded chart" className="rounded border" />
        </div>
      )}

      {loading && <p>Analyzing trade...</p>}

      {analysis && (
        <div className="bg-gray-100 p-3 rounded">
          <h3 className="font-bold mb-2">AI Feedback:</h3>
          <pre className="whitespace-pre-wrap">{analysis}</pre>
        </div>
      )}
    </div>
  );
}
