import { TeamType, PieceType } from "./Constants";

export function oppositeColor(color) {
    return color === TeamType.W ? TeamType.B : TeamType.W;
}

export function removeAnnotations(move) {
    return move.replace(/[!?+\-/#)]+/g, '');
}

export function pieceTypeFromChar(char){
    const values = Object.values(PieceType);
    const index = values.indexOf(char.toLowerCase());
    const key = Object.keys(PieceType)[index];
    return PieceType[key];
}