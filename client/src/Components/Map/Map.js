import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { location } from '../../Atom/atoms';

const { kakao } = window;
const Map = () => {
  const [latitude, setLatitude] = useState(37.5602098);
  const [longitude, setLongitude] = useState(126.825479);

  // 장소 검색 객체를 생성합니다
  const ps = new kakao.maps.services.Places();
  const [currentLocation] = useRecoilState(location);
  // 좌표로 주소 얻기
  function getMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      // console.log(`위도 : ${position.coords.latitude}`);
      // console.log(`경도 : ${position.coords.longitude}`);
      // console.log(latitude);
      // console.log(longitude);
    });

    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 3, // 지도 확대 레벨
    };

    // eslint-disable-next-line no-unused-vars
    const map = new kakao.maps.Map(container, options);

    return map;
  }
  useEffect(() => {
    console.log(currentLocation);
    getMap();
  }, [currentLocation]);

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i += 1) {
        // displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      getMap().setBounds(bounds);
    }
  }

  // 키워드로 장소를 검색합니다
  ps.keywordSearch(currentLocation, placesSearchCB);
  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};
export default Map;
