import React from 'react';
// import { css } from '@emotion/css';
// import palette from './Styles/theme';
import './Styles/App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function App() {
  // const color = palette.colorAccent;
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
}

export default App;
