import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserProvider } from './contexts/userContext';
import { HubProvider } from './contexts/hubContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
          <HubProvider>
            <App />
          </HubProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();