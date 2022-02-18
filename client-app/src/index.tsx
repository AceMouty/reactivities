import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import './index.css';
import App from './App';

import { BrowserRouter as Router } from "react-router-dom";
import { store, StoreProvider } from './app/stores/store';

ReactDOM.render(
  <StoreProvider value={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);
