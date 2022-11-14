import { css } from '@emotion/css';
import './Styles/App.css';
import React from 'react';

function App() {
  const color = 'white';
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
