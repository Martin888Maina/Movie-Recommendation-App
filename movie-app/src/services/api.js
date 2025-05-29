// Import axios dependency
import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_TMDB_BASE_URL,
  timeout: 10000,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

// Error logging
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoint
export const movieApi = {
  // Get popular movies with pagination
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch popular movies');
    }
  },

  // Get movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,similar'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movie details');
    }
  },

  // Search movies by title/keyword
  searchMovies: async (query, page = 1) => {
    try {
      if (!query.trim()) {
        return { results: [], total_pages: 0, total_results: 0 };
      }
      
      const response = await api.get('/search/movie', {
        params: { 
          query: query.trim(),
          page 
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to search movies');
    }
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow = 'day') => {
    try {
      const response = await api.get(`/trending/movie/${timeWindow}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch trending movies');
    }
  },

  // Get movie genres
  getGenres: async () => {
    try {
      const response = await api.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      throw new Error('Failed to fetch genres');
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: genreId,
          page
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movies by genre');
    }
  }
};

// Utility functions for image URLs
export const imageUtils = {
  getImageUrl: (path, size = 'w500') => {
    // placeholder image
    if (!path) return '/placeholder-movie.jpg'; 
    return `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'}${path}`;
  },

  getPosterUrl: (posterPath) => imageUtils.getImageUrl(posterPath, 'w500'),
  getBackdropUrl: (backdropPath) => imageUtils.getImageUrl(backdropPath, 'w1280'),
  getProfileUrl: (profilePath) => imageUtils.getImageUrl(profilePath, 'w185'),
};

// Cache implementation
class ApiCache {
    // 5 min
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) { 
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

// Cache instance
const apiCache = new ApiCache();

// Cached API functions
export const cachedMovieApi = {
  getPopularMovies: async (page = 1) => {
    const cacheKey = `popular_${page}`;
    const cached = apiCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const data = await movieApi.getPopularMovies(page);
    apiCache.set(cacheKey, data);
    return data;
  },

  getMovieDetails: async (movieId) => {
    const cacheKey = `movie_${movieId}`;
    const cached = apiCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const data = await movieApi.getMovieDetails(movieId);
    apiCache.set(cacheKey, data);
    return data;
  },

  searchMovies: async (query, page = 1) => {
    const cacheKey = `search_${query}_${page}`;
    const cached = apiCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const data = await movieApi.searchMovies(query, page);
    apiCache.set(cacheKey, data);
    return data;
  }
};

export default api;
