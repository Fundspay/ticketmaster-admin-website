// src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <nav>
        <Link to="/add-event">Go to Add Event</Link>
        <br /><br />
        <button onClick={onLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Dashboard;
