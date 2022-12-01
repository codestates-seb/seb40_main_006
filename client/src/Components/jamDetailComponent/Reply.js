/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import React from 'react';
import UserName from '../userComp/UserName';
import jamElapsedTime from '../userComp/JamElapsedTime';

const replyContainer = css`
  min-width: 510px;
  margin-bottom: 20px;
`;

const replyUser = css`
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
        <div key={reply.commentId} className={replyContainer}>
          <div className={replyUser}>
            <UserName name={reply.nickname} id={reply.memberId} />
            <p>{jamElapsedTime(reply.createdAt)}</p>
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
