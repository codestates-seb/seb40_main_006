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
`;
const userContainer = css`
  width: 800px;
  min-width: 400px;
  // margin: 40px auto;
`;

const userJamInfo = css`
  display: flex;
  gap: 20px;
  padding: 40px 0;
  font-size: 18px;
  color: ${palette.colorTitle};
  .card {
    width: 390px;
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
`;

const Mypage = () => {
  const [user, setUser] = useRecoilState(myPageInfoState);
  const location = useLocation().pathname.slice(8);

  const accessToken = getCookie('is_login');
  useEffect(() => {
    axios
      .get(`/user/profile/${location}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(res => {
        setUser({
          memberId: res.data.data.memberId,
          img: res.data.data.profileImage,
          nickname: res.data.data.nickname,
          grade: user.grade,
          평가수: user.평가수,
          joinJamList: res.data.data.joinJams,
          createJamList: res.data.data.createJams,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className={pageContainer}>
      <Sidebar />
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
