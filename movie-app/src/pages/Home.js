import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import MovieList from '../pages/MovieList';
import { cachedMovieApi, movieApi } from '../services/Api';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('popular');
  const { user } = useAuth();
  const { setMovies } = useMovies();

  useEffect(() => {
  const fetchHomeData = async () => {
    setLoading(true);
    setError('');

    try {
      const [popularData, trendingData, genresData] = await Promise.all([
        cachedMovieApi.getPopularMovies(1),
        movieApi.getTrendingMovies('day'),
        movieApi.getGenres()
      ]);

      setPopularMovies(popularData.results);
      setTrendingMovies(trendingData.results);
      setGenres(genresData);
      setMovies(popularData.results);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error fetching home data:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchHomeData();
}, [setMovies]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'popular') {
      setMovies(popularMovies);
    } else if (section === 'trending') {
      setMovies(trendingMovies);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const featuredMovie = popularMovies[0];

  if (loading) {
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
         <button onClick={() => window.location.reload()} className="retry-btn">
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
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path})`
            }}
          >
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">{featuredMovie.title}</h1>
                <p className="hero-overview">
                  {featuredMovie.overview.length > 200 
                    ? `${featuredMovie.overview.substring(0, 200)}...`
                    : featuredMovie.overview
                  }
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
                  <button className="btn secondary">
                    Add to Watchlist
                  </button>
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
            {getGreeting()}{user ? `, ${user.displayName || user.email}` : ''}!
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
              className={`nav-tab ${activeSection === 'popular' ? 'active' : ''}`}
              onClick={() => handleSectionChange('popular')}
            >
              Popular Movies
            </button>
            <button
              className={`nav-tab ${activeSection === 'trending' ? 'active' : ''}`}
              onClick={() => handleSectionChange('trending')}
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
              {activeSection === 'popular' ? 'Popular Movies' : 'Trending Today'}
            </h3>
            <Link to="/search" className="see-all-link">
              See All
            </Link>
          </div>
          
          <MovieList 
            movies={activeSection === 'popular' ? popularMovies : trendingMovies}
            loading={false}
          />
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