import { useState } from "react";
import { createFlashcard } from "../../services/flashCardApi";
import { IFlashcard } from "../../interfaces/IFlashcard";

export const useCreateFlashcard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (flashcardData: {
    frontSide: string;
    backSide: string;
    categoryId: string;
  }): Promise<IFlashcard> => {
    setLoading(true);
    setError(null);
    try {
      const newFlashcard = await createFlashcard(flashcardData); // Assume API returns the created flashcard
      setLoading(false);
      return newFlashcard; // Return the created flashcard
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "An error occurred while creating the flashcard");
      throw err; // Re-throw the error for handling
    }
  };

  return { create, loading, error };
};
