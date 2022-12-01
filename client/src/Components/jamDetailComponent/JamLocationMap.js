/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const { kakao } = window;

const JamLocationMap = ({ jamData }) => {
  // 좌표로 주소 얻기
  function getMap() {
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(jamData.latitude, jamData.longitude), // 지도의 중심좌표
      level: 3, // 지도 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);
    return map;
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    jamData && getMap();
  }, [jamData]);

  // console.log(jamLocation);
  // console.log('jamData: ', jamData);
  console.log('latitude: ', jamData.latitude);
  console.log('longitude: ', jamData.longitude);

  return (
    jamData && (
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    )
  );
};

export default JamLocationMap;
