import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './Pages.css';

// Mock blog posts data
const blogPosts = {
  1: {
    id: 1,
    title: 'Getting Started with React Router',
    content: 'This is the full content of the blog post about React Router basics...',
    date: '2024-01-15',
    author: 'John Doe',
    category: 'React'
  },
  2: {
    id: 2,
    title: 'Advanced Routing Patterns',
    content: 'Deep dive into advanced routing patterns and best practices...',
    date: '2024-01-20',
    author: 'Jane Smith',
    category: 'React'
  },
  3: {
    id: 3,
    title: 'Authentication in React Apps',
    content: 'Learn how to implement secure authentication in React applications...',
    date: '2024-01-25',
    author: 'Mike Johnson',
    category: 'Security'
  }
};

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogPosts[postId];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="page">
      <div className="blog-post">
        <Link to="/blog" className="back-link">← Back to Blog</Link>
        
        <article>
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span>By {post.author}</span>
              <span>{post.date}</span>
              <span className="category">{post.category}</span>
            </div>
          </header>
          
          <div className="post-content">
            <p>{post.content}</p>
            <p>This is a demonstration of dynamic routing in React Router. 
               The post ID {postId} is extracted from the URL parameters and 
               used to display the appropriate content.</p>
          </div>
        </article>
        
        <div className="post-navigation">
          {postId > 1 && (
            <Link to={`/blog/${parseInt(postId) - 1}`} className="btn btn-outline">
              Previous Post
            </Link>
          )}
          {postId < 3 && (
            <Link to={`/blog/${parseInt(postId) + 1}`} className="btn btn-primary">
              Next Post
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;