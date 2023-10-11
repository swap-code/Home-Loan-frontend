import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorState from "../components/AdvisorState";
import {
  getCountries,
  reset,
  resetState,
} from "../features/country/countrySlice";
import {
  getStates,
  resetState as stateReset,
  deleteState,
} from "../features/state/stateSlice";

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
  deleteState: jest.fn(),
}));

describe("AdvisorState component", () => {
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
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders AdvisorState component with countries and states", () => {
    render(
      <MemoryRouter>
        <AdvisorState />
      </MemoryRouter>
    );

    expect(screen.getByText("States")).toBeInTheDocument();

    // Check country select options
    expect(screen.getByLabelText("Select Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Country")).toHaveValue("");
    expect(screen.getByLabelText("Select Country").children.length).toBe(3); // Two options + disabled default option

    // Check state table
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("State Name")).toBeInTheDocument();
    expect(screen.getByText("State Code")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // Header row + two state rows

    // Check add new state button
    expect(
      screen.getByRole("button", { name: "Add New State" })
    ).toBeInTheDocument();
  });

  test("dispatches getCountries action on component mount", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdvisorState />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith(getCountries());
  });

  test("dispatches reset actions on component unmount", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { unmount } = render(
      <MemoryRouter>
        <AdvisorState />
      </MemoryRouter>
    );

    unmount();

    expect(mockDispatch).toHaveBeenCalledWith(resetState());
    expect(mockDispatch).toHaveBeenCalledWith(stateReset());
    expect(mockDispatch).toHaveBeenCalledWith(reset());
  });

  test("dispatches getStates action when country value changes", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdvisorState />
      </MemoryRouter>
    );

    const countrySelect = screen.getByLabelText("Select Country");

    fireEvent.change(countrySelect, { target: { value: "1" } });

    expect(mockDispatch).toHaveBeenCalledWith(getStates("1"));
  });
});
