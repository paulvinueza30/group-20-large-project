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
      await createCategory(categoryName); // No need to return response
      setSuccess(true);
    } catch (error: any) {
      setError(error?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error, success };
};
