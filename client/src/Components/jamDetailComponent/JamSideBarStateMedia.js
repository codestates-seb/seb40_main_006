/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import RecruitState from './RecruitState';

const JamSideContainer = css`
  width: 70px;
  height: 100%;
  background-color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (min-width: 767px) {
    display: none;
  }
`;

const UserAndStateBox = css`
  width: 100%;
  display: flex;
  letter-spacing: 0.5px;
`;

// eslint-disable-next-line no-unused-vars
const JamSideBarStateMedia = ({ isComplete }) => {
  return (
    <div css={JamSideContainer}>
      <div css={UserAndStateBox}>
        {isComplete === 'FALSE' ? (
          <RecruitState state="open" variant="colorJamOpen">
            모집중
          </RecruitState>
        ) : (
          <RecruitState state="close" variant="colorJamClose">
            모집완료
          </RecruitState>
        )}
      </div>
    </div>
  );
};

export default JamSideBarStateMedia;
