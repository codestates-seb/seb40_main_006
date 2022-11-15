import React from 'react';
import { css } from '@emotion/css';
import palette from './Styles/theme';
import './Styles/App.css';

function App() {
  const color = palette.colorAccent;
  return (
    <div
      className={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}
    >
      Hover to change color.
    </div>
  );
}

export default App;
