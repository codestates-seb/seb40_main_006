/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import WriteComment from './WriteComment';
import ReplyComment from './ReplyComment';
import ReReplyComment from './ReReplyComment';
import { palette } from '../../Styles/theme';

const Container = css`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  padding: 20px;

  hr {
    width: 100%;
    border-style: none;
    background-color: ${palette.border};
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
      <ThemeProvider theme={palette}>
        <hr />
      </ThemeProvider>
      <div css={ReplyContainer}>
        <ReplyComment />
        <ReReplyComment />
      </div>
    </div>
  );
};

export default JamComments;
