import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";
import GameOver from "./components/GameOver";
function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurn); 
  let winner;
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

    for(const turn of gameTurn){
        const { square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex){
    setGameTurn(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row:rowIndex, col:colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurn([]);
  }
  return (
    <main>
      <div id="game-container">
       <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
        <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
       </ol>
       {(winner || hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
       <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn} board={gameBoard}/>
       
      </div>
      <Log turns={gameTurn}/>
    </main>

  )
}
export default App
