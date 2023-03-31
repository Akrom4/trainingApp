import React from 'react';
import './pgnReader.css';
import { Pgn } from "../../models";


export default function PgnReader({ pgnData = null}) {
  const chapters = pgnData && pgnData.chapter ? pgnData.chapter : [];
    console.log(pgnData);
    const renderMoves = (moves) => {
        return moves.map((move, index) => (
          <span key={index} className="moves" data-fen={move.position}>
            {move.teamColor === 'w' && `${move.moveNumber}. `}
            {move.move} &nbsp;
          </span>
        ));
      };

  return (
    <div id="pgnBox">
      {chapters.map((chapter, index) => (
        <div key={index}>
          <h3>{chapter.Title}</h3>
          <div>{renderMoves(chapter.Moves)}</div>
        </div>
      ))}
    </div>
  );
}
