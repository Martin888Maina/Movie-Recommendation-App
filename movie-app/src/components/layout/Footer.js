import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-logo">
              <div className="brand-icon">
                <svg
                  className="brand-icon-svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                </svg>
              </div>
              <span className="brand-title">Movie App</span>
            </div>
            <p className="brand-description">
              Discover and explore thousands of movies with detailed
              information, ratings, cast details, and personalized
              recommendations. Your ultimate movie discovery companion.
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/"
                className="social-link"
                aria-label="Facebook"
              >
                <svg
                  className="social-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://x.com/"
                className="social-link"
                aria-label="Twitter"
              >
                <svg
                  className="social-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/accounts/login/?hl=en"
                className="social-link"
                aria-label="Instagram"
              >
                <svg
                  className="social-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.478 2C3.12 2 2.002 3.12 2.002 4.478v11.044C2.002 16.88 3.12 18 4.478 18h11.044c1.358 0 2.478-1.12 2.478-2.478V4.478C18 3.12 16.88 2 15.522 2H4.478zM10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.5a3 3 0 110-6 3 3 0 010 6zm5.5-8.5a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-header">Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li className="footer-link-item">
                <a href="/search" className="footer-link">
                  Browse Movies
                </a>
              </li>
              <li className="footer-link-item">
                <a href="/trending" className="footer-link">
                  Trending
                </a>
              </li>
              <li className="footer-link-item">
                <a href="/popular" className="footer-link">
                  Popular
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-section-header">Support</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="/help" className="footer-link">
                  Help Center
                </a>
              </li>
              <li className="footer-link-item">
                <a href="/contact" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li className="footer-link-item">
                <a href="/privacy" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li className="footer-link-item">
                <a href="/terms" className="footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} MovieApp. All rights reserved.
          </div>
          <div className="footer-powered">
            <span>Powered by</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-tmdb-link"
            >
              TMDB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
