/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../Styles/theme';
import jamElapsedTime from '../userComp/JamElapsedTime';

const box = css`
  display: flex;
  width: 400px;
  border: 0.5px solid;
  border-color: ${palette.border};
  border-radius: 3px;
  align-items: center;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0px;
    padding: 10px 0px;
    border: none;
    border-bottom: 0.5px solid ${palette.border};
  }
`;

const openedJam = css`
  background-color: ${palette.colorJamOpen};
`;
const closedJam = css`
  background-color: ${palette.colorJamClose};
`;
const realTimeJam = css`
  background-color: ${palette.colorJamRealtime};
`;

const coverImage = css`
  width: 60px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 3px;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 80px;
  }
`;

const defaultImage = css`
  opacity: 0.5;
`;

const info = css`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 767px) {
    margin-top: 5px;
  }
`;

const topInfo = css`
  display: flex;
  margin-bottom: 10px;
  > p {
    font-size: 16px;
    font-weight: bold;
    margin: 0px 5px;
    word-break: keep-all;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const tagInfo = css`
  display: flex;
  align-items: center;
  div {
    height: auto;
    padding: 3px 20px;
    margin: 0px 5px;
    border-radius: 10px;
    font-size: 12px;
    white-space: nowrap;
  }
  @media screen and (max-width: 767px) {
    div {
      padding: 3px 5px;
      margin: 0px 3px;
    }
    margin-bottom: 5px;
  }
`;
const bottomInfo = css`
  display: flex;
  margin-left: 5px;
  flex-wrap: wrap;
  white-space: nowrap;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    p {
      margin-left: 5px;
      font-size: 12px;
    }
  }
  @media screen and (max-width: 767px) {
    div {
      margin-bottom: 5px;
    }
  }
`;

const backgroundImage = './img/orangeJam.png';

const LongJamCard = ({ jam }) => {
  let isCompleteJam;
  if (jam.completeStatus === 'FALSE') {
    isCompleteJam = false;
  } else if (jam.completeStatus === 'TRUE') {
    isCompleteJam = true;
  }
  const navigate = useNavigate();
  const handleCardClick = jamId => {
    navigate(`/jamdetail/${jamId}`);
  };

  return (
    <div className={box} onClick={() => handleCardClick(jam.jamId)}>
      <div className={coverImage}>
        {jam.image ? (
          <img src={jam.image} alt="jamImage" />
        ) : (
          <img
            className={defaultImage}
            src={backgroundImage}
            alt="jamDefaultImage"
          />
        )}
      </div>
      <div className={info}>
        <div className={topInfo}>
          <p>{jam.title}</p>
          <div className={tagInfo}>
            {isCompleteJam ? (
              <div className={closedJam}>마감</div>
            ) : (
              <div className={openedJam}>모집중</div>
            )}
            {jam.realTime ? <div className={realTimeJam}>실시간</div> : null}
          </div>
        </div>

        <div className={bottomInfo}>
          <div>
            <BsClockFill />
            <p>{jamElapsedTime(jam.createdAt)}</p>
          </div>
          <div>
            <BsPeopleFill />
            <p>{jam.currentPpl}명</p>
          </div>
          <div>
            <ImLocation />
            <p>{jam.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongJamCard;
