import React, { useState } from 'react';
import TodoItem from './TodoItem';
import useCreateTodo from '../../hooks/useCreateTodo';

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
    <div className='p-2'>
      <h2 className='text-center font-bold text-xl py-2'>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 p-2 my-2"
          name="toDo"
          value={toDoData.toDo}
          onChange={handleChange}
          placeholder="Add a Todo"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary p-2 text-white rounded-xl px-4 mt-3"
        >
          {loading ? "Adding..." : "Add To Do"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <ul>
        {/* Render TodoItem components here*/}
      </ul>
    </div>
  );
}

export default TodoList;
