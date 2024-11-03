import { useState } from "react";
import { createToDo } from "../services/toDoApi";

const useCreateTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const create = async (toDoData: {toDo: string}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Gets the response back from the API
      const response = await createToDo(toDoData);
      setSuccess(true); // Set success only if login is successful
      return response; // Return response for further handling if needed
    } catch (error: any) {
      setError(error.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error, success };
};

export default useCreateTodo;
