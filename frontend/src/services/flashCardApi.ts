import axios from "axios";

const FLASHCARD_API_URL =
  `${process.env.REACT_APP_API_URL}/flashcards` ||
  "http://localhost:5000/api/flashcards";

// Create a flashcard
export const createFlashcard = async (flashcardData: {
  frontSide: string;
  backSide: string;
  categoryId: string;
}) => {
  try {
    const response = await axios.post(
      `${FLASHCARD_API_URL}/createFlashcard/${flashcardData.categoryId}`,
      { frontSide: flashcardData.frontSide, backSide: flashcardData.backSide },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Edit a flashcard
export const editFlashcard = async (flashcardData: {
  id: string;
  frontSide?: string;
  backSide?: string;
}) => {
  try {
    const response = await axios.put(
      `${FLASHCARD_API_URL}/editFlashcard/${flashcardData.id}`,
      { frontSide: flashcardData.frontSide, backSide: flashcardData.backSide },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Delete a flashcard
export const deleteFlashcard = async (id: string) => {
  try {
    const response = await axios.delete(`${FLASHCARD_API_URL}/deleteFlashcard/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Fetch the next flashcard due for review in a specific category
export const getNextFlashcard = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `${FLASHCARD_API_URL}/nextFlashcard/${categoryId}`,
      { withCredentials: true }
    );
    if (response.status === 204) {
      // Handle the no content situation specifically for frontend
      return { message: "No flashcards left in this category" };
    }
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Review a flashcard with feedback
export const reviewFlashcard = async (
  id: string,
  feedback: "Forgot" | "Hard" | "Good" | "Easy"
) => {
  try {
    const response = await axios.put(
      `${FLASHCARD_API_URL}/reviewFlashcard/${id}`,
      { feedback },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

export const getAllFlashcards = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `${FLASHCARD_API_URL}/allFlashcards/${categoryId}`,
      { withCredentials: true }
    );
    console.log("API Response:", response.data); // Log to check if the backend is returning data
    return response.data;
  } catch (error: any) {
    console.error("Error in getAllFlashcards:", error);
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

