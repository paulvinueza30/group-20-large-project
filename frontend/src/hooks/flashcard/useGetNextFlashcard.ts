import { useState, useEffect, useCallback } from "react";
import { getNextFlashcard } from "../../services/flashCardApi";

interface Flashcard {
  _id: string;
  category: string;
  frontSide: string;
  backSide: string;
}

export const useGetNextFlashcard = (category: string) => {
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlashcard = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const data = await getNextFlashcard(category);
      if (data.message) {
        // If the backend sends a message indicating no flashcards
        setError(data.message); // Set error with the message
        setFlashcard(null); // No flashcards available
      } else {
        setFlashcard(data); // Update the flashcard state with fetched data
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load flashcard");
    } finally {
      setLoading(false);
    }
  }, [category]); // Memoize based on category

  useEffect(() => {
    if (category) {
      fetchFlashcard(); // Fetch the next flashcard when category changes
    }
  }, [category, fetchFlashcard]); // Add fetchFlashcard as a dependency

  const refetch = fetchFlashcard; // Alias for manual refetching

  return { flashcard, loading, error, refetch };
};
