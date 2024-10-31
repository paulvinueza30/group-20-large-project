import axios from "axios";

const TODO_API_URL = `${process.env.REACT_APP_API_URL}/todos` || "http://localhost:5000/api/todos";

export const createToDo = async (toDoData: {todo: string}) => {
   try {
     const response = await axios.post('${TODO_API_URL}/createToDo', todoData, {
	withCredentials: true,
     });
     return response.data;
   } catch (error: any) {
     throw error.response
       ? error.response.data
       : new Error("Internal server error");
   }
};

export const editToDo = async (id: string, toDoData: {todo: string}) => {
   try {
     const response = await axios.post('${TODO_API_URL}/editToDo', todoData, {
        withCredentials: true,
     });
     return response.data;
   } catch (error: any) {
     throw error.response
       ? error.response.data
       : new Error("Internal server error");
   }
};

export const deleteToDo = async (id: string) => {
   try {
     const response = await axios.post('${TODO_API_URL}/deleteToDo', {id}, {
        withCredentials: true,
     });
     return response.data;
   } catch (error: any) {
     throw error.response
       ? error.response.data
       : new Error("Internal server error");
   }
};

export const toDoDone = async (id: string) => {
   try {
     const response = await axios.post('${TODO_API_URL}/toDoDone', {id}, {
        withCredentials: true,
     });
     return response.data;
   } catch (error: any) {
     throw error.response
       ? error.response.data
       : new Error("Internal server error");
   }
};

export const getToDo = async () => {
   try {
     const response = await axios.get('${TODO_API_URL}/getToDo', {
	withCredentials: true,
     });
     return response.data;
   } catch (error) {
     throw error;
   }
};
