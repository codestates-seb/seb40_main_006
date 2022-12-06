/* eslint-disable no-loop-func */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../Styles/theme';
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
  const navigate = useNavigate();
  function getMap() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: currentLevel,
    };

    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();
    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }
    kakao.maps.event.addListener(map, 'idle', function () {
      const level = map.getLevel();
      setCurrentLevel(level);
      const latlng = map.getCenter();

      function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          for (let i = 0; i < result.length; i += 1) {
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
    const mapPoints = [];

    jamData.forEach(jam => {
      mapPoints.push({
        content: `<div class="customoverlay" style="position: relative;bottom: 76px;border-radius: 6px;float: left;">
            <div style="display: block;text-decoration: none;color: #222;text-align: center;border-radius: 6px;font-size: 14px;font-weight: bold;overflow: hidden;background: ${palette.colorAccent};background: ${palette.colorAccent} url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">
            <span class="title" style="display: block;text-align: center;background: #fff;margin-right: 35px;padding: 8px 10px;font-size: 13px;font-weight: bold;">
            ${jam.title}</span></div></div>`,
        latlng: new kakao.maps.LatLng(jam.latitude, jam.longitude),
        jamId: jam.jamId,
      });
    });
    const map = getMap();

    for (let i = 0; i < mapPoints.length; i += 1) {
      const marker = new kakao.maps.Marker({
        map,
        position: mapPoints[i].latlng,
        image: markerImage,
      });

      const overlay = new kakao.maps.CustomOverlay({
        position: mapPoints[i].latlng,
        content: mapPoints[i].content,
        yAnchor: 1,
      });

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        overlay.setMap(map);
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        navigate(`/jamdetail/${mapPoints[i].jamId}`);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        overlay.setMap(null);
      });
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
