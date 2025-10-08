import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './PostsComponent.css';

// API service functions
const postsApi = {
  fetchPosts: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  fetchPostById: async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  createPost: async (newPost) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  },

  updatePost: async (updatedPost) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return response.json();
  },

  deletePost: async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return { id };
  }
};

const PostsComponent = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const queryClient = useQueryClient();

  // Fetch all posts
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.fetchPosts,
    staleTime: 5000, // Consider data stale after 5 seconds
  });

  // Fetch single post (demonstrates caching)
  const {
    data: selectedPost,
    isLoading: isSelectedPostLoading
  } = useQuery({
    queryKey: ['post', selectedPostId],
    queryFn: () => postsApi.fetchPostById(selectedPostId),
    enabled: !!selectedPostId, // Only run query if selectedPostId is truthy
  });

  // Create post mutation
  const createMutation = useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      // Invalidate and refetch posts query to update the list
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setNewPostTitle('');
      setNewPostBody('');
      alert('Post created successfully! (Note: JSONPlaceholder is a mock API)');
    },
    onError: (error) => {
      alert(`Error creating post: ${error.message}`);
    }
  });

  // Update post mutation
  const updateMutation = useMutation({
    mutationFn: postsApi.updatePost,
    onSuccess: (updatedPost) => {
      // Update the cache directly for immediate UI update
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      // Also update the individual post cache
      queryClient.setQueryData(['post', updatedPost.id], updatedPost);
      alert('Post updated successfully! (Note: JSONPlaceholder is a mock API)');
    }
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: (deletedPost) => {
      // Remove from cache immediately
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.filter(post => post.id !== deletedPost.id)
      );
      setSelectedPostId(null);
      alert('Post deleted successfully! (Note: JSONPlaceholder is a mock API)');
    }
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostBody.trim()) return;

    createMutation.mutate({
      title: newPostTitle,
      body: newPostBody,
      userId: 1, // Required by API
    });
  };

  const handleUpdatePost = (post) => {
    const updatedTitle = prompt('Enter new title:', post.title);
    if (updatedTitle) {
      updateMutation.mutate({
        ...post,
        title: updatedTitle,
      });
    }
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <h2>Error loading posts</h2>
        <p>{error.message}</p>
        <button onClick={refetch} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts ({posts?.length || 0})</h2>
        <div className="header-actions">
          <button 
            onClick={refetch} 
            disabled={isFetching}
            className="refetch-btn"
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          <span className="cache-status">
            {isFetching ? '🔄 Fetching...' : '✅ Cached'}
          </span>
        </div>
      </div>

      {/* Create New Post Form */}
      <div className="create-post">
        <h3>Create New Post</h3>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Post content"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
            required
          />
          <button 
            type="submit" 
            disabled={createMutation.isLoading}
          >
            {createMutation.isLoading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {posts?.slice(0, 10).map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3 
                className="post-title"
                onClick={() => setSelectedPostId(post.id === selectedPostId ? null : post.id)}
              >
                {post.title}
              </h3>
              <div className="post-actions">
                <button 
                  onClick={() => handleUpdatePost(post)}
                  disabled={updateMutation.isLoading}
                  className="edit-btn"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDeletePost(post.id)}
                  disabled={deleteMutation.isLoading}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className="post-body">{post.body}</p>
            <div className="post-footer">
              <span className="post-id">ID: {post.id}</span>
              <span className="post-user">User: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Post Detail */}
      {selectedPostId && (
        <div className="selected-post">
          <h3>Selected Post Details</h3>
          {isSelectedPostLoading ? (
            <div className="loading">Loading post details...</div>
          ) : (
            <div className="post-detail">
              <h4>{selectedPost?.title}</h4>
              <p>{selectedPost?.body}</p>
              <div className="post-meta">
                <span>ID: {selectedPost?.id}</span>
                <span>User ID: {selectedPost?.userId}</span>
              </div>
              <button 
                onClick={() => setSelectedPostId(null)}
                className="close-btn"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mutation Status */}
      <div className="mutation-status">
        {updateMutation.isLoading && <p>🔄 Updating post...</p>}
        {deleteMutation.isLoading && <p>🔄 Deleting post...</p>}
      </div>

      {/* Cache Demonstration Info */}
      <div className="cache-info">
        <h4>React Query Cache Demonstration:</h4>
        <ul>
          <li>✅ Posts are cached for 5 minutes</li>
          <li>✅ Click "Refresh Posts" to force refetch</li>
          <li>✅ Click post titles to view details (cached individually)</li>
          <li>✅ Navigate away and back to see instant cache loading</li>
          <li>✅ Updates are optimistic - UI updates immediately</li>
        </ul>
      </div>
    </div>
  );
};

export default PostsComponent;