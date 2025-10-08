import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import './TodoList.css';

// Initial demo todos
const initialTodos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build a Todo App', completed: false },
  { id: 3, text: 'Write Tests', completed: false }
];

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Initialize with demo todos
  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  // Add a new todo
  const addTodo = (text) => {
    if (text.trim() === '') return;
    
    const newTodo = {
      id: Date.now(), // Simple ID generation
      text: text.trim(),
      completed: false
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="todo-list-container" data-testid="todo-list">
      <header className="todo-header">
        <h1>React Todo List</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      {/* Add Todo Form */}
      <AddTodoForm onAddTodo={addTodo} />

      {/* Todo Statistics */}
      {totalTodos > 0 && (
        <div className="todo-stats" data-testid="todo-stats">
          <span>Total: {totalTodos}</span>
          <span>Completed: {completedTodos}</span>
          <span>Pending: {pendingTodos}</span>
        </div>
      )}

      {/* Todo List */}
      <div className="todos-container">
        {todos.length === 0 ? (
          <div className="empty-state" data-testid="empty-state">
            <p>No todos yet. Add your first task above!</p>
          </div>
        ) : (
          <ul className="todo-list" aria-label="List of todos">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="keyboard-shortcuts">
        <small>
          💡 Tip: Click to toggle, click delete button to remove
        </small>
      </div>
    </div>
  );
};

export default TodoList;