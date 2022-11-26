/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { css } from '@emotion/css';
import KakaoMap from './KakaoMap';

const container = css`
  position: relative;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const inputForm = css`
  position: absolute;
  top: 50px;
  left: 30px;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(240, 240, 240, 0.6);

  input {
    color: #000;
    width: 215px;
    height: 40px;
    font-size: 15px;
    margin-right: 5px;
    padding: 10px;
    border: 2px solid #bababa;
    border-radius: 5px;
    background-color: rgba(240, 240, 240, 0.6);
  }
  button {
    color: #000;
    width: 60px;
    height: 40px;
    font-size: 15px;
    padding: 10px;
    border: 2px solid #bababa;
    border-radius: 5px;
    background-color: rgba(240, 240, 240, 0.6);
    cursor: pointer;
  }
`;

function MapLanding({
  setLocationText,
  handleClose,
  setLatitude,
  setLongitude,
  setAddress,
}) {
  const [InputText, setInputText] = useState('');
  const [keyword, setKeyword] = useState('');
  // const [locationText, setLocationText] = useState('');
  const [inputWindow, setInputWindow] = useState(true);

  const onChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setKeyword(InputText);
    setInputText('');
  };

  return (
    <div className={container}>
      <KakaoMap
        keyword={keyword}
        setLocationText={setLocationText}
        inputWindow={inputWindow}
        setInputWindow={setInputWindow}
        handleClose={handleClose}
        setLongitude={setLongitude}
        setLatitude={setLatitude}
        setAddress={setAddress}
      />
      {inputWindow && (
        <form className={inputForm} onSubmit={handleSubmit}>
          <input
            placeholder="키워드를 입력해주세요"
            onChange={onChange}
            value={InputText}
          />
          <button type="submit">검색</button>
        </form>
      )}
    </div>
  );
}

export default MapLanding;