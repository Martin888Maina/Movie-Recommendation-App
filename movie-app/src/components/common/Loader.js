import React from 'react';

const Loader = ({ 
  size = 'medium', 
  color = '#3b82f6', 
  text = '', 
  className = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-current rounded-full animate-spin`}
          style={{ borderTopColor: color }}
        />
        
        {/* Loading text */}
        {text && (
          <p className="text-sm text-gray-600 font-medium animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

// Skeleton loader for movie cards
export const MovieCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

// Skeleton loader for movie details
export const MovieDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-3/5"></div>
          <div className="h-6 bg-gray-300 rounded mb-2 w-1/3"></div>
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            <div className="h-6 w-18 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading overlay for pages
export const PageLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size="large" text={text} />
    </div>
  );
};

export default Loader;