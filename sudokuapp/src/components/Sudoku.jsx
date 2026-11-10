
import React, { useState } from "react";

// Shuffle helper
const shuffleArray = (array) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

// Generate a valid Sudoku solution
const generateSudokuSolution = () => {
  const base = 3;
  const side = base * base;

  const pattern = (r, c) =>
    (base * (r % base) + Math.floor(r / base) + c) % side;

  const rows = shuffleArray([0, 1, 2])
    .flatMap((band) =>
      shuffleArray([0, 1, 2]).map((row) => band * base + row)
    );

  const cols = shuffleArray([0, 1, 2])
    .flatMap((stack) =>
      shuffleArray([0, 1, 2]).map((col) => stack * base + col)
    );

  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return rows.map((r) =>
    cols.map((c) => numbers[pattern(r, c)])
  );
};

// Generate puzzle by removing cells
const generateSudokuPuzzle = () => {
  const solution = generateSudokuSolution();

  const board = solution.map((row) => [...row]);

  // Remove 40 numbers to create empty cells
  const positions = shuffleArray(
    Array.from({ length: 81 }, (_, index) => index)
  );

  positions.slice(0, 40).forEach((position) => {
    const row = Math.floor(position / 9);
    const col = position % 9;

    board[row][col] = 0;
  });

  return {
    board,
    solution
  };
};

// Validate 9 numbers contain exactly 1 to 9
const isValidGroup = (numbers) => {
  return (
    numbers.every((number) => number >= 1 && number <= 9) &&
    new Set(numbers).size === 9
  );
};

