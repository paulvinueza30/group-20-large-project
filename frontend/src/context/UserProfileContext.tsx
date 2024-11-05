import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

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
        const response = await axios.get("/api/users/user", {
          withCredentials: true,
        });
        setUserProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  const updateColorPreferences = (primary: string, secondary: string) => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        colorPreferences: { primary, secondary },
      };
      setUserProfile(updatedProfile);
      axios.put("/api/users/update-color", { primary, secondary });
    }
  };

  const updateProfilePic = (profilePic: string) => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        profilePic,
      };
      setUserProfile(updatedProfile);
      axios.put("/api/users/update-profile-pic", { profilePic });
    }
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, updateColorPreferences, updateProfilePic }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
