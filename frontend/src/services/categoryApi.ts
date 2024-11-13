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
    // Catch and handle errors properly
    console.error("Error creating category:", error);
    throw error.response
      ? new Error(error.response.data.message || "Failed to create category")
      : new Error("Internal server error");
  }
};

// Fetch all categories for the logged-in user
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${CATEGORY_API_URL}/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    // Catch and handle errors properly
    console.error("Error fetching categories:", error);
    throw error.response
      ? new Error(error.response.data.message || "Failed to fetch categories")
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
    // Catch and handle errors properly
    console.error("Error deleting category:", error);
    throw error.response
      ? new Error(error.response.data.message || "Failed to delete category")
      : new Error("Internal server error");
  }
};

// Edit a category name
export const editCategory = async (categoryId: string, newName: string) => {
  try {
    const response = await axios.put(
      `${CATEGORY_API_URL}/edit/${categoryId}`, // Updated to match Express route
      { name: newName.toLowerCase() }, // Ensure new name is lowercase for consistency
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    // Catch and handle errors properly
    console.error("Error updating category:", error);
    throw error.response
      ? new Error(error.response.data.message || "Failed to update category")
      : new Error("Internal server error");
  }
};

