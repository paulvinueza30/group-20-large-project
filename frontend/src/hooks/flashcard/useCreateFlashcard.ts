import { useState } from "react";
import { createFlashcard } from "../../services/flashCardApi";

interface UseCreateFlashcardResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  create: (flashcardData: {
    frontSide: string;
    backSide: string;
    category: string;
  }) => Promise<void>;
}

export const useCreateFlashcard = (): UseCreateFlashcardResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const create = async (flashcardData: {
    frontSide: string;
    backSide: string;
    category: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Gets the response back from the API
      const response = await createFlashcard(flashcardData);
      setSuccess(true); // Set success only if login is successful
      return response; // Return response for further handling if needed
    } catch (error: any) {
      setError(error.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error, success };
};
