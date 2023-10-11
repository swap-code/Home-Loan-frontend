import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorAddCountry from "../components/AdvisorAddCountry";
import { createCountry, reset } from "../features/country/countrySlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../features/country/countrySlice", () => ({
  createCountry: jest.fn(),
  reset: jest.fn(),
}));

describe("AdvisorAddCountry component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      isLoading: false,
      isError: false,
      message: "",
      isSuccess: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders add country form", () => {
    render(
      <MemoryRouter>
        <AdvisorAddCountry />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Country Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Country Code")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Country" })
    ).toBeInTheDocument();
  });

  test("shows error toast message when isError is true", () => {
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      isLoading: false,
      isError: true,
      message: "Error message",
      isSuccess: false,
    });

    render(
      <MemoryRouter>
        <AdvisorAddCountry />
      </MemoryRouter>
    );

    expect(toast.error).toHaveBeenCalledWith("Error message");
  });
});
