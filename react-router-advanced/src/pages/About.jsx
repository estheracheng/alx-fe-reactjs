import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>About This Demo</h1>
        <p>Advanced React Router features demonstration</p>
      </div>
      
      <div className="content-section">
        <h2>Features Implemented</h2>
        <ul className="features-list">
          <li>✅ Nested Routing for profile sections</li>
          <li>✅ Dynamic Routing for blog posts and user profiles</li>
          <li>✅ Protected Routes with authentication</li>
          <li>✅ Programmatic Navigation</li>
          <li>✅ Route Parameters and Query Strings</li>
          <li>✅ 404 Not Found Page</li>
          <li>✅ Redirects and Navigation Guards</li>
        </ul>
        
        <h2>Authentication</h2>
        <p>
          Use the following credentials to test protected routes:
        </p>
        <div className="auth-demo">
          <p><strong>Email:</strong> user@example.com</p>
          <p><strong>Password:</strong> password</p>
        </div>
      </div>
    </div>
  );
};

export default About;