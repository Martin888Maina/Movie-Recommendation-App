// pages/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieApi } from '../services/api';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await movieApi.getMovieDetails(id);
        setMovie(movieData);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Movie not found.
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg';

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <div>
      {/* Hero Section with Backdrop */}
      {backdropUrl && (
        <div 
          className="hero-section position-relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px'
          }}
        >
          <div className="container py-5">
            <div className="row align-items-center h-100">
              <div className="col-md-4">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="img-fluid rounded shadow-lg"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <div className="col-md-8 text-white">
                <button 
                  className="btn btn-outline-light mb-3" 
                  onClick={() => navigate(-1)}
                >
                  ← Back
                </button>
                <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
                {movie.tagline && (
                  <p className="lead fst-italic mb-3">"{movie.tagline}"</p>
                )}
                <div className="d-flex flex-wrap gap-3 mb-3">
                  <span className="badge bg-warning text-dark">
                    ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                  <span className="badge bg-info">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </span>
                  <span className="badge bg-secondary">
                    {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movie Details */}
      <div className="container py-5">
        {!backdropUrl && (
          <div className="row mb-4">
            <div className="col-12">
              <button 
                className="btn btn-primary mb-3" 
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
              <h1 className="display-4 fw-bold">{movie.title}</h1>
            </div>
          </div>
        )}

        <div className="row">
          {!backdropUrl && (
            <div className="col-md-4 mb-4">
              <img
                src={posterUrl}
                alt={movie.title}
                className="img-fluid rounded shadow"
              />
            </div>
          )}
          
          <div className={!backdropUrl ? "col-md-8" : "col-12"}>
            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-4">
                <h4>Genres</h4>
                <div className="d-flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="badge bg-primary">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div className="mb-4">
                <h4>Overview</h4>
                <p className="lead">{movie.overview}</p>
              </div>
            )}

            {/* Additional Details */}
            <div className="row">
              <div className="col-md-6">
                <h5>Details</h5>
                <ul className="list-unstyled">
                  {movie.release_date && (
                    <li><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</li>
                  )}
                  {movie.runtime && (
                    <li><strong>Runtime:</strong> {movie.runtime} minutes</li>
                  )}
                  {movie.budget > 0 && (
                    <li><strong>Budget:</strong> ${movie.budget.toLocaleString()}</li>
                  )}
                  {movie.revenue > 0 && (
                    <li><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</li>
                  )}
                  {movie.original_language && (
                    <li><strong>Language:</strong> {movie.original_language.toUpperCase()}</li>
                  )}
                </ul>
              </div>
              
              <div className="col-md-6">
                <h5>Ratings</h5>
                <ul className="list-unstyled">
                  <li><strong>Average Rating:</strong> {movie.vote_average?.toFixed(1) || 'N/A'}/10</li>
                  <li><strong>Vote Count:</strong> {movie.vote_count?.toLocaleString() || 'N/A'}</li>
                  <li><strong>Popularity:</strong> {movie.popularity?.toFixed(1) || 'N/A'}</li>
                </ul>
              </div>
            </div>

            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mt-4">
                <h5>Production Companies</h5>
                <div className="d-flex flex-wrap gap-2">
                  {movie.production_companies.map((company) => (
                    <span key={company.id} className="badge bg-secondary">
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;