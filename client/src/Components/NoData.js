import React from 'react';
import { css } from '@emotion/css';
import { palette } from '../Styles/theme';

const container = css`
  display: flex;
  flex-direction: column;
  height: 140px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.border};
  border-radius: 20px;
  padding: 20px 100px;
`;
const text1 = css`
  word-break: keep-all;
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

const containerHome = css`
  display: flex;
  flex-direction: column;
  height: 140px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.border};
  border-radius: 10px;
  margin: 20px;
  padding: 20px 100px;
`;
const text1Home = css`
  word-break: keep-all;
  text-align: center;
  font-size: 24px;
  margin: 5px;
`;
const text2Home = css`
  word-break: keep-all;
  text-align: center;
  font-size: large;
  margin: 15px;
`;
export const NoSearchData = () => {
  return (
    <div className={container}>
      <div className={text1}>000의</div>
      <div className={text1}>결과를 찾을 수 없습니다.</div>
      <div className={text2}>비슷한 검색어로 다시 검색해보세요!</div>
    </div>
  );
};

export const NoCategoryData = () => {
  return (
    <div className={container}>
      <div className={text1}>현재 카테고리의 잼이 없습니다.</div>
    </div>
  );
};

export const NoNearyByData = () => {
  return (
    <div className={containerHome}>
      <div className={text1Home}>근처에 잼이 없습니다.</div>
      <div className={text2Home}>주소 재설정 또는 지도를 움직여보세요!</div>
    </div>
  );
};
// export default NoData;
