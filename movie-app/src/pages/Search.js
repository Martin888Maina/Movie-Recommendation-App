// src/pages/Search.js
import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/movies/SearchBar';
import MovieList from '../pages/MovieList';
import Loader from '../components/common/Loader';
import { useMovies } from '../context/MovieContext';

const Search = () => {
  // const navigate = useNavigate();

    const {
    searchResults,
    loading,
    searchMovies,
  } = useMovies();

  // derive paging/query info from searchResults
   const currentQuery = searchResults.query;
   const currentPage = searchResults.page;
   const totalPages  = searchResults.total_pages;

  useEffect(() => {
  if (currentQuery) {
    searchMovies(currentQuery, currentPage);
  }
}, [currentQuery, currentPage, searchMovies]);

  const handleSearch = (query) => {
    // reset to page 1
    searchMovies(query, 1);
  };

  // const handleMovieSelect = (id) => {
  //   navigate(`/movie/${id}`);
  // };

  const handlePageChange = (newPage) => {
    searchMovies(currentQuery, newPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Search Movies</h1>

      <SearchBar onSearch={handleSearch} placeholder="Search for a movie..." />

      {loading && <Loader />}

      {!loading && searchResults?.results?.length > 0 && (
        <>
          {/* <MovieList movies={searchResults.results} onMovieSelect={handleMovieSelect} /> */}
          <MovieList 
            movies={searchResults.results}
            showPagination={false}
            loading={loading}
          />

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && currentQuery && searchResults?.results?.length === 0 && (
        <p className="text-center text-gray-500">
          No movies found for “{currentQuery}”
        </p>
      )}
    </div>
  );
};

export default Search;
