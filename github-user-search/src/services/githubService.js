// src/services/githubService.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com/users/';

export const fetchUserData = async (username) => {
  const response = await axios.get(`${BASE_URL}${username}`);
  return response.data;
};
