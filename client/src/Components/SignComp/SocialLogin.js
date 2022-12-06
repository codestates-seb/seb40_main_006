/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { css } from '@emotion/css';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { loginUserInfoState, isLoginState } from '../../Atom/atoms';

const loginContainer = css`
  display: flex;
  justify-content: center;
`;

const SocialLogin = () => {
  const [user, setUser] = useRecoilState(loginUserInfoState);
  const [, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    const encodedJwtIdToken = response.credential;
    const userObject = jwtDecode(encodedJwtIdToken);
    // setUser({
    //   memberId: 100 + user.memberId,
    //   nickname: userObject.name,
    //   img: userObject.picture,
    //   grade: '2',
    //   gradeCount: '5',
    // });
    setIsLogin(true);
    setCookie('accessToken', encodedJwtIdToken);
    document.getElementById('signInDiv').hidden = true;
    navigate('/');
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      shape: 'square',
      logo_alignment: 'left',
    });
  }, []);

  return (
    <div id="signInDiv" className={loginContainer}>
      {' '}
    </div>
  );
};

export default SocialLogin;
