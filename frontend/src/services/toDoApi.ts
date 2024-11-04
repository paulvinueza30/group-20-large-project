import axios from "axios";

const TODO_API_URL =
  `${process.env.REACT_APP_API_URL}/todos` || "http://localhost:5000/api/todos";

// Create a new todo
export const createTodo = async (toDoData: { toDo: string }) => {
  try {
    const response = await axios.post(`${TODO_API_URL}/createToDo`, toDoData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Edit an existing todo
export const editTodo = async (id: string, toDoData: { toDo: string }) => {
  try {
    const response = await axios.put(
      `${TODO_API_URL}/editTodo/${id}`,
      toDoData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete(`${TODO_API_URL}/deleteTodo/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Toggle todo status
export const todoDone = async (id: string) => {
  try {
    const response = await axios.put(
      `${TODO_API_URL}/todoDone/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

export const getTodos = async () => {
  try {
    const response = await axios.get(`${TODO_API_URL}/getTodos`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
