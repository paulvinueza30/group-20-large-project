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
      `${FLASHCARD_API_URL}/create/${flashcardData.categoryId}`,
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
      `${FLASHCARD_API_URL}/edit/${flashcardData.id}`,
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
    const response = await axios.delete(`${FLASHCARD_API_URL}/delete/${id}`, {
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
