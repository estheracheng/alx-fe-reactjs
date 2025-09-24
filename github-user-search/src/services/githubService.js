import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/users';

export const searchUsers = async (searchData, page = 1) => {
  const { username, location, minRepos, language } = searchData;

  // Build query string
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>${minRepos}`;
  if (language) query += ` language:${language}`;

  if (!query) {
    query = 'a'; // fallback to prevent empty search
  }

  const params = {
    q: query.trim(),
    page,
    per_page: 9,
  };

  const response = await axios.get(GITHUB_API_URL, { params });
  return response.data;
};
