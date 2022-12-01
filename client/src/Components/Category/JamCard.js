/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
// import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
// import { FaUserCircle } from 'react-icons/fa';
import { palette } from '../../Styles/theme';
import jamElapsedTime from '../userComp/JamElapsedTime';

const box = css`
  width: 300px;
  height: auto;
  overflow: hidden;
  padding: 10px 10px 20px 10px;
  margin: 10px 30px;
  border-radius: 10px;
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

const coverImage = css`
  width: 100%;
  height: 200px;
  background-color: ${palette.gray_4};
  margin: 5px 0px;
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

const JamCard = ({ jam }) => {
  let isCompleteJam;
  if (jam.completeStatus === 'FALSE') {
    isCompleteJam = false;
  } else if (jam.completeStatus === 'TRUE') {
    isCompleteJam = true;
  }
  return (
    <div className={box}>
      <div className={coverImage} />
      <div className={bottomArea}>
        <p>{jam.title}</p>
        <div className={topArea}>
          {isCompleteJam ? (
            <div className={closedJam}>마감</div>
          ) : (
            <div className={openedJam}>모집중</div>
          )}
          {jam.realTime ? <div>실시간</div> : null}
        </div>
        <div className={info}>
          <div className={infoTop}>
            <div>
              <BsClockFill />
              <p>{jamElapsedTime(jam.createdAt)}</p>
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
