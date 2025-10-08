import React, { useState } from 'react';
import './TodoList.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="add-todo-form"
      data-testid="add-todo-form"
    >
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="todo-input"
          data-testid="todo-input"
          aria-label="Add a new todo"
        />
        <button 
          type="submit" 
          className="add-button"
          data-testid="add-button"
          disabled={!inputValue.trim()}
        >
          Add Todo
        </button>
      </div>
      {inputValue.trim() && (
        <div className="input-hint">
          Press Enter or click "Add Todo" to add
        </div>
      )}
    </form>
  );
};

export default AddTodoForm;