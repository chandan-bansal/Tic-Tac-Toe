

export default function GameBoard({onSelectSquare, turns, board}){

    
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) =>{
    //         const currGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         currGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return currGameBoard;
    //     });
    //     onSelectSquare();
    // }
    return <ol id = "game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}
    </ol>
}