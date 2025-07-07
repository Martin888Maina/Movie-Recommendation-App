import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { imageUtils } from '../services/api';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, showRating = true, showOverview = false, size = 'medium' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!movie) return null;

  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
  } = movie;

  const posterUrl = imageUtils.getPosterUrl(poster_path);
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'TBA';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return '#4ade80'; // green
    if (numRating >= 6) return '#fbbf24'; // yellow
    return '#f87171'; // red
  };

  // Modern, Elegant, Stylish & Visually Attractive Text Styling
  const titleStyle = {
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 0.5rem 0',
    lineHeight: '1.3',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '-0.02em',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-1px)',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'
    }
  };

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#e2e8f0',
    fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
    marginBottom: '0.75rem',
    fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: '500',
    letterSpacing: '0.01em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const overviewStyle = {
    color: '#94a3b8',
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    lineHeight: '1.6',
    margin: '0',
    fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: '400',
    letterSpacing: '0.005em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'justify',
    hyphens: 'auto',
    WebkitHyphens: 'auto',
    msHyphens: 'auto'
  };

  const movieInfoStyle = {
    padding: '0 1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: '0 0 12px 12px'
  };

  const ratingStyle = {
    fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: '600',
    letterSpacing: '0.01em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const releaseYearStyle = {
    fontWeight: '600',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const separatorStyle = {
    opacity: '0.6',
    fontSize: '0.8rem',
    color: '#64748b',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  };

  const overlayTextStyle = {
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
    fontWeight: '600',
    margin: '0',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    position: 'relative'
  };

  const noImageTextStyle = {
    fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    fontWeight: '500',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    color: '#64748b',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className={`movie-card ${size}`}>
      <Link to={`/movie/${id}`} className="movie-card-link">
        <div className="movie-poster-container">
          {!imageLoaded && !imageError && (
            <div className="poster-placeholder">
              <div className="poster-loader"></div>
            </div>
          )}
          
          {imageError ? (
            <div className="poster-error">
              <div className="poster-error-icon">🎬</div>
              <span style={noImageTextStyle}>No Image</span>
            </div>
          ) : (
            <img
              src={posterUrl}
              alt={`${title} poster`}
              className={`movie-poster ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          )}

          {/* Rating Badge */}
          {showRating && rating !== 'N/A' && (
            <div 
              className="rating-badge"
              style={{ backgroundColor: getRatingColor(rating) }}
            >
              <span className="rating-icon">⭐</span>
              <span className="rating-value">{rating}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="movie-overlay">
            <div className="overlay-content">
              <button className="play-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <p className="overlay-text" style={overlayTextStyle}>View Details</p>
            </div>
          </div>
        </div>

        <div className="movie-info" style={movieInfoStyle}>
          <h3 className="movie-title" title={title} style={titleStyle}>
            {title}
          </h3>
          
          <div className="movie-meta" style={metaStyle}>
            <span className="release-year" style={releaseYearStyle}>
              {releaseYear}
            </span>
            {showRating && rating !== 'N/A' && (
              <>
                <span className="meta-separator" style={separatorStyle}>•</span>
                <span className="movie-rating" style={ratingStyle}>
                  ⭐ {rating}
                </span>
              </>
            )}
          </div>

          {showOverview && overview && (
            <p className="movie-overview" style={overviewStyle}>
              {overview.length > 100 
                ? `${overview.substring(0, 100)}...`
                : overview
              }
            </p>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="movie-actions" style={{ padding: '0.75rem 1rem' }}>
        <button 
          className="action-btn wishlist-btn"
          onClick={(e) => {
            e.preventDefault();
            console.log('Add to wishlist:', movie.id);
          }}
          title="Add to Wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <button 
          className="action-btn share-btn"
          onClick={(e) => {
            e.preventDefault();
            if (navigator.share) {
              navigator.share({
                title: title,
                text: `Check out ${title} (${releaseYear})`,
                url: `${window.location.origin}/movie/${id}`
              });
            } else {
              navigator.clipboard.writeText(`${window.location.origin}/movie/${id}`);
              alert('Link copied to clipboard!');
            }
          }}
          title="Share Movie"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Skeleton component for loading states
export const MovieCardSkeleton = ({ size = 'medium' }) => {
  return (
    <div className={`movie-card skeleton ${size}`}>
      <div className="movie-poster-container">
        <div className="poster-skeleton"></div>
      </div>
      <div className="movie-info">
        <div className="title-skeleton"></div>
        <div className="meta-skeleton"></div>
      </div>
    </div>
  );
};

export default MovieCard;



