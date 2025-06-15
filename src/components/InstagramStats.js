import React from 'react';

const InstagramStats = ({ data }) => {
  if (!data || data.length === 0) return null;

  const stats = {
    total: data.length,
    images: data.filter(item => item.type === 'image').length,
    videos: data.filter(item => item.type === 'video').length,
    carousels: data.filter(item => item.type === 'carousel_album').length,
    totalLikes: data.reduce((sum, item) => sum + item.likes, 0),
    totalComments: data.reduce((sum, item) => sum + item.comments, 0),
    avgEngagement: Math.round((data.reduce((sum, item) => sum + item.likes + item.comments, 0) / data.length))
  };

  return (
    <div className="instagram-stats">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Posts</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.images}</span>
          <span className="stat-label">Images</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.videos}</span>
          <span className="stat-label">Videos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.carousels}</span>
          <span className="stat-label">Carousels</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.totalLikes.toLocaleString()}</span>
          <span className="stat-label">Total Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.totalComments.toLocaleString()}</span>
          <span className="stat-label">Total Comments</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.avgEngagement}</span>
          <span className="stat-label">Avg Engagement</span>
        </div>
      </div>
    </div>
  );
};

export default InstagramStats;
