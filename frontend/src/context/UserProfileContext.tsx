import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  getUserInfo as fetchUserInfo, // Renamed to avoid conflict
  updateColorPreferences as updateColorPreferencesAPI, // Renamed to avoid conflict
  uploadProfilePic as uploadProfilePicAPI, // Renamed to avoid conflict
} from "../services/userApi"; // Make sure you import the correct service functions

interface IColorPreferences {
  primary: string;
  secondary: string;
}

interface IUser {
  _id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: string;
  colorPreferences: IColorPreferences;
  profilePic: string;
}

interface IProfileContext {
  userProfile: IUser | null;
  updateColorPreferences: (primary: string, secondary: string) => void;
  updateProfilePic: (profilePic: string) => void;
}

// Context and Provider
const UserProfileContext = createContext<IProfileContext | undefined>(
  undefined
);

export const useUserProfile = (): IProfileContext => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};

interface UserProfileProviderProps {
  children: ReactNode;
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchUserInfo(); // Renamed fetchUserInfo function
        console.log("User profile fetched:", response.user); // Debug log
        setUserProfile(response.user); // Assuming response contains 'user' in its data
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Update color preferences
  const handleUpdateColorPreferences = async (
    primary: string,
    secondary: string
  ) => {
    if (userProfile) {
      // Avoid unnecessary updates if values haven't changed
      if (
        userProfile.colorPreferences.primary === primary &&
        userProfile.colorPreferences.secondary === secondary
      ) {
        return; // No need to update if the colors are the same
      }

      // Update the profile locally
      const updatedProfile = {
        ...userProfile,
        colorPreferences: { primary, secondary },
      };
      setUserProfile(updatedProfile); // Update the state with the new color preferences

      try {
        // Call the API to update the color preferences on the backend
        const response = await updateColorPreferencesAPI(primary, secondary); // Renamed to avoid conflict
        console.log("Color preferences updated:", response);
      } catch (error) {
        console.error("Error updating color preferences:", error);
      }
    }
  };

  // Update the profile picture (if it changes)
  const handleUpdateProfilePic = async (profilePic: string) => {
    if (userProfile && userProfile.profilePic !== profilePic) {
      // Update the profile locally
      const updatedProfile = {
        ...userProfile,
        profilePic,
      };
      setUserProfile(updatedProfile);

      try {
        // Uncomment the line below to call the profile picture update API
        // const response = await uploadProfilePicAPI(profilePic); // Renamed to avoid conflict
        console.log("Profile picture updated:", profilePic);
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        updateColorPreferences: handleUpdateColorPreferences,
        updateProfilePic: handleUpdateProfilePic,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