// Validate complete Sudoku
const validateSudoku = (board) => {
  // Validate rows
  for (let r = 0; r < 9; r++) {
    if (!isValidGroup(board[r])) {
      return false;
    }
  }

  // Validate columns
  for (let c = 0; c < 9; c++) {
    const column = board.map((row) => row[c]);

    if (!isValidGroup(column)) {
      return false;
    }
  }

  // Validate 3x3 boxes
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const box = [];

      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          box.push(board[r][c]);
        }
      }

      if (!isValidGroup(box)) {
        return false;
      }
    }
  }

  return true;
};

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(() =>
    generateSudokuPuzzle()
  );

  const [liveBoard, setLiveBoard] = useState(() =>
    puzzle.board.map((row) => [...row])
  );

  const [loading, setLoading] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [checked, setChecked] = useState(false);

  const [statusText, setStatusText] = useState(
    "💡 Fill all empty cells using numbers 1 to 9."
  );

  // Count empty cells
  const emptyCells = puzzle.board.flat().filter(
    (value) => value === 0
  ).length;

  // Count filled cells
  const filledCells = liveBoard.flat().filter(
    (value) => value !== 0
  ).length;

  // Handle input changes
  const handleCellInputChange = (row, col, value) => {
    if (puzzle.board[row][col] !== 0 || gameWon) {
      return;
    }

    const digit = value.replace(/[^1-9]/g, "").slice(-1);

    const updatedBoard = liveBoard.map((currentRow) => [
      ...currentRow
    ]);

    updatedBoard[row][col] = digit ? Number(digit) : 0;

    setLiveBoard(updatedBoard);
    setChecked(false);

    setStatusText("Keep solving your Sudoku puzzle!");
  };

  // Check Sudoku solution
  const verifySudokuMatrix = () => {
    const hasEmptyCells = liveBoard.some((row) =>
      row.includes(0)
    );

    if (hasEmptyCells) {
      setChecked(true);
      setStatusText(
        "⚠️ Please fill all empty cells before verifying."
      );
      return;
    }

    const isValid = validateSudoku(liveBoard);

    const matchesSolution = liveBoard.every(
      (row, r) =>
        row.every(
          (value, c) => value === puzzle.solution[r][c]
        )
    );

    setChecked(true);

    if (isValid && matchesSolution) {
      setGameWon(true);

      setStatusText(
        "🏆 EXCELLENT! Your Sudoku solution is 100% correct!"
      );
    } else if (!isValid) {
      setStatusText(
        "❌ Invalid Sudoku! Check duplicate numbers in rows, columns and 3x3 boxes."
      );
    } else {
      setStatusText(
        "❌ Some numbers are incorrect. Try again!"
      );
    }
  };

  // Generate next Sudoku board
  const fetchLiveSugokuMatrix = () => {
    setLoading(true);

    setTimeout(() => {
      const newPuzzle = generateSudokuPuzzle();

      setPuzzle(newPuzzle);

      setLiveBoard(
        newPuzzle.board.map((row) => [...row])
      );

      setGameWon(false);
      setChecked(false);
      setStatusText(
        "🎮 New Sudoku puzzle generated successfully!"
      );

      setLoading(false);
    }, 200);
  };

  // Reset current puzzle
  const resetPuzzle = () => {
    setLiveBoard(
      puzzle.board.map((row) => [...row])
    );

    setGameWon(false);
    setChecked(false);

    setStatusText(
      "🔄 Current Sudoku puzzle has been reset."
    );
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "2px solid #10b981",
        padding: "20px",
        borderRadius: "24px",
        boxSizing: "border-box",
        textAlign: "center",
        margin: "20px auto",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Header */}
      <h3
        style={{
          color: "#10b981",
          margin: "0 0 5px"
        }}
      >
        Sudoku Challenge 🎴
      </h3>

      <p
        style={{
          margin: "0 0 20px",
          fontSize: "11px",
          color: "#64748b",
          fontWeight: "bold",
          letterSpacing: "0.5px"
        }}
      >
        RANDOM 9×9 SUDOKU GENERATOR
      </p>

      {/* Progress */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#cbd5e1",
          fontSize: "12px",
          marginBottom: "8px"
        }}
      >
        <span>Filled Cells</span>

        <strong>
          {filledCells}/81
        </strong>
      </div>

      <div
        style={{
          height: "7px",
          backgroundColor: "#334155",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "18px"
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(filledCells / 81) * 100}%`,
            backgroundColor: "#10b981",
            transition: "width 0.3s"
          }}
        />
      </div>

      {/* Sudoku Grid */}
      <div
        style={{
          width: "100%",
          maxWidth: "405px",
          margin: "0 auto 20px",
          display: "grid",
          gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
          gap: "0",
          backgroundColor: "#020617",
          border: "3px solid #64748b",
          boxSizing: "border-box"
        }}
      >
        {liveBoard.map((row, rIdx) =>
          row.map((cellValue, cIdx) => {
            const isPredefined =
              puzzle.board[rIdx][cIdx] !== 0;

            const isCorrect =
              cellValue === puzzle.solution[rIdx][cIdx];

            const isWrong =
              checked && !isPredefined && !isCorrect;

            const borderRight =
              cIdx === 2 || cIdx === 5
                ? "3px solid #64748b"
                : "1px solid #334155";

            const borderBottom =
              rIdx === 2 || rIdx === 5
                ? "3px solid #64748b"
                : "1px solid #334155";

            return (
              <input
                key={`${rIdx}-${cIdx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                disabled={isPredefined || gameWon || loading}
                value={cellValue === 0 ? "" : cellValue}
                onChange={(e) =>
                  handleCellInputChange(
                    rIdx,
                    cIdx,
                    e.target.value
                  )
                }
                aria-label={`Row ${rIdx + 1}, Column ${cIdx + 1}`}
                style={{
                  width: "100%",
                  minWidth: 0,
                  height: "39px",
                  padding: 0,
                  boxSizing: "border-box",
                  backgroundColor: isPredefined
                    ? "#1e293b"
                    : isWrong
                    ? "#7f1d1d"
                    : checked && isCorrect
                    ? "#14532d"
                    : "#0f172a",
                  border: "none",
                  borderRight,
                  borderBottom,
                  color: isPredefined
                    ? "#38bdf8"
                    : isWrong
                    ? "#fca5a5"
                    : checked && isCorrect
                    ? "#4ade80"
                    : "#ffffff",
                  fontSize: "16px",
                  fontWeight: isPredefined ? "bold" : "600",
                  textAlign: "center",
                  outline: "none",
                  cursor: isPredefined ? "not-allowed" : "text"
                }}
              />
            );
          })
        )}
      </div>

      {/* Information */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "8px",
          marginBottom: "18px",
          color: "#cbd5e1",
          fontSize: "12px"
        }}
      >
        <span>
          <strong style={{ color: "#38bdf8" }}>
            {81 - emptyCells}
          </strong>
          {" "}Fixed Cells
        </span>

        <span>
          <strong style={{ color: "#10b981" }}>
            {emptyCells}
          </strong>
          {" "}Empty Cells
        </span>
      </div>

      {/* Status */}
      <p
        style={{
          margin: "0 0 18px",
          fontSize: "12.5px",
          color: gameWon ? "#4ade80" : "#cbd5e1",
          fontStyle: "italic",
          minHeight: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {loading
          ? "Generating new Sudoku board..."
          : statusText}
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={verifySudokuMatrix}
          disabled={loading || gameWon}
          style={{
            flex: 1,
            minWidth: "110px",
            padding: "12px 8px",
            backgroundColor: "#10b981",
            color: "#020617",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "12px",
            cursor: "pointer"
          }}
        >
          Verify Solution 🚀
        </button>

        <button
          onClick={resetPuzzle}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: "90px",
            padding: "12px 8px",
            backgroundColor: "#334155",
            color: "#ffffff",
            border: "1px solid #475569",
            borderRadius: "10px",
            fontSize: "12px",
            cursor: "pointer"
          }}
        >
          Reset 🔄
        </button>

        <button
          onClick={fetchLiveSugokuMatrix}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: "100px",
            padding: "12px 8px",
            backgroundColor: "#7c3aed",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "12px",
            cursor: "pointer"
          }}
        >
          Next Board 🎮
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
