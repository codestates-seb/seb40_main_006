/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { ThemeProvider } from '@mui/material/styles';
import { css } from '@emotion/css';
import { ButtonGroup, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { fetchJamRead } from '../Utils/fetchJam';
import { theme } from '../Styles/theme';
import Sidebar from '../Components/Sidebar';
import JamCard from '../Components/Card/JamCard';
import { pageNumber, selectedCategory, totalPageNumber } from '../Atom/atoms';
import ScrollToTop from '../ScrollToTop';
import { NoCategoryData } from '../Components/NoData';
import JamPagination from '../Components/Card/JamPagination';
import FloatingButton from '../Components/FloatingButton';

const pagewithSidebar = css`
  display: flex;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
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
  white-space: nowrap;
  flex-wrap: wrap;
  p {
    margin: 10px;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 10px 0px;
    }
  }
  & ButtonGroup {
    justify-content: end;
  }
`;
const searchTextResult = css`
  padding: 0px 50px;
  span {
    font-weight: bold;
  }
`;
const cardContainer = css`
  display: flex;
  flex-flow: row wrap;
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

const pagination = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
`;

const Category = () => {
  const [currentCategory] = useRecoilState(selectedCategory);
  const searchText = sessionStorage.getItem('searchText');
  const [jamData, setJamData] = useState([]);
  const [filteredData, setFilteredData] = useState('');
  const filterButtonGroup = ['전체', '실시간 잼', '스터디 잼'];
  const [page, setCurrentPage] = useRecoilState(pageNumber);
  const [size] = useState(6);
  const navigate = useNavigate();
  const [, setTotalPage] = useRecoilState(totalPageNumber);

  useEffect(() => {
    if (currentCategory.label === '내주변') navigate('/home');
    if (searchText) {
      const endpoint = `/jams/search?keyword=${searchText}&page=${page}&size=${size}`;
      const Jams = fetchJamRead(endpoint);
      Jams.then(data => {
        setJamData(data.content);
        setFilteredData(data.content);
        setTotalPage(data.totalPages);
      });
    } else {
      const endpoint =
        currentCategory.label === '전체'
          ? `/jams?page=${page}&size=${size}`
          : `/jams/category?category=${currentCategory.param}&page=${page}&size=${size}`;
      const searchJams = fetchJamRead(endpoint);
      searchJams.then(data => {
        setJamData(data.content);
        setFilteredData(data.content);
        setTotalPage(data.totalPages);
      });
    }
  }, [currentCategory, page]);

  useEffect(() => {
    setCurrentPage(1);
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
      <FloatingButton />
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
        <div className={searchTextResult}>
          <span>{searchText}</span> 검색 결과입니다.
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
        <div className={pagination}>
          <JamPagination />
        </div>
      </div>
    </div>
  );
};
export default Category;
