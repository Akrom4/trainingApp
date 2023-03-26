import { PieceType } from "../Constants";
import { Piece } from "./Piece";

export class King extends Piece {
    hasMoved;
    constructor(position, team, possibleMoves = [], hasMoved = false) {
        super(position, PieceType.KING, team, possibleMoves);
        this.hasMoved = hasMoved;
    }

    clone() {
        return new King(this.position.clone(), this.team, this.possibleMoves.map(position => position.clone()), this.hasMoved);
    }

    inCheck(pieces, destination = this.position) {
        return pieces.some(piece => {
            if(piece.team !== this.team)
                return piece.possibleMoves && piece.possibleMoves.some(move => destination.samePosition(move));
            return false;
        });
    }
}