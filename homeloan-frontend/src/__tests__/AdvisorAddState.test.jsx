import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorAddState from "../components/AdvisorAddState";
import { createState, reset } from "../features/state/stateSlice";
import { getCountries } from "../features/country/countrySlice";

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
jest.mock("../features/state/stateSlice", () => ({
  createState: jest.fn(),
  reset: jest.fn(),
}));
jest.mock("../features/country/countrySlice", () => ({
  getCountries: jest.fn(),
}));

describe("AdvisorAddState component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      isLoading: false,
      isError: false,
      message: "",
      isSuccess: false,
      countries: [
        {
          countryId: 1,
          countryName: "Country 1",
        },
        {
          countryId: 2,
          countryName: "Country 2",
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders add state form", () => {
    render(
      <MemoryRouter>
        <AdvisorAddState />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("State Name")).toBeInTheDocument();
    expect(screen.getByLabelText("State Code")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create State" })
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
      countries: [
        {
          countryId: 1,
          countryName: "Country 1",
        },
        {
          countryId: 2,
          countryName: "Country 2",
        },
      ],
    });

    render(
      <MemoryRouter>
        <AdvisorAddState />
      </MemoryRouter>
    );

    expect(toast.error).toHaveBeenCalledWith("Error message");
  });
});
