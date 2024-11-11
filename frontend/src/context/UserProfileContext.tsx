import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  getUserInfo as fetchUserInfo,
  updateColorPreferences as updateColorPreferencesAPI,
  uploadProfilePic as uploadProfilePicAPI,
} from "../services/userApi";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchUserInfo();
        if (response.user) {
          setUserProfile(response.user);
        } else {
          setUserProfile(null);
          // navigate("/login"); // Redirect to login if the user is not authenticated
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
        setUserProfile(null);
        // navigate("/login"); // Redirect to login if error occurs
      }
    };

    fetchUserProfile();
  }, [navigate]);

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

      const updatedProfile = {
        ...userProfile,
        colorPreferences: { primary, secondary },
      };
      setUserProfile(updatedProfile);

      try {
        await updateColorPreferencesAPI(primary, secondary);
      } catch (error) {
        console.error("Error updating color preferences:", error);
      }
    }
  };

  const handleUpdateProfilePic = async (profilePic: File) => {
    if (userProfile && profilePic) {
      try {
        const response = await uploadProfilePicAPI(profilePic);
        const updatedProfile = {
          ...userProfile,
          profilePic: response.profilePic,
        };
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
