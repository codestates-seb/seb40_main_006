/** @jsxImportSource @emotion/react */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
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
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    // eslint-disable-next-line no-use-before-define
    ps.keywordSearch(keyword, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          // eslint-disable-next-line no-use-before-define
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // eslint-disable-next-line no-use-before-define
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    function displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination');
      const fragment = document.createDocumentFragment();
      let i;

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
    // const splitAddress = item.address_name.split(' ');
    // const editAddress = `${splitAddress[0]} ${splitAddress[1]} ${splitAddress[2]}`;

    setLocationText(item.place_name);
    setLongitude(item.x);
    setLatitude(item.y);
    setAddress(
      item.road_address_name ? item.road_address_name : item.address_name,
    );
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
                    <div onClick={() => handleTextInput(item)}>
                      {item.place_name}
                    </div>
                    {item.road_address_name ? (
                      <div>
                        <span>{item.road_address_name}</span>
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
