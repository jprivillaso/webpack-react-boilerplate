import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import configureStore from './store/configure_store';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'));
