import React from 'react';
import Modal from 'react-modal';
import { formatDistanceToNow } from 'date-fns';

const InstagramModal = ({ post, onClose }) => {
  const renderMedia = () => {
    if (post.type === 'video') {
      return (
        <video 
          controls 
          autoPlay 
          muted
          className="modal-media"
          poster={post.thumbnailUrl}
        >
          <source src={post.mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (post.type === 'carousel_album') {
      return (
        <div className="carousel-container">
          {post.children.map((child, index) => (
            <div key={index} className="carousel-item">
              {child.media_type === 'VIDEO' ? (
                <video controls className="modal-media">
                  <source src={child.media_url} type="video/mp4" />
                </video>
              ) : (
                <img src={child.media_url} alt={`Slide ${index + 1}`} className="modal-media" />
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return <img src={post.mediaUrl} alt="Instagram post" className="modal-media" />;
    }
  };

  const renderHashtags = () => {
    return post.hashtags.map((tag, index) => (
      <span key={index} className="hashtag">{tag}</span>
    ));
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="instagram-modal"
      overlayClassName="instagram-modal-overlay"
      ariaHideApp={false}
    >
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-media-container">
          {renderMedia()}
        </div>
        
        <div className="modal-details">
          <div className="post-stats-detailed">
            <span className="stat">❤️ {post.likes} likes</span>
            <span className="stat">💬 {post.comments} comments</span>
            <span className="stat">📅 {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
          </div>
          
          {post.caption && (
            <div className="post-caption-full">
              <p>{post.caption}</p>
            </div>
          )}
          
          {post.hashtags.length > 0 && (
            <div className="hashtags-container">
              {renderHashtags()}
            </div>
          )}
          
          <a 
            href={post.permalink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-on-instagram"
          >
            View on Instagram
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default InstagramModal;
