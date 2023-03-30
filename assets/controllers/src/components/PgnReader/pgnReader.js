import './pgnReader.css';
import { Pgn } from "../../models";
import { pgnTest } from "../../Constants";



export default function PgnReader(pgnData = null) {
    function pgnDisplay(pgnData) {
        const pgn = pgnData ? new Pgn(pgnTest) : null;

    }

    const data = pgnDisplay(pgnData);

    return (
        <div id="pgnBox">
        </div>
    );
}