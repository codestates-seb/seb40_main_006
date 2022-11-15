import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './Styles/index.css';
import App from './App';
import GlobalStyle from './Styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <GlobalStyle />
    <App />
  </RecoilRoot>,
);
