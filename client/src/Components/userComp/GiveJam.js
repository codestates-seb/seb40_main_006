import React, { useState } from 'react';
import { css } from '@emotion/css';
import { palette } from '../../Styles/theme';

const modalContainer = css`
  position: fixed;
  top: 25%;
  left: 40%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background-color: #f4f4f4;
  img {
    width: 54px;
  }
  .select {
    filter: opacity(0.4) drop-shadow(0 0 0 red);
  }
  .jam {
    flex-basis: 30%;
    > img {
      cursor: pointer;
      margin: 0 5px;
      color: red;
    }
  }
  button {
    flex-basis: 10%;
    background: ${palette.colorMain};
    width: 100px;
    border-radius: 10px;
    :hover {
      background: ${palette.colorBtn2};
    }
  }
`;

const GiveJam = () => {
  const array = [0, 1, 2, 3, 4];
  const [jam, setJam] = useState([false, false, false, false, false]);
  const grade = jam.filter(el => el).length;

  const jamClickHandler = idx => {
    let copy = [...jam];
    copy = copy.map((el, i) => i <= idx);
    setJam(copy);
  };

  return (
    <div className={modalContainer}>
      <h3>감자님에게 잼을 주세요!</h3>
      <div className="jam">
        {array.map((el, idx) => (
          <img
            src="./img/whiteJam.png"
            alt="jam"
            role="presentation"
            className={jam[idx] ? 'select' : ''}
            key={el}
            onClick={() => jamClickHandler(idx)}
          />
        ))}
      </div>
      <button type="button" onClick={() => console.log(grade)}>
        전달
      </button>
    </div>
  );
};

export default GiveJam;
