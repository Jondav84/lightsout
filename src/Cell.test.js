/** @format */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

test("renders an unlit cell", () => {
  const { getByTestId } = render(<Cell isLit={false} />);
  const cell = getByTestId("cell");

  expect(cell).toHaveClass("Cell");
  expect(cell).not.toHaveClass("Cell-lit");
});

test("renders a lit cell", () => {
  const { getByTestId } = render(<Cell isLit={true} />);
  const cell = getByTestId("cell");

  expect(cell).toHaveClass("Cell");
  expect(cell).toHaveClass("Cell-lit");
});

test("flipCellsAroundMe function when the cell is clicked", () => {
  const mockFlipCellsAroundMe = jest.fn();
  const { getByTestId } = render(
    <Cell isLit={true} flipCellsAroundMe={mockFlipCellsAroundMe} />
  );
  const cell = getByTestId("cell");

  fireEvent.click(cell);

  expect(mockFlipCellsAroundMe).toHaveBeenCalledTimes(1);
});
