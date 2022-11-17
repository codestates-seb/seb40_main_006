/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../Button';

const Container = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const HeaderContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const TitleContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = css`
  font-size: 24px;
  margin-bottom: 10px;
`;

const InfoIcons = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  .categoryIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
  }
`;

const Carousel = css`
  width: 100%;
`;

const CarouselBox = css`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #fff;
`;

const JamDescTitle = css`
  font-size: 15px;
  margin-bottom: 5px;
`;

const LocationContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;

const LocationText = css`
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 15px;
`;

const LocationMap = css`
  width: 100%;
  height: 250px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const JamInfo = ({ host, loginUser }) => {
  return (
    <div css={Container}>
      <div css={HeaderContainer}>
        <div css={TitleContainer}>
          <h2 css={Title}>토익스터디 하실 분!!</h2>
          {host === loginUser && (
            <Button size="sm" variant="cancle">
              수정
            </Button>
          )}
        </div>
        <div css={InfoIcons}>
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
          <div className="categoryIcons">
            <FaUserCircle />
            <span>김코딩(잼개설자)</span>
          </div>
        </div>
      </div>
      <div css={Carousel}>
        <div css={JamDescTitle}>
          <span>우리 잼을 소개합니다</span>
        </div>
        <div css={CarouselBox}>
          소개이미지, 소개글 / 캐러셀로 구현 / react-slick 또는 다른 라이브러리
        </div>
      </div>
      <div css={LocationContainer}>
        <div css={LocationText}>
          <span>우리 잼은 여기 있어요</span>
        </div>
        <div css={LocationMap}>
          <span>지도 들어갈 곳</span>
        </div>
      </div>
    </div>
  );
};

export default JamInfo;
