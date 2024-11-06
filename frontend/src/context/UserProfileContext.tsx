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
  updateProfilePic: (profilePic: File) => void;
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
      if (
        userProfile.colorPreferences.primary === primary &&
        userProfile.colorPreferences.secondary === secondary
      ) {
        return;
      }

      // Update the profile locally
      const updatedProfile = {
        ...userProfile,
        colorPreferences: { primary, secondary },
      };
      setUserProfile(updatedProfile); // Update the state with the new color preferences

      try {
        // Call the API to update the color preferences on the backend
        const response = await updateColorPreferencesAPI(primary, secondary);
      } catch (error) {
        console.error("Error updating color preferences:", error);
      }
    }
  };

  // Update the profile picture (if it changes)
  const handleUpdateProfilePic = async (profilePic: File) => {
    if (userProfile && profilePic) {
      // Perform the upload first, don't compare based on file name
      try {
        // Upload the image using the API
        const response = await uploadProfilePicAPI(profilePic);

        // Assuming the response contains the new profilePic URL, update the user profile
        const updatedProfile = {
          ...userProfile,
          profilePic: response.profilePic, // Set the response profilePic URL
        };

        // Update the context state with the new profile picture URL
        setUserProfile(updatedProfile);
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
