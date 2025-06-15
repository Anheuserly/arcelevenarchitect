import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const InstagramPost = ({ post, onClick, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getMediaUrl = () => {
    return post.thumbnailUrl || post.mediaUrl;
  };

  const formatCaption = (caption) => {
    if (!caption) return '';
    return caption.length > 100 ? caption.substring(0, 100) + '...' : caption;
  };

  const getPostIcon = () => {
    switch (post.type) {
      case 'video':
        return '▶️';
      case 'carousel_album':
        return '📷';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`instagram-post ${imageLoaded ? 'loaded' : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="post-media">
        {!imageError ? (
          <img
            src={getMediaUrl()}
            alt={formatCaption(post.caption)}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="image-error">
            <span>Failed to load image</span>
          </div>
        )}
        
        <div className="post-overlay">
          <div className="post-stats">
            <span className="likes">❤️ {post.likes}</span>
            <span className="comments">💬 {post.comments}</span>
          </div>
          <div className="post-type">{getPostIcon()}</div>
        </div>
      </div>
      
      <div className="post-info">
        <p className="post-caption">{formatCaption(post.caption)}</p>
        <span className="post-time">
          {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default InstagramPost;
