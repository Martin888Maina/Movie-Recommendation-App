// Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovies } from "../context/MovieContext";
import { cachedMovieApi } from "../services/api";
import MovieList from "../pages/MovieList";
import "../styles/Home.css";

const Home = () => {
  const { user } = useAuth();
  const {
    trendingMovies,
    genres,
    loading: contextLoading,
    error: contextError,
    fetchTrendingMovies,
    fetchGenres,
  } = useMovies();

  const [activeSection, setActiveSection] = useState("popular");

  // Pagination state for popular movies
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popularLoading, setPopularLoading] = useState(false);
  const [popularError, setPopularError] = useState(null);

  // Fetch popular movies with pagination
  const fetchPopularMovies = async (page = 1) => {
    setPopularLoading(true);
    setPopularError(null);

    try {
      const data = await cachedMovieApi.getPopularMovies(page);
      setPopularMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      setCurrentPage(data.page || 1);
    } catch (err) {
      setPopularError(err.message || "Failed to fetch popular movies");
      console.error("Error fetching popular movies:", err);
    } finally {
      setPopularLoading(false);
    }
  };

  // Handle page change for popular movies
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchPopularMovies(newPage);
    }
  };

  useEffect(() => {
    // Load initial data
    fetchPopularMovies(1);
    fetchTrendingMovies("day");
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Extract results arrays safely
  const trendingResults = trendingMovies?.results || [];
  const featuredMovie = popularMovies[0];

  // Determine loading and error states
  const isLoading =
    contextLoading || (popularLoading && popularMovies.length === 0);
  const error = contextError || popularError;

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      {featuredMovie && (
        <section className="hero-section">
          <div
            className="hero-backdrop"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path})`,
            }}
          >
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">{featuredMovie.title}</h1>
                <p className="hero-overview">
                  {featuredMovie.overview.length > 200
                    ? `${featuredMovie.overview.substring(0, 200)}...`
                    : featuredMovie.overview}
                </p>
                <div className="hero-meta">
                  <span className="rating">
                    ⭐ {featuredMovie.vote_average.toFixed(1)}
                  </span>
                  <span className="release-date">
                    {new Date(featuredMovie.release_date).getFullYear()}
                  </span>
                </div>
                <div className="hero-actions">
                  <Link
                    to={`/movie/${featuredMovie.id}`}
                    className="btn primary"
                  >
                    Watch Now
                  </Link>
                  <button className="btn secondary">Add to Watchlist</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <h2 className="welcome-title">
            {getGreeting()}
            {user ? `, ${user.displayName || user.email}` : ""}!
          </h2>
          <p className="welcome-subtitle">
            Discover amazing movies and TV shows
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="section-nav">
        <div className="container">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeSection === "popular" ? "active" : ""}`}
              onClick={() => handleSectionChange("popular")}
            >
              Popular Movies
            </button>
            <button
              className={`nav-tab ${activeSection === "trending" ? "active" : ""}`}
              onClick={() => handleSectionChange("trending")}
            >
              Trending Today
            </button>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="movies-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">
              {activeSection === "popular"
                ? "Popular Movies"
                : "Trending Today"}
            </h3>
            <Link to="/search" className="see-all-link">
              See All
            </Link>
          </div>

          {activeSection === "popular" ? (
            <MovieList
              movies={popularMovies}
              loading={popularLoading}
              error={popularError}
              showPagination={true}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={20}
              title=""
            />
          ) : (
            <MovieList
              movies={trendingResults}
              loading={false}
              showPagination={false}
              title=""
            />
          )}
        </div>
      </section>

      {/* Genres Section */}
      {genres.length > 0 && (
        <section className="genres-section">
          <div className="container">
            <h3 className="section-title">Browse by Genre</h3>
            <div className="genres-grid">
              {genres.slice(0, 8).map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre.id}?name=${genre.name}`}
                  className="genre-card"
                >
                  <span className="genre-name">{genre.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <div className="actions-grid">
            <Link to="/search" className="action-card">
              <div className="action-icon">🔍</div>
              <h4>Search Movies</h4>
              <p>Find your next favorite movie</p>
            </Link>

            <Link to="/trending" className="action-card">
              <div className="action-icon">🔥</div>
              <h4>What's Hot</h4>
              <p>Discover trending content</p>
            </Link>

            <Link to="/top-rated" className="action-card">
              <div className="action-icon">⭐</div>
              <h4>Top Rated</h4>
              <p>Highest rated movies</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
