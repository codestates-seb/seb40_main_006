import { css } from '@emotion/css';
// import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
// import { FaUserCircle } from 'react-icons/fa';
import { palette } from '../../Styles/theme';

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

  /* justify-content: space-between; */
  & div {
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

  & h2 {
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  & p {
    padding-left: 5px;
  }
`;

const info = css`
  & div {
    display: flex;
    margin-right: 10px;
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
const JamCard = () => {
  return (
    <div className={box}>
      <div className={coverImage} />
      <div className={bottomArea}>
        <h2>토익스터디하실분</h2>
        <div className={topArea}>
          <div>모집중</div>
          <div>실시간</div>
        </div>
        <div className={info}>
          <div className={infoTop}>
            <div>
              <BsClockFill />
              <p>1분전</p>
            </div>
            <div>
              <BsPeopleFill />
              <p>1분전</p>
            </div>
          </div>
          <div className={infoBottom}>
            <ImLocation />
            <p>스타벅스 마곡역점</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamCard;
