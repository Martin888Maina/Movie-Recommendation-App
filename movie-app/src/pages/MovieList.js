import React, { useState, useEffect } from 'react';
import MovieCard, { MovieCardSkeleton } from './MovieCard';

const MovieList = ({ 
  movies = [], 
  loading = false, 
  error = null, 
  onLoadMore = null, 
  hasNextPage = false,
  loadingMore = false,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = null,
  layout = 'grid', // 'grid' or 'list'
  itemsPerPage = 20,
  showRating = true,
  showOverview = false,
  cardSize = 'medium',
  title = '',
  emptyMessage = 'No movies found'
}) => {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [viewMode, setViewMode] = useState(layout);

  useEffect(() => {
    setDisplayedMovies(movies);
  }, [movies]);

  const handleLoadMore = () => {
    if (onLoadMore && !loadingMore) {
      onLoadMore();
    }
  };

  const handlePageChange = (page) => {
    if (onPageChange && page !== currentPage) {
      onPageChange(page);
      // Scroll to top of list
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );

    // First page and ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return (
      <div className="pagination">
        <div className="pagination-info">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="pagination-controls">
          {pages}
        </div>
      </div>
    );
  };

  const renderSkeletons = () => {
    return Array.from({ length: itemsPerPage }, (_, index) => (
      <MovieCardSkeleton key={`skeleton-${index}`} size={cardSize} />
    ));
  };

  const renderError = () => (
    <div className="movie-list-error">
      <div className="error-icon">⚠️</div>
      <h3>Unable to load movies</h3>
      <p>{error}</p>
      <button className="retry-btn" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );

  const renderEmpty = () => (
    <div className="movie-list-empty">
      <div className="empty-icon">🎬</div>
      <h3>No Movies Found</h3>
      <p>{emptyMessage}</p>
    </div>
  );

  if (error) {
    return (
      <div className="movie-list-container">
        {renderError()}
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {title && (
        <div className="movie-list-header">
          <h2 className="movie-list-title">{title}</h2>
          <div className="movie-list-controls">
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`movie-list ${viewMode}-view`}>
        {loading && displayedMovies.length === 0 ? (
          renderSkeletons()
        ) : displayedMovies.length === 0 ? (
          renderEmpty()
        ) : (
          displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id || movie.imdbID || `movie-${movie.title}`}
              movie={movie}
              size={cardSize}
              showRating={showRating}
              showOverview={showOverview}
              layout={viewMode}
            />
          ))
        )}
      </div>

      {/* Load More Button */}
      {onLoadMore && hasNextPage && !showPagination && (
        <div className="load-more-container">
          <button
            className={`load-more-btn ${loadingMore ? 'loading' : ''}`}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <div className="loading-spinner"></div>
                Loading...
              </>
            ) : (
              'Load More Movies'
            )}
          </button>
        </div>
      )}

      {/* Loading More Skeletons */}
      {loadingMore && (
        <div className={`movie-list ${viewMode}-view loading-more`}>
          {Array.from({ length: Math.min(itemsPerPage, 6) }, (_, index) => (
            <MovieCardSkeleton key={`loading-more-${index}`} size={cardSize} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default MovieList;