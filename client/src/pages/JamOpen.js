/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

const Container = css`
  padding: 5px;
`;

const Header = css`
  background-color: hotpink;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderText = css`
  font-size: 16px;
`;

const HeaderTap = css`
  font-size: 20px;
`;

const Tapstyle = css`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;

  .default {
    width: 100%;
    padding: 15px 10px;
    cursor: pointer;
  }

  .focused {
    background-color: #ffcabb;
    color: black;
    transition: 0.3s;
  }
`;

const JamOpen = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tapArr = [
    { id: 0, name: '스터디 잼', content: '스터디 잼 내용' },
    { id: 1, name: '실시간 잼', content: '실시간 잼 내용' },
  ];

  const selectMenuHandler = el => {
    setCurrentTab(el.id);
  };

  return (
    <div css={Container}>
      <div css={Header}>
        <div css={HeaderText}>카테고리 &gt; 요리</div>
        <div css={HeaderTap}>
          <ul css={Tapstyle}>
            {tapArr.map(el => (
              <li
                key={el.id}
                className={currentTab === el.id ? 'default focused' : 'default'}
                onClick={() => selectMenuHandler(el)}
                aria-hidden="true"
              >
                {el.name}
              </li>
            ))}
          </ul>
          <button type="button">개설하기</button>
        </div>
      </div>
    </div>
  );
};

export default JamOpen;
