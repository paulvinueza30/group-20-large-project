import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Register user
export const registerUser = async (userData: {
  name: string;
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
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
    const response = await axios.post(`${API_URL}/users/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};
