
import React, { useState, useEffect } from 'react';

const candies = ['🍬', '🍭', '🍫', '🍩', '🧁', '🍓'];

function CandyCrushGame() {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(20);
  const [selected, setSelected] = useState(null);

  // Create Random Board
  const createBoard = () => {
    const newBoard = [];

    for (let i = 0; i < 64; i++) {
      const randomCandy =
        candies[Math.floor(Math.random() * candies.length)];

      newBoard.push(randomCandy);
    }

    setBoard(newBoard);
    setScore(0);
    setMoves(20);
    setSelected(null);
  };

  useEffect(() => {
    createBoard();
  }, []);

  // Check Matches
  const checkMatches = (newBoard) => {
    let points = 0;

    // Horizontal Match
    for (let i = 0; i < 64; i++) {
      if (i % 8 <= 5) {
        if (
          newBoard[i] === newBoard[i + 1] &&
          newBoard[i] === newBoard[i + 2]
        ) {
          newBoard[i] = '';
          newBoard[i + 1] = '';
          newBoard[i + 2] = '';
          points += 30;
        }
      }
    }

    // Vertical Match
    for (let i = 0; i < 48; i++) {
      if (
        newBoard[i] === newBoard[i + 8] &&
        newBoard[i] === newBoard[i + 16]
      ) {
        newBoard[i] = '';
        newBoard[i + 8] = '';
        newBoard[i + 16] = '';
        points += 30;
      }
    }

    // Fill Empty Boxes
    for (let i = 0; i < 64; i++) {
      if (newBoard[i] === '') {
        newBoard[i] =
          candies[Math.floor(Math.random() * candies.length)];
      }
    }

    if (points > 0) {
      setScore((prev) => prev + points);
      setBoard([...newBoard]);
    }
  };

  // Candy Click
  const handleClick = (index) => {
    if (moves === 0) return;

    if (selected === null) {
      setSelected(index);
      return;
    }

    if (selected === index) {
      setSelected(null);
      return;
    }

    const sameRow =
      Math.floor(selected / 8) === Math.floor(index / 8);

    const adjacent =
      (sameRow && Math.abs(selected - index) === 1) ||
      Math.abs(selected - index) === 8;

    if (!adjacent) {
      setSelected(index);
      return;
    }

    const newBoard = [...board];

    const temp = newBoard[selected];
    newBoard[selected] = newBoard[index];
    newBoard[index] = temp;

    setSelected(null);
    setMoves((prev) => prev - 1);

    setBoard(newBoard);

    setTimeout(() => {
      checkMatches(newBoard);
    }, 200);
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      background: '#0f172a',
      color: 'white',
      borderRadius: '20px',
      textAlign: 'center'
    }}>

      <h2>🍬 Candy Crush Game</h2>

      <h3>🏆 Score: {score}</h3>
      <h3>⚡ Moves: {moves}</h3>

      <button onClick={createBoard}>
        🔄 Reset Game
      </button>

      {moves === 0 && <h3>Game Over!</h3>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '4px',
        marginTop: '20px'
      }}>
        {board.map((candy, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              height: '40px',
              fontSize: '22px',
              padding: '0',
              background: selected === index ? '#ec4899' : '#334155',
              border: '1px solid #64748b',
              borderRadius: '7px',
              cursor: 'pointer'
            }}
          >
            {candy}
          </button>
        ))}
      </div>

    </div>
  );
}

export default CandyCrushGame;
