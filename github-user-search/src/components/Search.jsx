import { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [searchData, setSearchData] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);
    setPage(1);

    try {
      const data = await searchUsers(searchData, 1);
      setUsers(data.items || []);
      setHasMore(data.total_count > data.items?.length);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to search users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await searchUsers(searchData, nextPage);
      setUsers(prev => [...prev, ...(data.items || [])]);
      setPage(nextPage);
      setHasMore(data.total_count > users.length + data.items?.length);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to load more users.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        GitHub User Search
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={searchData.username}
              onChange={handleInputChange}
              placeholder="Enter username..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchData.location}
              onChange={handleInputChange}
              placeholder="Enter location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={searchData.minRepos}
              onChange={handleInputChange}
              placeholder="Min repos..."
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Programming Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={searchData.language}
              onChange={handleInputChange}
              placeholder="Enter language..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? 'Searching...' : 'Search Users'}
        </button>
      </form>

      {/* Loading State */}
      {loading && users.length === 0 && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Searching GitHub users...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Results */}
      {users.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Found {users.length} users
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {user.login}
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>ID: {user.id}</p>
                    <p className="truncate">Type: {user.type}</p>
                  </div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {users.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Search GitHub Users
          </h3>
          <p className="text-gray-500">
            Use the form above to search for GitHub users by username, location, repositories, or programming language.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;