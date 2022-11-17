import React from 'react';
import { css } from '@emotion/css';
import { Avatar } from '@mui/material/';

import { palette } from '../../Styles/theme';

const userTitle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
`;

const userTitleContainer = css`
  display: flex;
  align-items: center;
  gap: 20px;
  .userTitleInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 18px;
  }
  .userTitleJam {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 18px;
  }
  img {
    width: 18px;
    padding-bottom: 3px;
  }
`;

const userGiveJam = css`
  button {
    width: 100px;
    height: 40px;
    border-radius: 40px;
    font-size: 16px;
    color: white;
    background: ${palette.colorBtn1};
    border: 1px solid ${palette.colorBtn1};
    cursor: pointer;
    :hover {
      background: ${palette.colorGrade3};
    }
  }
`;

const UserTitle = () => {
  return (
    <div className={userTitle}>
      <div className={userTitleContainer}>
        <Avatar
          sx={{ width: 96, height: 96 }}
          alt="Jaehoon"
          // src="./logo192.png"
        />
        <div className="userTitleInfo">
          <div>유저닉네임</div>
          <div className="userTitleJam">
            <img src="./img/orangeJam.png" alt="jam" />
            <div>4.88</div>
            <div>(6)</div>
          </div>
        </div>
      </div>
      <div className={userGiveJam}>
        <button type="button">잼 주기</button>
      </div>
    </div>
  );
};

export default UserTitle;
