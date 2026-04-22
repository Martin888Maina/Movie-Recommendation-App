import React from "react";
import { Link } from "react-router-dom";
import "../styles/StaticPage.css";

const PrivacyPolicy = () => {
  const lastUpdated = "January 2025";

  return (
    <div className="static-page">
      <div className="static-page-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: {lastUpdated}</p>
        <div className="accent-bar"></div>
      </div>

      <div className="static-page-content">
        <Link to="/" className="static-back-link">
          ← Back to Home
        </Link>

        <div className="static-section">
          <h2>Overview</h2>
          <p>
            Movie App ("we", "us", or "our") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our service. By using Movie
            App, you agree to the practices described in this policy.
          </p>
        </div>

        <div className="static-section">
          <h2>Information We Collect</h2>
          <h3>Account Information</h3>
          <p>
            When you register, we collect your email address and display name.
            If you sign in with Google, we receive your name and email address
            from Google's authentication service.
          </p>
          <h3>Profile Data</h3>
          <p>
            You may optionally upload a profile photo. This image is stored
            securely and is only visible to you.
          </p>
          <h3>Usage Data</h3>
          <p>
            We may collect anonymised information about how you interact with
            the app — such as pages visited and search queries — to help us
            improve the experience. This data cannot be used to identify you
            personally.
          </p>
          <h3>Device Information</h3>
          <p>
            We automatically collect certain technical information, including
            your browser type, operating system, and IP address, to help
            diagnose issues and ensure service security.
          </p>
        </div>

        <div className="static-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain the Movie App service</li>
            <li>To personalise your movie browsing experience</li>
            <li>
              To send service-related emails (e.g., password resets, account
              notifications)
            </li>
            <li>To detect and prevent fraudulent or abusive activity</li>
            <li>To analyse usage patterns and improve the platform</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </div>

        <div className="static-section">
          <h2>Cookies and Tracking</h2>
          <p>
            Movie App uses session cookies to keep you signed in between visits.
            We may also use anonymised analytics cookies to understand how users
            navigate the app.
          </p>
          <p>
            You can disable cookies in your browser settings at any time.
            Disabling session cookies will require you to sign in each visit.
          </p>
        </div>

        <div className="static-section">
          <h2>Third-Party Services</h2>
          <h3>The Movie Database (TMDB)</h3>
          <p>
            All movie data, images, and metadata are provided by TMDB. When you
            use Movie App, your requests are served using TMDB's API. TMDB's own
            privacy policy applies to data processed on their end.
          </p>
          <h3>Firebase (Google)</h3>
          <p>
            We use Google Firebase for user authentication and profile storage.
            Firebase is a Google service, and your authentication data is
            processed under Google's Privacy Policy.
          </p>
        </div>

        <div className="static-section">
          <h2>Data Security</h2>
          <p>
            We use industry-standard security measures, including HTTPS
            encryption and Firebase's built-in security rules, to protect your
            data. However, no method of transmission over the internet is 100%
            secure, and we cannot guarantee absolute security.
          </p>
          <p>
            We retain your account data for as long as your account is active.
            You may request deletion of your account and associated data by
            contacting us.
          </p>
        </div>

        <div className="static-section">
          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights including access to,
            correction of, or deletion of your personal data. To exercise these
            rights, please contact us at the address below.
          </p>
        </div>

        <div className="static-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please{" "}
            <Link to="/contact" style={{ color: "#9ca3af" }}>
              contact us
            </Link>{" "}
            or email privacy@movieapp.example.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
