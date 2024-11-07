import axios from "axios";

const CATEGORY_API_URL =
  `${process.env.REACT_APP_API_URL}/categories` ||
  "http://localhost:5000/api/categories";

// Create a new category
export const createCategory = async (categoryName: string) => {
  try {
    const response = await axios.post(
      `${CATEGORY_API_URL}/create`,
      { name: categoryName.toLowerCase() }, // Normalize to lowercase if needed
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Fetch all categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${CATEGORY_API_URL}/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};
