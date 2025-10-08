import React from 'react';
import './TodoList.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent toggle when deleting
    onDelete(todo.id);
  };

  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      data-testid={`todo-item-${todo.id}`}
      data-completed={todo.completed}
    >
      <div className="todo-content" onClick={handleToggle}>
        <span 
          className="checkbox"
          data-testid={`checkbox-${todo.id}`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? '✓' : ''}
        </span>
        
        <span 
          className="todo-text"
          data-testid={`todo-text-${todo.id}`}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={handleDelete}
        className="delete-button"
        data-testid={`delete-button-${todo.id}`}
        aria-label={`Delete todo: ${todo.text}`}
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;