import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

// Mock users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User' }
];

const Users = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Users</h1>
        <p>Browse our community members</p>
      </div>
      
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span className={`user-role ${user.role.toLowerCase()}`}>
              {user.role}
            </span>
            <Link to={`/users/${user.id}`} className="btn btn-outline">
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;