/** @format */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders withou crashing", () => {
  render(<App />);
});

test('restarts the game when "Restart" button is clicked', () => {
  const { getByText } = render(<App />);
  const increaseRowsButton = getByText("Increase Rows");
  fireEvent.click(increaseRowsButton);

  const numberOfRows = getByText(/Number of Rows:/);
  expect(numberOfRows.textContent).toContain("6");

  const restartButton = getByText("Restart");
  fireEvent.click(restartButton);

  const resetNumberOfRows = getByText(/Number of Rows:/);
  expect(resetNumberOfRows.textContent).toContain("5");
});
