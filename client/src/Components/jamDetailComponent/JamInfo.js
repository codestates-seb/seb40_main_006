/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { ThemeProvider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { palette } from '../../Styles/theme';
import JamCarousel from './JamCarousel';
import jamElapsedTime from '../userComp/JamElapsedTime';
import { categories } from '../jamCreateComponent/StudyInputField';
import JamLocationMap from './JamLocationMap';
import { loginUserInfoState } from '../../Atom/atoms';
import JamSideBarButtonMedia from './JamSideBarButtonMedia';
import JamSideBarStateMedia from './JamSideBarStateMedia';

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
  margin-bottom: 30px;
`;

const TitleContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  @media screen and (max-width: 767px) {
    /* justify-content: flex-start; */
    align-items: flex-start;
    gap: 10px;
  }
`;

const TitleAndState = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Title = css`
  font-size: 24px;
  margin-bottom: 5px;
  line-height: 25px;
  @media screen and (max-width: 767px) {
    font-size: 22px;
  }
  @media screen and (max-width: 479px) {
    font-size: 18px;
  }
`;

const MediaButton = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media screen and (min-width: 767px) {
    display: none;
  }
`;

const InfoIcons = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  margin-bottom: 13px;
  .categoryIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
  }
`;

const periodDisplay = css`
  font-size: 15px;
`;

const Carousel = css`
  width: 100%;
`;

const JamDescTitle = css`
  font-size: 15px;
  margin-bottom: 15px;
  margin-left: 2px;
  font-weight: 600;
`;

const LocationContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
`;

const LocationText = css`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  font-size: 15px;
  font-weight: 600;
  span:last-child {
    font-size: 12px;
  }
`;

const LocationMap = css`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${palette.border};
`;

const EditButton = css`
  min-width: 60px;
  min-height: 40px;
  padding: 10px;
  background-color: ${palette.border};
  border-radius: 3px;
`;

const JamInfo = ({
  setIsEdit,
  jamData,
  isComplete,
  setIsComplete,
  joiner,
  setJoiner,
}) => {
  const [currentUser] = useRecoilState(loginUserInfoState);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    title,
    location,
    nickname,
    currentPpl,
    capacity,
    createdAt,
    category,
    jamFrom,
    jamTo,
    address,
    realTime,
  } = jamData;

  const filteredCategory = categories.filter(el => el.value === category)[0];

  const handleIsEdit = () => {
    setIsEdit(true);
    navigate(`/jammake/edit/${id}`);
  };

  return (
    <div css={Container}>
      <div css={HeaderContainer}>
        <div css={TitleContainer}>
          <div css={TitleAndState}>
            <h2 css={Title}>{title}</h2>
            <JamSideBarStateMedia
              jamData={jamData}
              isComplete={isComplete}
              setIsComplete={setIsComplete}
              joiner={joiner}
              setJoiner={setJoiner}
            />
          </div>
          {nickname === currentUser.nickname && (
            <button css={EditButton} type="button" onClick={handleIsEdit}>
              수정
            </button>
          )}
        </div>
        <div css={InfoIcons}>
          <div className="categoryIcons">
            <BiCategory />
            {filteredCategory && <span>{filteredCategory.label}</span>}
          </div>
          <div className="categoryIcons">
            <BsClockFill />
            <span>{jamElapsedTime(createdAt)}</span>
          </div>
          <div className="categoryIcons">
            <BsPeopleFill />
            <span>
              {currentPpl}/{capacity}명
            </span>
          </div>
          <div className="categoryIcons">
            <ImLocation />
            <span>{location}</span>
          </div>
          <div className="categoryIcons">
            <FaUserCircle />
            <span>{nickname}</span>
          </div>
        </div>
        {!realTime && (
          <div css={periodDisplay}>
            <span>잼 모집기간:</span>
            <span>
              {` ${new Date(jamFrom)
                .toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                })
                .slice(0, -3)}`}{' '}
              ~{' '}
              {new Date(jamTo)
                .toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                })
                .slice(0, -3)}
            </span>
          </div>
        )}
      </div>
      <div css={Carousel}>
        <div css={JamDescTitle}>
          <span>우리 잼을 소개합니다</span>
        </div>
        <JamCarousel jamData={jamData} />
      </div>
      <div css={LocationContainer}>
        <div css={LocationText}>
          <span>우리 잼은 여기 있어요</span>
          <span>&nbsp;({address})</span>
        </div>
        <ThemeProvider theme={palette}>
          <div css={LocationMap}>
            {jamData && <JamLocationMap jamData={jamData} />}
          </div>
        </ThemeProvider>
      </div>
      <div css={MediaButton}>
        <JamSideBarButtonMedia
          jamData={jamData}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          joiner={joiner}
          setJoiner={setJoiner}
        />
      </div>
    </div>
  );
};

export default JamInfo;
