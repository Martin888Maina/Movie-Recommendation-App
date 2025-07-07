import React, { useState, useEffect } from "react";
import MovieCard from "../pages/MovieCard";
import Loader, { MovieCardSkeleton } from "../components/common/Loader";
import "../styles/MovieList.css";

const MovieList = ({
  movies = [],
  loading = false,
  error = null,
  onLoadMore = null,
  hasNextPage = false,
  loadingMore = false,
  showPagination = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange = null,
  layout = "grid",
  itemsPerPage = 20,
  showRating = true,
  showOverview = false,
  cardSize = "medium",
  title = "",
  emptyMessage = "No movies found",
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
    if (
      onPageChange &&
      page !== currentPage &&
      page >= 1 &&
      page <= totalPages
    ) {
      onPageChange(page);
      // Scroll to top of list smoothly
      const movieListElement = document.querySelector(".movie-list-container");
      if (movieListElement) {
        movieListElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const renderPagination = () => {
    // Show pagination
    if (!showPagination || totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First/Previous navigation
    pages.push(
      <button
        key="first"
        className={`pagination-btn pagination-nav ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        title="First Page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z" />
        </svg>
      </button>,
    );

    pages.push(
      <button
        key="prev"
        className={`pagination-btn pagination-nav ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous Page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>,
    );

    // First page and ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="pagination-ellipsis">
            ⋯
          </span>,
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="pagination-ellipsis">
            ⋯
          </span>,
        );
      }
      pages.push(
        <button
          key={totalPages}
          className={`pagination-btn ${currentPage === totalPages ? "active" : ""}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    // Next/Last navigation
    pages.push(
      <button
        key="next"
        className={`pagination-btn pagination-nav ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Next Page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>,
    );

    pages.push(
      <button
        key="last"
        className={`pagination-btn pagination-nav ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Last Page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM16 6h2v12h-2V6z" />
        </svg>
      </button>,
    );

    return (
      <div className="pagination-wrapper">
        <div className="pagination-info">
          <span className="pagination-summary">
            Showing page <strong>{currentPage}</strong> of{" "}
            <strong>{totalPages}</strong>
            {movies.length > 0 && (
              <span className="pagination-count">
                ({(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, movies.length)} of{" "}
                {totalPages * itemsPerPage} results)
              </span>
            )}
          </span>
        </div>
        <div className="pagination-controls">{pages}</div>

        {/* Quick jump to page */}
        {totalPages > 10 && (
          <div className="pagination-jump">
            <span>Go to page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                }
              }}
              className="pagination-input"
            />
          </div>
        )}
      </div>
    );
  };

  const renderError = () => (
    <div className="movie-list-error">
      <div className="error-content">
        <div className="error-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3>Unable to load movies</h3>
        <p>
          {error ||
            "Something went wrong while fetching movies. Please try again."}
        </p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div className="movie-list-empty">
      <div className="empty-content">
        <div className="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
          </svg>
        </div>
        <h3>No Movies Found</h3>
        <p>{emptyMessage}</p>
      </div>
    </div>
  );

  // Main loading state
  if (loading && displayedMovies.length === 0) {
    return (
      <div className="movie-list-container">
        <div className="movie-list-loading">
          <Loader
            size="large"
            color="#667eea"
            text="Loading movies..."
            className="main-loader"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="movie-list-container">{renderError()}</div>;
  }

  return (
    <div className="movie-list-container">
      {title && (
        <div className="movie-list-header">
          <h2 className="movie-list-title">{title}</h2>
          <div className="movie-list-controls">
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List View"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>

            {/* Results counter */}
            {displayedMovies.length > 0 && (
              <div className="results-counter">
                <span>{displayedMovies.length} movies</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`movie-list ${viewMode}-view`}>
        {displayedMovies.length === 0
          ? renderEmpty()
          : displayedMovies.map((movie) => (
              <MovieCard
                key={movie.id || movie.imdbID || `movie-${movie.title}`}
                movie={movie}
                size={cardSize}
                showRating={showRating}
                showOverview={showOverview}
                layout={viewMode}
              />
            ))}
      </div>

      {/* Load More Button (for infinite scroll) */}
      {onLoadMore && hasNextPage && !showPagination && (
        <div className="load-more-container">
          <button
            className={`load-more-btn ${loadingMore ? "loading" : ""}`}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <Loader size="small" color="#ffffff" />
                Loading more movies...
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
                Load More Movies
              </>
            )}
          </button>
        </div>
      )}

      {/* Loading More Skeletons */}
      {loadingMore && showPagination && (
        <div className="loading-more-section">
          <div className="loading-more-indicator">
            <Loader
              size="medium"
              color="#667eea"
              text="Loading more movies..."
            />
          </div>
          <div className={`movie-list ${viewMode}-view loading-more`}>
            {Array.from({ length: Math.min(itemsPerPage, 6) }, (_, index) => (
              <MovieCardSkeleton key={`loading-more-${index}`} />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Pagination */}
      {showPagination && totalPages > 1 && renderPagination()}
    </div>
  );
};

export default MovieList;
