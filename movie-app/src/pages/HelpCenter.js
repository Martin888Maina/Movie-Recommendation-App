import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/StaticPage.css";

const faqs = [
  {
    category: "Account",
    items: [
      {
        q: "How do I create an account?",
        a: "Click the 'Get Started' button in the top navigation bar. You can sign up using your email address and a password, or use Google Sign-In for a faster setup.",
      },
      {
        q: "How do I reset my password?",
        a: "On the login page, click 'Forgot Password?' and enter your email address. We'll send you a reset link within a few minutes. Check your spam folder if you don't see it.",
      },
      {
        q: "Can I change my email address?",
        a: "Email changes are not currently supported for security reasons. If you need help, please reach out through the Contact Us page.",
      },
      {
        q: "How do I update my display name?",
        a: "Go to your Profile page (accessible via the user menu in the top right). Click 'Edit' to update your display name and save the changes.",
      },
    ],
  },
  {
    category: "Browsing Movies",
    items: [
      {
        q: "How do I search for a specific movie?",
        a: "Use the search bar at the top of the page or navigate to the Search page. You can type the movie title or keywords and results will appear as you type.",
      },
      {
        q: "What does the rating number mean?",
        a: "Ratings are sourced from The Movie Database (TMDB) and are on a scale of 0 to 10, based on votes from thousands of users worldwide. Higher ratings indicate more positively received films.",
      },
      {
        q: "How do I browse movies by genre?",
        a: "On the home page, scroll down to the 'Browse by Genre' section. Click on any genre card such as Action, Comedy, or Drama to see movies from that category.",
      },
      {
        q: "Can I see more details about a movie?",
        a: "Yes, click on any movie card to view its full details page, including the synopsis, cast, runtime, genres, ratings, and related movies. Note that you need to be signed in to view movie details.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "Why are some movie images not loading?",
        a: "This can happen due to a slow internet connection or a temporary issue with the image server. Try refreshing the page or checking your network connection.",
      },
      {
        q: "The app is running slowly. What can I do?",
        a: "Try clearing your browser cache and cookies, then reload the page. Make sure your browser is up to date. The app works best on the latest versions of Chrome, Firefox, Safari, and Edge.",
      },
      {
        q: "Which browsers are supported?",
        a: "Movie App supports the latest two versions of Chrome, Firefox, Safari, and Microsoft Edge. Internet Explorer is not supported.",
      },
    ],
  },
];

const HelpCenter = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (id) => setOpenItem((prev) => (prev === id ? null : id));

  return (
    <div className="static-page">
      <div className="static-page-header">
        <h1>Help Center</h1>
        <p>Find answers to common questions about Movie App</p>
        <div className="accent-bar"></div>
      </div>

      <div className="static-page-content">
        <Link to="/" className="static-back-link">
          ← Back to Home
        </Link>

        {faqs.map((section) => (
          <div className="static-section" key={section.category}>
            <h2>{section.category}</h2>
            {section.items.map((item, index) => {
              const id = `${section.category}-${index}`;
              const isOpen = openItem === id;
              return (
                <div className="faq-item" key={id}>
                  <button
                    className={`faq-question${isOpen ? " open" : ""}`}
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className={`faq-arrow${isOpen ? " open" : ""}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && <div className="faq-answer">{item.a}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
