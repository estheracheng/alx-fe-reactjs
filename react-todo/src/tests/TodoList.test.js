import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a project')).toBeInTheDocument();
  });

  test('adds a new todo item', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Write tests' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('toggles a todo item', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');
    expect(todo).toHaveStyle('text-decoration: none');

    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');

    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo item', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');
    const deleteButton = screen.getByTestId('delete-1');

    fireEvent.click(deleteButton);

    expect(todo).not.toBeInTheDocument();
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: '    ' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('    ')).not.toBeInTheDocument();
  });
});
