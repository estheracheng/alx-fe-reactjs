import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Pages.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="not-found">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          
          <div className="not-found-actions">
            <button onClick={() => navigate(-1)} className="btn btn-outline">
              Go Back
            </button>
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;