// IUser.ts
export interface IColorPreferences {
  primary: string;
  secondary: string;
}

export interface IUser {
  _id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: string;
  colorPreferences: IColorPreferences;
  profilePic: string;
}
