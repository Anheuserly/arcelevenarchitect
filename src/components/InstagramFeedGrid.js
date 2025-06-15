import React, { useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import InstagramPost from './InstagramPost';
import InstagramModal from './InstagramModal';

const InstagramFeedGrid = ({ data, filter, sortBy }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Load more posts when scrolling
  React.useEffect(() => {
    if (inView && visibleCount < filteredAndSortedData.length) {
      setVisibleCount(prev => Math.min(prev + 12, filteredAndSortedData.length));
    }
  }, [inView]);

  const filteredAndSortedData = useMemo(() => {
    if (!data) return [];

    // Filter data
    let filtered = data;
    switch (filter) {
      case 'images':
        filtered = data.filter(item => item.type === 'image');
        break;
      case 'videos':
        filtered = data.filter(item => item.type === 'video');
        break;
      case 'reels':
        filtered = data.filter(item => item.type === 'video' && item.caption.includes('#reels'));
        break;
      case 'carousel':
        filtered = data.filter(item => item.type === 'carousel_album');
        break;
      default:
        filtered = data;
    }

    // Sort data
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case 'popular':
        return filtered.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
      case 'likes':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'comments':
        return filtered.sort((a, b) => b.comments - a.comments);
      default:
        return filtered;
    }
  }, [data, filter, sortBy]);

  const visibleData = filteredAndSortedData.slice(0, visibleCount);

  return (
    <div className="instagram-feed-grid">
      <div className="grid-container">
        {visibleData.map((post, index) => (
          <InstagramPost
            key={post.id}
            post={post}
            onClick={() => setSelectedPost(post)}
            index={index}
          />
        ))}
      </div>
      
      {visibleCount < filteredAndSortedData.length && (
        <div ref={ref} className="loading-trigger">
          <div className="loading-more">Loading more posts...</div>
        </div>
      )}

      {selectedPost && (
        <InstagramModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default InstagramFeedGrid;
