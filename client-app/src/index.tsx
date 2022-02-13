import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import { store, StoreProvider } from './app/stores/store';

ReactDOM.render(
  <StoreProvider value={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById('root')
);
