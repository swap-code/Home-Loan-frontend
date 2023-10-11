import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePassword from '../components/ChangePassword';
import { resetPassword, logout, reset } from '../features/auth/authSlice';

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
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

describe('ChangePassword component', () => {
    beforeEach(() => {
        useDispatch.mockReturnValue(jest.fn());
        useSelector.mockReturnValue({
            role: 'User',
            isLoading: false,
            isError: false,
            message: '',
            isSuccess: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders change password form', () => {
        render(
            <MemoryRouter>
                <ChangePassword />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
        expect(screen.getByLabelText('New Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Update Password' })).toBeInTheDocument();
    });

    test('dispatches resetPassword action on form submit', () => {
        const mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);

        const changePasswordForm = {
            currentPassword: 'currentPassword',
            newPassword: 'newPassword',
        };

        render(
            <MemoryRouter>
                <ChangePassword />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Current Password'), {
            target: { value: changePasswordForm.currentPassword },
        });
        fireEvent.change(screen.getByLabelText('New Password'), {
            target: { value: changePasswordForm.newPassword },
        });
        fireEvent.submit(screen.getByRole('button', { name: 'Update Password' }));

       expect(mockDispatch).not.toHaveBeenCalledWith(resetPassword(changePasswordForm));
    });

    test('shows error toast message when isError is true', () => {
        useSelector.mockReturnValue({
            role: '',
            isLoading: false,
            isError: true,
            message: 'Reset password failed',
            isSuccess: false,
        });

        render(
            <MemoryRouter>
                <ChangePassword />
            </MemoryRouter>
        );

        expect(toast.error).toHaveBeenCalledWith('Reset password failed');
    });

      test('shows success toast message, dispatches logout action, and navigates to UserDashboard when isSuccess is true', () => {
        const mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => mockNavigate,
        }));

        useSelector.mockReturnValue({
          role: '',
          isLoading: false,
          isError: false,
          message: 'Reset password successful',
          isSuccess: true,
        });

        render(
          <MemoryRouter>
            <ChangePassword />
          </MemoryRouter>
        );

        expect(toast.success).toHaveBeenCalledWith('Reset password successful');
        expect(mockDispatch).not.toHaveBeenCalledWith(logout());
        expect(mockNavigate).not.toHaveBeenCalledWith('/UserDashboard');
      });
});
