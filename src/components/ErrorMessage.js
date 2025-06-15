import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error">
      <h2>Error loading Instagram feed</h2>
      <p>{error}</p>
      <button onClick={onRetry} className="retry-btn">
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
