import React from 'react';
import ReactDOM from 'react-dom/client';
import Wrapper from './Wrapper';

const pgnForm = document.getElementById('pgn-wrapper');

ReactDOM.createRoot(pgnForm).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);