import React, { useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import axios from 'axios';
// import { myPageInfoState } from '../Atom/atoms';
import { css } from '@emotion/css';
import { palette } from '../Styles/theme';
import UserTitle from '../Components/userComp/UserTitle';
import JoinJams from '../Components/userComp/JoinJams';
import OpenJams from '../Components/userComp/OpenJams';
import Sidebar from '../Components/Sidebar';
import { getCookie } from '../Components/SignComp/Cookie';

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
    width: 400px;
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
  }
`;

const Mypage = () => {
  // const [userInfo] = useRecoilState(myPageInfoState);

  const accessToken = getCookie('is_login');
  console.log(accessToken);

  useEffect(() => {
    // axios.get(
    //   '/',
    //   { memberId: userInfo.memberId },
    //   {
    //     headers: {
    //       Authorization: accessToken,
    //     },
    //   },
    // );
    // .then(res => {
    //   setUserInfo({
    //     memberId: userInfo.memberId,
    //     img: res.data.img,
    //     nickname: res.data.nickname,
    //     grade: res.data.grade,
    //     평가수: res.data.평가수,
    //     myJamList: res.data.myJamList,
    //     participationList: res.data.participationList,
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  });
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
