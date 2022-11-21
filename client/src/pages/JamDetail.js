/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import JamInfo from '../Components/jamDetailComponent/JamInfo';
import JamComents from '../Components/jamDetailComponent/JamComments';
import JamSideBar from '../Components/jamDetailComponent/JamSideBar';
// import Button from '../components/Button';
import Sidebar from '../Components/Sidebar';
import { palette } from '../Styles/theme';

const MergeContainer = css`
  width: 100%;
  display: flex;
`;

const Container = css`
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  max-width: 800px;
  background-color: white;
  gap: 20px;
`;

const SectionContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const JamContainer = css`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  /* background-color: ${palette.gray_5}; */
  /* box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2); */
  /* border: 2px solid ${palette.gray_5}; */
  border-radius: 3px;
`;

const MainCommentContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  span {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const CommentContainer = css`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${palette.gray_4};
  /* box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2); */
  border-radius: 3px;
`;

const JamDetail = () => {
  const [host, setHost] = useState('김코딩'); // eslint-disable-line no-unused-vars
  const [loginUser, setLoginUser] = useState('김코딩'); // eslint-disable-line no-unused-vars

  return (
    <div css={MergeContainer}>
      <Sidebar />
      <main css={Container}>
        <div css={SectionContainer}>
          <ThemeProvider theme={palette}>
            <div css={JamContainer}>
              <JamInfo host={host} loginUser={loginUser} />
            </div>
          </ThemeProvider>
          <div css={MainCommentContainer}>
            <span>댓글</span>
            <div css={CommentContainer}>
              <JamComents />
            </div>
          </div>
        </div>
        <JamSideBar host={host} loginUser={loginUser} />
      </main>
    </div>
  );
};

export default JamDetail;
