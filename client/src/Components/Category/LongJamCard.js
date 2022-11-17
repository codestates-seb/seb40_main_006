import { css } from '@emotion/css';
// import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
// import { FaUserCircle } from 'react-icons/fa';
import { palette } from '../../Styles/theme';

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
  h2 {
    font-size: 16px;
    margin: 0px 5px;
  }
  div {
    border-radius: 10px;
    background-color: ${palette.colorJamOpen};
    padding: 3px 20px;
    margin: 0px 5px;
    font-size: 12px;
  }
`;

const bottomInfo = css`
  display: flex;
  margin-left: 5px;
  & div {
    display: flex;
    justify-content: baseline;
    margin-right: 10px;

    p {
      margin-left: 5px;
      font-size: 12px;
    }
  }
`;

const LongJamCard = () => {
  return (
    <div className={box}>
      <div className={coverImage} />
      <div className={info}>
        <div className={topInfo}>
          <h2>토익스터디하실분</h2>
          <div>모집중</div>
        </div>

        <div className={bottomInfo}>
          <div>
            <BsClockFill />
            <p>1분전</p>
          </div>
          <div>
            <BsPeopleFill />
            <p>1분전</p>
          </div>
          <div>
            <ImLocation />
            <p>스타벅스 마곡역점</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongJamCard;
