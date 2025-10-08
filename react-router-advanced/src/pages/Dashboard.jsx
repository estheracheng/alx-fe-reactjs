import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Pages.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to your personal dashboard, {user?.name}!</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Profile Completion</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
          <p>75% complete</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>Logged in just now</li>
            <li>Updated profile yesterday</li>
            <li>Created account last week</li>
          </ul>
        </div>
        
        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="btn btn-outline">Edit Profile</button>
            <button className="btn btn-outline">View Settings</button>
            <button className="btn btn-outline">See Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;