import * as React from 'react';
import {
  Avatar,
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLocation } from 'react-router-dom';
import { palette, themeUserPage } from '../../Styles/theme';
import BackgroundImage from './BackgroundImage';
import SocialLogin from './SocialLogin';
import LoginHelp from './LoginHelp';

const Sign = () => {
  const location = useLocation();
  const page = location.pathname.slice(1);

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nickname: data.get('nickname'),
      email: data.get('email'),
      password: data.get('password'),
      passwordCheck: data.get('passwordCheck'),
    });
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
            <Avatar sx={{ m: 1, bgcolor: palette.colorJamRealtime }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {page === 'login' ? '로그인' : '회원가입'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {page === 'login' ? <SocialLogin /> : null}
              {page === 'login' ? null : (
                <TextField
                  margin="normal"
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  name="nickname"
                  autoFocus
                  size="small"
                />
              )}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoFocus
                size="small"
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                size="small"
              />
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
                  />
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
