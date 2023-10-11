import React from "react";

import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import NotFound from "../components/NotFound";

describe("NotFound component", () => {
  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <NotFound />{" "}
      </BrowserRouter>
    );

    const headingElement = screen.getByText("404");

    const messageElement = screen.getByText("Looks like you're lost");

    const linkElement = screen.getByRole("link", { name: "Go to Home" });

    expect(headingElement).toBeInTheDocument();

    expect(messageElement).toBeInTheDocument();

    expect(linkElement).toBeInTheDocument();
  });
});
