import Referee from './components/Referee/Referee';
import PgnWrapper from './components/PgnReader/pgnWrapper';

function Wrapper() {
  return (
    <div id="wrap">
      <Referee />
      <PgnWrapper />
    </div>
  );
}

export default Wrapper;
