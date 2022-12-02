import React from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
// import { Avatar } from '@mui/material/';
import { palette } from '../../Styles/theme';
import { loginUserInfoState, myPageInfoState } from '../../Atom/atoms';
import GiveJam from './GiveJam';
import JamColor from '../JamColor';

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
    width: 100px;
    border-radius: 100px;
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
  const [pageUser] = useRecoilState(myPageInfoState);
  const [user] = useRecoilState(loginUserInfoState);

  return (
    <div className={userTitle}>
      <div className={userTitleContainer}>
        {/* <Avatar
          sx={{ width: 96, height: 96 }}
          alt="Jaehoon"
          src={pageUser.img}
        /> */}
        <img src={pageUser.img} alt="userimage" />
        <div className="userTitleInfo">
          <div>{pageUser.nickname}</div>
          <div className="userTitleJam">
            <JamColor />
            <div>{pageUser.grade}</div>
            <div>{`(${pageUser.평가수})`}</div>
          </div>
        </div>
      </div>
      <div className={userGiveJam}>
        {pageUser.memberId === user.memberId ? (
          <Link to={`/profile/${user.memberId}`}>
            <button type="button">수정</button>
          </Link>
        ) : (
          <GiveJam />
        )}
      </div>
    </div>
  );
};

export default UserTitle;
