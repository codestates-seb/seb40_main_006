import * as React from 'react';
import { useRecoilState } from 'recoil';
import Sign from '../Components/SignComp/Sign';
import { isLoginState } from '../Atom/atoms';
import PageNotFound from './NotFound';
import { removeCookie } from '../Components/SignComp/Cookie';

export default function Login() {
  const [isLogin] = useRecoilState(isLoginState);

  React.useEffect(() => {
    if (!isLogin) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }
  });

  return <div>{isLogin ? <PageNotFound /> : <Sign />}</div>;
}
