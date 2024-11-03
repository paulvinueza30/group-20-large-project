import React from 'react';
import useGetTodo from '../../hooks/useGetTodo';


const TodoItem: React.FC = () => {
  const { todos, loading, error } = useGetTodo();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {/* {todos.map((todo) => (
        <li key={todo.id} className='bg-white rounded-xl'> <input type="checkbox" className="bg-secondary w-4 h-4 accent-primary"/> {todo.title}</li>
      ))} */}
    </ul>
  );
};

export default TodoItem;
