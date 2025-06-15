import React from 'react';

const InstagramPost = ({ post }) => {
  const getPostIcon = (type) => {
    switch (type) {
      case 'reel': return '🎥';
      case 'video': return '📹';
      case 'carousel': return '🖼️';
      default: return '📷';
    }
  };

  const getEmbedUrl = (instagramLink) => {
    // Extract post ID from Instagram URL
    const match = instagramLink.match(/\/(p|reel)\/([A-Za-z0-9_-]+)/);
    if (match) {
      const postId = match[2];
      return `https://www.instagram.com/p/${postId}/embed/`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(post.instagramLink);

  return (
    <div className="instagram-post">
      <div className="post-type">
        <span className={`type-badge ${post.type}`}>
          {getPostIcon(post.type)} {post.type}
        </span>
      </div>

      {/* Instagram Embed */}
      {embedUrl && (
        <div className="post-embed">
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            allow="encrypted-media"
            title={`Instagram ${post.type}`}
          />
        </div>
      )}

      <div className="post-content">
        <p className="post-caption">{post.caption}</p>
      </div>

      <div className="post-footer">
        <a 
          href={post.instagramLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-on-instagram"
        >
          View on Instagram →
        </a>
        <span className="post-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default InstagramPost;
