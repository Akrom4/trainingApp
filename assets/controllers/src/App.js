import './App.css';
import Referee from './components/Referee/Referee';
import PgnReader from './components/PgnReader/pgnReader';
import GameNavigator from './components/GameNavigator/GameNavigator';
import { useState, useEffect } from "react";

function App() {
  const chessElement = document.getElementById('chess');
  const data = JSON.parse(chessElement.getAttribute('data-pgnreader'));

  // Standard chess starting position
  const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  // Initialize gameState with the Moves array from the chapter data
  const [gameState, setGameState] = useState(data.chapter[0].Moves);
  
  // Add a state to hold the current FEN
  const [fen, setFen] = useState(INITIAL_FEN);

  // Initialize currentGameStateIndex with -1, representing "before the first move"
  const [currentGameStateIndex, setCurrentGameStateIndex] = useState(-1);

  useEffect(() => {
    if (gameState.length > 0 && currentGameStateIndex >= 0 && currentGameStateIndex < gameState.length) {
      setFen(gameState[currentGameStateIndex].position); // Update the FEN state whenever the current game state changes
    }
  }, [gameState, currentGameStateIndex]);
  
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
      <div className="game-container">
        <Referee fen={fen} />  {/* Pass the FEN as a prop to Referee */}
        <GameNavigator 
          gameState={gameState} 
          currentGameStateIndex={currentGameStateIndex} 
          setCurrentGameStateIndex={setCurrentGameStateIndex} 
          setFen={setFen}
          INITIAL_FEN={INITIAL_FEN}
        />  {/* Pass the handler as a prop to GameNavigator */}
      </div>
      <PgnReader pgnData={data} onMoveClick={handleMoveClick} gameState={gameState} currentGameStateIndex={currentGameStateIndex} />  {/* Pass the handler as a prop to PgnReader */}
    </div>
  );
}

export default App;
