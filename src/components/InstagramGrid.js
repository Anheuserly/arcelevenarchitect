import React from 'react';
import InstagramPost from './InstagramPost';

const InstagramGrid = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <p>No Instagram posts found. Add some posts to your Appwrite database.</p>
      </div>
    );
  }

  return (
    <div className="instagram-grid">
      {posts.map((post) => (
        <InstagramPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default InstagramGrid;
