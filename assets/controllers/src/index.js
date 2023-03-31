import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



const chess = ReactDOM.createRoot(document.getElementById('chess'));
chess.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);