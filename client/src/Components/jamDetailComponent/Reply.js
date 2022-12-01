/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import React from 'react';
import UserName from '../userComp/UserName';

const replyContainer = css`
  min-width: 500px;
  margin-bottom: 20px;
`;

const replyUser = css`
  // background: black;
  font-size: 13px;
`;

const replyContent = css`
  background: white;
  padding: 5px 0;
  border-radius: 4px;
  .content {
    font-size: 13px;
    padding: 5px 14px;
  }
`;

const Reply = ({ replyList }) => {
  return (
    <div>
      {console.log(replyList)}
      {replyList?.map(reply => (
        <div className={replyContainer}>
          <div className={replyUser}>
            <UserName name={reply.nickname} />
          </div>
          <div className={replyContent}>
            <div className="content">{reply.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reply;
