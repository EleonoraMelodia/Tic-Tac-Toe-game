import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
import Log from "./components/Log";

import WINNING_COMBINATIONS from "./components/winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const derivedActivePlayer = (gameTurns) => {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  let gameboard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }

  let winner;
//verifing if the symbols of the winning combinations are the same or not
console.log('Before winner check', gameTurns);
for (const combinations of WINNING_COMBINATIONS) {
  const firstSquareSymbol = gameboard[combinations[0].row][combinations[0].column];
  const secondSquareSymbol = gameboard[combinations[1].row][combinations[1].column];
  const thirdSquareSymbol = gameboard[combinations[2].row][combinations[2].column];

  if (
    firstSquareSymbol &&
    firstSquareSymbol === secondSquareSymbol &&
    firstSquareSymbol === thirdSquareSymbol
  ) {
    console.log('You win!', firstSquareSymbol);
    winner = firstSquareSymbol;
  }
}
console.log('After winner check', gameTurns);


  const handlePlayerChange = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currPlayer = derivedActivePlayer(prevTurns);

      const updatedTurn = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurn;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
 {/*  conditional rendering to show a message for the winner */}
        {winner && <p>You won! {winner}</p>}
        <Gameboard board={gameboard} onSelectSquare={handlePlayerChange} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
