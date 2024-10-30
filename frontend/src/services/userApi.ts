import axios from "axios";

const USER_API_URL =
  `${process.env.REACT_APP_API_URL}/users` || "http://localhost:5000/api/users";

// Register user
export const registerUser = async (userData: {
  name: string;
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${USER_API_URL}/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Login user
export const loginUser = async (userData: {
  login: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${USER_API_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${USER_API_URL}/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
