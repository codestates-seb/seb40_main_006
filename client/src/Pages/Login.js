import * as React from 'react';
import { useRecoilState } from 'recoil';
import Sign from '../Components/SignComp/Sign';
import { isLoginState } from '../Atom/atoms';
import PageNotFound from './NotFound';

export default function Login() {
  const [isLogin] = useRecoilState(isLoginState);

  return <div>{isLogin ? <PageNotFound /> : <Sign />}</div>;
}
