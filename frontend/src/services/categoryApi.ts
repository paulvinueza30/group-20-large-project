import axios from "axios";

const CATEGORY_API_URL =
  `${process.env.REACT_APP_API_URL}/categories` ||
  "http://localhost:5000/api/categories";

// Create a new category
export const createCategory = async (categoryName: string) => {
  try {
    const response = await axios.post(
      `${CATEGORY_API_URL}/create`,
      { name: categoryName.toLowerCase() }, // Ensure category name is lowercase
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Fetch all categories for the logged-in user
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${CATEGORY_API_URL}/all`, {
      withCredentials: true,
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Delete a category by ID, along with all associated flashcards
export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await axios.delete(
      `${CATEGORY_API_URL}/delete/${categoryId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};
