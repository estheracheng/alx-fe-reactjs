import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Pages.css';

const Profile = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>User Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>
      
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="user-info">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>
          
          <nav className="profile-nav">
            <NavLink 
              to="/profile" 
              end
              className={({ isActive }) => 
                `profile-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Profile Details
            </NavLink>
            <NavLink 
              to="/profile/settings" 
              className={({ isActive }) => 
                `profile-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Settings
            </NavLink>
          </nav>
        </aside>
        
        <main className="profile-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;