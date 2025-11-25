import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px' }}>
      <h2 style={{ display: 'inline' }}>JobPortal</h2>
      <ul style={{ listStyle: 'none', display: 'inline', marginLeft: '20px' }}>
        <li style={{ display: 'inline', marginRight: '15px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '15px' }}>
          <Link to="/jobs" style={{ color: 'white', textDecoration: 'none' }}>Jobs</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '15px' }}>
          <Link to="/post-job" style={{ color: 'white', textDecoration: 'none' }}>Post Job</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '15px' }}>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '15px' }}>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
