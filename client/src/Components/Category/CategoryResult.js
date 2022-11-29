/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { ThemeProvider } from '@mui/material/styles';
import { css } from '@emotion/css';
import { ButtonGroup, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchJamRead } from '../../Utils/fetchJam';
import { theme } from '../../Styles/theme';
import Sidebar from '../Sidebar';
import JamCard from './JamCard';
import { selectedCategory } from '../../Atom/atoms';
// import NoData from '../Search/NoData';

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

// const noDataContainer = css`
//   display: flex;
//   height: 100px;
//   justify-content: center;
//   padding: 20px;
// `;
const Category = () => {
  const [currentCategory] = useRecoilState(selectedCategory);
  const [jamData, setJamData] = useState([]);

  useEffect(() => {}, [currentCategory]);
  useEffect(() => {
    const Jams = fetchJamRead('/jams');
    Jams.then(data => {
      setJamData(data.content);
      console.log(data.content);
      console.log(jamData);
    });
  }, []);

  return (
    <div className={pagewithSidebar}>
      <Sidebar />
      <div className={category}>
        <div className={topContainer}>
          <p>카테고리 - {currentCategory}</p>
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
          {jamData && console.log(jamData)}
          {jamData &&
            jamData.map(jam => {
              console.log(jam);
              return <JamCard key={jam.jamId} item={jam} />;
            })}
        </div>
        {/* <div className={noDataContainer}>
          <NoData />
        </div> */}
      </div>
    </div>
  );
};
export default Category;
