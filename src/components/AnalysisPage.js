import React, { useState } from 'react';
import axios from 'axios';
import './AnalysisPage.css';

const AnalysisPage = () => {
  const [selectedTool, setSelectedTool] = useState('');
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getApiEndpoint = () => {
    switch (selectedTool) {
      case 'Mythril':
        return 'https://analyzer-service-latest.onrender.com/openai/inspect/myth/analyze';
      case 'Slither':
        return 'https://analyzer-service-latest.onrender.com/openai/inspect/slither/analyze';
      case 'ChatGPT':
        return 'https://analyzer-service-latest.onrender.com/openai/inspect/gpt/analyze';
      default:
        return '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedTool) {
      setError(true);
      return;
    }

    setLoading(true);
    const endpoint = getApiEndpoint();
    const wrappedCode = `"\n${code}\n"`; // Wrap the code in double apostrophes
    const config = {
      method: 'post',
      url: endpoint,
      headers: { 'Content-Type': 'text/plain' },
      data: wrappedCode,
    };

    try {
      const result = await axios(config);
      setResponse(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeselect = () => {
    setSelectedTool('');
  };

  return (
    <div className="analysis-container">
      <h2>Select a Tool for Smart Contract Analysis</h2>
      <div className="radio-buttons">
        <label>
          <input type="radio" value="Mythril" checked={selectedTool === 'Mythril'} onChange={() => setSelectedTool('Mythril')} />
          Mythril
        </label>
        <label>
          <input type="radio" value="Slither" checked={selectedTool === 'Slither'} onChange={() => setSelectedTool('Slither')} />
          Slither
        </label>
        <label>
          <input type="radio" value="ChatGPT" checked={selectedTool === 'ChatGPT'} onChange={() => setSelectedTool('ChatGPT')} />
          ChatGPT
        </label>
      </div>
      <textarea
        className="code-input"
        placeholder="Enter your smart contract code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <div className="button-group">
        <button onClick={handleSubmit} className="submit-button">Analyze</button>
        {selectedTool && (
          <button onClick={handleDeselect} className="deselect-button">Deselect Tool</button>
        )}
      </div>
      {loading && <div className="loader"></div>}
      {response && (
        <textarea
          className="response-output"
          placeholder="Analysis result will be displayed here..."
          value={response}
          readOnly
        ></textarea>
      )}
      {error && (
        <div className="error-modal">
          <div className="error-content">
            <p>Please select the tool you want to use before proceeding to analyze</p>
            <button onClick={() => setError(false)} className="close-button">Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
