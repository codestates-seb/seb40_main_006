import React from 'react';
import { Global, css } from '@emotion/react';

const style = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    font-size: 100%;
    line-height: 1;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
