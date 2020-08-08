import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import RootContainer from './containers/RootContainer/RootContainer';

function App() {
  return (
    <div className="App">
      <RootContainer></RootContainer>
    </div>
  );
}

export default App;
