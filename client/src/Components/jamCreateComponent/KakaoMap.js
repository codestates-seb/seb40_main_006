/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';

const mapContainer = css`
  position: relative;
  width: 800px;
  height: 600px;
`;

const resultContainer = css``;

const resultList = css`
  color: #000;
  position: absolute;
  top: 95px;
  left: 30px;
  border: 2px solid #bababa;
  border-radius: 5px;
  width: 280px;
  height: 450px;
  overflow: auto;
  padding: 20px;
  background-color: rgba(240, 240, 240, 0.6);
  z-index: 5;

  div {
    font-size: 15px;
    padding-bottom: 7px;
  }
  h5 {
    background-color: rgba(240, 240, 240, 0.6);
    font-size: 15px;
  }
  span {
    background-color: rgba(240, 240, 240, 0.6);
    font-size: 14px;
  }
`;

const resultItem = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const resultNumber = css`
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding-bottom: 10px;
`;

const resultTextBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 0;
`;

const pageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const { kakao } = window;

const KakaoMap = ({
  keyword,
  setLocationText,
  inputWindow,
  handleClose,
  setLongitude,
  setLatitude,
  setAddress,
}) => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // const markers = [];
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    // 장소 검색 객체 생성
    const ps = new kakao.maps.services.Places();

    // if (!keyword.replace(/^\s+|\s+$/g, "")) {
    //   alert("키워드를 입력해주세요!");
    //   return false;
    // }

    // 장소 검색 객체를 통해 키워드로 장소 검색 요청
    // eslint-disable-next-line no-use-before-define
    ps.keywordSearch(keyword, placesSearchCB);

    // 장소 검색이 완료됐을 때 호출되는 콜백 함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          // eslint-disable-next-line no-use-before-define
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        // eslint-disable-next-line no-use-before-define
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination');
      const fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function clickOn(k) {
            return () => {
              pagination.gotoPage(k);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 마커를 생성하고 지도에 표시
    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;color:#000;">${place.place_name}</div>`,
        );
        infowindow.open(map, marker);
      });
    }
  }, [keyword]);

  const handleTextInput = item => {
    const splitAddress = item.address_name.split(' ');
    const editAddress = `${splitAddress[0]} ${splitAddress[1]} ${splitAddress[2]}`;

    setLocationText(item.place_name);
    setLongitude(item.x);
    setLatitude(item.y);
    setAddress(editAddress);
    handleClose(false);
  };

  return (
    <div>
      <div id="myMap" className={mapContainer} />
      {inputWindow && (
        <div>
          <div className={resultContainer}>
            <div className={resultList}>
              {Places.map((item, i) => (
                <div key={i} className={resultItem}>
                  <div className={resultNumber}>{i + 1}</div>
                  <div className={resultTextBox}>
                    {/* <h5>{item.place_name}</h5> */}
                    <button type="button" onClick={() => handleTextInput(item)}>
                      {item.place_name}
                    </button>
                    {item.road_address_name ? (
                      <div>
                        <span>{item.road_address_name}</span>
                        {/* <span>{item.address_name}</span> */}
                      </div>
                    ) : (
                      <span>{item.address_name}</span>
                    )}
                  </div>
                </div>
              ))}
              <div id="pagination" className={pageContainer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KakaoMap;
