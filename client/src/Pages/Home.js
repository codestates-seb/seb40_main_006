/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import React from 'react';
// import palette from '../Styles/theme';
import { useRecoilState } from 'recoil';
import Sidebar from '../Components/Sidebar';
import LongJamCard from '../Components/Category/LongJamCard';
import Map from '../Components/Map/Map';
import { location } from '../Atom/atoms';

const pagewithSidebar = css`
  display: flex;
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
  justify-content: space-around;
`;

const map = css`
  width: 800px;
  height: 700px;
  display: flex;
  background-color: cadetblue;
`;

const list = css`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Home = () => {
  const [currentLocation] = useRecoilState(location);

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
            <Map />
          </div>
          <div className={list}>
            <LongJamCard />
            <LongJamCard />
            <LongJamCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
