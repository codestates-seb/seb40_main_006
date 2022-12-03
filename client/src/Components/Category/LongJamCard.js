/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
// import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
// import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../Styles/theme';
import jamElapsedTime from '../userComp/JamElapsedTime';

const box = css`
  display: flex;
  width: 400px;
  height: auto;
  overflow: hidden;
  border: 0.5px solid;
  border-color: ${palette.border};
  border-radius: 3px;
  align-items: center;
  padding: 10px 10px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
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
  /* background-color: ${palette.gray_4}; */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 3px;
  }
`;

const defaultImage = css`
  opacity: 0.5;
`;

const info = css`
  width: 100%;
  height: 100%;
  /* background-color: magenta; */
`;

const topInfo = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > p {
    font-size: 16px;
    font-weight: bold;
    margin: 0px 5px;
  }
  div {
    border-radius: 10px;
    padding: 3px 20px;
    margin: 0px 5px;
    font-size: 12px;
  }
`;

const bottomInfo = css`
  display: flex;
  margin-left: 5px;

  div {
    display: flex;
    justify-content: baseline;
    margin-right: 10px;

    p {
      margin-left: 5px;
      font-size: 12px;
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
          {isCompleteJam ? (
            <div className={closedJam}>마감</div>
          ) : (
            <div className={openedJam}>모집중</div>
          )}
          {jam.realTime ? <div className={realTimeJam}>실시간</div> : null}
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
