import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { ContactUs } from '../components/ContactUs';

// Mock the necessary dependencies
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the Redux store
const rootReducer = combineReducers({
  auth: (state = { role: 'User', email: 'test@example.com' }) => state,
});
const mockStore = createStore(rootReducer);

describe('ContactUs component', () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => callback(mockStore.getState()));
  });

  test('renders the contact form when user is logged in as User', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ContactUs />
        </MemoryRouter>
      </Provider>
    );

    // Assertions
    const contactUsElements = screen.queryAllByText('Contact Us');
    expect(contactUsElements).toHaveLength(2);
    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Your message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });
});
