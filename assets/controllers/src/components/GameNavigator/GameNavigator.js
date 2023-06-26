import React from 'react';

export default function GameNavigator({ gameState, currentGameStateIndex, setCurrentGameStateIndex }) {
  const moveToStart = () => {
    setCurrentGameStateIndex(0);
  };

  const moveToEnd = () => {
    setCurrentGameStateIndex(gameState.length - 1);
  };

  const moveToPrev = () => {
    setCurrentGameStateIndex(prev => prev > 0 ? prev - 1 : 0);
  };

  const moveToNext = () => {
    setCurrentGameStateIndex(prev => prev < gameState.length - 1 ? prev + 1 : gameState.length - 1);
  };

  return (
    <div className="game-navigator">
      <button onClick={moveToStart}>Start</button>
      <button onClick={moveToPrev}>Prev</button>
      <button onClick={moveToNext}>Next</button>
      <button onClick={moveToEnd}>End</button>
    </div>
  );
}