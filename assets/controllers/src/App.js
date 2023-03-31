import './App.css';
import Referee from './components/Referee/Referee';
import PgnReader from './components/PgnReader/pgnReader';

function App() {
  const chessElement = document.getElementById('chess');
  const chapter = JSON.parse(chessElement.getAttribute('data-pgnreader'));
  
  return (
    <div id="app">
      <Referee />
      <PgnReader pgnData={chapter} />
    </div>
  );
}

export default App;
