import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/css';
import Hero from '../Components/Landing/Hero';
import Values from '../Components/Landing/Values';
import Categories from '../Components/Landing/Categories';
import Works from '../Components/Landing/Works';
import { isLoginState } from '../Atom/atoms';
import { removeCookie } from '../Components/SignComp/Cookie';

const Container = css`
  word-break: keep-all;
`;

const Rending = () => {
  const [isLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    if (!isLogin) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }
  });
  return (
    <div className={Container}>
      <Hero />
      <Values />
      <Categories />
      <Works />
    </div>
  );
};

export default Rending;
