/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const { kakao } = window;

const JamLocationMap = ({ jamData }) => {
  function getMap() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(jamData.latitude, jamData.longitude), // 지도의 중심좌표
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    return map;
  }

  const MapPin = () => {
    const positions = [
      {
        content: `<div>${jamData.location}</div>`,
        latlng: new kakao.maps.LatLng(jamData.latitude, jamData.longitude),
      },
    ];
    const map = getMap();
    for (let i = 0; i < positions.length; i++) {
      const marker = new kakao.maps.Marker({
        map,
        position: positions[i].latlng,
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content,
      });

      (function (point, window) {
        kakao.maps.event.addListener(point, 'mouseover', function () {
          window.open(map, point);
        });
        kakao.maps.event.addListener(point, 'mouseout', function () {
          window.close();
        });
      })(marker, infowindow);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    jamData && MapPin();
  }, [jamData]);

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
