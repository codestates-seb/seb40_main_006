/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { css } from '@emotion/css';
import { useRecoilState } from 'recoil';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { loginUserInfoState } from '../../Atom/atoms';
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
    width: 12px;
    height: 12px;
    margin-bottom: 1px;
  }
`;

const UserName = props => {
  const [user] = useRecoilState(loginUserInfoState);

  return (
    <Link to={`/mypage/${user.memberId}`} className={userName}>
      <FaUserCircle size={15} />
      {props.name}
      <JamColor />
    </Link>
  );
};

export default UserName;
