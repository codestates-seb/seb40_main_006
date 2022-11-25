import React from 'react';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/css';
import { Avatar } from '@mui/material/';
import { palette } from '../../Styles/theme';
import { myPageInfoState } from '../../Atom/atoms';
import GiveJam from './GiveJam';

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
    padding-bottom: 1px;
  }
`;

const userGiveJam = css`
  Button {
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
      border: 1px solid ${palette.colorGrade3};
    }
  }
`;

const UserTitle = () => {
  const [userInfo] = useRecoilState(myPageInfoState);

  return (
    <div className={userTitle}>
      <div className={userTitleContainer}>
        <Avatar
          sx={{ width: 96, height: 96 }}
          alt="Jaehoon"
          src={userInfo.img}
        />
        <div className="userTitleInfo">
          <div>{userInfo.nickname}</div>
          <div className="userTitleJam">
            <img src="./img/orangeJam.png" alt="jam" />
            <div>{userInfo.grade}</div>
            <div>{`(${userInfo.평가수})`}</div>
          </div>
        </div>
      </div>
      <div className={userGiveJam}>
        <GiveJam />
      </div>
    </div>
  );
};

export default UserTitle;
