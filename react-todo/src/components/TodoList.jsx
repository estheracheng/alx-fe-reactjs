import React, { useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a project', completed: true }
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          data-testid="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" data-testid="add-button">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            data-testid={`todo-${todo.id}`}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
            <button
              data-testid={`delete-${todo.id}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
