import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/StaticPage.css";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
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
                <span className="contact-info-icon">✉</span>
                <div>
                  <strong style={{ color: "#e2e8f0" }}>Email Support</strong>
                  <br />
                  support@movieapp.example
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">🕐</span>
                <div>
                  <strong style={{ color: "#e2e8f0" }}>Response Time</strong>
                  <br />
                  1–2 business days
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">💬</span>
                <div>
                  <strong style={{ color: "#e2e8f0" }}>Community</strong>
                  <br />
                  Follow us on social media for updates and announcements.
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h3>Helpful Links</h3>
              <ul>
                <li>
                  <Link to="/help" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Help Center — Browse FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Terms of Service
                  </Link>
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
