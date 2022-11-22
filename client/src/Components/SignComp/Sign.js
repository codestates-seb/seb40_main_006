import * as React from 'react';
import { useState } from 'react';
import { css } from '@emotion/css';
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
import { useLocation } from 'react-router-dom';
import { themeUserPage } from '../../Styles/theme';
import BackgroundImage from './BackgroundImage';
import SocialLogin from './SocialLogin';
import LoginHelp from './LoginHelp';
import AvatarImg from '../userComp/AvatarImg';

const validateText = css`
  width: 100%;
  font-weight: 600;
  color: #d32f2f;
`;

const Sign = () => {
  const location = useLocation();
  const page = location.pathname.slice(1);

  // const [checked, setChecked] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  // const [registerError, setRegisterError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const joinData = {
      nickname: data.get('nickname'),
      email: data.get('email'),
      password: data.get('password'),
      passwordCheck: data.get('passwordCheck'),
    };

    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRegex.test(joinData.email))
      setEmailError('올바른 이메일 형식이 아닙니다');
    else setEmailError('');

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(joinData.password))
      setPasswordError('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요');
    else setPasswordError('');

    if (joinData.password !== joinData.passwordCheck)
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    else setPasswordCheckError('');

    if (!joinData.nickname) setNameError('닉네임을 입력해주세요');
    else if (joinData.nickname.length < 2)
      setNameError('닉네임은 두글자 이상이어야 합니다');
    else setNameError('');
  };

  return (
    <ThemeProvider theme={themeUserPage}>
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
                    error={nameError !== '' || false}
                  />
                  <div className={validateText}>{nameError}</div>
                </>
              )}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoFocus
                size="small"
                error={emailError !== '' || false}
              />
              <div className={validateText}>{emailError}</div>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                size="small"
                error={passwordError !== '' || false}
              />
              <div className={validateText}>{passwordError}</div>
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
                    error={passwordCheckError !== '' || false}
                  />
                  <div className={validateText}>{passwordCheckError}</div>

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
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
