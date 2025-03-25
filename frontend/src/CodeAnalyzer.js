import React, { useState } from 'react';
import axios from 'axios';

function CodeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to analyze');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/analyze-code', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAnalysisResult(response.data);
      setError(null);
    } catch (error) {
      console.error('Error analyzing code:', error);
      setError('Failed to analyze code. Please try again.');
    }
  };

  return (
    <div className="code-analyzer">
      <h2>Upload Your Code for Analysis</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".py,.js,.jsx" 
          onChange={handleFileChange} 
        />
        <button type="submit">Analyze Code</button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Results</h3>
          <p>Overall Score: {analysisResult.overall_score}</p>
          
          <h4>Category Breakdown</h4>
          <ul>
            {Object.entries(analysisResult.breakdown).map(([category, score]) => (
              <li key={category}>
                {category}: {score}
              </li>
            ))}
          </ul>

          <h4>Recommendations</h4>
          <ul>
            {analysisResult.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CodeAnalyzer;