import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InstagramHeader from '../components/InstagramHeader';
import InstagramGrid from '../components/InstagramGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { instagramService } from '../services/instagramService';
import '../styles/InstagramFeed.css';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInstagramPosts();
  }, []);

  const loadInstagramPosts = async () => {
    try {
      setLoading(true);
      const data = await instagramService.getInstagramPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading Instagram posts:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="instagram-feed-page">
        <div className="content-container">
          <InstagramHeader />
          
          {loading && <LoadingSpinner message="Loading Instagram Feed..." />}
          
          {error && <ErrorMessage error={error} onRetry={loadInstagramPosts} />}
          
          {!loading && !error && <InstagramGrid posts={posts} />}
        </div>
      </div>
    </>
  );
};

export default InstagramFeed;
