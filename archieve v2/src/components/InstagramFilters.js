import React from 'react';

const InstagramFilters = ({ activeFilter, sortBy, onFilterChange, onSortChange }) => {
  const filters = [
    { key: 'all', label: 'All Posts', icon: '📱' },
    { key: 'images', label: 'Images', icon: '🖼️' },
    { key: 'videos', label: 'Videos', icon: '🎥' },
    { key: 'reels', label: 'Reels', icon: '🎬' },
    { key: 'carousel', label: 'Carousels', icon: '📷' }
  ];

  const sortOptions = [
    { key: 'recent', label: 'Most Recent' },
    { key: 'popular', label: 'Most Popular' },
    { key: 'likes', label: 'Most Liked' },
    { key: 'comments', label: 'Most Commented' }
  ];

  return (
    <div className="instagram-filters">
      <div className="filter-section">
        <h3>Filter by Type</h3>
        <div className="filter-buttons">
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => onFilterChange(filter.key)}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sort-section">
        <h3>Sort by</h3>
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          {sortOptions.map(option => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InstagramFilters;
