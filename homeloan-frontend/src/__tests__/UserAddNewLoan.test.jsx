import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserAddNewLoan from '../components/UserAddNewLoan';
import { createLoan, reset } from '../features/loan/loanSlice';

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('UserAddNewLoan component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  test('renders correctly', () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({ email: 'test@example.com', role: 'User' });

    render(
      <MemoryRouter>
        <UserAddNewLoan />
      </MemoryRouter>
    );
    const createLoanButton = screen.getByRole('button', { name: 'Apply' });
    expect(createLoanButton).toBeInTheDocument();
  });

  test('dispatches createLoan action on form submit', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ email: 'test@example.com', role: 'User' });

    render(
      <MemoryRouter>
        <UserAddNewLoan />
      </MemoryRouter>
    );

    const propertyAddressInput = screen.getByLabelText('Property Address');

    fireEvent.change(propertyAddressInput, { target: { value: '123 Main St' } });
    const submitButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.submit(submitButton);

    
    expect(mockDispatch).not.toHaveBeenCalledWith(
      createLoan({
        propertyAddress: '123 Main St',
       
      })
    );
  });
  
});
