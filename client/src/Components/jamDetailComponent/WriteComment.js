/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { TextField, Box } from '@mui/material';
import UserName from '../userComp/UserName';
import { isLoginState, loginUserInfoState } from '../../Atom/atoms';
import { theme } from '../../Styles/theme';

const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const UserBox = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 3px;
  margin-bottom: 5px;
`;

const InputBox = css`
  margin-bottom: 10px;
  width: 100%;
`;

const ReplyInput = css`
  width: 100%;
`;

const RegisterComment = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

const WriteComment = ({ text, setText, handleSubmit }) => {
  const [user] = useRecoilState(loginUserInfoState);
  const [isLogin] = useRecoilState(isLoginState);

  const handleTextChange = e => {
    setText(e.target.value);
  };

  return (
    <div css={Container}>
      <div css={UserBox}>
        {isLogin ? (
          <UserName
            name={user.nickname}
            id={user.memberId}
            grade={user.grade}
            img={user.img}
          />
        ) : (
          ''
        )}
      </div>
      <div css={InputBox}>
        <ThemeProvider theme={theme}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': {
                m: 0,
                width: {
                  mobile: '100%',
                  tablet: '100%',
                  laptop: 520,
                  desktop: 540,
                },
              },
            }}
            noValidate
            autoComplete="off"
          >
            {isLogin ? (
              <div css={ReplyInput}>
                <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="댓글을 남겨주세요"
                  multiline
                  rows={2}
                  value={text || ''}
                  onChange={handleTextChange}
                  sx={{
                    width: {
                      mobile: '100%',
                      tablet: '100%',
                      laptop: 520,
                      desktop: 520,
                    },
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    '.MuiOutlinedInput-root': {
                      fontSize: '13px',
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '.MuiOutlinedInput-root.Mui-focused': {
                      '& fieldset': {
                        border: '3px solid #B0D0FF',
                      },
                    },
                  }}
                />
                <div css={RegisterComment}>
                  <button type="submit" onClick={handleSubmit}>
                    등록
                  </button>
                </div>
              </div>
            ) : (
              <TextField
                hiddenLabel
                id="outlined-basic"
                variant="outlined"
                placeholder="댓글을 작성하려면 로그인 해주세요"
                inputProps={{ readOnly: true }}
                multiline
                rows={2}
                value={text || ''}
                onChange={handleTextChange}
                sx={{
                  width: {
                    mobile: 'none',
                    tablet: '100%',
                    laptop: 520,
                    desktop: 520,
                  },
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  '.MuiOutlinedInput-root': {
                    fontSize: '13px',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '.MuiOutlinedInput-root.Mui-focused': {
                    '& fieldset': {
                      border: '3px solid #B0D0FF',
                    },
                  },
                }}
              />
            )}
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default WriteComment;
