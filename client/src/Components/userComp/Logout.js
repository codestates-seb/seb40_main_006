/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginState, loginUserInfoState } from '../../Atom/atoms';
import { removeCookie } from '../SignComp/Cookie';

const logoutStyle = css`
  margin: 8px 0px;
`;
const UserLogout = () => {
  const [, setIsLogin] = useRecoilState(isLoginState);
  const [, setUser] = useRecoilState(loginUserInfoState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(false);
    setUser({ memberId: '', nickname: '', img: '', grade: '', gradeCount: '' });
    removeCookie('accessToken');
    removeCookie('refreshToken');
    navigate('/login');
    window.location.reload();
  };
  return (
    <div className={logoutStyle} onClick={handleLogout}>
      로그아웃
    </div>
  );
};

export default UserLogout;
