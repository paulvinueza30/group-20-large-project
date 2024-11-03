import { useEffect, useState } from "react";
import { getToDo } from "../services/toDoApi";

const useGetTodo = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchToDos = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getToDo();
          setTodos(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
          setLoading(false);
        }
      };
  
      fetchToDos();
    }, []);
  
    return { todos, loading, error };
  };
  
  export default useGetTodo;