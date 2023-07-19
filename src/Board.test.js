/** @format */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

test("renders without crashing", () => {
  render(<Board />);
});

test("renders the correct initial game board with 5 rows and 5 columns", () => {
  const { getAllByTestId } = render(<Board />);
  const cells = getAllByTestId("cell");
  expect(cells.length).toBe(25);
});

test("flips the cells around a specific coordinate when clicked", () => {
  const { getAllByTestId } = render(<Board />);
  const cells = getAllByTestId("cell");

  fireEvent.click(cells[0]);

  const newCells = getAllByTestId("cell");
  expect(newCells[0].classList).toContain("Cell-lit");
  expect(newCells[1].classList).toContain("Cell-lit");
  expect(newCells[5].classList).toContain("Cell-lit");
});

test("displays a winning message when the game is won", () => {
  const { getByText, getAllByTestId } = render(
    <Board nrows={2} ncols={2} chanceLightStartsOn={1} />
  );
  const cells = getAllByTestId("cell");

  cells.forEach((cell) => fireEvent.click(cell));

  const winningMessage = getByText("WINNER WINNER CHICKEN DINNER!!!!");
  expect(winningMessage).toBeInTheDocument();
});
