import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdvisorBankPromotion from "../components/AdvisorBankPromotion";
import { createPromotion, reset } from "../features/promotion/promotionSlice";

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
jest.mock("../features/promotion/promotionSlice", () => ({
  createPromotion: jest.fn(),
  reset: jest.fn(),
}));

describe("AdvisorBankPromotion component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("dispatches createPromotion action on form submit", () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockReturnValue({
      email: "advisor@example.com",
      role: "Advisor",
      isLoading: false,
      isError: false,
      isSuccess: true,
      message: "Bank promotion created successfully",
    });

    render(
      <MemoryRouter>
        <AdvisorBankPromotion />
      </MemoryRouter>
    );

    const startDateInput = screen.getByLabelText("Start Date");
    const endDateInput = screen.getByLabelText("End Date");
    const messageInput = screen.getByLabelText("Message");
    const typeSelect = screen.getByLabelText("Type");
    const createButton = screen.getByRole("button", {
      name: "Create Bank Promotion",
    });

    fireEvent.change(startDateInput, { target: { value: "2023-06-01" } });
    fireEvent.change(endDateInput, { target: { value: "2023-06-30" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });
    fireEvent.change(typeSelect, { target: { value: "1" } });
    fireEvent.click(createButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      createPromotion({
        start_date: "2023-06-01",
        end_date: "2023-06-30",
        message: "Test message",
        type: 1,
      })
    );

    expect(mockDispatch).toHaveBeenCalledWith(reset());
    expect(toast.success).toHaveBeenCalledWith(
      "Bank promotion created successfully"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/AdvisorDashboard");
  });
});
