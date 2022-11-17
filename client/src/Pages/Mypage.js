import React from 'react';
import { css } from '@emotion/css';
import { palette } from '../Styles/theme';
import UserTitle from '../Components/userComp/UserTitle';
import JoinJams from '../Components/userComp/JoinJams';
import OpenJams from '../Components/userComp/OpenJams';

const container = css`
  padding: 40px;
  width: 800px;
  min-width: 400px;
  margin: 0 auto;
`;

const userJamInfo = css`
  display: flex;
  gap: 20px;
  padding: 40px 0;
  font-size: 18px;
  color: ${palette.colorTitle};
  .card {
    width: 350px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 1px solid ${palette.colorBorder2};
    box-shadow: inherit;
  }
  .cardActions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    .title {
      // display: flex;
      margin-bottom: 10px;
      width: 100px;
    }
    .info {
      display: flex;
      gap: 10px;
      margin: 0 auto;
    }
  }
  .cardBtn {
    margin-bottom: 60px;
  }
`;

const Mypage = () => {
  return (
    <div className={container}>
      <UserTitle />
      <div className={userJamInfo}>
        <JoinJams />
        <OpenJams />
      </div>
    </div>
  );
};

export default Mypage;
