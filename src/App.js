import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AnalysisPage from './components/AnalysisPage';
import ContactUs from './components/ContactUs';
import Navbar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/analyze" element={<AnalysisPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

