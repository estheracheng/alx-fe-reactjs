import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Pages.css';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      
      <div className="details-grid">
        <div className="detail-item">
          <label>Full Name</label>
          <p>{user?.name}</p>
        </div>
        
        <div className="detail-item">
          <label>Email Address</label>
          <p>{user?.email}</p>
        </div>
        
        <div className="detail-item">
          <label>User ID</label>
          <p>{user?.id}</p>
        </div>
        
        <div className="detail-item">
          <label>Role</label>
          <p>{user?.role}</p>
        </div>
        
        <div className="detail-item">
          <label>Member Since</label>
          <p>January 2024</p>
        </div>
        
        <div className="detail-item">
          <label>Last Login</label>
          <p>Just now</p>
        </div>
      </div>
      
      <div className="profile-actions">
        <button className="btn btn-outline">Edit Profile</button>
        <button className="btn btn-primary">Update Password</button>
      </div>
    </div>
  );
};

export default ProfileDetails;