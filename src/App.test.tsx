import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

xtest("renders Home", () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
