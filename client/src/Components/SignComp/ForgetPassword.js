/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState } from 'react';
import { css } from '@emotion/css';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material/';
import axios from 'axios';

const validateText = css`
  width: 100%;
  font-weight: 600;
  color: #d32f2f;
`;

export default function ForgetPassword() {
  const [open, setOpen] = React.useState(false);

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
  });

  const [error, setError] = useState('');

  const onChangeHandler = e => {
    if (e.target.name === 'nickname') {
      setUserInput({ ...userInput, name: e.target.value });
    }
    if (e.target.name === 'email') {
      setUserInput({ ...userInput, email: e.target.value });
    }
  };

  const clickSubmitHandler = () => {
    if (!userInput.name || !userInput.email) {
      setError('이름과 이메일을 전부 입력해주세요.');
    } else {
      setError('');
      axios
        .post('/user/findpassword/send', {
          email: userInput.email,
          nickname: userInput.name,
        })
        .then(() => {
          alert('제출 완료되었습니다.');
          setOpen(false);
        })
        .catch(err => {
          if (err.response.status === 403) {
            setError('닉네임과 이메일을 확인해주세요');
          }
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link variant="body2" onClick={handleClickOpen}>
        비밀번호를 잊으셨나요?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>비밀번호를 잊으셨나요?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            회원가입시 입력했던 이름과 이메일 주소를 입력해주세요. 정보가 일치할
            경우, 이메일로 임시 비밀번호가 발급됩니다.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nickname"
            name="nickname"
            label="닉네임"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeHandler}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="이메일"
            type="email"
            fullWidth
            variant="standard"
            onChange={onChangeHandler}
          />
          <div className={validateText}>{error}</div>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={clickSubmitHandler}>
            제출
          </Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
