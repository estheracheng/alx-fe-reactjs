import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render
  test('renders TodoList component correctly', () => {
    render(<TodoList />);
    
    // Check if main elements are rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  // Test 2: Initial State with Demo Todos
  test('displays initial demo todos', () => {
    render(<TodoList />);
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if there are 3 todo items
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(3);
  });

  // Test 3: Adding a New Todo
  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if total todos increased to 4
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(4);
    
    // Check if input is cleared after adding
    expect(input).toHaveValue('');
  });

  // Test 4: Adding Todo with Enter Key
  test('adds a new todo when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    // Type and press Enter
    await user.type(input, 'Another Todo{enter}');
    
    // Check if new todo is added
    expect(screen.getByText('Another Todo')).toBeInTheDocument();
  });

  // Test 5: Prevent Adding Empty Todo
  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTodoCount = screen.getAllByTestId(/todo-item-/).length;
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    await user.click(addButton);
    
    // Check that todo count remains the same
    const currentTodoCount = screen.getAllByTestId(/todo-item-/).length;
    expect(currentTodoCount).toBe(initialTodoCount);
  });

  // Test 6: Toggling Todo Completion
  test('toggles todo completion status when clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find a todo that is not completed initially
    const todoText = screen.getByText('Build a Todo App');
    const todoItem = todoText.closest('li');
    
    // Initially should not have line-through
    expect(todoItem).toHaveStyle('textDecoration: none');
    
    // Click to toggle completion
    await user.click(todoText);
    
    // Should now have line-through
    expect(todoItem).toHaveStyle('textDecoration: line-through');
    
    // Click again to toggle back
    await user.click(todoText);
    
    // Should not have line-through again
    expect(todoItem).toHaveStyle('textDecoration: none');
  });

  // Test 7: Deleting a Todo
  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTodoCount = screen.getAllByTestId(/todo-item-/).length;
    const todoToDelete = screen.getByText('Write Tests');
    
    // Find and click delete button for the "Write Tests" todo
    const deleteButton = screen.getByTestId('delete-button-3');
    await user.click(deleteButton);
    
    // Check that todo is removed
    expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
    
    // Check that total todos decreased by 1
    const currentTodoCount = screen.getAllByTestId(/todo-item-/).length;
    expect(currentTodoCount).toBe(initialTodoCount - 1);
  });

  // Test 8: Statistics Update
  test('updates statistics correctly', () => {
    render(<TodoList />);
    
    const statistics = screen.getByTestId('todo-statistics');
    
    // Check initial statistics
    expect(statistics).toHaveTextContent('Total: 3');
    expect(statistics).toHaveTextContent('Completed: 1');
    expect(statistics).toHaveTextContent('Pending: 2');
  });

  // Test 9: Statistics Update After Operations
  test('updates statistics after adding and toggling todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const statistics = screen.getByTestId('todo-statistics');
    const input = screen.getByTestId('todo-input');
    
    // Add a new todo
    await user.type(input, 'New Todo for Stats{enter}');
    
    // Check updated statistics
    expect(statistics).toHaveTextContent('Total: 4');
    expect(statistics).toHaveTextContent('Completed: 1');
    expect(statistics).toHaveTextContent('Pending: 3');
    
    // Toggle a todo to completed
    const todoToToggle = screen.getByText('Build a Todo App');
    await user.click(todoToToggle);
    
    // Check updated statistics after toggle
    expect(statistics).toHaveTextContent('Completed: 2');
    expect(statistics).toHaveTextContent('Pending: 2');
    
    // Delete a todo
    const deleteButton = screen.getByTestId('delete-button-2');
    await user.click(deleteButton);
    
    // Check updated statistics after delete
    expect(statistics).toHaveTextContent('Total: 3');
  });

  // Test 10: Demo Todos Have Correct Initial States
  test('demo todos have correct initial completion states', () => {
    render(<TodoList />);
    
    const learnReactItem = screen.getByText('Learn React').closest('li');
    const buildTodoItem = screen.getByText('Build a Todo App').closest('li');
    const writeTestsItem = screen.getByText('Write Tests').closest('li');
    
    // Learn React should be completed initially
    expect(learnReactItem).toHaveStyle('textDecoration: line-through');
    
    // Build a Todo App should not be completed initially
    expect(buildTodoItem).toHaveStyle('textDecoration: none');
    
    // Write Tests should not be completed initially
    expect(writeTestsItem).toHaveStyle('textDecoration: none');
  });
});