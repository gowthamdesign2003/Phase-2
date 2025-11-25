import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome Back!</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Jobs Applied</h3>
          <p>5</p>
        </div>
        <div className="dashboard-card">
          <h3>Jobs Posted</h3>
          <p>3</p>
        </div>
        <div className="dashboard-card">
          <h3>Saved Jobs</h3>
          <p>7</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
