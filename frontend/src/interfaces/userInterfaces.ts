// userInterfaces.ts

// Color Preferences Interface
export interface IColorPreferences {
  primary: string;
  secondary: string;
}

// User Interface
export interface IUser {
  _id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: string;
  colorPreferences: IColorPreferences;
  profilePic: string;
}

// Profile Context Interface (for managing user profile state)
export interface IProfileContext {
  userProfile: IUser | null;
  updateColorPreferences: (primary: string, secondary: string) => void;
  updateProfilePic: (profilePic: string) => void;
}
