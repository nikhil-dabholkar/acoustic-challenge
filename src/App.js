import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import  ArticleContainer  from "./containers/ArticleContainer";
import RootContainer from './containers/RootContainer';

function App() {
  return (
    <div className="App">
      {/* <ArticleContainer></ArticleContainer> */}
      <RootContainer></RootContainer>
    </div>
  );
}

export default App;
