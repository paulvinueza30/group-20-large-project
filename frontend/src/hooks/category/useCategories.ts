import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categoryApi";
import axios from "axios";

interface Category {
  _id: string;
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
      setLoading(true);
      setError(null);

      try {
        const healthCheckResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/healthcheck`
        );
        if (!healthCheckResponse.ok) {
          throw new Error("Server not healthy or user not authenticated");
        }

        // Fetch categories from the API
        const fetchedCategories = await getAllCategories();
        setData(fetchedCategories); // Set the fetched categories
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Failed to fetch categories"
          );
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { data, error, loading };
};
