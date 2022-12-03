/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import UserName from '../userComp/UserName';
import { getCookie } from '../SignComp/Cookie';
import { isLoginState, loginUserInfoState } from '../../Atom/atoms';
import { palette } from '../../Styles/theme';
import jamElapsedTime from '../userComp/JamElapsedTime';

const title = css`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  padding: 5px 0 10px 0;
`;

const content = css`
  padding-left: 17px;
  padding-top: 15px;
  border-top: 1px solid ${palette.gray_5};
  div {
    font-size: 13px;
  }
`;

const writeContent = css`
  font-size: 13px;
  width: 510px;
  padding-left: 17px;
  margin-bottom: 10px;
  input::placeholder {
    font-size: 12px;
    color: #a6a6a6;
  }
  > input {
    width: 100%;
    border-radius: 4px;
    border: none;
    outline: none;
    height: 30px;
    padding: 5px 14px;
    margin-bottom: 10px;
  }
  > button {
    margin-left: 470px;
    font-size: 12px;
  }
`;

const rereply = css`
  width: 100%;
  padding-left: 17px;
  margin-bottom: 5px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 4px;
    > input {
      width: 80%;
      border: none;
      outline: none;
      height: 30px;
      padding: 14px;
    }
  }
  .content {
    height: 30px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 5px 14px;
  }
  .reImg {
    margin-right: 5px;
    > button > img {
      width: 15px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const ReReply = ({ openRe, setOpenRe, jamData, commentId, btnIdx }) => {
  const [reVal, setReVal] = useState('');
  const [reValIdx, setReValIdx] = useState('');
  const [reValList, setReValList] = useState(
    new Array(jamData.commentList.length).fill([]),
  );
  const [user] = useRecoilState(loginUserInfoState);
  const [reEdit, setReEdit] = useState(false);
  const [reEditVal, setReEditVal] = useState('');
  const [clickIdx, setClickIdx] = useState('');
  const [isLogin] = useRecoilState(isLoginState);

  const reValChange = e => {
    setReVal(e.target.value);
  };

  const btnClickHandler = e => {
    if (e.target.outerText === '▶') {
      setOpenRe(true);
      const copy = [...reValList];
      copy[btnIdx] = jamData.commentList[btnIdx].replyList;
      setReValList(copy);
      setReValIdx(btnIdx);
    } else {
      setOpenRe(false);
      setReValList([]);
      setReValIdx('');
    }
  };

  const changeHandler = e => {
    setReEditVal(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL}/jams/${jamData.jamId}/comments/${commentId}/replies`,
        {
          commentId,
          content: 'kkk',
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      )
      .then(window.location.reload());
  };

  const editHandler = (e, idx) => {
    e.preventDefault();
    setClickIdx(idx);
    setReEdit(!reEdit);
    if (reEdit) {
      axios
        .patch(
          `${BASE_URL}/jams/${jamData.jamId}/comments/${commentId}/replies/${jamData.commentList[btnIdx].replyList[idx].replyId}`,
          {
            replyId: jamData.commentList[btnIdx].replyList[idx].replyId,
            content: reEditVal,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('accessToken')}`,
            },
          },
        )
        .then(window.location.reload());
    }
  };

  const deleteHandler = (e, idx) => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      axios
        .delete(
          `${BASE_URL}/jams/${jamData.jamId}/comments/${commentId}/replies/${jamData.commentList[btnIdx].replyList[idx].replyId}`,
          {
            headers: {
              Authorization: `Bearer ${getCookie('accessToken')}`,
            },
          },
        )
        .then(window.location.reload());
    }
  };

  return (
    <div>
      <button type="button" className={title} onClick={btnClickHandler}>
        <div>{openRe && btnIdx === reValIdx ? '▼' : '▶'}</div>
        <div>{jamData.commentList[btnIdx].replyList.length}개의 댓글</div>
      </button>
      {btnIdx === reValIdx && (
        <form onSubmit={submitHandler}>
          <div className={writeContent}>
            {isLogin ? (
              <>
                <UserName
                  name={user.nickname}
                  id={user.memberId}
                  grade={user.grade}
                  img={user.img}
                />
                <input
                  type="text"
                  name="text"
                  placeholder="댓글을 남겨주세요"
                  value={reVal}
                  onChange={reValChange}
                />
                <button type="submit">등록</button>
              </>
            ) : (
              <input
                type="text"
                name="text"
                placeholder="댓글을 작성하려면 로그인 해주세요"
                readOnly
                value={reVal}
                onChange={reValChange}
              />
            )}
          </div>
          <div className={content}>
            {reValList[btnIdx]?.map((el, idx) => (
              <div key={el.replyId} className={rereply}>
                <div className="title">
                  <UserName
                    name={el.nickname}
                    id={el.memberId}
                    grade={el.grade}
                    img={el.profileImage}
                  />
                  <p>{jamElapsedTime(el.modifiedAt)}</p>
                </div>
                <div className="container">
                  {reEdit && idx === clickIdx ? (
                    <input
                      type="text"
                      name="edit"
                      value={reEditVal}
                      onChange={e => changeHandler(e)}
                    />
                  ) : (
                    <div className="content">{el.content}</div>
                  )}
                  {el.nickname === user.nickname && (
                    <div className="reImg">
                      <button type="button" onClick={e => editHandler(e, idx)}>
                        {reEdit && idx === clickIdx ? (
                          <img src="../img/edit_move.gif" alt="edit" />
                        ) : (
                          <img src="../img/edit.png" alt="edit" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={e => deleteHandler(e, idx)}
                      >
                        <img src="../img/delete.png" alt="delete" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};

export default ReReply;
