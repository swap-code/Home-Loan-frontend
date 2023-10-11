import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import HomePage from "../components/HomePage";

import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useNavigate: jest.fn(),
}));

describe("HomePage component", () => {
  test("renders correctly", () => {
    render(<HomePage />);

    const heading = screen.getByText(
      "Unlock your dreams with our hassle-free bank loans!"
    );

    const applyLoanButton = screen.getByRole("button", { name: "Apply Loan" });

    const image = screen.getByAltText("bank");

    expect(heading).toBeInTheDocument();

    expect(applyLoanButton).toBeInTheDocument();

    expect(image).toBeInTheDocument();
  });

  test('navigates to "/login" on Apply Loan button click', () => {
    const mockNavigate = jest.fn();

    useNavigate.mockReturnValue(mockNavigate);

    render(<HomePage />);

    const applyLoanButton = screen.getByRole("button", { name: "Apply Loan" });

    fireEvent.click(applyLoanButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
