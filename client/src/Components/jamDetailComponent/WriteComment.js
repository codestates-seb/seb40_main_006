/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { TextField, Box } from '@mui/material';
// import Button from '../Button';
import UserName from '../userComp/UserName';
import { loginUserInfoState } from '../../Atom/atoms';

// import { FaUserCircle } from 'react-icons/fa';
// import { AiOutlineTwitter } from 'react-icons/ai';
// import { palette } from '../../Styles/theme';

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

// const JamIcon = css`
//   color: ${palette.colorGrade2};
// `;

const InputBox = css`
  margin-bottom: 10px;
`;

const RegisterComment = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const WriteComment = ({ text, setText, handleSubmit }) => {
  const [user] = useRecoilState(loginUserInfoState);

  const handleTextChange = e => {
    setText(e.target.value);
  };

  return (
    <div css={Container}>
      <div css={UserBox}>
        {/* <div>
          <FaUserCircle size={15} />
        </div>
        <div>딸기쨈(화면을 보고있는 로그인 유저 네임)</div>
        <ThemeProvider theme={palette}>
          <div css={JamIcon}>
            <AiOutlineTwitter size={16} />
          </div>
        </ThemeProvider> */}
        <UserName name={user.nickname} />
      </div>
      <div css={InputBox}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 0, width: '518px' },
          }}
          noValidate
          autoComplete="off"
        >
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
              backgroundColor: '#fff',
              borderRadius: 1,
              // borderColor: '#d2d2d2',
              '.MuiOutlinedInput-root': {
                // 오버라이딩 하기 위해 필드셋으로 기본 양식 없애기
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
        </Box>
      </div>
      <div css={RegisterComment}>
        <button type="submit" onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteComment;
