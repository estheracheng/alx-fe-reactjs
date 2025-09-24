import axios from 'axios';

const GITHUB_API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';

// Existing function for single user search
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// New function for advanced user search
export const searchUsers = async (searchData, page = 1, perPage = 30) => {
  try {
    const query = buildSearchQuery(searchData);
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
      params: {
        page: page,
        per_page: perPage,
        sort: 'repositories',
        order: 'desc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

// Helper function to build the search query
const buildSearchQuery = (searchData) => {
  let queryParts = [];

  if (searchData.username) {
    queryParts.push(`${searchData.username} in:login`);
  }

  if (searchData.location) {
    queryParts.push(`location:${searchData.location}`);
  }

  if (searchData.minRepos) {
    queryParts.push(`repos:>${searchData.minRepos}`);
  }

  if (searchData.language) {
    queryParts.push(`language:${searchData.language}`);
  }

  // If no criteria specified, return all users
  if (queryParts.length === 0) {
    return 'type:user';
  }

  return queryParts.join(' ');
};