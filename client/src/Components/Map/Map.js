/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { coordinate, location } from '../../Atom/atoms';

// 33.450701, 126.570667
const { kakao } = window;
const Map = ({ jamData }) => {
  const container = document.getElementById('map'); // 지도를 표시할 div
  const [currentLocation] = useRecoilState(location);
  const [currentCoordinate, setCurrentCoordinate] = useRecoilState(coordinate);
  // 마곡
  // const [latitude] = useState(currentCoordinate.latitude);
  // const [longitude] = useState(currentCoordinate.longitude);

  // 좌표로 주소 얻기

  const options = {
    center: new kakao.maps.LatLng(
      currentCoordinate.latitude,
      currentCoordinate.longitude,
    ), // 지도의 중심좌표
    level: 4, // 지도 확대 레벨
  };

  const map = new kakao.maps.Map(container, options);

  /**
   *
   * Map Change
   *
   */
  // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, 'center_changed', function () {
    // 지도의  레벨을 얻어옵니다
    // const level = map.getLevel();
    // 지도의 중심좌표를 얻어옵니다
    const latlng = map.getCenter();
    setCurrentCoordinate({
      latitude: latlng.getLat(),
      longitude: latlng.getLng(),
    });
  });

  /**
   *
   * Location Change
   *
   */
  const searchLocation = () => {
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

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
        map.setBounds(bounds);
      }
    }
    // 키워드(동네 이름)로 장소를 검색합니다
    ps.keywordSearch(currentLocation, placesSearchCB);
  };

  /**
   *
   * Map Pin
   *
   */

  const mapPoints = [];
  // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
  jamData.forEach(jam => {
    mapPoints.push({
      content: `<p>${jam.title}</p>`,
      latlng: new kakao.maps.LatLng(jam.latitude, jam.longitude),
    });
  });
  for (let i = 0; i < mapPoints.length; i += 1) {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map, // 마커를 표시할 지도
      position: mapPoints[i].latlng, // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: mapPoints[i].content, // 인포윈도우에 표시할 내용
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

  useEffect(() => {
    console.log(currentLocation);
    searchLocation();
  }, [currentLocation]);

  useEffect(() => {
    console.log(currentCoordinate);
  }, [currentCoordinate]);
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
