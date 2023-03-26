import { PieceType } from "../Constants";


export class Piece {
    image;
    position;
    type;
    team;
    possibleMoves;
    constructor(position,type,team,possibleMoves = []) {
        this.image = `echecsplus/images/chess_${team}${type}.svg`;
        this.position = position;
        this.type = type;
        this.team = team;
        this.possibleMoves = possibleMoves;
    }
    clone(){
        return new Piece(this.position.clone(),this.type,this.team,this.possibleMoves.map(position => position.clone()));
    }
    samePosition(otherPosition){
        return this.position.samePosition(otherPosition);
    }

    get isPawn(){
        return this.type === PieceType.PAWN
    }
    get isQueen(){
        return this.type === PieceType.QUEEN
    }
    get isKing(){
        return this.type === PieceType.KING
    }
    get isRook(){
        return this.type === PieceType.ROOK
    }
    get isKnight(){
        return this.type === PieceType.KNIGHT
    }
    get isBishop(){
        return this.type === PieceType.BISHOP
    }
}