import React from 'react';
import { css } from '@emotion/css';
import { Avatar, Grid } from '@mui/material/';
import { palette } from '../Styles/theme';
import JamCard from '../Components/userComp/JamCard';

const container = css`
  padding: 40px;
  width: 800px;
  min-width: 400px;
  margin: 0 auto;
`;

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
    gap: 10px;
    font-size: 18px;
  }
  .userTitleJam {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  img {
    width: 15px;
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
  const joinJams = [1, 2, 3, 4, 5];
  const openJams = [1, 2, 3];

  return (
    <div className={container}>
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
              <span>4.88</span>
              <span>(6)</span>
            </div>
          </div>
        </div>
        <div className={userGiveJam}>
          <button type="button">잼 주기</button>
        </div>
      </div>

      <div className={userJamInfo}>
        <div>
          참여한 잼
          {joinJams.map(jam => (
            <Grid item key={jam}>
              <JamCard />
            </Grid>
          ))}
        </div>
        <div>
          개설한 잼
          {openJams.map(jam => (
            <Grid item key={jam}>
              <JamCard />
            </Grid>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
