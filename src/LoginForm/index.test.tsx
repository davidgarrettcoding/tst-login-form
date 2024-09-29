import React, { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from '.';

test('renders the page', () => {
  render(<LoginForm />);
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});

test('displays errors when form is submitted with empty fields', async () => {
  render(<LoginForm />);
  const submitButton = screen.getByText(/Submit/i);
  act(() => {
    submitButton.click();
  });

  await waitFor(() => {
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
  });

  const usernameError = screen.getByText(/Username is required/i);
  const passwordError = screen.getByText('Password is required');
  const confirmPasswordError = screen.getByText(
    /Confirm Password is required/i
  );

  expect(usernameError).toBeInTheDocument();
  expect(passwordError).toBeInTheDocument();
  expect(confirmPasswordError).toBeInTheDocument();
});

test('displays error when passwords do not match', async () => {
  render(<LoginForm />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const submitButton = screen.getByText(/Submit/i);

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

  act(() => {
    submitButton.click();
  });

  await waitFor(() => {
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});
