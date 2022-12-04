import { useEffect } from 'react';
import { css } from '@emotion/css';

const loginContainer = css`
  display: flex;
  justify-content: center;
`;

const SocialLogin = () => {
  function handleCallbackResponse() {
    alert('점검중입니다!');
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
