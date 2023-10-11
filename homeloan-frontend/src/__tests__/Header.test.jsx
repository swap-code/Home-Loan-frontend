import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import Header from "../components/Header";

import { MemoryRouter, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

jest.mock("axios", () => ({
  get: jest.fn(),

  post: jest.fn(),

  put: jest.fn(),

  delete: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useNavigate: () => mockNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),

  useDispatch: jest.fn(),

  useSelector: jest.fn(),
}));

describe("Header component", () => {
  test("renders correctly when user is not logged in", () => {
    useSelector.mockReturnValue({ email: "", role: "" });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByText("Home");

    const loginLink = screen.getByText("Login/Signup");

    expect(mockNavigate).toHaveBeenCalledWith("/");

    expect(homeLink).toBeInTheDocument;

    expect(loginLink).toBeInTheDocument();
  });

  test("renders correctly when user is logged in", () => {
    useSelector.mockReturnValue({ email: "test@example.com", role: "User" });

    render(<Header />);

    const userDropdown = screen.getByRole("button", {
      name: /test@example.com/i,
    });

    expect(userDropdown).toBeInTheDocument();
  });

  test('navigates to "/" on Home link click', () => {
    useSelector.mockReturnValue({ email: "", role: "" });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByText("Home");

    fireEvent.click(homeLink);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test('navigates to "/login" on Login link click', () => {
    useSelector.mockReturnValue({ email: null });

    render(<Header />);

    const loginLink = screen.getByText("Login/Signup");

    fireEvent.click(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
