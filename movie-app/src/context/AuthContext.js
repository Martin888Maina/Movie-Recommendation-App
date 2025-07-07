// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const result = await authService.login(email, password);

    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  const register = async (email, password, displayName) => {
    setLoading(true);
    setError(null);

    const result = await authService.register(email, password, displayName);

    // Prevents automatic login after registration
    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    const result = await authService.loginWithGoogle();

    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    const result = await authService.logout();

    if (result.success) {
      setUser(null);
    }

    setLoading(false);
    return result;
  };

  const resetPassword = async (email) => {
    setError(null);
    return await authService.resetPassword(email);
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);

    const result = await authService.updateUserProfile(updates);

    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
    updateProfile,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
