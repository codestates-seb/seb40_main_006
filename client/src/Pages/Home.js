/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import React, { useEffect, useState } from 'react';
// import palette from '../Styles/theme';
import { useRecoilState } from 'recoil';
import Sidebar from '../Components/Sidebar';
import LongJamCard from '../Components/Card/LongJamCard';
import Map from '../Components/Map/Map';
import { location, coordinate } from '../Atom/atoms';
import { fetchJamRead } from '../Utils/fetchJam';
import { NoNearyByData } from '../Components/NoData';

const pagewithSidebar = css`
  display: flex;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
const home = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  h1 {
    margin: 10px;
  }
`;

const mainArea = css`
  display: flex;
  margin: 10px;
`;

const map = css`
  width: 50vw;
  height: 70vh;
  max-width: 1200px;
  max-height: 1000px;
  display: flex;
  background-color: cadetblue;
`;

const list = css`
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow: auto;
  margin-left: 20px;
`;

const Home = () => {
  const [currentLocation] = useRecoilState(location);
  const [currentCoordinate] = useRecoilState(coordinate);
  const [jamData, setJamData] = useState([]);

  useEffect(() => {
    const endpoint = `/location?lat=${currentCoordinate.latitude}&lon=${currentCoordinate.longitude}`;
    const locateJams = fetchJamRead(endpoint);
    locateJams.then(data => {
      setJamData(data.data);
    });
  }, [currentCoordinate]);

  useEffect(() => {}, [jamData]);

  return (
    <div className={pagewithSidebar}>
      <Sidebar />
      <div className={home}>
        <h1>
          {currentLocation
            ? currentLocation.split(' ')[currentLocation.split(' ').length - 1]
            : '마곡동'}{' '}
          주변의 잼이에요!
        </h1>
        <div className={mainArea}>
          <div className={map}>
            <Map jamData={jamData} />
          </div>
          {jamData.length ? (
            <div className={list}>
              {jamData &&
                jamData.map(jam => {
                  return <LongJamCard key={jam.jamId} jam={jam} />;
                })}
            </div>
          ) : (
            <div className={list}>
              <NoNearyByData />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
