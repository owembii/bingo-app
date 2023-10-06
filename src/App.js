import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "@mui/material";

function App() {
  const [gameCode, setGameCode] = useState("");
  const [bingocard, setBingocard] = useState(null);
  /*const [clickedNumbers, setClickedNumbers] = useState(Array(75).fill(false));*/
  const [clickedNumbers, setClickedNumbers] = useState({
    B: Array(5).fill(false),
    I: Array(5).fill(false),
    N: Array(5).fill(false),
    G: Array(5).fill(false),
    O: Array(5).fill(false),
  });

  const handleGameCodeChange = (e) => {
    setGameCode(e.target.value);
  };

  function getBingoCardURL(code) {
    axios
      .get(
        `http://www.hyeumine.com/getcard.php?bcode=${code}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data !== 0) {
          setBingocard(response.data);
          setClickedNumbers({
            B: Array(5).fill(false),
            I: Array(5).fill(false),
            N: Array(5).fill(false),
            G: Array(5).fill(false),
            O: Array(5).fill(false),
          });
        } else {
          setBingocard(null);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function checkWin() {
    axios
      .get(
        `http://www.hyeumine.com/checkwin.php?playcard_token=${bingocard.playcard_token}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data !== 0) {
          alert("win");
        } else {
          alert("lose");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  const handleNumberClick = (row, index) => {
    const newClickedNumbers = { ...clickedNumbers };
    newClickedNumbers[row] = [...newClickedNumbers[row]]; // Create a copy of the array
    newClickedNumbers[row][index] = !newClickedNumbers[row][index]; // Toggle the clicked state
    setClickedNumbers(newClickedNumbers);
  };

  return (
    <div className="App">
      {bingocard !== null ? (
        <div className="bingo-card">
          <h1 style={{ color: "white" }}>Game Code:{gameCode}</h1>
          <div className="button-container">
            <Button
              variant="outlined"
              style={{ color: "white" }}
              onClick={() => setBingocard(null)}
            >
              Change Game Code
            </Button>
            <Button
              variant="outlined"
              style={{ color: "white" }}
              href={`http://www.hyeumine.com/bingodashboard.php?bcode=${gameCode}`}
              target="_blank"
            >
              Open BINGO Dashboard
            </Button>
          </div>
          <div className="whitebox">
            <div className="bingo-header">
              <h1>B</h1>
              {bingocard.card.B.map((num, index) => (
                <div
                  className={`number-container ${
                    clickedNumbers.B[index] ? "clicked" : ""
                  }`}
                  key={index}
                  onClick={() => handleNumberClick("B", index)}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="bingo-header">
              <h1>I</h1>
              {bingocard.card.I.map((num, index) => (
                <div
                  className={`number-container ${
                    clickedNumbers.I[index] ? "clicked" : ""
                  }`}
                  key={index}
                  onClick={() => handleNumberClick("I", index)}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="bingo-header">
              <h1>N</h1>
              {bingocard.card.N.map((num, index) => (
                <div
                  className={`number-container ${
                    clickedNumbers.N[index] ? "clicked" : ""
                  }`}
                  key={index}
                  onClick={() => handleNumberClick("N", index)}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="bingo-header">
              <h1>G</h1>
              {bingocard.card.G.map((num, index) => (
                <div
                  className={`number-container ${
                    clickedNumbers.G[index] ? "clicked" : ""
                  }`}
                  key={index}
                  onClick={() => handleNumberClick("G", index)}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="bingo-header">
              <h1>O</h1>
              {bingocard.card.O.map((num, index) => (
                <div
                  className={`number-container ${
                    clickedNumbers.O[index] ? "clicked" : ""
                  }`}
                  key={index}
                  onClick={() => handleNumberClick("O", index)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
          <div className="button-container">
            <Button
              variant="outlined"
              style={{ color: "white" }}
              onClick={() => {
                checkWin();
              }}
            >
              Check Card
            </Button>
            <Button
              variant="outlined"
              style={{ color: "white" }}
              onClick={() => {
                getBingoCardURL(gameCode);
              }}
            >
              New Card
            </Button>
          </div>
        </div>
      ) : (
        <div className="entercode">
          <h1>BINGO Game</h1>
          <p>Enter the BINGO game code to get your Bingo card:</p>
          <input
            label="Game Code"
            variant="outlined"
            value={gameCode}
            onChange={handleGameCodeChange}
          />
          <br />
          <button
            variant="contained"
            color="primary"
            onClick={() => {
              getBingoCardURL(gameCode);
            }}
          >
            Get Bingo Card
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
