import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/StaticPage.css";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="static-page">
      <div className="static-page-header">
        <h1>Contact Us</h1>
        <p>Have a question or feedback? We'd love to hear from you.</p>
        <div className="accent-bar"></div>
      </div>

      <div className="static-page-content">
        <Link to="/" className="static-back-link">
          ← Back to Home
        </Link>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="static-section">
            <h2>Send a Message</h2>

            {submitted ? (
              <div className="contact-success">
                <h3>Message Sent!</h3>
                <p>
                  Thanks for reaching out. Our team will get back to you within
                  1–2 business days.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your question or feedback..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="contact-submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="static-section">
            <h2>Get in Touch</h2>
            <p>
              We typically respond within 1–2 business days. For urgent matters,
              check the Help Center for quick answers.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-icon">✉️</span>
                <div className="contact-info-text">
                  <span className="contact-info-label">Email Support</span>
                  <span className="contact-info-value">
                    support@movieapp.example
                  </span>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">🕐</span>
                <div className="contact-info-text">
                  <span className="contact-info-label">Response Time</span>
                  <span className="contact-info-value">1–2 business days</span>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">💬</span>
                <div className="contact-info-text">
                  <span className="contact-info-label">Community</span>
                  <span className="contact-info-value">
                    Follow us on social media for updates and announcements.
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h3>Helpful Links</h3>
              <ul className="helpful-links-list">
                <li>
                  <Link to="/help">Help Center — Browse FAQs</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
