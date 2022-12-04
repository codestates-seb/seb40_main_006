/* eslint-disable no-loop-func */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { location, coordinate } from '../../Atom/atoms';

const { kakao } = window;
const Map = ({ jamData }) => {
  // 마곡
  const [latitude, setLatitude] = useState(37.5602098);
  const [longitude, setLongitude] = useState(126.825479);
  const [currentLevel, setCurrentLevel] = useState(4);

  const [currentLocation] = useRecoilState(location);
  const [, setCurrentCoordinate] = useRecoilState(coordinate);

  function getMap() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: currentLevel,
    };

    const map = new kakao.maps.Map(container, options);

    kakao.maps.event.addListener(map, 'center_changed', function () {
      const level = map.getLevel();
      setCurrentLevel(level);
      const latlng = map.getCenter();

      setLatitude(latlng.getLat());
      setLongitude(latlng.getLng());
      setCurrentCoordinate({
        latitude: latlng.getLat(),
        longitude: latlng.getLng(),
      });
    });
    return map;
  }

  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i += 1) {
        // displayMarker(data[i]);
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
