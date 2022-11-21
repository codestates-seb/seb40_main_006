/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { TextField, Box } from '@mui/material';

const AboutStudy = css`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  span {
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    height: 300px;
  }
  input:focus {
    outline: none;
  }
`;

const Description = () => {
  return (
    <div css={AboutStudy}>
      <Box
        sx={{
          '& > :not(style)': { m: 0, width: '800px' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="standard-basic"
            label="스터디 소개"
            multiline
            rows={10}
            variant="outlined"
            placeholder="함께할 스터디를 소개해주세요"
            // 커스텀 색상 설정
            sx={{
              '& > :not(style)': { m: 0, width: '790px' },
              '& label, label.Mui-focused': {
                color: 'grey', // 기본 라벨, 포커스시 라벨 색상
              },
              '&.MuiOutlinedInput-root:hover': {
                color: 'grey', // 호버시 외곽선 색상
              },
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor: '#d2d2d2' }, // 기본 외곽선 색상
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                '& > fieldset': {
                  borderColor: '#d2d2d2', // 포커스시 외곽선 색상
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default Description;
