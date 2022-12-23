/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { palette } from '../../Styles/theme';

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

  const imageSrc =
    'https://github.com/codestates-seb/seb40_main_006/blob/dev-fe/client/src/Assets/images/map_pin.png?raw=true'; // 마커이미지의 주소입니다
  const imageSize = new kakao.maps.Size(30, 40); // 마커이미지의 크기입니다
  const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption,
  );
  const MapPin = () => {
    const positions = {
      content: `<div class="customoverlay" style="position: relative;bottom: 76px;border-radius: 6px;float: left;">
            <div style="display: block;text-decoration: none;color: #222;text-align: center;border-radius: 6px;font-size: 14px;font-weight: bold;overflow: hidden;background: ${palette.colorAccent};background: ${palette.colorAccent} url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">
            <span class="title" style="display: block;text-align: center;background: #fff;margin-right: 35px;padding: 8px 10px;font-size: 13px;font-weight: bold;">
            ${jamData.location}</span></div></div>`,
      latlng: new kakao.maps.LatLng(jamData.latitude, jamData.longitude),
    };
    const map = getMap();
    const marker = new kakao.maps.Marker({
      map,
      position: positions.latlng,
      image: markerImage,
    });

    const overlay = new kakao.maps.CustomOverlay({
      position: positions.latlng,
      content: positions.content,
      yAnchor: -2,
    });

    overlay.setMap(map);

    kakao.maps.event.addListener(marker, 'mouseout', function () {
      overlay.setMap(null);
    });
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
