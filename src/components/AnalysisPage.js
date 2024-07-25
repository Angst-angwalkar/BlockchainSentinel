import React, { useState } from 'react';
import axios from 'axios';
import './AnalysisPage.css';

const AnalysisPage = () => {
  const [selectedTool, setSelectedTool] = useState('');
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [pragmaError, setPragmaError] = useState(false);
  const [apiError, setApiError] = useState(''); // State for API error messages

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const getApiEndpoint = () => {
    switch (selectedTool) {
      case 'Mythril':
        return "https://analyzer-service-latest.onrender.com/openai/inspect/myth/analyze";
      case 'Slither':
        return "https://analyzer-service-latest.onrender.com/openai/inspect/slither/analyze";
      case 'ChatGPT':
        return "https://analyzer-service-latest.onrender.com/openai/inspect/gpt/analyze";
      default:
        return '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedTool) {
      setError(true);
      return;
    }

    if (!code.trim()) { 
      setCodeError(true);
      return;
    }

    let lines = code.split("\n");
    let pragmaFound = false;

    lines.forEach((line) => {
      if (line.startsWith("pragma")) {
        pragmaFound = true;
      }
    });

    if (!pragmaFound) {
      setPragmaError(true);
      return;
    }

    setLoading(true);
    const endpoint = getApiEndpoint();
    const wrappedCode = `"${code}"`;
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
      const errorMsg = error.response ? error.response.data.errorMsg : 'An unexpected error occurred.';
      setApiError(errorMsg);
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
            <button onClick={() => setError(false)} className="close-button">Close</button>
          </div>
        </div>
      )}
      {codeError && (
        <div className="error-modal">
          <div className="error-content">
            <p>Please add your Solidity code to be analyzed!</p>
            <button onClick={() => setCodeError(false)} className="close-button">Close</button>
          </div>
        </div>
      )}
      {pragmaError && (
        <div className="error-modal">
          <div className="error-content">
            <p>The code block you've added is invalid!</p>
            <p>Please add valid Solidity code and try again.</p>
            <button onClick={() => setPragmaError(false)} className="close-button">Close</button>
          </div>
        </div>
      )}
      {apiError && (
        <div className="error-modal">
          <div className="error-content">
            <p>{apiError}</p>
            <button onClick={() => setApiError('')} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
