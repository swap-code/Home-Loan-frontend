import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorCountry from "../components/AdvisorCountry";
import {
  getCountries,
  reset,
  deleteCountry,
} from "../features/country/countrySlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../features/country/countrySlice", () => ({
  getCountries: jest.fn(),
  reset: jest.fn(),
  deleteCountry: jest.fn(),
}));

describe("AdvisorCountry component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      countries: [
        { countryId: 1, countryName: "Country 1", countryCode: "C1" },
        { countryId: 2, countryName: "Country 2", countryCode: "C2" },
      ],
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders AdvisorCountry component with countries", () => {
    render(
      <MemoryRouter>
        <AdvisorCountry />
      </MemoryRouter>
    );

    expect(screen.getByText("Countries")).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Country Name")).toBeInTheDocument();
    expect(screen.getByText("Country Code")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    // Check country rows
    expect(screen.getAllByRole("row")).toHaveLength(3); // Header row + two country rows

    // Check add new country button
    expect(
      screen.getByRole("button", { name: "Add New Country" })
    ).toBeInTheDocument();
  });

  test("dispatches getCountries action on component mount", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdvisorCountry />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith(getCountries());
  });

  test("dispatches reset action on component unmount", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { unmount } = render(
      <MemoryRouter>
        <AdvisorCountry />
      </MemoryRouter>
    );

    unmount();

    expect(mockDispatch).toHaveBeenCalledWith(reset());
  });

  test("navigates to add new country page on Add New Country button click", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AdvisorCountry />
      </MemoryRouter>
    );

    const addNewCountryButton = screen.getByRole("button", {
      name: "Add New Country",
    });

    fireEvent.click(addNewCountryButton);

    expect(mockNavigate).toHaveBeenCalledWith("/AdvisorDashboard/Country/add");
  });
});
