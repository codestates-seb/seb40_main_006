import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { css } from '@emotion/css';
import { useLocation } from 'react-router-dom';
import { palette } from '../Styles/theme';
import UserTitle from '../Components/userComp/UserTitle';
import JoinJams from '../Components/userComp/JoinJams';
import OpenJams from '../Components/userComp/OpenJams';
import Sidebar from '../Components/Sidebar';
import { getCookie } from '../Components/SignComp/Cookie';
import { myPageInfoState } from '../Atom/atoms';

const pageContainer = css`
  display: flex;
  gap: 100px;
  @media screen and (max-width: 767px) {
    gap: 40px;
  }
`;

const sidebarContainer = css`
  display: flex;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const userContainer = css`
  width: 800px;
  min-width: 400px;
  margin: 40px auto;
  @media screen and (max-width: 767px) {
    margin: 0 0 0 20px;
  }
`;

const userJamInfo = css`
  display: flex;
  gap: 20px;
  padding: 40px 0;
  font-size: 18px;
  color: ${palette.colorTitle};
  width: 800px;
  .container {
    width: 390px;
  }
  .jamContainer {
    height: 100px;
    cursor: pointer;
  }
  .card {
    width: 390px;
    height: 100px;
    display: flex;
    margin: 10px 0;
    border: 1px solid ${palette.colorBorder2};
    box-shadow: inherit;
  }
  .cardActions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 13px;
    .title {
      padding-left: 3px;
      width: 100%;
    }
    .info {
      display: flex;
      gap: 10px;
      margin: 0 auto;
      margin-top: 15px;
      > div {
        display: flex;
        align-items: center;
        > img {
          width: 20px;
          padding: 0 5px 0 1px;
        }
      }
    }
  }
  .cardBtn {
    margin-bottom: 60px;
    position: relative;
    bottom: 100px;
    left: 320px;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 60px;
    .container {
      font-size: 16px;
    }
    .cardActions {
      font-size: 12px;
    }
  }
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const Mypage = () => {
  const [, setUser] = useRecoilState(myPageInfoState);
  const location = useLocation().pathname.slice(8);

  const accessToken = getCookie('accessToken');
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/profile/${location}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then(res => {
        setUser({
          memberId: res.data.data.memberId,
          img: res.data.data.profileImage,
          nickname: res.data.data.nickname,
          grade: res.data.data.grade,
          gradeCount: res.data.data.gradeCount,
          joinJamList: res.data.data.joinJams,
          createJamList: res.data.data.createJams,
        });
      });
  }, []);

  return (
    <div className={pageContainer}>
      <div className={sidebarContainer}>
        <Sidebar />
      </div>
      <div className={userContainer}>
        <UserTitle />
        <div className={userJamInfo}>
          <JoinJams />
          <OpenJams />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
