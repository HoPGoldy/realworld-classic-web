import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import { LoginProvider } from '@/plugins/userContext';
import history from './plugins/history';

ReactDOM.render(
  <Router history={history}>
    <LoginProvider>
      <App />
    </LoginProvider>
  </Router>,
  document.getElementById('root')
);
