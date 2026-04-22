// Routes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GenreMovies from "./pages/GenreMovies";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ProtectedRoute from "../src/components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Public Routes - No authentication required */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />

      {/* Genre browsing page */}
      <Route path="/genre/:id" element={<GenreMovies />} />

      {/* Static support pages */}
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />

      {/* Footer quick-link redirects */}
      <Route path="/trending" element={<Navigate to="/" replace />} />
      <Route path="/popular" element={<Navigate to="/" replace />} />

      {/* Protected Routes - Authentication required */}
      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        }
      />

      {/* Profile Route - Protected */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
