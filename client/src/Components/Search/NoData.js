import React from 'react';
import { css } from '@emotion/css';
import { palette } from '../../Styles/theme';

const container = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 140px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.border};
  border-radius: 20px;
  padding: 20px;
`;
const text1 = css`
  text-align: center;
  font-size: 24px;
  margin: 5px;
`;
const text2 = css`
  word-break: keep-all;
  text-align: center;
  font-size: large;
  margin: 15px;
`;
const NoData = () => {
  return (
    <div className={container}>
      <div className={text1}>000의</div>
      <div className={text1}>결과를 찾을 수 없습니다.</div>
      <div className={text2}>비슷한 검색어로 다시 검색해보세요!</div>
    </div>
  );
};
export default NoData;
