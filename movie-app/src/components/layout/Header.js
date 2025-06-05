import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  const { user, logout, loading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserMenu]);

  // Close dropdown when route changes
  useEffect(() => {
    setShowUserMenu(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const result = await logout();
      if (result.success) {
        setShowUserMenu(false);
        // Redirect to home page after successful logout
        navigate('/', { replace: true });
      } else {
        console.error('Logout failed:', result.error);
        // Optionally show error message to user
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    // Navigate to profile page 
    // navigate('/profile');
    console.log('Profile clicked - implement profile page');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowUserMenu(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-main">
          {/* Logo */}
          <div className="logo-container">
            <button
              onClick={() => handleNavigation('/')}
              className="logo-button"
              aria-label="Go to home page"
            >
              <svg 
                className="logo-icon" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
              <span className="logo-text">Movie Application</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" role="navigation">
            <button
              onClick={() => handleNavigation('/')}
              className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('/search')}
              className={`nav-button ${location.pathname === '/search' ? 'active' : ''}`}
              aria-current={location.pathname === '/search' ? 'page' : undefined}
            >
              Search
            </button>
          </nav>

          {/* User Section */}
          <div className="user-section">
            {user ? (
              <div className="user-menu-container" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="user-menu-button"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                  aria-label={`User menu for ${user.displayName || user.email}`}
                >
                  <div className="user-avatar">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={`${user.displayName || 'User'}'s profile`}
                        className="user-avatar-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span 
                      className="user-initial"
                      style={{ display: user.photoURL ? 'none' : 'flex' }}
                    >
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="user-name">
                    {user.displayName || 'User'}
                  </span>
                  <svg 
                    className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="user-dropdown" role="menu">
                    <div className="user-info">
                      <div className="user-email">
                        {user.email}
                      </div>
                      {user.displayName && (
                        <div className="user-display-name">
                          {user.displayName}
                        </div>
                      )}
                    </div>
                    <div className="dropdown-divider"></div>
                    <button
                      onClick={handleProfile}
                      className="dropdown-item"
                      role="menuitem"
                    >
                      <svg 
                        className="dropdown-item-icon" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={logoutLoading || loading}
                      className={`dropdown-item logout-item ${(logoutLoading || loading) ? 'loading-button' : ''}`}
                      role="menuitem"
                    >
                      <svg 
                        className="dropdown-item-icon" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {logoutLoading ? 'Signing out...' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className={`sign-in-button ${loading ? 'loading-button' : ''}`}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Sign In
                </button>
                <button
                  className={`get-started-button ${loading ? 'loading-button' : ''}`}
                  onClick={() => navigate('/login')}
                  disabled={loading}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <nav className="mobile-nav-content" role="navigation">
            <button
              onClick={() => handleNavigation('/')}
              className={`mobile-nav-button ${location.pathname === '/' ? 'active' : ''}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('/search')}
              className={`mobile-nav-button ${location.pathname === '/search' ? 'active' : ''}`}
              aria-current={location.pathname === '/search' ? 'page' : undefined}
            >
              Search
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {showUserMenu && (
        <div
          className="dropdown-overlay"
          onClick={() => setShowUserMenu(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;