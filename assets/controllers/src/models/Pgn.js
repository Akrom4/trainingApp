import { column, PieceType, TeamType } from "../Constants";
import { oppositeColor, pieceTypeFromChar, removeAnnotations } from "../Helpers";
import { Board, Course, Position } from "../models";

export class Pgn {
    pgnFile;
    moves;
    comments;
    chapters;
    variations;

    constructor(pgnFile = null) {
        this.pgnFile = pgnFile;
    }

    parseData() {
        if (!this.pgnFile) {
            return;
        }

        const chapters = this.pgnFile.split('\n\n\n');
        
        const courseTitleLine = chapters.find(line => line.startsWith('[CourseTitle'));
        const courseTitle = courseTitleLine ? courseTitleLine.split('"')[1] : '';
        const course = new Course(courseTitle);

        for (const [index, chapter] of chapters.entries()) {
            const lines = chapter.split('\n');
            const startFEN = this.metaData(lines, '[FEN');
            const title = this.metaData(lines, '[Event');


            let board = new Board();
            if (startFEN) {
                board = board.fenReader(startFEN);
            } else {
                board = board.clone();
            }

            const moveLines = lines.filter(line => !line.startsWith('[') && line !== '');
            const moveText = moveLines.join(' ').trim();

            const parsedChapter = this.parseVariation(board, moveText, board.moveCount, board.turn);
            course.addChapter({
                Title: title,
                Number: index + 1,
                Moves: parsedChapter.moves,
                Comments: parsedChapter.comments,
                Variations: parsedChapter.variations,
                FEN: startFEN
            });
        }
        return course;
    }

    parseVariation(board, moveText, moveNumber, teamColor, parentMove = null) {
        const moveTokens = moveText.split(/(\d+\.{1,3}\s?|\s*\{.*?\}\s*|\s*\(\s*|\s*\)\s*|\s+)/);
        const variation = {
            moves: [],
            comments: [],
            variations: [],
            parentMove: parentMove
        };
    
        let nestedMoveText = '';
        const parenthesesStack = [];
    
        for (let i = 0; i < moveTokens.length; i++) {
            let token = moveTokens[i].trim();
    
            if (token === '*' || token === '') {
                continue;
            }
    
            if (token === '(') {
                parenthesesStack.push(token);
                if (parenthesesStack.length === 1) {
                    nestedMoveText = '';
                } else {
                    nestedMoveText += ' ' + token;
                }
            } else if (token === ')') {
                parenthesesStack.pop();
                if (parenthesesStack.length === 0) {
                    const lastMove = variation.moves[variation.moves.length - 1];
                    const variationStartingPosition = variation.moves[variation.moves.length - 2];
                    const variationBoard = board.fenReader(variationStartingPosition.position);
    
                    const nestedVariation = this.parseVariation(
                        variationBoard,
                        nestedMoveText.trim(),
                        moveNumber,
                        teamColor,
                        lastMove
                    );
                    variation.variations.push(nestedVariation);
    
                    nestedMoveText = '';
                } else {
                    nestedMoveText += ' ' + token;
                }
            } else if (parenthesesStack.length > 0) {
                nestedMoveText += ' ' + token;
            } else if (token.endsWith('.')) {
                moveNumber = parseInt(token.slice(0, -1), 10);
                teamColor = token.endsWith('...') ? TeamType.B : TeamType.W;
            } else if (token.startsWith('{')) {
                let comment = token.slice(1, -1);
                variation.comments.push({
                    text: comment.trim(),
                    moveNumber: moveNumber,
                    teamColor: oppositeColor(teamColor)
                });
            } else {
                this.pushPGNMove(board, token, teamColor);
                console.log(token);
                variation.moves.push({
                    move: token,
                    moveNumber: moveNumber,
                    teamColor: teamColor,
                    position: board.getFen()
                });
                teamColor = oppositeColor(teamColor);
            }
        }
        return variation;
    }
 
    metaData(lines, string) {
        const startMetaDataLine = lines.find(line => line.startsWith(string));
        let metaData = '';

        if (startMetaDataLine) {
            metaData = startMetaDataLine.split('"')[1];
        }
        return metaData;
    }

    pushPGNMove(board, newmove, teamColor) {
        const move = removeAnnotations(newmove);
        let movingPieceType;
        let targetSquare;

        if (move === "OO" || move === "OOO") {
            movingPieceType = PieceType.KING;
            const kingside = move === "OO";
            const rowKing = teamColor === TeamType.W ? 0 : 7;
            const columnKing = kingside ? 6 : 2;
            targetSquare = new Position(columnKing, rowKing);
        } else {
            movingPieceType = (move.charAt(0) === move.charAt(0).toUpperCase())
                ? pieceTypeFromChar(move.charAt(0))
                : PieceType.PAWN;

            const moveWithoutPieceType = movingPieceType === PieceType.PAWN ? move : move.substring(1);
            const columnChar = moveWithoutPieceType.charAt(moveWithoutPieceType.length - 2);
            const rowChar = moveWithoutPieceType.charAt(moveWithoutPieceType.length - 1);

            const columnPiece = column.indexOf(columnChar);
            const rowPiece = parseInt(rowChar) - 1;

            targetSquare = new Position(columnPiece, rowPiece);
        }
        const movingPiece = this.findMovingPiece(board, move, movingPieceType, targetSquare, teamColor);
        board.playMove(targetSquare, movingPiece);

    }

    findMovingPiece(board, move, movingPieceType, targetSquare, teamColor) {
        // For castling moves, find the king of the current turn
        if (movingPieceType === PieceType.KING && (move === "OO" || move === "OOO")) {
            return board.pieces.find((piece) => piece.type === movingPieceType && piece.team === teamColor);
        }

        // For other moves, find the piece of the given type that can move to the target square
        const possiblePieces = board.pieces.filter((piece) => piece.type === movingPieceType && piece.team === teamColor);

        // Check for disambiguation information (file or rank) in the move string
        let disambiguationFile = null;
        let disambiguationRank = null;

        const disambiguationMatch = move.match(/([a-h]?)([1-8]?)[x-]?[a-h][1-8]/);
        if (disambiguationMatch) {
            disambiguationFile = disambiguationMatch[1] ? column.indexOf(disambiguationMatch[1]) : null;
            disambiguationRank = disambiguationMatch[2] ? disambiguationMatch[2] - 1 : null;
        }

        for (const piece of possiblePieces) {
            const validMoves = board.getValidMoves(piece);

            if (
                validMoves.some((move) => move.x === targetSquare.x && move.y === targetSquare.y) &&
                (disambiguationFile === null || piece.position.x === disambiguationFile) &&
                (disambiguationRank === null || piece.position.y === disambiguationRank)
            ) {
                return piece;
            }
        }
    }
}




