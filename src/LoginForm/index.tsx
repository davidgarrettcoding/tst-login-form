import React, { useEffect, useState } from 'react';
import './index.css';
import Input from './Input';
import useLocalStorage from './useLocalStorage';

const LOGIN_STORAGE_KEY = 'loginInput';
const DEFAULT_LOGIN_INPUT = {
  username: '',
  password: '',
  confirmPassword: '',
};

const LoginForm = () => {
  const [input, setInput] = useLocalStorage(
    LOGIN_STORAGE_KEY,
    DEFAULT_LOGIN_INPUT
  );

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    if (input.password && input.password === input.confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [input.password, input.confirmPassword]);

  const handleChange = (field: string) => (value: string) => {
    setInput({ ...input, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { ...errors };

    if (!input.username) {
      newErrors.username = 'Username is required';
    }

    if (!input.password) {
      newErrors.password = 'Password is required';
    }

    if (!input.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    }

    if (input.password !== input.confirmPassword) {
      setPasswordsMatch(false);
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    alert('Your user has been registered');
    setInput(DEFAULT_LOGIN_INPUT);
    setPasswordsMatch(false);
  };

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input
          error={errors.username}
          field='username'
          label='Username'
          onChange={handleChange('username')}
          type='text'
          value={input.username}
        />
        <Input
          error={errors.password}
          field='password'
          label='Password'
          onChange={handleChange('password')}
          type='password'
          value={input.password}
        />
        <Input
          error={errors.confirmPassword}
          field='confirmPassword'
          label='Confirm Password'
          onChange={handleChange('confirmPassword')}
          successMessage={passwordsMatch ? 'Passwords match' : ''}
          type='password'
          value={input.confirmPassword}
        />
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};

export default LoginForm;
