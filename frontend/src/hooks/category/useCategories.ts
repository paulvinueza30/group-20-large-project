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

export const useCategories = (
  isAuthenticated: boolean
): UseCategoriesResult => {
  const [data, setData] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return; // Do not fetch categories if not authenticated
      }

      setLoading(true); // Start loading
      setError(null); // Reset any previous errors

      try {
        // Make sure the server is up by pinging the endpoint first (optional)
        await fetch(`${process.env.REACT_APP_API_URL}/healthcheck`);

        const data = await getAllCategories(); // Fetch categories
        setData(data); // Set the fetched categories
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Failed to fetch categories"
          );
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false); // Stop loading after request
      }
    };

    if (isAuthenticated) {
      fetchCategories(); // Only fetch categories when authenticated
    }
  }, [isAuthenticated]); // Refetch when authentication status changes

  return { data, error, loading };
};
