import { PieceType } from "../Constants";
import { Piece } from "./Piece";

export class Rook extends Piece {
    hasMoved;
    constructor(position, team, possibleMoves = [], hasMoved = false) {
        super(position, PieceType.ROOK, team, possibleMoves);
        this.hasMoved = hasMoved;
    }

    clone() {
        return new Rook(this.position.clone(), this.team, this.possibleMoves.map(position => position.clone()), this.hasMoved);
    }
}