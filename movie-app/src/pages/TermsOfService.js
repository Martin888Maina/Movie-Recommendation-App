import React from "react";
import { Link } from "react-router-dom";
import "../styles/StaticPage.css";

const TermsOfService = () => {
  const lastUpdated = "January 2025";

  return (
    <div className="static-page">
      <div className="static-page-header">
        <h1>Terms of Service</h1>
        <p>Last updated: {lastUpdated}</p>
        <div className="accent-bar"></div>
      </div>

      <div className="static-page-content">
        <Link to="/" className="static-back-link">
          ← Back to Home
        </Link>

        <div className="static-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Movie App ("the Service"), you agree to be
            bound by these Terms of Service. If you do not agree to any part of
            these terms, you may not access the Service.
          </p>
          <p>
            We reserve the right to update or modify these terms at any time
            without prior notice. Your continued use of the Service after any
            changes constitutes your acceptance of the new terms.
          </p>
        </div>

        <div className="static-section">
          <h2>2. Description of Service</h2>
          <p>
            Movie App is a free online platform that allows users to discover,
            search, and explore information about movies. All movie data,
            imagery, and metadata are sourced from The Movie Database (TMDB) API
            and are subject to TMDB's own terms of use.
          </p>
          <p>
            The Service is provided for personal, non-commercial use only.
            Features include movie search, browsing by genre, viewing movie
            details, and managing a personal profile.
          </p>
        </div>

        <div className="static-section">
          <h2>3. User Accounts</h2>
          <p>
            To access certain features, you must create an account. You are
            responsible for maintaining the confidentiality of your account
            credentials and for all activity that occurs under your account.
          </p>
          <p>
            You agree to provide accurate information when registering and to
            update it as necessary. We reserve the right to suspend or terminate
            accounts that violate these terms.
          </p>
        </div>

        <div className="static-section">
          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the Service for any unlawful or unauthorised purpose
            </li>
            <li>
              Attempt to gain unauthorised access to any part of the Service or
              its infrastructure
            </li>
            <li>
              Scrape, crawl, or extract data from the Service using automated
              means without written permission
            </li>
            <li>
              Use the Service to distribute spam, malware, or harmful content
            </li>
            <li>
              Misrepresent your identity or impersonate another person
            </li>
            <li>
              Use the Service for commercial purposes without explicit written
              consent
            </li>
          </ul>
        </div>

        <div className="static-section">
          <h2>5. Intellectual Property</h2>
          <p>
            All movie data, images, and related media displayed on Movie App are
            owned by their respective rights holders and are sourced via the
            TMDB API under TMDB's terms of use.
          </p>
          <p>
            The Movie App interface, design, and original content are the
            property of Movie App and may not be reproduced without permission.
          </p>
        </div>

        <div className="static-section">
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis
            without warranties of any kind, either express or implied. We do not
            warrant that the Service will be uninterrupted, error-free, or free
            of viruses or other harmful components.
          </p>
          <p>
            We are not responsible for the accuracy, completeness, or
            availability of third-party content, including movie data sourced
            from TMDB.
          </p>
        </div>

        <div className="static-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Movie App and its operators
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of or
            inability to use the Service.
          </p>
        </div>

        <div className="static-section">
          <h2>8. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in
            accordance with the laws of the jurisdiction in which the service
            operator is based, without regard to its conflict of law provisions.
          </p>
        </div>

        <div className="static-section">
          <h2>9. Contact</h2>
          <p>
            If you have any questions about these Terms of Service, please{" "}
            <Link to="/contact" style={{ color: "#9ca3af" }}>
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
