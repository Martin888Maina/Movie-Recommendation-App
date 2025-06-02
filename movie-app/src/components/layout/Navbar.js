import React, { useState, useEffect } from 'react';
import { useMovies } from '../../context/MovieContext';
import Button from '../common/Button';

const Navbar = () => {
  const { genres, fetchGenres } = useMovies();
  const [activeGenre, setActiveGenre] = useState(null);
  const [showGenres, setShowGenres] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fetch genres on component mount
    if (genres.length === 0) {
      fetchGenres();
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [genres.length, fetchGenres]);

  const handleGenreClick = (genreId, genreName) => {
    setActiveGenre({ id: genreId, name: genreName });
    setShowGenres(false);
    // You can dispatch a filter action here when implementing genre filtering
  };

  const navItems = [
    { 
      label: 'Popular', 
      href: '/popular',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      label: 'Trending', 
      href: '/trending',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      label: 'Top Rated', 
      href: '/top-rated',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="bg-gray-50 border-b border-gray-200 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Main Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white transition-all duration-200"
              >
                {item.icon}
                <span className="hidden sm:block">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Genres Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="small"
              onClick={() => setShowGenres(!showGenres)}
              className="flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="hidden sm:block">
                {activeGenre ? activeGenre.name : 'Genres'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${showGenres ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>

            {/* Genres Dropdown Menu */}
            {showGenres && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setActiveGenre(null);
                    setShowGenres(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  All Genres
                </button>
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id, genre.name)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      activeGenre?.id === genre.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close genres dropdown */}
      {showGenres && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowGenres(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;