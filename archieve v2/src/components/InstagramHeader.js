import React from 'react';

const InstagramHeader = ({ title = "Instagram Feed", subtitle = "Latest posts from our Instagram" }) => {
  return (
    <div className="instagram-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default InstagramHeader;
