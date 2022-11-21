import * as React from 'react';
import { useState } from 'react';
import { css } from '@emotion/css';
import { Avatar, Button, Stack, Box, TextField } from '@mui/material/';
import { ThemeProvider } from '@mui/material/styles';
import { palette, themeUserPage } from '../Styles/theme';
import AvatarImg from '../Components/userComp/AvatarImg';

const userContainer = css`
  padding: 40px;
  width: 700px;
  min-width: 400px;
  margin: 0 auto;
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

  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });

  const saveImg = e => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  const deleteImg = () => {
    setImage({
      image_file: '',
      preview_URL: '',
    });
  };

  const sendImageToServer = async () => {
    // if (image.image_file) {
    //   const formData = new FormData();
    //   formData.append('file', image.image_file);
    //   console.log(formData);
    //   await axios.post('url', formData);
    //   setImage({
    //     image_file: '',
    //     preview_URL: '',
    //   });
    // }
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
            onClick={sendImageToServer}
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
