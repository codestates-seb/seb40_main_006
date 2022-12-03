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
  width: 300px;
  height: auto;
  overflow: hidden;
  padding: 10px 10px 20px 10px;
  margin: 10px 30px;
  border-radius: 10px;
  cursor: pointer;
`;

const topArea = css`
  display: flex;
  div {
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 12px;
    margin-right: 5px;
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
  width: 100%;
  height: 200px;
  background-color: ${palette.gray_4};
  margin: 5px 0px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const defaultImage = css`
  opacity: 0.3;
`;

const bottomArea = css`
  display: flex;
  flex-flow: column wrap;

  > p {
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0px;
  }
`;

const info = css`
  div {
    display: flex;
    margin-right: 10px;
    p {
      font-size: medium;
      font-weight: normal;
      padding-left: 5px;
    }
  }
`;

const infoTop = css`
  display: flex;
  margin-top: 10px;
`;
const infoBottom = css`
  display: flex;
  margin-top: 10px;
`;

const backgroundImage = './img/back1.jpg';

const JamCard = ({ jam }) => {
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

  // createdAt을 UTC기준시로부터 한국시간으로(9시간이후) 맞춰주는 작업
  const years = new Date(jam.createdAt).getFullYear();
  const months = new Date(jam.createdAt).getMonth() + 1;
  const dates = new Date(jam.createdAt).getDate();
  const hours = new Date(jam.createdAt).getHours() + 9;
  const minutes = new Date(jam.createdAt).getMinutes();
  const seconds = new Date(jam.createdAt).getSeconds();
  const newDate = new Date(
    `${years}-${months}-${dates} ${hours}:${minutes}:${seconds}`,
  );

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
      <div className={bottomArea}>
        <p>{jam.title}</p>
        <div className={topArea}>
          {isCompleteJam ? (
            <div className={closedJam}>마감</div>
          ) : (
            <div className={openedJam}>모집중</div>
          )}
          {jam.realTime ? <div className={realTimeJam}>실시간</div> : null}
        </div>
        <div className={info}>
          <div className={infoTop}>
            <div>
              <BsClockFill />
              {/* <p>{jamElapsedTime(jam.createdAt)}</p> */}
              <p>{jamElapsedTime(newDate)}</p>
            </div>
            <div>
              <BsPeopleFill />
              <p>{jam.currentPpl}명</p>
            </div>
          </div>
          <div className={infoBottom}>
            <ImLocation />
            <p>{jam.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamCard;
