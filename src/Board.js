/** @format */

import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import Winner from "./Winner";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
function createSolvableBoard(nrows, ncols, chanceLightStartsOn) {
  function countInversions(arr) {
    return arr.reduce(
      (inversions, value, i, arr) =>
        inversions + arr.slice(0, i).filter((x) => x < value).length,
      0
    );
  }

  const board = Array.from({ length: nrows }, () =>
    Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
  );

  const inversions = countInversions(board.flat());

  if (inversions % 2 === 1) {
    let [y1, x1] = [
      Math.floor(Math.random() * nrows),
      Math.floor(Math.random() * ncols),
    ];
    let [y2, x2] = [
      Math.floor(Math.random() * nrows),
      Math.floor(Math.random() * ncols),
    ];
    while (y1 === y2 && x1 === x2) {
      y2 = Math.floor(Math.random() * nrows);
      x2 = Math.floor(Math.random() * ncols);
    }
    [board[y1][x1], board[y2][x2]] = [board[y2][x2], board[y1][x1]];
  }
  return board;
}

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.3 }) {
  const [board, setBoard] = useState(
    createSolvableBoard(nrows, ncols, chanceLightStartsOn)
  );

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    const [y, x] = coord.split("-").map(Number);

    setBoard((oldBoard) => {
      const newBoard = oldBoard.map((row) => [...row]);

      function flipCell(y, x) {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          newBoard[y][x] = !newBoard[y][x];
        }
      }

      // Store the changes in a temporary array
      const changes = [];

      flipCell(y, x);
      changes.push(`${y}-${x}`);

      flipCell(y, x - 1);
      changes.push(`${y}-${x - 1}`);

      flipCell(y - 1, x);
      changes.push(`${y - 1}-${x}`);

      flipCell(y, x + 1);
      changes.push(`${y}-${x + 1}`);

      flipCell(y + 1, x);
      changes.push(`${y + 1}-${x}`);

      // Use a single state update to apply all the changes
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
  if (hasWon()) {
    return <Winner />;
  }

  // make table board
  // TODO
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
