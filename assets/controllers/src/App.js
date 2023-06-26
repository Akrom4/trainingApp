// App.js
import './App.css';
import Referee from './components/Referee/Referee';
import PgnReader from './components/PgnReader/pgnReader';
import GameNavigator from './components/GameNavigator/GameNavigator';
import { useState, useEffect } from "react";

function App() {
  const chessElement = document.getElementById('chess');
  const data = JSON.parse(chessElement.getAttribute('data-pgnreader'));

  // Initialize gameState with the Moves array from the chapter data
  const [gameState, setGameState] = useState(data.chapter[0].Moves);
  
  // Add a state to hold the current FEN
  const [fen, setFen] = useState(null);
  const [currentGameStateIndex, setCurrentGameStateIndex] = useState(0);

  useEffect(() => {
    if (gameState.length > 0) {
      setFen(gameState[0].position); // Initialize the FEN state with the first move's position
    }
  }, [gameState]);

  const handleMoveClick = (move) => {
    // When a move is clicked, update the FEN
    setFen(move.position);
    
    // Also update the currentGameStateIndex
    const index = gameState.findIndex(m => m.position === move.position);
    if (index !== -1) {
      setCurrentGameStateIndex(index);
    }
  };

  return (
    <div id="app">
      <Referee fen={fen} />  {/* Pass the FEN as a prop to Referee */}
      <PgnReader pgnData={data} onMoveClick={handleMoveClick} gameState={gameState} currentGameStateIndex={currentGameStateIndex} />  {/* Pass the handler as a prop to PgnReader */}
      <GameNavigator gameState={gameState} currentGameStateIndex={currentGameStateIndex} setCurrentGameStateIndex={setCurrentGameStateIndex} />  {/* Pass the handler as a prop to GameNavigator */}
    </div>
  );
}

export default App;
