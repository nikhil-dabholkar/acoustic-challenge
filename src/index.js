import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'carbon-components/css/carbon-components.min.css';
import { LanguageWrapper, StoreWrapper } from "./wrappers/index";



ReactDOM.render(
  <React.StrictMode>
    <StoreWrapper>
      <LanguageWrapper>
        <App />
      </LanguageWrapper>
    </StoreWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
