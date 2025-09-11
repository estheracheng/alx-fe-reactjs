import React, { useContext } from 'react';
import UserContext from './UserContext'; // Import the context

const UserProfile = () => {
  // Consume the context using useContext hook
  const user = useContext(UserContext);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default UserProfile;