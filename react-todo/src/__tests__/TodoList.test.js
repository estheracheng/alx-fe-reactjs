import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

test('renders initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a project')).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(<TodoList />);
  const input = screen.getByTestId('todo-input');
  const button = screen.getByTestId('add-button');

  fireEvent.change(input, { target: { value: 'Write tests' } });
  fireEvent.click(button);

  expect(screen.getByText('Write tests')).toBeInTheDocument();
});

test('deletes a todo', () => {
  render(<TodoList />);
  const deleteBtn = screen.getByTestId('delete-1');
  fireEvent.click(deleteBtn);
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});
