import { useState, useEffect } from "react";
import { getNextFlashcard } from "../../services/flashCardApi";

// Define types for the flashcard data (modify based on the actual structure of the API response)
interface Flashcard {
  _id: string;
  category: string;
  frontSide: string;
  backSide: string;
}

export const useGetNextFlashcard = (
  category: string,
  p0: { refetchOnWindowFocus: boolean; staleTime: number }
) => {
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlashcard = async () => {
    setLoading(true);
    setError(null); // Reset the error on each new fetch
    try {
      const data = await getNextFlashcard(category);
      setFlashcard(data); // Update flashcard with the new data
    } catch (err: any) {
      setError(err?.message || "Failed to load flashcard");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the flashcard whenever the category changes or the flashcard ID changes
  useEffect(() => {
    fetchFlashcard(); // Initial fetch on category change
  }, [category]); // Dependency on category ensures the hook re-fetches when category changes

  // Watch for flashcard ID changes and trigger a fetch when the ID changes (use flashcard._id as a dependency)
  useEffect(() => {
    if (flashcard && flashcard._id) {
      fetchFlashcard(); // Trigger refetch whenever the flashcard ID changes
    }
  }, [flashcard?._id]); // Refetch when flashcard._id changes

  const refetch = () => {
    fetchFlashcard();
  };

  return { flashcard, loading, error, refetch };
};
