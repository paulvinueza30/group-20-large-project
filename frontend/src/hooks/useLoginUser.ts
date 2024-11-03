import { useState } from "react";
import { loginUser } from "../services/userApi"; // Adjust the import path accordingly

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const login = async (userData: { login: string; password: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await loginUser(userData);
      setSuccess(true); // Set success only if login is successful
      return response; // Return response for further handling if needed
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLoginUser;
