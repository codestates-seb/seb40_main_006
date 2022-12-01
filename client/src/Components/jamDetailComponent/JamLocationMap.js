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

  const MapPin = () => {
    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
    const positions = [
      {
        content: `<div>${jamData.location}</div>`,
        latlng: new kakao.maps.LatLng(jamData.latitude, jamData.longitude),
      },
    ];
    const map = getMap();
    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
      });

      // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      (function (point, window) {
        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
        kakao.maps.event.addListener(point, 'mouseover', function () {
          window.open(map, point);
        });

        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
        kakao.maps.event.addListener(point, 'mouseout', function () {
          window.close();
        });
      })(marker, infowindow);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    jamData && MapPin();
    // jamData && getMap();
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
