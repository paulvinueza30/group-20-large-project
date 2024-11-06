import React, { useState } from "react";
import useGetTodo from "../../hooks/useGetTodo";

const TodoItem: React.FC = () => {
  const [markedDone, setMarkedDone] = useState(Boolean);

  const { toDolist, loading, error } = useGetTodo();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {toDolist.map((todo) => (
        <li key={todo._id} className="bg-white rounded-xl">
          <input
            type="checkbox"
            className="bg-secondary w-4 h-4 accent-primary"
            checked={markedDone == todo.markDone}
            onChange={() => {
              setMarkedDone(!markedDone);
            }}
          />
          {!markedDone ? (
            <span className="line-through ml-2">{todo.toDo}</span>
          ) : (
            <span className="ml-2">{todo.toDo}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
