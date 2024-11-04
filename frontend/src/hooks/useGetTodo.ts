import { useEffect, useState } from "react";
import { getToDo } from "../services/toDoApi";

interface Todo {
  _id: string;
  toDo: string;
  markDone: boolean;
  editedAt: string | null;
  createdAt: string;
}

interface TodoState {
  toDolist: Todo[];
  loading: boolean;
  error: string | null;
}

const useGetTodo = (): TodoState => {
  const [todos, setTodos] = useState<TodoState>({
    toDolist: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getToDo();
        setTodos({ toDolist: data.toDolist, loading: false, error: null });
      } catch (error: any) {
        setTodos({ toDolist: [], loading: false, error: error.message });
      }
    };

    fetchTodos();
  }, []);

  return todos;
};

export default useGetTodo;
