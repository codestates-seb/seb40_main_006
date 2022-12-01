/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/css';
import UserName from '../userComp/UserName';
import { getCookie } from '../SignComp/Cookie';
import jamElapsedTime from '../userComp/JamElapsedTime';
import { palette } from '../../Styles/theme';

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
    border: none;
    outline: none;
    width: 60%;
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

const editForm = css`
  min-width: 300px;
  display: flex;
  gap: 20px;
  padding: 0 10px;
  > input {
    width: 70%;
    border: none;
    outline: none;
    border-bottom: 1px solid ${palette.gray_5};
    font-size: 13px;
    padding: 3px 0;
  }
  > button {
    margin-left: 200px;
    font-size: 10px;
  }
`;

const Reply = ({ replyList }) => {
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState('');

  const editHandleChange = e => {
    setEditVal(e.target.value);
  };

  const editHandler = (jamId, commentId) => {
    console.log(jamId, commentId);
    setEdit(!edit);
    if (edit) {
      axios
        .patch(
          `/jams/${jamId}/comments/${commentId}`,
          { content: editVal },
          {
            headers: {
              Authorization: `Bearer ${getCookie('accessToken')}`,
            },
          },
        )
        .then(window.location.reload());
    }
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
            {edit ? (
              <div className={editForm}>
                <input
                  type="text"
                  name="edit"
                  value={editVal}
                  onChange={editHandleChange}
                />
              </div>
            ) : (
              <div className="content">{reply.content}</div>
            )}

            <div className="img">
              <button
                type="submit"
                onClick={() => editHandler(reply.jamId, reply.commentId)}
              >
                {!edit ? (
                  <img src="../img/edit.png" alt="edit" />
                ) : (
                  <img src="../img/edit_move.gif" alt="edit" />
                )}
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
