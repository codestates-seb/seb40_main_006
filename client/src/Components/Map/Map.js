import { useEffect, useState } from 'react';

const { kakao } = window;
const Map = () => {
  const [latitude, setLatitude] = useState(37.5602098);
  const [longitude, setLongitude] = useState(126.825479);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      console.log(`위도 : ${position.coords.latitude}`);
      console.log(`경도 : ${position.coords.longitude}`);
      console.log(latitude);
      console.log(longitude);
    });

    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 3, // 지도 확대 레벨
    };

    // eslint-disable-next-line no-unused-vars
    const map = new kakao.maps.Map(container, options);
  }, []);

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
