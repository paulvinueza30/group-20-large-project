import React, { useState } from "react";
import TodoItem from "./TodoItem";
import useCreateTodo from "../../hooks/todo/useCreateTodo";
import { PlusIcon } from "@heroicons/react/24/outline";

function TodoList() {
  const { create, loading, error } = useCreateTodo();
  const [toDoData, setToDoData] = useState({ toDo: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setToDoData({ toDo: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await create(toDoData);
      setToDoData({ toDo: "" }); // Clear input after submission
    } catch (err) {
      // Handle errors if necessary
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-center font-bold text-xl py-2">Todo List</h2>
      <ul>{/* <TodoItem /> */}</ul>
      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          className="border-2 m-s"
          name="toDo"
          value={toDoData.toDo}
          onChange={handleChange}
          placeholder="Add a Todo"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary ml-4 text-white rounded-full p-4"
        >
          <PlusIcon className="h-4 w-4 text-white" />
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default TodoList;
