import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import { LoginProvider } from '@/components/userContext';
import history from './router';

ReactDOM.render(
  <Router history={history}>
    <LoginProvider>
      <App />
    </LoginProvider>
  </Router>,
  document.getElementById('root')
);
