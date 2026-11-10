import React, { useState, useEffect } from 'react';

const TictacToe = () => {

  // 1. localStorage માંથી Score મેળવવો
  const [p1Score, setP1Score] = useState(() => {
    const saved = Number(localStorage.getItem('tictactoe_p1Score'));
    return Number.isFinite(saved) && saved >= 0 ? saved : 0;
  });

  const [p2Score, setP2Score] = useState(() => {
    const saved = Number(localStorage.getItem('tictactoe_p2Score'));
    return Number.isFinite(saved) && saved >= 0 ? saved : 0;
  });

  // 2. Game States
  const [board, setBoard] = useState(Array(9).fill('-'));
  const [xIsNext, setXIsNext] = useState(true);

  // 3. Score localStorage માં Save કરવો
  useEffect(() => {
    localStorage.setItem('tictactoe_p1Score', String(p1Score));
  }, [p1Score]);

  useEffect(() => {
    localStorage.setItem('tictactoe_p2Score', String(p2Score));
  }, [p2Score]);

  // 4. બધી 8 Winning Combinations
  const waysToWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  // 5. Winner Check Function
  const checkWinner = (squares) => {

    for (let i = 0; i < waysToWin.length; i++) {

      const [a, b, c] = waysToWin[i];

      if (
        squares[a] !== '-' &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const winner = checkWinner(board);
  const isDraw = !winner && !board.includes('-');

  // 6. Handle Click
  const handleClick = (index) => {

    if (
      board[index] !== '-' ||
      winner ||
      isDraw
    ) {
      return;
    }

    const newBoard = [...board];

    newBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(newBoard);

    // Winner Check
    const finalWinner = checkWinner(newBoard);

    if (finalWinner === 'X') {
      setP1Score(prev => prev + 1);
    }

    if (finalWinner === 'O') {
      setP2Score(prev => prev + 1);
    }

    setXIsNext(prev => !prev);
  };

  // 7. Next Round
  const nextRound = () => {

    setBoard(Array(9).fill('-'));
    setXIsNext(true);

  };

  // 8. Reset All Scores
  const resetScore = () => {

    setP1Score(0);
    setP2Score(0);

    setBoard(Array(9).fill('-'));
    setXIsNext(true);

  };

  // 9. Player Colors
  const getPlayerColor = (val) => {

    if (val === 'X') return '#ff4d4d';

    if (val === 'O') return '#3399ff';

    return '#ccc';

  };

  return (

    <div
      style={{
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        padding: '20px',
        borderRadius: '15px',
        maxWidth: '400px',
        margin: '30px auto',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}
    >

      <h2 style={{ color: '#2c3e50' }}>
        🎨 Colorful Tic Tac Toe
      </h2>

      {/* Scoreboard */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#fff',
          borderRadius: '10px'
        }}
      >

        <div style={{ color: '#ff4d4d', fontWeight: 'bold' }}>

          Player 1 (X)

          <div style={{ fontSize: '24px', color: '#333' }}>
            {p1Score}
          </div>

        </div>

        <div style={{ color: '#3399ff', fontWeight: 'bold' }}>

          Player 2 (O)

          <div style={{ fontSize: '24px', color: '#333' }}>
            {p2Score}
          </div>

        </div>

      </div>

      {/* Game Status */}

      <h3
        style={{
          color: winner
            ? getPlayerColor(winner)
            : isDraw
              ? '#e67e22'
              : getPlayerColor(xIsNext ? 'X' : 'O'),

          backgroundColor: '#fff',
          padding: '8px',
          borderRadius: '8px',
          display: 'inline-block',
          minWidth: '200px'
        }}
      >

        {
          winner
            ? `🎉 Winner: ${winner}!`
            : isDraw
              ? '🤝 Match Draw!'
              : `Turn: ${xIsNext ? 'X' : 'O'}`
        }

      </h3>

      {/* Game Board */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 90px)',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '15px'
        }}
      >

        {board.map((value, index) => (

          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={value !== '-' || !!winner || isDraw}
            style={{
              width: '90px',
              height: '90px',
              fontSize: '32px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              color: getPlayerColor(value),
              outline: 'none'
            }}
          >

            {value}

          </button>

        ))}

      </div>

      {/* Control Buttons */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}
      >

        <button
          onClick={nextRound}
          style={{
            padding: '12px 20px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: 'none',
            borderRadius: '8px'
          }}
        >

          Next Round 🚀

        </button>

        <button
          onClick={resetScore}
          style={{
            padding: '12px 20px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '8px'
          }}
        >

          Reset Score 🔄

        </button>

      </div>

    </div>

  );

};

export default TictacToe;
