/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { ThemeProvider } from '@mui/material/styles';
import { css } from '@emotion/css';
import { ButtonGroup, Button } from '@mui/material';
import React from 'react';
import { theme } from '../../Styles/theme';
import Sidebar from '../Sidebar';
import JamCard from './JamCard';

const pagewithSidebar = css`
  display: flex;
`;
const category = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const topContainer = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px 50px;

  p {
    margin: 10px;
  }
  & ButtonGroup {
    justify-content: end;
  }
`;

const cardContainer = css`
  display: flex;
  flex-flow: row wrap;
  /* justify-content: center; */
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 20px;
`;
const Category = () => {
  return (
    <div className={pagewithSidebar}>
      <Sidebar />
      <div className={category}>
        <div className={topContainer}>
          <p>현재페이지 안내 문구</p>
          <ThemeProvider theme={theme}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button>전체</Button>
              <Button>실시간 잼</Button>
              <Button>스터디 잼</Button>
            </ButtonGroup>
          </ThemeProvider>
        </div>
        <div className={cardContainer}>
          <JamCard />
          <JamCard />
          <JamCard />
          <JamCard />
          <JamCard />
        </div>
      </div>
    </div>
  );
};
export default Category;
