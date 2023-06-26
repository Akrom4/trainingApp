import React from 'react';
import './pgnReader.css';
import { Pgn } from "../../models";

export default function PgnReader({ pgnData = null, onMoveClick }) {
  const chapters = pgnData && pgnData.chapter ? pgnData.chapter : [];
  console.log(pgnData);

  const handleMoveClick = (move) => {
    onMoveClick(move, move.position); // move.position contains the FEN notation after the move
  };

  const renderComments = (comments, moveNumber, color) => comments
    .filter(comment => comment.moveNumber === moveNumber && comment.teamColor === color)
    .map((comment, index) => (
      <div key={index} className="comment">
        {comment.text.replace(/\[%cal .*?\]/g, '')}
      </div>
    ));

  const renderMoves = (moves, comments) => {
    return moves.map((move, index) => (
      <React.Fragment key={index}>
        {move.teamColor === 'w' && <span className="moveNumber">{move.moveNumber}.&nbsp;</span>}
        <span
          className="moves"
          data-fen={move.position} // get FEN from the move object
          onClick={() => handleMoveClick(move)}
        >
          {move.move}&nbsp;
        </span>
        {renderComments(comments, move.moveNumber, move.teamColor)}
      </React.Fragment>
    ));
  };

  return (
    <div id="pgnBox">
      <div id="pgnBoxInner">
        {chapters.map((chapter, index) => (
          <div key={index}>
            <h3>{chapter.Title}</h3>
            <div className="movesContainer">{renderMoves(chapter.Moves, chapter.Comments)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
