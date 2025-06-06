import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../services/auth';
import { confirmPasswordReset } from 'firebase/auth';
import { toast } from 'react-toastify';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!oobCode) {
      toast.error('Invalid or expired reset link.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/login', { replace: true });
    }
  }, [oobCode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters long.', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success('Password has been reset successfully!', {
        position: 'top-right',
        autoClose: 5000,
      });
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (error) {
      toast.error('Failed to reset password. Link may be expired.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Password</h2>
        <p>Create a new password for your account.</p>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-group password-group">
            <label htmlFor="password">New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={6}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                minLength={6}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-password-btn"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn primary-btn"
            disabled={isLoading || !password.trim() || !confirmPassword.trim()}
          >
            {isLoading ? 'Updating...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;