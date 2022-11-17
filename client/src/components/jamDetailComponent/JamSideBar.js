/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import RecruitState from './RecruitState';

const JamSideContainer = css`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  gap: 10px;
  font-size: 12px;
  padding: 15px;
`;

const Header = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 5px;
`;
const UserAndStateBox = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.5px;
`;

const UserBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  letter-spacing: 0.5px;
`;

const Title = css`
  font-size: 16px;
  margin: 5px 0;
`;

const EtcInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 5px;
  .categoryIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    letter-spacing: 0.5px;
  }
`;

const AvatarContainer = css``;

const ButtonContainer = css`
  width: 100%;
  height: 35px;
`;

const RegisterButton = css`
  width: 100%;
  height: 100%;
  border-style: none;
  border-radius: 5px;
  font-weight: 600;
  background-color: #f33b06;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f25e36;
  }
`;

const CloseJamButton = css`
  background-color: #ff9b51;

  &:hover {
    background-color: #fd7e14;
  }
`;

const CancleButton = css`
  background-color: #bababa;
  &:hover {
    background-color: grey;
  }
`;

const JamSideBar = ({ host, loginUser }) => {
  const [isRegisterd, setIsRegistered] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div css={JamSideContainer}>
      <div css={Header}>
        <div css={UserAndStateBox}>
          <div css={UserBox}>
            <FaUserCircle />
            <span>김코딩</span>
          </div>
          <RecruitState state="open" variant="colorJamOpen">
            모집중
          </RecruitState>
        </div>
      </div>
      <h2 css={Title}>
        <span>토익 스터디 하실분!!!</span>
      </h2>
      <div css={EtcInfo}>
        <div className="categoryIcons">
          <BiCategory />
          <span>외국어</span>
        </div>
        <div className="categoryIcons">
          <BsClockFill />
          <span>1분전</span>
        </div>
        <div className="categoryIcons">
          <BsPeopleFill />
          <span>0/4명</span>
        </div>
        <div className="categoryIcons">
          <ImLocation />
          <span>스타벅스 마곡역점</span>
        </div>
      </div>
      {(isRegisterd || host === loginUser) && (
        <div css={AvatarContainer}>
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
          <FaUserCircle size={25} />
        </div>
      )}
      {host !== loginUser ? (
        <div css={ButtonContainer}>
          {!isRegisterd ? (
            <button
              type="button"
              css={RegisterButton}
              onClick={() => setIsRegistered(!isRegisterd)}
            >
              참여하기
            </button>
          ) : (
            <button
              type="button"
              css={[RegisterButton, CancleButton]}
              onClick={() => setIsRegistered(!isRegisterd)}
            >
              참여취소하기
            </button>
          )}
        </div>
      ) : (
        <div css={ButtonContainer}>
          {!isClosed ? (
            <button
              type="button"
              css={[RegisterButton, CloseJamButton]}
              onClick={() => setIsClosed(!isClosed)}
            >
              모집 완료하기
            </button>
          ) : (
            <button
              type="button"
              css={[RegisterButton, CloseJamButton, CancleButton]}
              onClick={() => setIsClosed(!isClosed)}
            >
              모집완료 취소
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JamSideBar;
