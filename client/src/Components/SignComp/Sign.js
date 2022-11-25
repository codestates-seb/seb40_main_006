/* eslint-disable no-alert */
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/css';
import axios from 'axios';
import {
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  ThemeProvider,
} from '@mui/material/';
import { useLocation, useNavigate } from 'react-router-dom';
import { themeUserPage } from '../../Styles/theme';
import BackgroundImage from './BackgroundImage';
import SocialLogin from './SocialLogin';
import LoginHelp from './LoginHelp';
import AvatarImg from '../userComp/AvatarImg';
import { setCookie } from './Cookie';
import { loginState } from '../../Atom/atoms';

const validateText = css`
  width: 100%;
  font-weight: 600;
  color: #d32f2f;
`;

const Sign = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.slice(1);

  const [checked, setChecked] = useState(false);

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });

  // 유효성 검사
  const validationCheck = e => {
    const targetName = e.target.name;
    const targetVal = e.target.value;
    if (targetName === 'nickname') {
      if (!targetVal.length)
        setError({ ...error, name: '닉네임을 입력해주세요' });
      else {
        setError({ ...error, name: '' });
        setUserInput({ ...userInput, name: targetVal });
      }
    }
    if (targetName === 'email') {
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!emailRegex.test(targetVal))
        setError({ ...error, email: '올바른 이메일 형식이 아닙니다' });
      else {
        setError({ ...error, email: '' });
        setUserInput({ ...userInput, email: targetVal });
      }
    }
    if (targetName === 'password') {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if (!passwordRegex.test(targetVal) && page === 'signup')
        setError({
          ...error,
          password: '숫자,영문,특수문자를 포함해 8자리 이상이어야 합니다',
        });
      else {
        setError({ ...error, password: '' });
        setUserInput({ ...userInput, password: targetVal });
      }
    }
    if (targetName === 'passwordCheck') {
      if (userInput.password !== targetVal)
        setError({ ...error, rePassword: '비밀번호가 일치하지 않습니다' });
      else {
        setError({ ...error, rePassword: '' });
        setUserInput({ ...userInput, rePassword: targetVal });
      }
    }
  };

  // 회원가입 및 로그인
  const handleSubmit = e => {
    e.preventDefault();

    const handlePost = async () => {
      if (page === 'login') {
        await axios
          .post(`/user/login`, {
            username: userInput.email,
            password: userInput.password,
          })
          .then(res => {
            const accessToken = res.headers.get('Authorization').slice(7);
            const refreshToken = res.headers.refresh;
            setIsLogin({ isLogin: true, accessToken });
            setCookie('refreshToken', refreshToken);
            setError({ ...error, password: '' });
            navigate('/');
          })
          .catch(err => {
            if (err.response.status === 401) {
              setError({
                ...error,
                password: '이메일 또는 비밀번호가 올바르지 않습니다',
              });
            }
          });
      }
      if (page === 'signup') {
        await axios
          .post(
            `/user/signup`,
            {
              email: userInput.email,
              password: userInput.password,
              nickname: userInput.name,
            },
            { withCredentials: true },
          )
          .then(() => {
            setError({ ...error, email: '' });
            alert('회원가입이 완료되었습니다');
            navigate('/login');
          })
          .catch(err => {
            if (err.response.status === 409) {
              setError({
                ...error,
                email: '이미 존재하는 이메일입니다',
              });
            }
          });
      }
    };

    // eslint-disable-next-line consistent-return
    const notEmptyInputData = obj => {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i += 1) {
        if (!obj[keys[i]] && obj === userInput) return false;
        if (obj[keys[i]] && obj === error) return false;
      }
      return true;
    };

    if (
      page === 'signup' &&
      notEmptyInputData(userInput) &&
      notEmptyInputData(error)
    ) {
      if (userInput.password !== userInput.rePassword)
        setError({ ...error, rePassword: '비밀번호가 일치하지 않습니다' });
      else if (!checked) alert('약관에 동의해주세요');
      else {
        handlePost();
      }
    } else if (page === 'login' && userInput.email && userInput.password) {
      handlePost();
    }
  };

  return (
    <ThemeProvider theme={themeUserPage}>
      {console.log(isLogin)}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <BackgroundImage />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AvatarImg />
            <Typography component="h5" variant="h5">
              {page === 'login' ? '로그인' : '회원가입'}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '90%' }}
            >
              {page === 'login' ? <SocialLogin /> : null}
              {page === 'login' ? null : (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="nickname"
                    label="닉네임"
                    name="nickname"
                    autoFocus
                    size="small"
                    onBlur={e => validationCheck(e)}
                    error={error.name !== '' || false}
                  />
                  <div className={validateText}>{error.name}</div>
                </>
              )}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="이메일"
                name="email"
                // autoFocus
                size="small"
                onBlur={e => validationCheck(e)}
                error={error.email !== '' || false}
              />
              <div className={validateText}>{error.email}</div>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                size="small"
                onBlur={e => validationCheck(e)}
                error={error.password !== '' || false}
              />
              <div className={validateText}>{error.password}</div>
              {page === 'login' ? null : (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="passwordCheck"
                    label="비밀번호 확인"
                    type="password"
                    id="passwordCheck"
                    size="small"
                    onBlur={e => validationCheck(e)}
                    error={error.rePassword !== '' || false}
                  />
                  <div className={validateText}>{error.rePassword}</div>

                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        onChange={e => setChecked(e.target.checked)}
                      />
                    }
                    label="회원가입 약관에 동의합니다"
                  />
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, boxShadow: 0 }}
              >
                {page === 'login' ? '로그인' : '회원가입'}
              </Button>
              {page === 'login' ? <LoginHelp /> : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Sign;
