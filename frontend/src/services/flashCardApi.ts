import axios from "axios";

const FLASHCARD_API_URL = `${process.env.REACT_APP_API_URL}/flashcards` || "http://localhost:5000/api/flashcards";

// Create a flashcard
export const createFlashCard = async (flashCardData: {
  frontSide: string;
  backSide: string;
  category: string;  // This should be the category's _id
}) => {
  try {
    const response = await axios.post(
      `${FLASHCARD_API_URL}/createFlashCard`,
      flashCardData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};

// Edit a flashcard (without category)
export const editFlashCard = async (flashCardData: {
  id: string;
  frontSide?: string;
  backSide?: string;
}) => {
  try {
    const response = await axios.post(
      `${FLASHCARD_API_URL}/editFlashCard`,
      flashCardData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};

// Delete a flashcard
export const deleteFlashCard = async (flashCardData: { id: string }) => {
  try {
    const response = await axios.post(
      `${FLASHCARD_API_URL}/deleteFlashCard`,
      flashCardData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};

// Fetch the next flashcard due for review
export const getNextFlashCard = async (category: string) => {
  try {
    const response = await axios.get(`${FLASHCARD_API_URL}/nextFlashCard`, {
      params: { category },  // Send category as a query parameter
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};

// Review a flashcard with feedback
export const reviewFlashCard = async (id: string, feedback: "Forgot" | "Hard" | "Good" | "Easy") => {
  try {
    const response = await axios.post(
      `${FLASHCARD_API_URL}/reviewFlashCard/${id}`,
      { feedback },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};
