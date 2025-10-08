import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Home = () => {
  return (
    <div className="page">
      <div className="hero-section">
        <h1>Welcome to React Router Advanced</h1>
        <p>Explore advanced routing features including nested routes, protected routes, and dynamic routing.</p>
        <div className="hero-actions">
          <Link to="/blog" className="btn btn-primary">Explore Blog</Link>
          <Link to="/about" className="btn btn-secondary">Learn More</Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>Nested Routes</h3>
          <p>Profile section with nested routes for details and settings</p>
          <Link to="/profile" className="btn btn-outline">Try Profile</Link>
        </div>
        
        <div className="feature-card">
          <h3>Dynamic Routing</h3>
          <p>Blog posts and user profiles with dynamic URL parameters</p>
          <Link to="/blog" className="btn btn-outline">View Blog</Link>
        </div>
        
        <div className="feature-card">
          <h3>Protected Routes</h3>
          <p>Authentication-required routes with redirects</p>
          <Link to="/dashboard" className="btn btn-outline">Access Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;