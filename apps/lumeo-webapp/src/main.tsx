import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import { baseURL } from './config';
import { inject } from '@vercel/analytics';

inject();
if (baseURL) {
  axios.defaults.baseURL = baseURL;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
