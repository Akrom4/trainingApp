import {row,column} from "../Constants";
export class Position{
    x;
    y;
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    samePosition(destination){
        return this.x === destination.x && this.y === destination.y;
    }
    clone(){
        return new Position(this.x,this.y);
    }
    toString(){        
        return column[this.x] + row[this.y];
    }
}