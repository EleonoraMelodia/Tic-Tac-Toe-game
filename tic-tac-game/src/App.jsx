import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
import Log from "./components/Log";

import WINNING_COMBINATIONS from "./components/winning-combinations";
import GameOver from "./components/Game-over";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

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

const derivedGameboard = (gameTurns) => {
  let gameboard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }
  return gameboard;
};

const derivedWinner = (gameboard, players) => {
  let winner;
  //verifing if the symbols of the winning combinations are the same or not

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameboard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameboard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameboard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      //we access the property of players, in wich the name of the player corresponds to the simbol that he/she 's playing
      //access to an object property obj[property] => value
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameboard = derivedGameboard(gameTurns);

  const winner = derivedWinner(gameboard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

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

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handleNamePlayerChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNamePlayerChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNamePlayerChange}
          />
        </ol>
        {/*  conditional rendering to show a message for the winner */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <Gameboard board={gameboard} onSelectSquare={handlePlayerChange} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
