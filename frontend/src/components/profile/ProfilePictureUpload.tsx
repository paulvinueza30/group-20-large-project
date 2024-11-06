import React, { useState } from "react";
import { useUserProfile } from "../../context/UserProfileContext";
import { uploadProfilePic } from "../../services/userApi";

const ProfilePictureUpload = () => {
  const { userProfile, updateProfilePic } = useUserProfile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string); // Display image preview
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      // Call the API to upload the profile picture
      const response = await uploadProfilePic(selectedFile);
      console.log("Profile picture uploaded:", response);

      // Update the user profile with the full updated user object
      updateProfilePic(response.profilePic); // Assuming response contains 'user' with updated profilePic

      // Clear the selected file and preview after successful upload
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      setError("Failed to upload profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Profile Picture</h2>

      {/* Preview Image */}
      {preview && (
        <img
          src={preview}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      )}

      {/* File Input */}
      <input type="file" accept="image/*" onChange={handleFileSelect} />

      {/* Upload Button */}
      <button onClick={handleUpload} disabled={loading || !selectedFile}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Current Profile Picture */}
      {userProfile && userProfile.profilePic && (
        <div>
          <h3>Current Profile Picture:</h3>
          <img
            src={userProfile.profilePic}
            alt="Current Profile"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
