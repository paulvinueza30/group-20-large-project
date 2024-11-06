import { useEffect, useState } from "react";
import { getUserInfo } from "../services/userApi";

interface User {
  id: string;
  name: string;
  email: string;
}

const useGetUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error fetching user info");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { user, loading, error };
};

export default useGetUserInfo;
