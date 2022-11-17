/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import JamInfo from '../components/jamDetailComponent/JamInfo';
import JamComents from '../components/jamDetailComponent/JamComments';
import JamSideBar from '../components/jamDetailComponent/JamSideBar';
// import palette from '../Styles/theme';
// import Button from '../components/Button';

const Container = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
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
  background-color: #dddddd;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin-bottom: 30px;
`;

const MainCommentContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
  background-color: #dddddd;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

const JamDetail = () => {
  const [host, setHost] = useState('김코딩'); // eslint-disable-line no-unused-vars
  const [loginUser, setLoginUser] = useState('김코딩'); // eslint-disable-line no-unused-vars

  return (
    <main css={Container}>
      <div css={SectionContainer}>
        <div css={JamContainer}>
          <JamInfo host={host} loginUser={loginUser} />
        </div>
        <div css={MainCommentContainer}>
          <span>댓글</span>
          <div css={CommentContainer}>
            <JamComents />
          </div>
        </div>
      </div>
      <JamSideBar host={host} loginUser={loginUser} />
    </main>
  );
};

export default JamDetail;
