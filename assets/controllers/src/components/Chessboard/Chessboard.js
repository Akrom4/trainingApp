import React, { useRef, useState } from 'react';
import Square from '../Square/Square';
import './Chessboard.css';
import { row, column } from '../../Constants';
import { Position } from "../../models";




export default function Chessboard({ playMove, pieces, setOrientation, getOrientation, teamTurn }) {
    // Initialization
    const [activePiece, setActivePiece] = useState(null);
    const [grabPosition, setGrabPosition] = useState(null);
    const [isDragging, setIsDragging] = useState(false); // mobile
    const chessboardRef = useRef(null);



    function handleTouch(e) {
        e.stopPropagation(); // Prevent touch event from bubbling up the DOM tree
    }


    /**
     * Grab the piece and center it on the cursor
     * 
     * @param {event} e 
     * 
     * @returns {element} Grabbed piece element
     */

    function grabPiece(e) {
        const chessboard = chessboardRef.current;
        const element = e.target;
        let x = 0;
        let y = 0;
    
        if (element.classList.contains("piece") && element.classList.contains("drag") && chessboard) {
            // mobile
            if (e.type === "touchstart") {
                setIsDragging(true); // mobile
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }
            // browser
            else {
                x = e.clientX;
                y = e.clientY;
            }
    
            // Get the dimensions of the image
            const width = element.offsetWidth;
            const height = element.offsetHeight;
    
            // Calculate the left and top positions to center the image on the cursor
            const left = x - (width / 2);
            const top = y - (height / 2);
    
            // Set the position and size of the image
            element.style.position = "absolute";
            element.style.zIndex = 999;
            element.style.left = `${left}px`;
            element.style.top = `${top}px`;
    
            // Adjust grab position based on board orientation
            const grabX = Math.floor((x - chessboard.offsetLeft) / (chessboard.clientHeight / row.length));
            const grabY = Math.abs(Math.ceil((y - chessboard.offsetTop - chessboard.clientHeight) / (chessboard.clientHeight / column.length)));
            setGrabPosition(
                getOrientation() === "white"
                    ? new Position(grabX, grabY)
                    : new Position(column.length - 1 - grabX, row.length - 1 - grabY)
            );
    
            setActivePiece(element);
        }
    }   
    
    
    /**
     * Grabbed piece follows the cursor
     * @param {event} e 
     */
    function movePiece(e) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            // chessboard corner offsets
            const minX = chessboard.offsetLeft;
            const minY = chessboard.offsetTop;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth;
            const maxY = chessboard.offsetTop + chessboard.clientHeight;

            let x = grabPosition.x;
            let y = grabPosition.y;

            if (isDragging) { // mobile
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                // cursor coordinates
                x = e.clientX;
                y = e.clientY;
            }

            // Get the dimensions of the image
            const width = activePiece.offsetWidth;
            const height = activePiece.offsetHeight;

            // Calculate the left and top positions to center the image on the cursor
            const left = x - (width / 2);
            const top = y - (height / 2);

            // Set the center of the image on the cursor
            activePiece.style.left = x  < minX ? `${minX - width / 2}px` : x > maxX ? `${maxX - width / 2}px` : `${left}px`;
            activePiece.style.top = y  < minY ? `${minY - height / 2}px` : y > maxY ? `${maxY - height / 2}px` : `${top}px`;
        }
    }
    /**
     * Checks if the move is a valid, updates the board state
     * @param {event} e 
     */
    function dropPiece(e) {
        const chessboard = chessboardRef.current;

        if (activePiece && chessboard) {
            let x = grabPosition.x;
            let y = grabPosition.y;
            if (isDragging) { // mobile
                x = Math.floor((e.changedTouches[0].clientX - chessboard.offsetLeft) / (chessboard.clientHeight / row.length));
                y = Math.abs(Math.ceil((e.changedTouches[0].clientY - chessboard.offsetTop - chessboard.clientHeight) / (chessboard.clientHeight / column.length)));
            } else {
                // Get the square coordinates 
                x = Math.floor((e.clientX - chessboard.offsetLeft) / (chessboard.clientHeight / row.length));
                y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - chessboard.clientHeight) / (chessboard.clientHeight / column.length)));
            }
            
            // Update the grabbed position based on the orientation of the board
            if (getOrientation() === 'black') {
                x = column.length - 1 - x;
                y = row.length - 1 - y;
            }
            // Get the dropped piece 
            const currentPiece = pieces.find(p => p.samePosition(grabPosition));

            if (currentPiece) {
                if (!playMove(currentPiece, new Position(x, y), chessboard)) {
                    // If this is not a valid move place the piece to its last position
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }

                activePiece.style.zIndex = 0;
                setActivePiece(null); // The dropped piece doesnt follow the cursor anymore
                setIsDragging(false); // mobile
                
            }
        }
    }

    function renderBoard() {
        let board = [];
        let white_square = false;
        let jStart, jEnd, jIncrement, iStart, iEnd, iIncrement;

        if (getOrientation() === 'white') {
            jStart = row.length - 1;
            jEnd = -1;
            jIncrement = -1;
            iStart = 0;
            iEnd = column.length;
            iIncrement = 1;
        } else {
            jStart = 0;
            jEnd = row.length;
            jIncrement = 1;
            iStart = column.length - 1;
            iEnd = -1;
            iIncrement = -1;
        }

        for (let j = jStart; j !== jEnd; j += jIncrement) {
            white_square = !white_square;
            for (let i = iStart; i !== iEnd; i += iIncrement) {
                const piece = pieces.find(p => p.samePosition(new Position(i, j)))
                let image = piece ? piece.image : undefined;
                // Search the grabbed piece
                let currentPiece = activePiece != null ? pieces.find(p => p.samePosition(grabPosition)) : undefined;
                // Highlight validmoves
                let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => p.samePosition(new Position(i, j))) : false;
                // Highlight pawn taken enPassant
                if (!highlight && currentPiece?.isPawn && piece?.isPawn) {
                    const enPassantPiece = piece.enPassant &&
                        piece.team !== currentPiece.team &&
                        Math.abs(piece.position.x - currentPiece.position.x) === 1 &&
                        piece.position.y === currentPiece.position.y;;
                    if (enPassantPiece)
                        highlight = true;
                }
                // Set drag on team turn pieces
                let drag = piece?.team === teamTurn;                

                board.push(<Square key={`${j},${i}`} isWhite={white_square} piece={image} highlight={highlight} drag={drag} index={`${j},${i}`} />);
                white_square = !white_square;
            }
        }

        return board;
    }

    // Toggle board orientation
    function rotateBoard() {
        getOrientation() === 'white' ? setOrientation('black') : setOrientation('white');
    }
    function righClick(e){
        e.preventDefault();
    }

    const board = renderBoard();

    return (

        <div
            onMouseMove={e => movePiece(e)}
            onMouseDown={e => grabPiece(e)}
            onMouseUp={e => dropPiece(e)}
            onTouchStart={e => {
                handleTouch(e); // prevent the default touch behavior
                grabPiece(e);
            }}
            onTouchMove={e => {
                handleTouch(e);
                movePiece(e);
            }}
            onTouchEnd={e => {
                handleTouch(e);
                dropPiece(e);
            }}
            onContextMenu={e => righClick(e)}
            ref={chessboardRef}
            id="chessboard"
        >

            {board}
            {/* <div className="chessboard-nav"> */}
                {/* <button onClick={rotateBoard}>Rotate Board</button> Add rotation button */}
            {/* </div> */}
        </div>
    );
}
