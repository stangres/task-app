import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { StoresProvider } from './stores-provider';
import App from './pages/App';

configure({enforceActions: 'always'});

const content = (
  <StoresProvider>
    <App/>
  </StoresProvider>
);

ReactDOM.render(content, document.getElementById('root'));