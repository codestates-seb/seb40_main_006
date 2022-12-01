/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import axios from 'axios';
import React from 'react';
import UserName from '../userComp/UserName';
import { getCookie } from '../SignComp/Cookie';
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content {
    font-size: 13px;
    padding: 5px 14px;
  }
  .img {
    margin-right: 5px;
    img {
      width: 15px;
      margin-right: 7px;
      cursor: pointer;
    }
  }
`;

const Reply = ({ replyList }) => {
  const editHandler = (jamId, commentId) => {
    console.log(jamId, commentId);
  };

  const deleteHandler = (jamId, commentId) => {
    console.log(jamId, commentId);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`/jams/${jamId}/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })
        .then(window.location.reload());
    }
  };

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
            <div className="img">
              <button
                type="button"
                onClick={() => editHandler(reply.jamId, reply.commentId)}
              >
                <img src="../img/edit.png" alt="edit" />
              </button>
              <button
                type="button"
                onClick={() => deleteHandler(reply.jamId, reply.commentId)}
              >
                <img src="../img/delete.png" alt="delete" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reply;
