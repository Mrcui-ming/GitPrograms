import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/base.css';
import store from './store/store';
import { Provider } from 'react-redux';

import FastClick from 'fastclick';
FastClick.attach(document.getElementById('root'));

ReactDOM.render(
  <Provider  store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
