import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  // Function to truncate email with ellipsis
  const truncateEmail = (email, maxLength = 20) => {
    if (!email) return "";
    if (email.length <= maxLength) return email;

    // Find the @ symbol position
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;

    // If the part before @ is too long, truncate it
    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex);

    if (localPart.length > maxLength - 3) {
      return localPart.slice(0, maxLength - 3) + "...";
    }

    // If total length is too long, truncate domain part
    if (email.length > maxLength) {
      const availableSpace = maxLength - localPart.length - 3;
      return localPart + domainPart.slice(0, availableSpace) + "...";
    }

    return email;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select a valid image file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size should be less than 5MB.");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setFormData((prev) => ({
          ...prev,
          photoURL: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      photoURL: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const updates = {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      };

      const result = await updateProfile(updates);

      if (result.success) {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
        setPreviewImage(null);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage(result.error || "Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating profile.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    });
    setPreviewImage(null);
    setIsEditing(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* Header */}
        <div className="profile-header">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <svg
              className="back-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="profile-title">Profile Settings</h1>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="message success-message">
            <svg
              className="message-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="message error-message">
            <svg
              className="message-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errorMessage}
          </div>
        )}

        {/* Profile Card */}
        <div className="profile-card">
          <form onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="avatar-wrapper">
                  {previewImage || formData.photoURL ? (
                    <img
                      src={previewImage || formData.photoURL}
                      alt="Profile"
                      className="avatar-image"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      <svg
                        className="avatar-icon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  )}

                  {isEditing && (
                    <div className="avatar-overlay">
                      <button
                        type="button"
                        className="avatar-edit-button"
                        onClick={triggerFileInput}
                        aria-label="Change profile picture"
                      >
                        <svg
                          className="edit-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                      {(previewImage || formData.photoURL) && (
                        <button
                          type="button"
                          className="avatar-remove-button"
                          onClick={handleRemoveImage}
                          aria-label="Remove profile picture"
                        >
                          <svg
                            className="remove-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-file-input"
                  aria-hidden="true"
                />
              </div>

              <div className="avatar-info">
                <h2 className="user-name">{user.displayName || "User"}</h2>
                <p className="user-email" title={user.email}>
                  {truncateEmail(user.email)}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="displayName" className="form-label">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={!isEditing}
                  placeholder="Enter your display name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="form-input disabled"
                  disabled
                  title="Email cannot be changed"
                />
                <p className="form-hint">Email address cannot be changed</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-section">
              {!isEditing ? (
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                  disabled={loading}
                >
                  <svg
                    className="button-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div className="button-group">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                    disabled={updateLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="save-button"
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <>
                        <svg
                          className="loading-spinner"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg
                          className="button-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="info-section">
          <h3 className="info-title">Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Account Created</span>
              <span className="info-value">
                {new Date(
                  user.metadata?.creationTime || Date.now(),
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Sign In</span>
              <span className="info-value">
                {new Date(
                  user.metadata?.lastSignInTime || Date.now(),
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
