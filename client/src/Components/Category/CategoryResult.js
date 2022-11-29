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
import ScrollToTop from '../../ScrollToTop';
import { NoCategoryData } from '../NoData';

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

const noDataContainer = css`
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const Category = () => {
  const [currentCategory] = useRecoilState(selectedCategory);
  const [jamData, setJamData] = useState([]);
  const [filteredData, setFilteredData] = useState('');
  const filterButtonGroup = ['전체', '실시간 잼', '스터디 잼'];
  useEffect(() => {
    const endpoint =
      currentCategory.label === '전체'
        ? '/jams'
        : `/jams/category?category=${currentCategory.param}&page=1&size=5`;
    const Jams = fetchJamRead(endpoint);
    Jams.then(data => {
      setJamData(data.content);
      setFilteredData(data.content);
      console.log(data.content);
    });
  }, [currentCategory]);

  const handleFilterClick = (_, label) => {
    if (label === '실시간 잼')
      setFilteredData(jamData.filter(el => el.realTime));
    else if (label === '스터디 잼')
      setFilteredData(jamData.filter(el => !el.realTime));
    else setFilteredData(jamData);
  };

  return (
    <div className={pagewithSidebar}>
      <Sidebar />
      <ScrollToTop />
      <div className={category}>
        <div className={topContainer}>
          <p>카테고리 - {currentCategory.label}</p>
          <ThemeProvider theme={theme}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              {filterButtonGroup.map(el => {
                return (
                  <Button key={el} onClick={e => handleFilterClick(e, el)}>
                    {el}
                  </Button>
                );
              })}
            </ButtonGroup>
          </ThemeProvider>
        </div>
        {filteredData.length ? (
          <div className={cardContainer}>
            {filteredData &&
              filteredData.map(jam => {
                return <JamCard key={jam.jamId} jam={jam} />;
              })}
          </div>
        ) : (
          <div className={noDataContainer}>
            <NoCategoryData />
          </div>
        )}
      </div>
    </div>
  );
};
export default Category;
