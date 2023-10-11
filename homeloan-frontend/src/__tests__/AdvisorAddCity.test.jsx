import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorAddCity from "../components/AdvisorAddCity";
import { createState, getStates, reset } from "../features/state/stateSlice";
import { getCountries } from "../features/country/countrySlice";
import { createCity, reset as cityReset } from "../features/city/citySlice";

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
  getStates: jest.fn(),
  reset: jest.fn(),
}));
jest.mock("../features/country/countrySlice", () => ({
  getCountries: jest.fn(),
}));
jest.mock("../features/city/citySlice", () => ({
  createCity: jest.fn(),
  reset: jest.fn(),
}));

describe("AdvisorAddCity component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      isLoading: false,
      isError: false,
      message: "",
      isSuccess: false,
      states: [],
      countries: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders add city form", () => {
    render(
      <MemoryRouter>
        <AdvisorAddCity />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("State")).toBeInTheDocument();
    expect(screen.getByLabelText("City Name")).toBeInTheDocument();
    expect(screen.getByLabelText("City Code")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create City" })
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
      states: [],
      countries: [],
    });

    render(
      <MemoryRouter>
        <AdvisorAddCity />
      </MemoryRouter>
    );

    expect(toast.error).toHaveBeenCalledWith("Error message");
  });
});
