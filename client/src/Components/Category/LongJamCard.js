/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
// import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
// import { FaUserCircle } from 'react-icons/fa';
import { palette } from '../../Styles/theme';
import jamElapsedTime from '../userComp/JamElapsedTime';

const box = css`
  display: flex;
  width: 400px;
  height: auto;
  overflow: hidden;
  border: 0.5px solid;
  border-color: ${palette.border};
  border-radius: 10px;
  align-items: center;
  padding: 10px 15px;
  margin: 10px;
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
  background-color: ${palette.gray_4};
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

const LongJamCard = ({ jam }) => {
  let isCompleteJam;
  if (jam.completeStatus === 'FALSE') {
    isCompleteJam = false;
  } else if (jam.completeStatus === 'TRUE') {
    isCompleteJam = true;
  }
  return (
    <div className={box}>
      <div className={coverImage} />
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
