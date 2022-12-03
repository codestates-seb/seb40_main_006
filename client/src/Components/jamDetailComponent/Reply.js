/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/css';
import UserName from '../userComp/UserName';
import { getCookie } from '../SignComp/Cookie';
import jamElapsedTime from '../userComp/JamElapsedTime';
import { palette } from '../../Styles/theme';
import { loginUserInfoState } from '../../Atom/atoms';
import ReReply from './ReReply';

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
      margin-right: 10px;
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

const BASE_URL = `${process.env.REACT_APP_URL}`;

const Reply = ({ replyList, jamData }) => {
  // 댓글
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState('');
  const [user] = useRecoilState(loginUserInfoState);
  const [clickIndex, setClickIndex] = useState('');

  const editHandleChange = e => {
    setEditVal(e.target.value);
  };

  const editHandler = (jamId, commentId, idx) => {
    setClickIndex(idx);
    setEdit(!edit);
    if (edit) {
      axios
        .patch(
          `${BASE_URL}/jams/${jamId}/comments/${commentId}`,
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
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      axios
        .delete(`${BASE_URL}/jams/${jamId}/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })
        .then(window.location.reload());
    }
  };

  // 대댓글
  const [Re] = useState([1, 2, 3]);
  const [isRe] = useState(true);
  const [openRe, setOpenRe] = useState(false);

  return (
    <div>
      {replyList?.map((reply, idx) => (
        <div key={reply.commentId} className={replyContainer}>
          <div className={replyUser}>
            <UserName
              name={reply.nickname}
              id={reply.memberId}
              grade={reply.grade}
              img={reply.profileImage}
            />
            {console.log(reply.createdAt)}
            <p>{jamElapsedTime(reply.createdAt)}</p>
          </div>
          <div className={replyContent}>
            {edit && user.nickname === reply.nickname && idx === clickIndex ? (
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
            {user.nickname === reply.nickname && (
              <div className="img">
                <button
                  type="submit"
                  onClick={() => editHandler(reply.jamId, reply.commentId, idx)}
                >
                  {edit && idx === clickIndex ? (
                    <img src="../img/edit_move.gif" alt="edit" />
                  ) : (
                    <img src="../img/edit.png" alt="edit" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => deleteHandler(reply.jamId, reply.commentId)}
                >
                  <img src="../img/delete.png" alt="delete" />
                </button>
              </div>
            )}
          </div>
          {isRe && (
            <ReReply
              Re={Re}
              openRe={openRe}
              setOpenRe={setOpenRe}
              jamData={jamData}
              commentId={reply.commentId}
              btnIdx={idx}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Reply;
