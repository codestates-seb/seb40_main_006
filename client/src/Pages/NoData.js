import React from 'react';
import { css } from '@emotion/css';
import imgError from '../Assets/images/bx_error.png';

const container = css`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  justify-content: center;
`;
const textContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoData = () => {
  return (
    <div className={container}>
      <img src={imgError} alt="error" />
      <div className={textContainer}>
        <h1>잘못된 주소입니다.</h1>
        <h3>경로를 다시 확인해주세요.</h3>
      </div>
    </div>
  );
};

export default NoData;
