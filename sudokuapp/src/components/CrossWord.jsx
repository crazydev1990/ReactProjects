
import React, { useState } from "react";

// Five different crossword puzzles
// Each puzzle is a valid 3x3 word square.
// Across and Down words intersect correctly.

const puzzleBank = [
  {
    id: 1,
    title: "Animal & Nature Puzzle",
    grid: [
      ["C", "A", "T"],
      ["A", "P", "E"],
      ["T", "E", "N"]
    ],
    across: [
      { answer: "CAT", clue: "A furry pet that says meow." },
      { answer: "APE", clue: "A large primate without a tail." },
      { answer: "TEN", clue: "The number after nine." }
    ],
    down: [
      { answer: "CAT", clue: "A small domestic animal." },
      { answer: "APE", clue: "A monkey-like intelligent animal." },
      { answer: "TEN", clue: "Two times five." }
    ]
  },

  {
    id: 2,
    title: "Daily Life Puzzle",
    grid: [
      ["F", "U", "N"],
      ["U", "S", "E"],
      ["N", "E", "T"]
    ],
    across: [
      { answer: "FUN", clue: "Enjoyment and amusement." },
      { answer: "USE", clue: "To utilize something." },
      { answer: "NET", clue: "A mesh used for catching things." }
    ],
    down: [
      { answer: "FUN", clue: "Something that makes you happy." },
      { answer: "USE", clue: "To put something into action." },
      { answer: "NET", clue: "The final amount after deductions." }
    ]
  },

  {
    id: 3,
    title: "Word Challenge Puzzle",
    grid: [
      ["T", "O", "P"],
      ["O", "N", "E"],
      ["P", "E", "N"]
    ],
    across: [
      { answer: "TOP", clue: "The highest part of something." },
      { answer: "ONE", clue: "The first counting number." },
      { answer: "PEN", clue: "An instrument used for writing." }
    ],
    down: [
      { answer: "TOP", clue: "The uppermost position." },
      { answer: "ONE", clue: "A single unit." },
      { answer: "PEN", clue: "A writing tool that uses ink." }
    ]
  },

  {
    id: 4,
    title: "General Knowledge Puzzle",
    grid: [
      ["R", "E", "D"],
      ["E", "R", "A"],
      ["D", "A", "Y"]
    ],
    across: [
      { answer: "RED", clue: "The color of a ripe tomato." },
      { answer: "ERA", clue: "A particular period in history." },
      { answer: "DAY", clue: "The period between sunrise and sunset." }
    ],
    down: [
      { answer: "RED", clue: "A primary color." },
      { answer: "ERA", clue: "A long historical period." },
      { answer: "DAY", clue: "The opposite of night." }
    ]
  },

  {
    id: 5,
    title: "English Vocabulary Puzzle",
    grid: [
      ["M", "A", "N"],
      ["A", "R", "E"],
      ["N", "E", "W"]
    ],
    across: [
      { answer: "MAN", clue: "An adult male human." },
      { answer: "ARE", clue: "A plural form of the verb 'be'." },
      { answer: "NEW", clue: "Recently made or discovered." }
    ],
    down: [
      { answer: "MAN", clue: "An adult male person." },
      { answer: "ARE", clue: "A form of the verb 'to be'." },
      { answer: "NEW", clue: "Not old or previously used." }
    ]
  }
];

// Shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i]
    ];
  }

  return shuffled;
};

// Start with a shuffled puzzle queue
const createPuzzleQueue = () => {
  const queue = shuffleArray(puzzleBank);

  return {
    current: queue[0],
    remaining: queue.slice(1)
  };
};

