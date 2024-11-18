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
  userExperience: number;
  userLevel: number;
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

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userFromStorage = localStorage.getItem("userProfile");
        if (userFromStorage) {
          setUserProfile(JSON.parse(userFromStorage));
          setLoading(false);
          return;
        }
        const response = await fetchUserInfo();
        if (response.user) {
          setUserProfile(response.user);
          localStorage.setItem("userProfile", JSON.stringify(response.user));
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
        setUserProfile(null);
      } finally {
        setLoading(false);
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
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

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
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
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
      {!loading && children}
    </UserProfileContext.Provider>
  );
};
