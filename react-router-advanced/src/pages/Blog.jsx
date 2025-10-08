import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn the basics of routing in React applications',
    date: '2024-01-15',
    author: 'John Doe'
  },
  {
    id: 2,
    title: 'Advanced Routing Patterns',
    excerpt: 'Explore nested routes, protected routes, and more',
    date: '2024-01-20',
    author: 'Jane Smith'
  },
  {
    id: 3,
    title: 'Authentication in React Apps',
    excerpt: 'Implement secure authentication flows',
    date: '2024-01-25',
    author: 'Mike Johnson'
  }
];

const Blog = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Blog Posts</h1>
        <p>Explore our latest articles and tutorials</p>
      </div>
      
      <div className="blog-posts">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-post-card">
            <h3>{post.title}</h3>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
            <Link to={`/blog/${post.id}`} className="btn btn-outline">
              Read More
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;