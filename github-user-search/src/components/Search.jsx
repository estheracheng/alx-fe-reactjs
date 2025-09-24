import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users';

export const searchUsers = async (searchData, page = 1) => {
  const { username, location, minRepos, language } = searchData;

  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>${minRepos}`;
  if (language) query += ` language:${language}`;

  if (!query) query = 'a'; // fallback to show results even if empty

  const params = {
    q: query.trim(),
    page,
    per_page: 9,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};
