import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Blockchain sentinental.png';  // Adjust path as needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Blockchain Sentinel" className="logo" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/analyze">Analyze</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
