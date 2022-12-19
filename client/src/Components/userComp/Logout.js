/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginState, loginUserInfoState } from '../../Atom/atoms';
import { removeCookie } from '../SignComp/Cookie';

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
  return <div onClick={handleLogout} />;
};

export default UserLogout;
