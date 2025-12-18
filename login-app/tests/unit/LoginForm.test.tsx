import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../src/components/LoginForm';

describe('LoginForm', () => {
  test('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submits the form with valid credentials', () => {
    const mockLogin = jest.fn();
    render(<LoginForm onLogin={mockLogin} />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
  });

  test('shows error message on invalid credentials', () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/please enter your username/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
  });
});