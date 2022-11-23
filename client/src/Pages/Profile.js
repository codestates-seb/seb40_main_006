import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/css';
import { Avatar, Button, Stack, Box, TextField } from '@mui/material/';
import { ThemeProvider } from '@mui/material/styles';
import { palette, themeUserPage } from '../Styles/theme';
import AvatarImg from '../Components/userComp/AvatarImg';
import Sidebar from '../Components/Sidebar';
import { getCookie } from '../Components/SignComp/Cookie';

const pageContainer = css`
  display: flex;
  gap: 100px;
`;

const userContainer = css`
  padding: 40px;
  width: 700px;
  min-width: 400px;
  // margin: 0 auto;
`;

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
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });

  const accessToken = getCookie('is_login');
  console.log(accessToken);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append(
      'image',
      new Blob([JSON.stringify(image.image_file.name)], {
        // type: 'application/json',
        type: 'multipart/form-data',
      }),
    );

    // 로그인 된 유저만 가능해야하기에 토큰을 함께 헤더에 담아주기 and 비밀번호 유효성 검사 후 통신
    // url=`${process.env.REACT_APP_URL}/user/change/${userid}`
    await axios.patch('http://localhost:4000/edit', formData, {
      headers: {
        'Content-Type': `application/json`,
        // 'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    });
  };

  const saveImg = e => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: `${fileReader.result}`,
      });
    };
  };

  const deleteImg = () => {
    setImage({
      image_file: '',
      preview_URL: '',
    });
  };

  return (
    <div className={pageContainer}>
      <Sidebar />
      <ThemeProvider theme={themeUserPage}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          className={userContainer}
        >
          <div className={userTitle}>
            <AvatarImg />
            <h1>프로필 수정</h1>
          </div>

          <div className={userAvatar}>
            <Avatar
              sx={{ width: 96, height: 96 }}
              alt="Jaehoon"
              src={image.preview_URL}
            />
            <Stack direction="column" spacing={1}>
              <Button variant="outlined" color="true" component="label">
                변경
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={saveImg}
                  onClick={e => e.target.value === null}
                />
              </Button>
              <Button variant="outlined" color="false" onClick={deleteImg}>
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
    </div>
  );
};

export default Profile;
