import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categoryApi";

interface Category {
  id: number;
  name: string;
}

interface UseCategoriesResult {
  data: Category[] | null;
  error: string | null;
  loading: boolean;
}

export const useCategories = (): UseCategoriesResult => {
  const [data, setData] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
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
  }, []);

  return { data, error, loading };
};
