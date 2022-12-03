import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Stack, Box, TextField } from '@mui/material/';
import { ThemeProvider } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { palette, themeUserPage } from '../Styles/theme';
import AvatarImg from '../Components/userComp/AvatarImg';
import Sidebar from '../Components/Sidebar';
import { getCookie } from '../Components/SignComp/Cookie';
import { loginUserInfoState } from '../Atom/atoms';

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

const validateText = css`
  width: 100%;
  font-weight: 600;
  color: #d32f2f;
  display: flex;
  padding-left: 190px;
  min-width: 300px;
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const Profile = () => {
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });
  const [userInput, setUserInput] = useState({
    nickname: '',
    password: '',
    rePassword: '',
    profileImage: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    nickname: '',
    password: '',
  });

  const [user, setUser] = useRecoilState(loginUserInfoState);
  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === 'nickname') {
      setUserInput({ ...userInput, nickname: e.target.value });
    }
    if (e.target.name === 'password') {
      setUserInput({ ...userInput, password: e.target.value });
    }
    if (e.target.name === 'rePassword') {
      setUserInput({ ...userInput, rePassword: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!userInput.nickname) {
      setErrorMessage({ ...errorMessage, nickname: '닉네임을 입력해주세요' });
    } else if (!passwordRegex.test(userInput.password)) {
      setErrorMessage({
        nickname: '',
        password:
          '비밀번호는 숫자,영문,특수문자를 포함해 8자리 이상이어야 합니다',
      });
    } else if (userInput.password !== userInput.rePassword) {
      setErrorMessage({ nickname: '', password: '비밀번호를 확인해주세요' });
    } else if (userInput.nickname && userInput.password) {
      setErrorMessage({ nickname: '', password: '' });
      await axios
        .patch(
          `/user/change/${user.memberId}`,
          {
            nickname: userInput.nickname,
            password: userInput.password,
            // profileImage: userInput.profileImage,
            profileImage: image.preview_URL,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('accessToken')}`,
            },
          },
        )
        .then(res => {
          console.log(res.data);
          setUser({
            memberId: res.data.data.memberId,
            nickname: res.data.data.nickname,
            img: res.data.data.profileImage,
            grade: user.grade,
            gradeCount: user.gradeCount,
          });
          alert('수정이 완료되었습니다');
          navigate(-1);
        });
    }
  };

  // const saveImg = e => {
  //   e.preventDefault();
  //   const fileReader = new FileReader();

  //   if (e.target.files[0]) {
  //     fileReader.readAsDataURL(e.target.files[0]);
  //   }
  //   fileReader.onload = () => {
  //     setImage({
  //       image_file: e.target.files[0],
  //       preview_URL: `${fileReader.result}`,
  //     });
  //   };
  // };

  const saveImg = async e => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    // const img = e.target.files[0];
    // console.log('img', img);
    // setImage(e.target.files[0]);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    // eslint-disable-next-line no-undef
    await axios
      .post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('res.data: ', res.data);
        // setUser(Object.assign(user, { img: res.data }));
        setUser(prevState => ({ ...prevState, img: res.data }));
        setImage({ preview_URL: res.data });
      })
      .catch(err => {
        console.log(err.Error);
      });
  };

  const deleteImg = () => {
    setUser({ img: '' });
    setImage({
      image_file: '',
      preview_URL: '',
    });
  };

  console.log('user: ', user);
  console.log('userInput: ', userInput);

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
                onChange={handleChange}
              />
            </div>
            <div className={validateText}>{errorMessage.nickname}</div>
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
                onChange={handleChange}
              />
            </div>
            <div className={validateText}> </div>
            <div>
              비밀번호 확인
              <TextField
                sx={{ width: '70%' }}
                margin="normal"
                required
                fullWidth
                name="rePassword"
                type="password"
                id="rePassword"
                autoComplete="current-password"
                size="small"
                onChange={handleChange}
                // error={errorMessage !== '' || false}
              />
            </div>
            <div className={validateText}>{errorMessage.password}</div>
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
              onClick={() => navigate(-1)}
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
