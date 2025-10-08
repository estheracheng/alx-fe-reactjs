import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './Pages.css';

// Mock users data
const users = {
  1: { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joinDate: '2023-01-15' },
  2: { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joinDate: '2023-02-20' },
  3: { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', joinDate: '2023-03-10' },
  4: { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', joinDate: '2023-04-05' }
};

const UserProfile = () => {
  const { userId } = useParams();
  const user = users[userId];

  if (!user) {
    return <Navigate to="/users" replace />;
  }

  return (
    <div className="page">
      <div className="user-profile">
        <Link to="/users" className="back-link">← Back to Users</Link>
        
        <div className="profile-header">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span className={`user-role ${user.role.toLowerCase()}`}>
              {user.role}
            </span>
          </div>
        </div>
        
        <div className="profile-details">
          <div className="detail-section">
            <h3>User Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>User ID</label>
                <p>{user.id}</p>
              </div>
              <div className="detail-item">
                <label>Join Date</label>
                <p>{user.joinDate}</p>
              </div>
              <div className="detail-item">
                <label>Status</label>
                <p className="status-active">Active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn btn-outline">Send Message</button>
          <button className="btn btn-primary">Follow User</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;