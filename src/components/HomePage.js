import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container-wrapper">
      <div className="home-container">
        <h1>Welcome To Blockchain Sentinentel</h1>
        <h2>Our Smart Contract Vulnerability Analysis Platform</h2>
        <p>Key Features:</p>
        <p>ChatGPT Integration: Instant coding assistance and debugging help from OpenAI's ChatGPT.</p>
        <p>Mythril: Detect vulnerabilities in your Ethereum smart contracts.</p>
        <p>Slither: Analyze and optimize your Solidity code for better security and performance.</p>
        <p>Click on the button below to get started!</p>
        <Link to="/analyze" className="start-button">Get Started</Link>
      </div>
    </div>
  );
};

export default HomePage;
