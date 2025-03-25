import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const submitFile = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/analyze-code', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Server Response:', response.data);  // Log the response to inspect its structure
      

      setAnalysisResult(response.data || {});
      setError(null);
    } catch (err) {
      setError('Error analyzing code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Carbon Crunch Code Analyzer</h1>

        <div className="mb-4">
          <input
            type="file"
            accept=".py,.js,.jsx"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={submitFile}
          disabled={!file || loading}
          className={`w-full p-2 rounded ${
            file && !loading
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        {analysisResult && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-lg mb-2">
                <strong>Overall Score:</strong>
                <span
                  className={`ml-2 ${
                    (analysisResult?.overall_score ?? 0) >= 80
                      ? 'text-green-600'
                      : (analysisResult?.overall_score ?? 0) >= 50
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {analysisResult?.overall_score ?? 'N/A'}
                </span>
              </p>

              {/* Safety check for breakdown */}
              <div className="mb-4">
                <h3 className="font-bold mb-2">Category Breakdown:</h3>
                {analysisResult?.breakdown ? (
                  Object.entries(analysisResult.breakdown).map(([category, score]) => (
                    <div key={category} className="flex justify-between border-b py-1 last:border-b-0">
                      <span className="capitalize">{category}</span>
                      <span>{score}</span>
                    </div>
                  ))
                ) : (
                  <p>No breakdown data available</p>
                )}
              </div>

              {/* Safety check for recommendations */}
              {analysisResult?.recommendations?.length > 0 ? (
                <div>
                  <h3 className="font-bold mb-2">Recommendations:</h3>
                  <ul className="list-disc list-inside text-sm">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="mb-1">{rec}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No recommendations available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
