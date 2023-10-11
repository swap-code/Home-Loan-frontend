import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddUserCollateral from "../components/AddUserCollateral";
import { createCollateral } from "../features/collateral/collateralSlice";

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
jest.mock("../features/collateral/collateralSlice", () => ({
  createCollateral: jest.fn(),
}));

describe("AddUserCollateral component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "user@example.com",
      role: "User",
      isLoading: false,
      isError: false,
      message: "",
      isSuccess: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders add user collateral form", () => {
    render(
      <MemoryRouter>
        <AddUserCollateral />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Collateral Value")).toBeInTheDocument();
    expect(screen.getByLabelText("Collateral Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Own Share - 0")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Collateral" })
    ).toBeInTheDocument();
  });

  test("shows error toast message when isError is true", () => {
    useSelector.mockReturnValue({
      email: "user@example.com",
      role: "User",
      isLoading: false,
      isError: true,
      message: "Failed to add collateral",
      isSuccess: false,
    });

    render(
      <MemoryRouter>
        <AddUserCollateral />
      </MemoryRouter>
    );

    expect(toast.error).toHaveBeenCalledWith("Failed to add collateral");
  });
});
