// components/SearchBar.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { movieApi } from '../../services/api';
import '../../styles/SearchBar.css';

const SearchBar = ({ 
  onMovieSelect, 
  onSearchClear, 
  placeholder = "Search movies..." 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced search function
  const debouncedSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await movieApi.searchMovies(searchQuery, 1);
      const filteredResults = response.results
        .filter(movie => movie.poster_path) // Only show movies with posters
        .slice(0, 8); // Limit to 8 suggestions
      
      setSuggestions(filteredResults);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search movies. Please try again.');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Clear selection when user starts typing again
    if (value.trim() === '') {
      onSearchClear();
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce the search
    debounceRef.current = setTimeout(() => {
      debouncedSearch(value);
    }, 300); // 300ms delay
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (movie) => {
    setQuery(movie.title);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    onMovieSelect(movie);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Clear search
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setError(null);
    onSearchClear();
    inputRef.current?.focus();
  };

  // Get poster URL with fallback
  const getPosterUrl = (posterPath) => {
    return posterPath 
      ? `https://image.tmdb.org/t/p/w92${posterPath}`
      : '/placeholder-poster.jpg';
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <div className="search-input-container">
          {/* Search Icon */}
          <div className="search-icon">
            {isLoading ? (
              <div className="search-loading-icon"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            )}
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-input"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Clear Button */}
          {query && (
            <button
              className="search-clear-btn"
              onClick={handleClear}
              type="button"
              aria-label="Clear search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="search-error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="suggestions-container" ref={suggestionsRef}>
          <div className="suggestions-wrapper">
            {suggestions.length === 0 && !isLoading ? (
              <div className="no-suggestions">
                <div className="no-suggestions-icon">🔍</div>
                <p>No movies found for "{query}"</p>
                <small>Try a different search term</small>
              </div>
            ) : (
              <div className="suggestions-list">
                {suggestions.map((movie, index) => (
                  <div
                    key={movie.id}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSuggestionSelect(movie)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="suggestion-poster">
                      <img
                        src={getPosterUrl(movie.poster_path)}
                        alt={`${movie.title} poster`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/placeholder-poster.jpg';
                        }}
                      />
                    </div>
                    
                    <div className="suggestion-info">
                      <h4 className="suggestion-title">{movie.title}</h4>
                      <div className="suggestion-meta">
                        <span className="suggestion-year">
                          {movie.release_date 
                            ? new Date(movie.release_date).getFullYear() 
                            : 'N/A'
                          }
                        </span>
                        {movie.vote_average > 0 && (
                          <>
                            <span className="meta-separator">•</span>
                            <span className="suggestion-rating">
                              ⭐ {movie.vote_average.toFixed(1)}
                            </span>
                          </>
                        )}
                      </div>
                      {movie.overview && (
                        <p className="suggestion-overview">
                          {movie.overview.length > 80 
                            ? `${movie.overview.substring(0, 80)}...`
                            : movie.overview
                          }
                        </p>
                      )}
                    </div>

                    <div className="suggestion-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Search Tips Footer */}
            {suggestions.length > 0 && (
              <div className="suggestions-footer">
                <small>
                  Use ↑↓ arrows to navigate, Enter to select, Esc to close
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;