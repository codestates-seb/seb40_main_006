import * as React from 'react';
import { css } from '@emotion/css';
import { Avatar, Button, Stack, Box, TextField } from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { palette, themeUserPage } from '../Styles/theme';

const userTitle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${palette.colorBorder};
  h1 {
    padding: 20px 0;
    font-size: 30px;
    font-weight: 500;
    color: ${palette.colorTitle};
  }
`;
const userContainer = css`
  padding: 40px;
  width: 700px;
  min-width: 400px;
  margin: 0 auto;
`;

const userAvatar = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px 0;
`;

const userInfo = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  font-weight: 500;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const userBtn = css`
  display: flex;
  justify-content: center;
  padding: 100px;
  gap: 20px;
`;

const Profile = () => {
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('nickname'),
      password: data.get('password'),
      passwordCheck: data.get('passwordCheck'),
      userImage: data.get('userImg'),
    });
  };

  return (
    <ThemeProvider theme={themeUserPage}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        className={userContainer}
      >
        <div className={userTitle}>
          <Avatar sx={{ m: 1, bgcolor: palette.colorJamRealtime }}>
            <LockOutlinedIcon />
          </Avatar>
          <h1>프로필 수정</h1>
        </div>

        <div className={userAvatar}>
          <Avatar
            sx={{ width: 96, height: 96 }}
            alt="Jaehoon"
            src="./logo192.png"
          />
          <Stack direction="column" spacing={1}>
            <Button variant="outlined" color="true" component="label">
              변경
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                name="userImg"
              />
            </Button>
            <Button variant="outlined" color="false">
              <span>삭제</span>
            </Button>
          </Stack>
        </div>

        <div className={userInfo}>
          <div>
            닉네임
            <TextField
              sx={{ width: '70%' }}
              margin="normal"
              required
              fullWidth
              id="nickname"
              name="nickname"
              autoComplete="nickname"
              autoFocus
              size="small"
            />
          </div>
          <div>
            비밀번호
            <TextField
              sx={{ width: '70%' }}
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
          </div>
          <div>
            비밀번호 확인
            <TextField
              sx={{ width: '70%' }}
              margin="normal"
              required
              fullWidth
              name="passwordCheck"
              type="password"
              id="passwordCheck"
              autoComplete="current-password"
              size="small"
            />
          </div>
        </div>

        <div className={userBtn}>
          <Button
            type="submit"
            variant="outlined"
            color="true"
            sx={{ boxShadow: 0 }}
          >
            적용
          </Button>
          <Button
            type="submit"
            color="false"
            variant="outlined"
            sx={{ boxShadow: 0 }}
          >
            취소
          </Button>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