const Crossword = () => {
  const [puzzleState, setPuzzleState] = useState(
    () => createPuzzleQueue()
  );

  const [userAnswers, setUserAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [statusMessage, setStatusMessage] = useState(
    "💡 Read the clues and fill in the crossword!"
  );

  const currentPuzzle = puzzleState.current;

  const totalLetters = currentPuzzle.grid.flat().length;

  // Count correct letters
  const correctLetters = currentPuzzle.grid.reduce(
    (total, row, rowIndex) => {
      return (
        total +
        row.reduce((count, cell, colIndex) => {
          return (
            count +
            (userAnswers[`${rowIndex}-${colIndex}`] === cell
              ? 1
              : 0)
          );
        }, 0)
      );
    },
    0
  );

  // Handle input
  const handleCellInputChange = (row, col, value) => {
    const key = `${row}-${col}`;

    const letter = value
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(-1);

    setUserAnswers((prev) => ({
      ...prev,
      [key]: letter
    }));

    setChecked(false);
    setStatusMessage("Keep solving the crossword!");
  };

  // Verify answers
  const verifyAnswers = (e) => {
    e.preventDefault();

    let correctCount = 0;

    currentPuzzle.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (
          userAnswers[`${rowIndex}-${colIndex}`] === cell
        ) {
          correctCount++;
        }
      });
    });

    setChecked(true);

    if (correctCount === totalLetters) {
      setGameWon(true);

      setStatusMessage(
        "🏆 CONGRATULATIONS! You solved the puzzle!"
      );
    } else {
      setStatusMessage(
        `❌ ${correctCount}/${totalLetters} letters correct. Try again!`
      );
    }
  };

  // Generate completely different puzzle
  const generateNewPuzzle = () => {
    let queue = puzzleState.remaining;

    // When all puzzles are completed, start a new shuffled cycle.
    // Exclude the previous puzzle from the first position.
    if (queue.length === 0) {
      queue = shuffleArray(
        puzzleBank.filter(
          (puzzle) => puzzle.id !== currentPuzzle.id
        )
      );
    }

    const nextPuzzle = queue[0];

    setPuzzleState({
      current: nextPuzzle,
      remaining: queue.slice(1)
    });

    setUserAnswers({});
    setChecked(false);
    setGameWon(false);

    setStatusMessage(
      "🎉 A completely new puzzle is ready!"
    );
  };

  return (
    <div
      style={{
        maxWidth: "560px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "2px solid #38bdf8",
        padding: "24px",
        borderRadius: "24px",
        boxSizing: "border-box",
        textAlign: "center",
        margin: "20px auto",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Header */}
      <h2
        style={{
          color: "#38bdf8",
          margin: "0 0 8px",
          fontSize: "23px"
        }}
      >
        Classic Crossword 📝
      </h2>

      <h4
        style={{
          color: "#a78bfa",
          margin: "0 0 8px",
          fontSize: "15px"
        }}
      >
        {currentPuzzle.title}
      </h4>

      <p
        style={{
          color: "#64748b",
          fontSize: "11px",
          fontWeight: "bold",
          marginBottom: "22px"
        }}
      >
        NEW WORDS • NEW CLUES • NEW CHALLENGE
      </p>

      {/* Progress */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#cbd5e1",
          fontSize: "13px",
          marginBottom: "10px"
        }}
      >
        <span>Correct Letters</span>

        <strong>
          {correctLetters}/{totalLetters}
        </strong>
      </div>

      <div
        style={{
          height: "8px",
          backgroundColor: "#334155",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "22px"
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(correctLetters / totalLetters) * 100}%`,
            backgroundColor: "#38bdf8",
            transition: "width 0.3s"
          }}
        />
      </div>

      {/* Crossword Grid */}
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#020617",
          padding: "15px",
          borderRadius: "16px",
          border: "1px solid #1e293b",
          marginBottom: "25px"
        }}
      >
        {currentPuzzle.grid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              gap: "5px",
              marginBottom: "5px"
            }}
          >
            {row.map((cell, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;

              const isCorrect =
                userAnswers[key] === cell;

              const isWrong =
                checked && !isCorrect;

              return (
                <input
                  key={colIndex}
                  type="text"
                  maxLength={1}
                  disabled={gameWon}
                  value={userAnswers[key] || ""}
                  onChange={(e) =>
                    handleCellInputChange(
                      rowIndex,
                      colIndex,
                      e.target.value
                    )
                  }
                  aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
                  style={{
                    width: "55px",
                    height: "55px",
                    padding: 0,
                    boxSizing: "border-box",
                    backgroundColor: gameWon
                      ? "#14532d"
                      : isWrong
                      ? "#7f1d1d"
                      : isCorrect && checked
                      ? "#14532d"
                      : "#ffffff",
                    border: "2px solid #64748b",
                    borderRadius: "6px",
                    color:
                      gameWon || (isCorrect && checked)
                        ? "#4ade80"
                        : isWrong
                        ? "#fca5a5"
                        : "#0f172a",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    outline: "none",
                    textTransform: "uppercase"
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Clues */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          backgroundColor: "#020617",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #1e293b",
          textAlign: "left",
          fontSize: "13px",
          color: "#cbd5e1",
          lineHeight: "1.6",
          marginBottom: "20px"
        }}
      >
        {/* Across */}
        <div
          style={{
            borderRight: "1px solid #1e293b",
            paddingRight: "10px"
          }}
        >
          <strong
            style={{
              color: "#38bdf8",
              display: "block",
              marginBottom: "12px"
            }}
          >
            HORIZONTAL ➔ ACROSS
          </strong>

          {currentPuzzle.across.map((clue, index) => (
            <div
              key={index}
              style={{ marginBottom: "12px" }}
            >
              <b>{index + 1}.</b> {clue.clue}
              <span
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: "10px"
                }}
              >
                ({clue.answer.length} letters)
              </span>
            </div>
          ))}
        </div>

        {/* Down */}
        <div>
          <strong
            style={{
              color: "#a78bfa",
              display: "block",
              marginBottom: "12px"
            }}
          >
            VERTICAL 🔽 DOWN
          </strong>

          {currentPuzzle.down.map((clue, index) => (
            <div
              key={index}
              style={{ marginBottom: "12px" }}
            >
              <b>{index + 1}.</b> {clue.clue}
              <span
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: "10px"
                }}
              >
                ({clue.answer.length} letters)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <p
        style={{
          color: gameWon ? "#4ade80" : "#cbd5e1",
          fontSize: "13px",
          minHeight: "35px",
          margin: "0 0 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {statusMessage}
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >
        <button
          onClick={verifyAnswers}
          disabled={gameWon}
          style={{
            flex: 1,
            padding: "13px",
            backgroundColor: "#38bdf8",
            color: "#020617",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: gameWon ? "not-allowed" : "pointer"
          }}
        >
          Check Answers 🚀
        </button>

        <button
          onClick={generateNewPuzzle}
          style={{
            flex: 1,
            padding: "13px",
            backgroundColor: "#7c3aed",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          New Puzzle 🔄
        </button>
      </div>
    </div>
  );
};

export default Crossword;
