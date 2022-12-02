/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import UserName from '../userComp/UserName';
import { getCookie } from '../SignComp/Cookie';
import { loginUserInfoState } from '../../Atom/atoms';
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

const ReReply = ({ openRe, setOpenRe, jamData, commentId, btnIdx }) => {
  const [reVal, setReVal] = useState('');
  const [reValIdx, setReValIdx] = useState('');
  const [reValList, setReValList] = useState(
    new Array(jamData.commentList.length).fill([]),
  );
  const [user] = useRecoilState(loginUserInfoState);

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

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post(
        `/jams/${jamData.jamId}/comments/${commentId}/replies`,
        {
          commentId,
          content: reVal,
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
    console.log(jamData.commentList[btnIdx].replyList[idx]);
  };

  const deleteHandler = (e, idx) => {
    console.log(
      `/jams/${jamData.jamId}/comments/${commentId}/replies/${jamData.commentList[btnIdx].replyList[idx].replyId}`,
    );
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      axios
        .delete(
          `/jams/${jamData.jamId}/comments/${commentId}/replies/${jamData.commentList[btnIdx].replyList[idx].replyId}`,
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
            <UserName name={user.nickname} id={user.memberId} />
            <input
              type="text"
              name="text"
              value={reVal}
              onChange={reValChange}
            />
            <button type="submit">등록</button>
          </div>
          <div className={content}>
            {reValList[btnIdx]?.map((el, idx) => (
              <div key={el.replyId} className={rereply}>
                <div className="title">
                  <UserName name={user.nickname} id={user.memberId} />
                  <p>{jamElapsedTime(el.modifiedAt)}</p>
                </div>
                <div className="container">
                  <div className="content">{el.content}</div>
                  <div className="reImg">
                    <button type="submit" onClick={e => editHandler(e, idx)}>
                      <img src="../img/edit.png" alt="edit" />
                    </button>
                    <button type="button" onClick={e => deleteHandler(e, idx)}>
                      <img src="../img/delete.png" alt="delete" />
                    </button>
                  </div>
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
