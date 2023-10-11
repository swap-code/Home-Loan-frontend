import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';

describe('UserSidebar component', () => {
  test('renders the sidebar menu correctly', () => {
    render(
      <MemoryRouter>
        <UserSidebar />
      </MemoryRouter>
    );

    // Check menu items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Apply Loan')).toBeInTheDocument();
    expect(screen.getByText('Collateral')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('navigates to the correct route when menu item is clicked', () => {
    render(
      <MemoryRouter>
        <UserSidebar />
      </MemoryRouter>
    );

    // Simulate click on menu item
    fireEvent.click(screen.getByText('Apply Loan'));


  });
});
