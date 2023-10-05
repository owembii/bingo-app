// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function App() {
  const [gameCode, setGameCode] = useState('');

  const handleGameCodeChange = (e) => {
    setGameCode(e.target.value);
  };

  const getBingoCardURL = () => {
    // Construct the URL based on the game code entered
    return `/Bingo-Card`;
  };

  return (
    <Router>
      <div className="App">
        <h1>BINGO Game</h1>
        <p>Enter the BINGO game code to get your Bingo card:</p>
        <input
          label="Game Code"
          variant="outlined"
          value={gameCode}
          onChange={handleGameCodeChange}
        />
        <br />
        <a href={getBingoCardURL()} target="_blank" rel="noopener noreferrer">
          <button variant="contained" color="primary">
            Get Bingo Card
          </button>
        </a>
      </div>
    </Router>
  );
}

export default App;