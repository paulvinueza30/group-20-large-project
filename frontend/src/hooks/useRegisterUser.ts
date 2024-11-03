import { useState } from "react";
import { registerUser } from "../services/userApi"; // Adjust the import path accordingly

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const register = async (userData: {
    name: string;
    userName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await registerUser(userData);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegisterUser;
