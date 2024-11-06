import { useState } from "react";
import { createCategory } from "../../services/categoryApi";

interface UseCreateCategoryResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  create: (categoryName: string) => Promise<void>;
}

export const useCreateCategory = (): UseCreateCategoryResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const create = async (categoryName: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Gets the response back from the API
      const response = await createCategory(categoryName);
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
