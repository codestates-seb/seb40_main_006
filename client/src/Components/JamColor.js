import { css } from '@emotion/css';
import React from 'react';

const imgColor = css`
  .grade0 {
    filter: invert(43%) sepia(100%) saturate(374%) hue-rotate(358deg)
      brightness(96%) contrast(101%);
  }
  .grade1 {
    filter: invert(43%) sepia(100%) saturate(374%) hue-rotate(358deg)
      brightness(96%) contrast(101%);
  }
  .grade2 {
    filter: invert(30%) sepia(66%) saturate(1525%) hue-rotate(306deg)
      brightness(91%) contrast(90%);
  }
  .grade3 {
    filter: invert(35%) sepia(75%) saturate(3714%) hue-rotate(300deg)
      brightness(98%) contrast(103%);
  }
  .grade4 {
    filter: invert(74%) sepia(7%) saturate(1618%) hue-rotate(312deg)
      brightness(117%) contrast(100%);
  }
  .grade5 {
    filter: invert(96%) sepia(92%) saturate(572%) hue-rotate(349deg)
      brightness(104%) contrast(103%);
  }
`;

// eslint-disable-next-line react/prop-types
const JamColor = ({ color }) => {
  // const [user] = useRecoilState(loginUserInfoState);
  // const [user] = useRecoilState(myPageInfoState);
  // const grade = Math.floor(user.grade);

  return (
    <div className={imgColor}>
      <img src="../img/jam.png" alt="jam" className={`grade${color}`} />
    </div>
  );
};

export default JamColor;
