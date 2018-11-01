import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './components/Router';
import createStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
