import axios from "axios";

const FLASHCARD_API_URL = `${process.env.REACT_APP_API_URL}/flashcards` || "http://localhost:5000/api/flashcards";

// Create a flashcard
export const createFlashCard = async (flashCardData: {
  question: string;
  answer: string;
  category: string;
}) => {
  try {
    const response = await axios.post(`${FLASHCARD_API_URL}/createFlashCard`, flashCardData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};

// Edit a flashcard
export const editFlashCard = async (flashCardData: {
  id: string;
  question?: string;
  answer?: string;
  category?: string;
}) => {
  try {
    const response = await axios.post(`${FLASHCARD_API_URL}/editFlashCard`, flashCardData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};

// Delete a flashcard
export const deleteFlashCard = async (flashCardData: { id: string }) => {
  try {
    const response = await axios.post(`${FLASHCARD_API_URL}/deleteFlashCard`, flashCardData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Internal server error");
  }
};

// Fetch the next flashcard due for review
export const getNextFlashCard = async () => {
  try {
    const response = await axios.get(`${FLASHCARD_API_URL}/nextFlashCard`, {
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
