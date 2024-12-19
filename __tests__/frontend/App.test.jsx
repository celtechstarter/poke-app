import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../frontend/src/App"; // Korrigiere den Pfad

import { BrowserRouter as Router } from "react-router-dom";

describe("App Component Tests", () => {
  it("should render navigation links", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/My Cards/i)).toBeInTheDocument();
    expect(screen.getByText(/Scan/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  it("should toggle dark mode", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const toggleButton = screen.getByText(/Dark Mode aktivieren/i);
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Light Mode aktivieren");
  });
});
