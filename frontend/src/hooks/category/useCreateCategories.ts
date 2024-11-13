import { useState } from "react";
import { createCategory as createCategoryAPI } from "../../services/categoryApi";
import { Category } from "./useCategories";

interface UseCreateCategoryResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  create: (name: string) => Promise<Category | null>; // Updated return type
}

export const useCreateCategory = (): UseCreateCategoryResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const create = async (name: string): Promise<Category | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newCategory = await createCategoryAPI(name); // Assuming this API returns the created category
      setSuccess(true);
      return newCategory;
    } catch (error) {
      setError("Failed to create category");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, create };
};
