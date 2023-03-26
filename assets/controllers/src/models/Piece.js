import { PieceType , TeamType } from "../Constants";
import whitePawn from '../assets/images/chess_wp.svg';
import whiteRook from '../assets/images/chess_wr.svg';
import whiteKnight from '../assets/images/chess_wn.svg';
import whiteBishop from '../assets/images/chess_wb.svg';
import whiteQueen from '../assets/images/chess_wq.svg';
import whiteKing from '../assets/images/chess_wk.svg';
import blackPawn from '../assets/images/chess_bp.svg';
import blackRook from '../assets/images/chess_br.svg';
import blackKnight from '../assets/images/chess_bn.svg';
import blackBishop from '../assets/images/chess_bb.svg';
import blackQueen from '../assets/images/chess_bq.svg';
import blackKing from '../assets/images/chess_bk.svg';


export class Piece {
    image;
    position;
    type;
    team;
    possibleMoves;
    constructor(position, type, team, possibleMoves = []) {
        this.image = this.getImagePath(team, type);
        this.position = position;
        this.type = type;
        this.team = team;
        this.possibleMoves = possibleMoves;
    }
    clone() {
        return new Piece(this.position.clone(), this.type, this.team, this.possibleMoves.map(position => position.clone()));
    }
    samePosition(otherPosition) {
        return this.position.samePosition(otherPosition);
    }

    get isPawn() {
        return this.type === PieceType.PAWN
    }
    get isQueen() {
        return this.type === PieceType.QUEEN
    }
    get isKing() {
        return this.type === PieceType.KING
    }
    get isRook() {
        return this.type === PieceType.ROOK
    }
    get isKnight() {
        return this.type === PieceType.KNIGHT
    }
    get isBishop() {
        return this.type === PieceType.BISHOP
    }

    getImagePath(team, type) {
        if (team === TeamType.W) {
            switch (type) {
                case PieceType.PAWN:
                    return whitePawn;
                case PieceType.ROOK:
                    return whiteRook;
                case PieceType.KNIGHT:
                    return whiteKnight;
                case PieceType.KING:
                    return whiteKing;
                case PieceType.QUEEN:
                    return whiteQueen;
                case PieceType.BISHOP:
                    return whiteBishop;
            }
        } else {
            switch (type) {
                case PieceType.PAWN:
                    return blackPawn;
                case PieceType.ROOK:
                    return blackRook;
                case PieceType.KNIGHT:
                    return blackKnight;
                case PieceType.KING:
                    return blackKing;
                case PieceType.QUEEN:
                    return blackQueen;
                case PieceType.BISHOP:
                    return blackBishop;
            }
        }
    }
}