import { useState, useCallback } from "react";

// Define possible feedback types for better typing
type Feedback = "Forgot" | "Hard" | "Good" | "Easy";


export const useReviewFlashcard = () => {
  const [loadingFeedback, setLoading] = useState(false);
  const [errorFeedback, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const reviewFlashcard = useCallback(
    async (id: string, feedback: Feedback): Promise<any> => {
      setLoading(true);
      setError(null);
      try {
        const data = await reviewFlashcard(id, feedback);
        setSuccess(true); 
        return data;        
      } catch (err: any) {
        const errorMessage = err.response
          ? err.response.data
          : "Internal server error";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    reviewFlashcard,
    loadingFeedback,
    errorFeedback,
    success
  };
};
