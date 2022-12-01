/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import React, { useState } from 'react';
import UserName from '../userComp/UserName';

const title = css`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  padding: 5px 0;
`;

const content = css`
  padding-left: 17px;
  div {
    margin-bottom: 5px;
    font-size: 13px;
  }
`;

const writeContent = css`
  font-size: 13px;
  width: 510px;
  padding-left: 17px;
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

const ReReply = ({ Re, openRe, setOpenRe }) => {
  const [reVal, setReVal] = useState('');

  const reValChange = e => {
    setReVal(e.target.value);
  };

  return (
    <div>
      <button
        type="button"
        className={title}
        onClick={() => setOpenRe(!openRe)}
      >
        {openRe ? '▼' : '▶'}
        {!openRe && <div>{Re.length}개의 댓글</div>}
      </button>
      {openRe && (
        <form>
          <div className={writeContent}>
            <UserName />
            <input
              type="text"
              name="text"
              value={reVal}
              onChange={reValChange}
            />
            <button type="submit">등록</button>
          </div>
          <div className={content}>
            {/* 대댓글내용들어감 */}
            <div>댓글1</div>
            <div>댓글2</div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReReply;
