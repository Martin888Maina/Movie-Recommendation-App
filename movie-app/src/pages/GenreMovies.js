import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { movieApi } from "../services/api";
import MovieList from "./MovieList";
import "../styles/GenreMovies.css";

const GenreMovies = () => {
  const { id: genreId } = useParams();
  const [searchParams] = useSearchParams();
  const genreName = searchParams.get("name") || "Genre";

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieApi.getMoviesByGenre(genreId, page);
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500));
      setCurrentPage(data.page || 1);
    } catch (err) {
      setError(err.message || "Failed to fetch movies for this genre");
      console.error("Error fetching genre movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      fetchMovies(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="genre-movies-container">
      <div className="genre-movies-header">
        <Link to="/" className="genre-back-link">
          ← Back to Home
        </Link>
        <h1 className="genre-title">{genreName}</h1>
        <p className="genre-subtitle">Explore movies in the {genreName} genre</p>
      </div>

      <div className="genre-movies-content">
        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          showPagination={true}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={20}
          title=""
        />
      </div>
    </div>
  );
};

export default GenreMovies;
