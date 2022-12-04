/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { css } from '@emotion/css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import JamColor from '../JamColor';

const userName = css`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  padding: 3px;
  margin-bottom: 5px;
  cursor: pointer;
  img {
    width: 15px;
    height: 15px;
    margin-bottom: 1px;
    border-radius: 30px;
  }
`;

const UserName = props => {
  return (
    <Link to={`/mypage/${props.id}`} className={userName}>
      {props.img ? (
        <img src={props.img} alt="img" />
      ) : (
        <FaUserCircle size={15} />
      )}

      {props.name}
      <JamColor color={props.grade} />
    </Link>
  );
};

export default UserName;
