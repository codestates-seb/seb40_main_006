/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { FaUserCircle } from 'react-icons/fa';
import { BiReply } from 'react-icons/bi';
import { AiOutlineTwitter } from 'react-icons/ai';
import { ThemeProvider } from '@mui/material';
import palette from '../../Styles/theme';

const RootContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReplyIconContainer = css`
  width: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(180deg);
`;

const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const UserBox = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 3px;
  margin-bottom: 5px;
`;

const JamIcon = css`
  color: ${palette.colorGrade3};
`;

const UserName = css`
  font-size: 13px;
`;

const WrittenComment = css`
  width: 100%;
  height: fit-content;
  padding: 10px;
  border-radius: 3px;
  background-color: #fff;
`;

const ReReplyComment = () => {
  return (
    <div css={RootContainer}>
      <div css={ReplyIconContainer}>
        <BiReply size={30} />
      </div>
      <div css={Container}>
        <div css={UserBox}>
          <div>
            <FaUserCircle size={15} />
          </div>
          <div css={UserName}>사과잼</div>
          <ThemeProvider theme={palette}>
            <div css={JamIcon}>
              <AiOutlineTwitter size={16} />
            </div>
          </ThemeProvider>
        </div>
        <div css={WrittenComment}>
          각공한거 공유하는 시간 30분정도 갖는거 어떠신가요?
        </div>
      </div>
    </div>
  );
};

export default ReReplyComment;
