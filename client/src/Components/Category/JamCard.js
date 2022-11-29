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
    background-color: blueviolet;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 12px;
    margin-right: 5px;
  }
  div:nth-child(1) {
    background-color: ${palette.colorJamOpen};
  }
  div:nth-child(2) {
    background-color: ${palette.colorJamRealtime};
  }
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

const JamCard = ({ item }) => {
  return (
    <div className={box}>
      <div className={coverImage} />
      <div className={bottomArea}>
        <p>{item.title}</p>
        <div className={topArea}>
          <div>{item.complete ? '모집중' : '마감'}</div>
          {item.realTime ? <div>실시간</div> : null}
        </div>
        <div className={info}>
          <div className={infoTop}>
            <div>
              <BsClockFill />
              <p>{jamElapsedTime(item.createdAt)}</p>
            </div>
            <div>
              <BsPeopleFill />
              <p>{item.currentPpl}명</p>
            </div>
          </div>
          <div className={infoBottom}>
            <ImLocation />
            <p>{item.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamCard;
