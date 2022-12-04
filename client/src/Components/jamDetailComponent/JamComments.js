/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
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

const JamComments = ({
  text,
  setText,
  comments,
  setComments,
  handleSubmit,
  jamData,
}) => {
  return (
    <div css={Container}>
      <div>
        <WriteComment
          text={text}
          setText={setText}
          handleSubmit={handleSubmit}
        />
      </div>
      <ThemeProvider theme={palette}>
        <hr />
      </ThemeProvider>
      <div css={ReplyContainer}>
        {comments.length !== 0 &&
          comments.map((comment, idx) => {
            return comment.isRoot && <div key={idx} />;
          })}
      </div>
    </div>
  );
};

export default JamComments;
