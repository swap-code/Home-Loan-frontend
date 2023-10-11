import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorDashboard from "../components/AdvisorDashboard";
import { getAdminLoans, updateLoanState } from "../features/loan/loanSlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../features/loan/loanSlice", () => ({
  getAdminLoans: jest.fn(),
  updateLoanState: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("AdvisorDashboard component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      isLoading: false,
      loans: [],
      isSuccess: false,
      isError: false,
      message: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loan table", () => {
    render(
      <MemoryRouter>
        <AdvisorDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText("Loans")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Property Address")).toBeInTheDocument();
    // ...add assertions for other table headers and loan data
  });

  test("dispatches getAdminLoans action on component mount", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <MemoryRouter>
        <AdvisorDashboard />
      </MemoryRouter>
    );

    expect(dispatch).toHaveBeenCalledWith(getAdminLoans());
  });
});
