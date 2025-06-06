// pages/Search.js
import React, { useState, useCallback } from 'react';
import SearchBar from '../components/movies/SearchBar';
import MovieCard from '../pages/MovieCard';
import { movieApi } from '../services/api';
import '../styles/Search.css';

const Search = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleMovieSelect = useCallback(async (movie) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch detailed movie information
      const detailedMovie = await movieApi.getMovieDetails(movie.id);
      setSelectedMovie(detailedMovie);
      
      // Add to search history (keep only last 5 searches)
      setSearchHistory(prev => {
        const newHistory = [movie, ...prev.filter(item => item.id !== movie.id)];
        return newHistory.slice(0, 5);
      });
      
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to load movie details. Please try again.');
      setSelectedMovie(movie); // Fallback to basic movie data
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchClear = useCallback(() => {
    setSelectedMovie(null);
    setError(null);
  }, []);

  const handleHistorySelect = useCallback((movie) => {
    handleMovieSelect(movie);
  }, [handleMovieSelect]);

  return (
    <div className="search-page">
      <div className="search-container">
        {/* Header Section */}
        <div className="search-header">
          <div className="search-header-content">
            <h1 className="search-title">
              <span className="search-icon">🔍</span>
              Discover Movies
            </h1>
            <p className="search-subtitle">
              Find your next favorite movie by searching through thousands of titles
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="search-bar-section">
          <SearchBar 
            onMovieSelect={handleMovieSelect}
            onSearchClear={handleSearchClear}
            placeholder="Search for movies, actors, directors..."
          />
        </div>

        {/* Search History */}
        {!selectedMovie && searchHistory.length > 0 && (
          <div className="search-history">
            <h3 className="history-title">Recent Searches</h3>
            <div className="history-chips">
              {searchHistory.map((movie) => (
                <button
                  key={movie.id}
                  className="history-chip"
                  onClick={() => handleHistorySelect(movie)}
                >
                  <span className="chip-icon">🎬</span>
                  {movie.title}
                  <span className="chip-year">
                    ({movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>Loading movie details...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="search-error">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Selected Movie Display */}
        {selectedMovie && !isLoading && (
          <div className="selected-movie-section">
            <div className="section-header">
              <h2 className="section-title">Movie Details</h2>
              <button 
                className="clear-selection-btn"
                onClick={handleSearchClear}
                title="Clear selection"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="movie-card-container">
              <MovieCard
                movie={selectedMovie}
                showRating={true}
                showOverview={true}
                size="large"
              />
            </div>

            {/* Additional Movie Info */}
            <div className="movie-additional-info">
              <div className="info-grid">
                {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                  <div className="info-item">
                    <h4>Genres</h4>
                    <div className="genre-tags">
                      {selectedMovie.genres.map((genre) => (
                        <span key={genre.id} className="genre-tag">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedMovie.runtime && (
                  <div className="info-item">
                    <h4>Runtime</h4>
                    <p>{selectedMovie.runtime} minutes</p>
                  </div>
                )}
                
                {selectedMovie.release_date && (
                  <div className="info-item">
                    <h4>Release Date</h4>
                    <p>{new Date(selectedMovie.release_date).toLocaleDateString()}</p>
                  </div>
                )}
                
                {selectedMovie.vote_average && (
                  <div className="info-item">
                    <h4>Rating</h4>
                    <div className="rating-display">
                      <span className="rating-value">{selectedMovie.vote_average.toFixed(1)}</span>
                      <span className="rating-max">/10</span>
                      <span className="rating-votes">
                        ({selectedMovie.vote_count?.toLocaleString() || 0} votes)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedMovie && !isLoading && searchHistory.length === 0 && (
          <div className="search-empty-state">
            <div className="empty-icon">🎭</div>
            <h3>Start Your Movie Journey</h3>
            <p>Search for any movie to see detailed information, ratings, and more!</p>
            <div className="search-tips">
              <h4>Search Tips:</h4>
              <ul>
                <li>Try searching by movie title, actor, or director</li>
                <li>Use partial names - suggestions will appear as you type</li>
                <li>Click on any suggestion to see full details</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;