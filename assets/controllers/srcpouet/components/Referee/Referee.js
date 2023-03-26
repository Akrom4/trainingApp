import { useEffect, useRef, useState } from "react";
import { column, initialBoard, PieceType, TeamType, fen } from "../../Constants";
import { Piece, Position } from "../../models";
import Chessboard from "../Chessboard/Chessboard";

export default function Referee() {
  // const [board,setBoard] = useState(testBoard);
  const [board, setBoard] = useState(initialBoard);
  const [promotion, setPromotion] = useState(null);
  const modalRef = useRef(null);
  const modalBodyRef = useRef(null);
  const [orientation, setBoardOrientation] = useState("white");
  const [teamTurn, setTeamTurn] = useState(TeamType.W); // true for white turn, false for black

  useEffect(() => {
    updatePossibleMoves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setOrientation(color) {
    setBoardOrientation(color);
  }
  function getOrientation() {
    return orientation;
  }

  function updatePossibleMoves() {
    board.validMoves();
  }

  function playMove(playedPiece, destination, chessboard) {
    let validMove = false;
    setBoard(() => {
      validMove = board.playMove(destination, playedPiece);
      // if (validMove) {
      //   board.setTurn(board.getTurn() === TeamType.W ? TeamType.B : TeamType.W);
      //   if(playedPiece.team === TeamType.B)
      //     board.newMoveCount();
      // }
      return board.clone();
    });
    // Promotion rule
    let promotionRow = playedPiece.team === TeamType.W ? 7 : 0;
    // Render the promotion modal
    if (playedPiece.position.y === promotionRow && playedPiece.isPawn) {
      modalPosition(chessboard, playedPiece, playedPiece.position.x);
      setPromotion(playedPiece);
      modalRef.current.classList.remove("hidden");
    }
    setTeamTurn(validMove ? (teamTurn === TeamType.W ? TeamType.B : TeamType.W) : teamTurn);
    return validMove;
  }

  // Promotion functions
  /**
   * Updates the board state with the new promoted piece
   * @param {PieceType} type
   */
  function promote(type) {
    board.pieces = board.pieces.reduce((results, piece) => {
      if (piece.samePosition(promotion.position)) {
        piece = new Piece(promotion.position, type, piece.team);
        piece.type = type;
      }
      results.push(piece);
      return results;
    }, []);

    updatePossibleMoves();
    setBoard(board.clone());

    modalRef.current.classList.add("hidden");
  }
  // Returns the color of the promoted pawn
  function promoteColor() {
    if (!promotion) return TeamType.W;
    return promotion.team;
  }
  // Place the modal in the column where the pawn was promoted
  /**
   *
   * @param {chessboard} chessboard
   * @param {piece} piece
   * @param {integer} x
   */

  function modalPosition(chessboard, piece, x) {
    const squareSize = chessboard.clientWidth / column.length;

    const squareTop = chessboard.offsetTop;

    let modalTop;
    let flexDirection;
    let squareLeft;
    if (orientation === "white") {
      squareLeft = chessboard.offsetLeft + x * squareSize;
      modalTop =
        piece.team === TeamType.W ? squareTop : squareTop + 4 * squareSize;
      flexDirection = piece.team === TeamType.W ? "column" : "column-reverse";
    } else {
      squareLeft = chessboard.offsetLeft + (column.length - 1 - x) * squareSize;
      modalTop =
        piece.team === TeamType.W ? squareTop + 4 * squareSize : squareTop;
      flexDirection = piece.team === TeamType.W ? "column-reverse" : "column";
    }

    modalBodyRef.current.style.left = `${squareLeft}px`;
    modalBodyRef.current.style.top = `${modalTop}px`;
    modalBodyRef.current.style.flexDirection = flexDirection;
  }
  function pushMove() {
    // const piece = board.pieces.find((p) => p.samePosition(new Position(1, 1)));
    // board.playMove(new Position(1, 2), piece);
    board.pushMove(new Position(1, 1),new Position(1, 3))
    updatePossibleMoves();
    setBoard(board.clone());
  }

  function readFen(){
    const newBoardState = board.fenReader(fen);
    newBoardState.validMoves();
    setTeamTurn(newBoardState.getTurn());
    setBoard(newBoardState.clone());
  }
  function getFen(){
    board.getFen();
  }

  return (
    <>
      <div id="promotion" className="hidden" ref={modalRef}>
        <div className="modalBody" ref={modalBodyRef}>
          <div id="queen" onClick={() => promote(PieceType.QUEEN)}>
            <div
              style={{
                backgroundImage: `url(echecsplus/images/chess_${promoteColor()}q.svg)`,
              }}
            />
          </div>
          <div id="knight" onClick={() => promote(PieceType.KNIGHT)}>
            <div
              style={{
                backgroundImage: `url(echecsplus/images/chess_${promoteColor()}n.svg)`,
              }}
            />
          </div>
          <div id="rook" onClick={() => promote(PieceType.ROOK)}>
            <div
              style={{
                backgroundImage: `url(echecsplus/images/chess_${promoteColor()}r.svg)`,
              }}
            />
          </div>
          <div id="bishop" onClick={() => promote(PieceType.BISHOP)}>
            <div
              style={{
                backgroundImage: `url(echecsplus/images/chess_${promoteColor()}b.svg)`,
              }}
            />
          </div>
        </div>
      </div>
      <Chessboard
        playMove={playMove}
        pieces={board.pieces}
        setOrientation={setOrientation}
        getOrientation={getOrientation}
        teamTurn={teamTurn}
      />
      <div className="readFen">
        <button onClick={getFen}>getFen</button>
      </div>
      {/* <div className="pushMove">
        <button onClick={pushMove}>Push move</button>
      </div>
      <div className="readFen">
        <button onClick={readFen}>readFen</button>
      </div> */}
    </>
  );
}
