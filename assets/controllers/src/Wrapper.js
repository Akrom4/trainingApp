import Referee from './components/Referee/Referee';
import PgnWrapper from './components/PgnReader/pgnWrapper';
import './wrapper.css';

function Wrapper() {
  return (
    <div id="wrap">
      <Referee />
      <PgnWrapper />
    </div>
  );
}

export default Wrapper;
