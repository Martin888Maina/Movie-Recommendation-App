import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { imageUtils } from '../services/Api';
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
              <span>No Image</span>
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
              <p className="overlay-text">View Details</p>
            </div>
          </div>
        </div>

        <div className="movie-info">
          <h3 className="movie-title" title={title}>
            {title}
          </h3>
          
          <div className="movie-meta">
            <span className="release-year">{releaseYear}</span>
            {showRating && rating !== 'N/A' && (
              <>
                <span className="meta-separator">•</span>
                <span className="movie-rating">
                  ⭐ {rating}
                </span>
              </>
            )}
          </div>

          {showOverview && overview && (
            <p className="movie-overview">
              {overview.length > 120 
                ? `${overview.substring(0, 120)}...`
                : overview
              }
            </p>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="movie-actions">
        <button 
          className="action-btn wishlist-btn"
          onClick={(e) => {
            e.preventDefault();
            console.log('Add to wishlist:', movie.id);
          }}
          title="Add to Wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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