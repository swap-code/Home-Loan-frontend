import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from '../components/Login';
import { login, reset } from '../features/auth/authSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../features/auth/authSlice', () => ({
  login: jest.fn(),
  reset: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      role: '',
      isLoading: false,
      isError: false,
      message: '',
      isSuccess: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('dispatches login action on form submit', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    const email = 'test@example.com';
    const password = 'password';
    const loginForm = {
      email,
      password,
    };
    useSelector.mockReturnValue({
      role: '',
      isLoading: false,
      isError: false,
      message: '',
      isSuccess: true,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: password },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'SignIn' }));

    expect(mockDispatch).toHaveBeenCalledWith(login(loginForm));
  });

  test('shows error toast message when isError is true', () => {
    useSelector.mockReturnValue({
      role: '',
      isLoading: false,
      isError: true,
      message: 'Login failed',
      isSuccess: false,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(toast.error).toHaveBeenCalledWith('Login failed');
  });

  test('shows success toast message when isSuccess is true', () => {
    useSelector.mockReturnValue({
      role: '',
      isLoading: false,
      isError: false,
      message: 'Login successful',
      isSuccess: true,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(toast.success).toHaveBeenCalledWith('Login successful');
  });

  test('navigates to UserDashboard when role is "User"', () => {
    useSelector.mockReturnValue({
      role: 'User',
      isLoading: false,
      isError: false,
      message: '',
      isSuccess: true,
    });
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/UserDashboard');
  });

  test('navigates to AdvisorDashboard when role is "Advisor"', () => {
    useSelector.mockReturnValue({
      role: 'Advisor',
      isLoading: false,
      isError: false,
      message: '',
      isSuccess: true,
    });
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/AdvisorDashboard');
  });

  test('dispatches reset action on component cleanup', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith(reset());
  });
});
