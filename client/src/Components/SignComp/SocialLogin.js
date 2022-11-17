import React from 'react';
import { css } from '@emotion/css';
import { FcGoogle } from 'react-icons/fc';

const socialLogin = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  padding: 10px;
  margin: 20px 0 10px 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  :hover {
    background: hsl(210, 8%, 97.5%);
    outline: 2px solid #e0e0e0;
  }
  * {
    margin: 0 10px;
  }
`;

const SocialLogin = () => {
  return (
    <button type="submit" className={socialLogin}>
      <FcGoogle size={18} />
      Log in with Google
    </button>
  );
};

export default SocialLogin;
