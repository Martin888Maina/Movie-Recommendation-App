// src/context/MovieContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { cachedMovieApi, movieApi } from '../services/api';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

// Action types
const MOVIE_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_POPULAR_MOVIES: 'SET_POPULAR_MOVIES',
  SET_TRENDING_MOVIES: 'SET_TRENDING_MOVIES',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_MOVIE_DETAILS: 'SET_MOVIE_DETAILS',
  SET_GENRES: 'SET_GENRES',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  APPEND_MOVIES: 'APPEND_MOVIES'
};

// Initial state
const initialState = {
  popularMovies: {
    results: [],
    total_pages: 0,
    total_results: 0,
    page: 1
  },
  trendingMovies: {
    results: [],
    total_pages: 0,
    total_results: 0
  },
  searchResults: {
    results: [],
    total_pages: 0,
    total_results: 0,
    query: '',
    page: 1
  },
  movieDetails: null,
  genres: [],
  loading: false,
  error: null
};

// Reducer
const movieReducer = (state, action) => {
  switch (action.type) {
    case MOVIE_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case MOVIE_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case MOVIE_ACTIONS.SET_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: action.payload,
        loading: false,
        error: null
      };

    case MOVIE_ACTIONS.APPEND_MOVIES:
      return {
        ...state,
        popularMovies: {
          ...action.payload,
          results: [
            ...state.popularMovies.results,
            ...action.payload.results
          ]
        },
        loading: false,
        error: null
      };

    case MOVIE_ACTIONS.SET_TRENDING_MOVIES:
      return {
        ...state,
        trendingMovies: action.payload,
        loading: false,
        error: null
      };

    case MOVIE_ACTIONS.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: {
          ...action.payload,
          query: action.query
        },
        loading: false,
        error: null
      };

    case MOVIE_ACTIONS.SET_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
        loading: false,
        error: null
      };

    case MOVIE_ACTIONS.SET_GENRES:
      return {
        ...state,
        genres: action.payload,
        loading: false,
        error: null
      };

    case MOVIE_ACTIONS.CLEAR_SEARCH:
      return {
        ...state,
        searchResults: {
          results: [],
          total_pages: 0,
          total_results: 0,
          query: '',
          page: 1
        }
      };

    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Fetch popular movies
  const fetchPopularMovies = async (page = 1, append = false) => {
    dispatch({ type: MOVIE_ACTIONS.SET_LOADING, payload: true });
    try {
      const data = await cachedMovieApi.getPopularMovies(page);
      if (append) {
        dispatch({ type: MOVIE_ACTIONS.APPEND_MOVIES, payload: data });
      } else {
        dispatch({ type: MOVIE_ACTIONS.SET_POPULAR_MOVIES, payload: data });
      }
    } catch (err) {
      dispatch({ type: MOVIE_ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  // Fetch trending movies
  const fetchTrendingMovies = async (timeWindow = 'day') => {
    dispatch({ type: MOVIE_ACTIONS.SET_LOADING, payload: true });
    try {
      const data = await movieApi.getTrendingMovies(timeWindow);
      dispatch({ type: MOVIE_ACTIONS.SET_TRENDING_MOVIES, payload: data });
    } catch (err) {
      dispatch({ type: MOVIE_ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  // Search movies
  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) {
      dispatch({ type: MOVIE_ACTIONS.CLEAR_SEARCH });
      return;
    }
    dispatch({ type: MOVIE_ACTIONS.SET_LOADING, payload: true });
    try {
      const data = await cachedMovieApi.searchMovies(query, page);
      dispatch({
        type: MOVIE_ACTIONS.SET_SEARCH_RESULTS,
        payload: data,
        query: query.trim()
      });
    } catch (err) {
      dispatch({ type: MOVIE_ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  // Fetch movie details
  const fetchMovieDetails = async (movieId) => {
    dispatch({ type: MOVIE_ACTIONS.SET_LOADING, payload: true });
    try {
      const data = await cachedMovieApi.getMovieDetails(movieId);
      dispatch({ type: MOVIE_ACTIONS.SET_MOVIE_DETAILS, payload: data });
    } catch (err) {
      dispatch({ type: MOVIE_ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  // Fetch genres
  const fetchGenres = async () => {
    dispatch({ type: MOVIE_ACTIONS.SET_LOADING, payload: true });
    try {
      const data = await movieApi.getGenres();
      dispatch({ type: MOVIE_ACTIONS.SET_GENRES, payload: data });
    } catch (err) {
      dispatch({ type: MOVIE_ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  // Clear search results
  const clearSearch = () => {
    dispatch({ type: MOVIE_ACTIONS.CLEAR_SEARCH });
  };

  // Clear any existing error
  const clearError = () => {
    dispatch({ type: MOVIE_ACTIONS.SET_ERROR, payload: null });
  };

  const value = {
    popularMovies: state.popularMovies,
    trendingMovies: state.trendingMovies,
    searchResults: state.searchResults,
    movieDetails: state.movieDetails,
    genres: state.genres,
    loading: state.loading,
    error: state.error,
    fetchPopularMovies,
    fetchTrendingMovies,
    searchMovies,
    fetchMovieDetails,
    fetchGenres,
    clearSearch,
    clearError
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
