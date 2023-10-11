import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector} from 'react-redux';
import { MemoryRouter ,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Signup from '../components/Signup';
import { signup } from '../features/auth/authSlice';

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));
  

jest.mock('../features/auth/authSlice', () => ({
    signup: jest.fn(),
    reset: jest.fn(),
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

describe('Signup component', () => {
    beforeEach(() => {
        useDispatch.mockReturnValue(jest.fn());
        useSelector.mockReturnValue({
            countries: [],
            cities: [],
            states: [],
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

    test('renders signup form', () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
        expect(screen.getByLabelText('Country')).toBeInTheDocument();
        expect(screen.getByLabelText('State')).toBeInTheDocument();
        expect(screen.getByLabelText('City')).toBeInTheDocument();
    });

    test('dispatches signup action on form submit', () => {
        const mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);
        const signupForm = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
            phone: '1234567890',
            countryCode: 'US',
            stateCode: 'CA',
            cityCode: 'LA',
        };
        useSelector.mockReturnValue({
            countries: [],
            cities: [],
            states: [],
            role: '',
            isLoading: false,
            isError: false,
            message: '',
            isSuccess: true,
        });

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Name'), {
            target: { value: signupForm.name },
        });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: signupForm.email },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: signupForm.password },
        });
        fireEvent.change(screen.getByLabelText('Phone Number'), {
            target: { value: signupForm.phone },
        });
        // Mocking the options for country, state, and city selects
        fireEvent.change(screen.getByLabelText('Country'), {
            target: { value: JSON.stringify({ countryId: 1, countryCode: 'US' }) },
        });
        fireEvent.change(screen.getByLabelText('State'), {
            target: { value: JSON.stringify({ stateId: 1, stateCode: 'CA' }) },
        });
        fireEvent.change(screen.getByLabelText('City'), {
            target: { value: JSON.stringify({ cityId: 1, cityCode: 'LA' }) },
        });
        fireEvent.submit(screen.getByRole('button', { name: 'SignIn' }));

        expect(mockDispatch).toHaveBeenCalledWith(signup(signupForm));
    });

    test('shows error toast message when isError is true', () => {
        useSelector.mockReturnValue({
            countries: [],
            cities: [],
            states: [],
            role: '',
            isLoading: false,
            isError: true,
            message: 'Signup failed',
            isSuccess: false,
        });

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        expect(toast.error).toHaveBeenCalledWith('Signup failed');
    });

    test('shows success toast message and navigates to login when isSuccess is true', () => {
        const mockNavigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
      
        useSelector.mockReturnValue({
            countries: [],
            cities: [],
            states: [],
            role: 'User',
            isLoading: false,
            isError: false,
            message: 'Signup successful',
            isSuccess: true,
        });

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        expect(toast.success).toHaveBeenCalledWith('Signup successful');
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
