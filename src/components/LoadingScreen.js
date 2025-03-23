import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';
import logo from '../path/image/logo/Arcelevenarchitect_logo.svg'; // Update this path to your actual logo

const LoadingScreen = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + Math.random() * 10, 100);
        
        if (newProgress === 100) {
          clearInterval(interval);
          // Give a small delay after reaching 100% before finishing
          setTimeout(() => {
            finishLoading();
          }, 500);
        }
        
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [finishLoading]);
  
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <img src={logo} alt="Arcelevenarchitect Logo" className="loading-logo" />
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="loading-text">
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

