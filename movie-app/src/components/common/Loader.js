// Loader.js
import React from 'react';
import '../../styles/Loader.css';

const Loader = ({ 
  size = 'medium', 
  color = '#3b82f6', 
  text = '', 
  className = '',
  fullScreen = false 
}) => {
  const containerClass = fullScreen ? 'loader-fullscreen' : 'loader-container';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="loader-content">
        <div
          className={`spinner ${size}`}
          style={{ borderTopColor: color }}
        />
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-info">
        <div className="skeleton-line full" />
        <div className="skeleton-line three-quarters" />
        <div className="skeleton-line half" />
      </div>
    </div>
  );
};

export const MovieDetailSkeleton = () => {
  return (
    <div className="skeleton-detail">
      <div className="skeleton-detail-left">
        <div className="skeleton-poster" />
      </div>
      <div className="skeleton-detail-right">
        <div className="skeleton-title" />
        <div className="skeleton-line full" />
        <div className="skeleton-line four-fifths" />
        <div className="skeleton-line three-fifths" />
        <div className="skeleton-line one-third" />
        <div className="skeleton-tags">
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
        </div>
      </div>
    </div>
  );
};

export const PageLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="page-loader">
      <Loader size="large" text={text} />
    </div>
  );
};

export default Loader;
