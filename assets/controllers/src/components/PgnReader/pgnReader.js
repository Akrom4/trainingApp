import './pgnReader.css';
import {Pgn} from "../../models";
import { pgnTest } from "../../Constants";



export default function PgnReader(pgnData = null) {


    function pgnDisplay(pgnData){
        const pgn = pgnData ? new Pgn(pgnTest) : null ;
        if(pgn){
            pgn.parseData();
        }
    }

    const data = pgnDisplay(pgnData);

    return (
        <div id="pgnBox">
            {/* <div className="moves">
                1.e2 e4 2. Cf3 Cc6 3. Fc4
            </div>
            <div className="comments">
                Oh la belle italienne !
            </div> */}
        </div>
    );
}