import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginState, loginUserInfoState } from '../../Atom/atoms';
import { setCookie } from './Cookie';

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
    setUser({
      memberId: 100 + user.memberId,
      nickname: userObject.name,
      img: userObject.picture,
    });
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

    // google.accounts.id.prompt();
  }, []);

  return (
    <div id="signInDiv" className={loginContainer}>
      {' '}
    </div>
  );
};

export default SocialLogin;
