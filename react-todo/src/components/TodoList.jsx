import React, { useState } from 'react';

// Initial demo todos
const initialTodos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build a Todo App', completed: false },
  { id: 3, text: 'Write Tests', completed: false }
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState('');

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          data-testid="todo-input"
        />
        <button type="submit" data-testid="add-button">
          Add Todo
        </button>
      </form>

      {/* Todo List */}
      <ul data-testid="todo-list">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            data-testid={`todo-item-${todo.id}`}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            <span 
              onClick={() => toggleTodo(todo.id)}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-button-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Todo Statistics */}
      <div data-testid="todo-statistics">
        Total: {todos.length} | 
        Completed: {todos.filter(todo => todo.completed).length} | 
        Pending: {todos.filter(todo => !todo.completed).length}
      </div>
    </div>
  );
};

export default TodoList;