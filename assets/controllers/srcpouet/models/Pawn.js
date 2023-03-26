import { PieceType } from "../Constants";
import { Piece } from "./Piece";

export class Pawn extends Piece{
    enPassant;
    constructor(position,team,possibleMoves=[],enPassant=false){
        super(position,PieceType.PAWN,team,possibleMoves);
        this.enPassant = enPassant;
    }
    clone(){
        return new Pawn(this.position.clone(),this.team,this.possibleMoves.map(position => position.clone()), this.enPassant);
    }
}