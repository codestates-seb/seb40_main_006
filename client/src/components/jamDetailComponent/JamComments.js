/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import WriteComment from './WriteComment';
import ReplyComment from './ReplyComment';
import ReReplyComment from './ReReplyComment';

const Container = css`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  padding: 20px;

  hr {
    width: 100%;
    border-style: none;
    background-color: #fff;
    height: 1px;
  }
`;

const ReplyContainer = css`
  width: 100%;
`;

const JamComments = () => {
  return (
    <div css={Container}>
      <div>
        <WriteComment />
      </div>
      <hr />
      <div css={ReplyContainer}>
        <ReplyComment />
        <ReReplyComment />
      </div>
    </div>
  );
};

export default JamComments;
