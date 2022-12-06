/* eslint-disable no-loop-func */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { location, coordinate, locationChanged } from '../../Atom/atoms';

const { kakao } = window;
const Map = ({ jamData }) => {
  const [latitude, setLatitude] = useState(37.5602098);
  const [longitude, setLongitude] = useState(126.825479);
  const [currentLevel, setCurrentLevel] = useState(4);

  const [currentLocation, setCurrentLocation] = useRecoilState(location);
  const [, setCurrentCoordinate] = useRecoilState(coordinate);
  const [isUserLocationChanged, setIsUserLocationChanged] =
    useRecoilState(locationChanged);
  function getMap() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: currentLevel,
    };

    const map = new kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }
    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function () {
      const level = map.getLevel();
      setCurrentLevel(level);
      const latlng = map.getCenter();

      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          for (let i = 0; i < result.length; i += 1) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
              setCurrentLocation(result[i].address_name);
              break;
            }
          }
        }
      }
      setLatitude(latlng.getLat());
      setLongitude(latlng.getLng());
      setCurrentCoordinate({
        latitude: latlng.getLat(),
        longitude: latlng.getLng(),
      });
      setIsUserLocationChanged(false);
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    return map;
  }

  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i += 1) {
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      getMap().setBounds(bounds);
    }
  }

  const ps = new kakao.maps.services.Places();

  const MapPin = () => {
    const mapPoints = [];

    jamData.forEach(jam => {
      mapPoints.push({
        content: `<p>${jam.title}</p>`,
        latlng: new kakao.maps.LatLng(jam.latitude, jam.longitude),
      });
    });
    const map = getMap();
    for (let i = 0; i < mapPoints.length; i += 1) {
      const marker = new kakao.maps.Marker({
        map,
        position: mapPoints[i].latlng,
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: mapPoints[i].content,
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
    if (isUserLocationChanged)
      ps.keywordSearch(currentLocation, placesSearchCB);
  }, [currentLocation]);

  useEffect(() => {
    MapPin();
  }, [jamData]);

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
