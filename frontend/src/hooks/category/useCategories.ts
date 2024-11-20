import { useState, useEffect, useCallback } from "react";
import { getAllCategories } from "../../services/categoryApi";

export interface Category {
  _id: string;
  name: string;
  experience: number;
  cardCount: number;
  streakCount: number;
}

interface UseCategoriesResult {
  data: Category[] | null;
  error: string | null;
  loading: boolean;
  refreshCategories: () => void;
}

export const useCategories = (
  isAuthenticated: boolean,
  refreshToken: number = 0 // Set a default value for refreshToken
): UseCategoriesResult => {
  const [data, setData] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const categories = await getAllCategories();
      setData(categories);
    } catch (error: any) {
      setError(error.response ? error.response.data : "Internal server error");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, refreshToken]); // Add refreshToken as a dependency

  return { data, error, loading, refreshCategories: fetchCategories };
};
