import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorCity from "../components/AdvisorCity";
import {
  getCountries,
  reset,
  resetState,
} from "../features/country/countrySlice";
import {
  getStates,
  resetState as stateReset,
} from "../features/state/stateSlice";
import {
  getCities,
  resetState as cityReset,
  deleteCity,
} from "../features/city/citySlice";

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
  resetState: jest.fn(),
}));
jest.mock("../features/state/stateSlice", () => ({
  getStates: jest.fn(),
  resetState: jest.fn(),
}));
jest.mock("../features/city/citySlice", () => ({
  getCities: jest.fn(),
  resetState: jest.fn(),
  deleteCity: jest.fn(),
}));

describe("AdvisorCity component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      countries: [
        { countryId: 1, countryName: "Country 1", countryCode: "C1" },
        { countryId: 2, countryName: "Country 2", countryCode: "C2" },
      ],
      states: [
        { stateId: 1, stateName: "State 1", stateCode: "S1" },
        { stateId: 2, stateName: "State 2", stateCode: "S2" },
      ],
      cities: [
        { cityId: 1, cityName: "City 1", cityCode: "CC1" },
        { cityId: 2, cityName: "City 2", cityCode: "CC2" },
      ],
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders AdvisorCity component with countries, states, and cities", () => {
    render(
      <MemoryRouter>
        <AdvisorCity />
      </MemoryRouter>
    );

    expect(screen.getByText("Cities")).toBeInTheDocument();

    // Check country select options
    expect(screen.getByLabelText("Select Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Country")).toHaveValue("");
    expect(screen.getByLabelText("Select Country").children.length).toBe(3); // Two options + disabled default option

    // Check state select options
    expect(screen.getByLabelText("Select State")).toBeInTheDocument();
    expect(screen.getByLabelText("Select State")).toHaveValue("");
    expect(screen.getByLabelText("Select State").children.length).toBe(3); // Two options + disabled default option

    // Check city table
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("City Name")).toBeInTheDocument();
    expect(screen.getByText("City Code")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // Header row + two city rows

    // Check add new city button
    expect(
      screen.getByRole("button", { name: "Add New City" })
    ).toBeInTheDocument();
  });

  test("dispatches getCountries action on component mount", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdvisorCity />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith(getCountries());
  });

  test("dispatches reset actions on component unmount", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { unmount } = render(
      <MemoryRouter>
        <AdvisorCity />
      </MemoryRouter>
    );

    unmount();

    expect(mockDispatch).toHaveBeenCalledWith(resetState());
    expect(mockDispatch).toHaveBeenCalledWith(stateReset());
    expect(mockDispatch).toHaveBeenCalledWith(cityReset());
    expect(mockDispatch).toHaveBeenCalledWith(reset());
  });

  test("dispatches getStates action when country value changes", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdvisorCity />
      </MemoryRouter>
    );

    const countrySelect = screen.getByLabelText("Select Country");

    fireEvent.change(countrySelect, { target: { value: "1" } });

    expect(mockDispatch).toHaveBeenCalledWith(getStates("1"));
  });

  test("dispatches getCities action when state value changes", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdvisorCity />
      </MemoryRouter>
    );

    const stateSelect = screen.getByLabelText("Select State");

    fireEvent.change(stateSelect, { target: { value: "1" } });

    expect(mockDispatch).toHaveBeenCalledWith(getCities("1"));
  });

  test("navigates to add new city page on Add New City button click", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AdvisorCity />
      </MemoryRouter>
    );

    const addNewCityButton = screen.getByRole("button", {
      name: "Add New City",
    });

    fireEvent.click(addNewCityButton);

    expect(mockNavigate).toHaveBeenCalledWith("/AdvisorDashboard/City/add");
  });
});
