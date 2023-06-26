import './App.css';
import Referee from './components/Referee/Referee';
import PgnReader from './components/PgnReader/pgnReader';
import { useState } from "react";

function App() {
  const chessElement = document.getElementById('chess');
  const chapter = JSON.parse(chessElement.getAttribute('data-pgnreader'));

  // Add a state to hold the current FEN
  const [fen, setFen] = useState(null);

  const handleMoveClick = (move) => {
    // When a move is clicked, update the FEN
    setFen(move.position);
  };

  return (
    <div id="app">
      <Referee fen={fen} />  {/* Pass the FEN as a prop to Referee */}
      <PgnReader pgnData={chapter} onMoveClick={handleMoveClick} />  {/* Pass the handler as a prop to PgnReader */}
    </div>
  );
}

export default App;
