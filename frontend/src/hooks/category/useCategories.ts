// useCategories.ts
import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categoryApi";

// Define and export the Category interface
export interface Category {
  _id: string;
  name: string;
  experience: number;
  cardCount: number;
}

// Define the result structure for the hook
interface UseCategoriesResult {
  data: Category[] | null;
  error: string | null;
  loading: boolean;
}

export const useCategories = (
  isAuthenticated: boolean
): UseCategoriesResult => {
  const [data, setData] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated) return; // Don’t fetch categories if not authenticated

      try {
        const data = await getAllCategories();
        setData(data);
      } catch (error: any) {
        setError(
          error.response ? error.response.data : "Internal server error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isAuthenticated]);

  return { data, error, loading };
};
