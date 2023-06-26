import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function GameNavigator({ gameState, currentGameStateIndex, setCurrentGameStateIndex, setFen, INITIAL_FEN }) {
    const moveToStart = () => {
        setCurrentGameStateIndex(-1);
        setFen(INITIAL_FEN);
      };
      
      const moveToEnd = () => {
        if(gameState.length > 0) {
          setCurrentGameStateIndex(gameState.length - 1);
        }
      };
      
      const moveToPrev = () => {
        setCurrentGameStateIndex(prev => prev > 0 ? prev - 1 : 0);
      };
      
      const moveToNext = () => {
        setCurrentGameStateIndex(prev => prev < gameState.length - 1 ? prev + 1 : prev);
      };

  return (
    <div className="game-navigator">
      <button onClick={moveToStart} title="Start"><div className="circle"><FaAngleDoubleLeft /></div></button>
      <button onClick={moveToPrev} title="Prev"><div className="circle"><FaAngleLeft /></div></button>
      <button onClick={moveToNext} title="Next"><div className="circle"><FaAngleRight /></div></button>
      <button onClick={moveToEnd} title="End"><div className="circle"><FaAngleDoubleRight /></div></button>
    </div>
  );
}
