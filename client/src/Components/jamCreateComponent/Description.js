/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
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

const Description = ({ desc, setDesc }) => {
  const handleDesc = e => {
    setDesc(e.target.value);
  };

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
            value={desc || ''}
            onChange={handleDesc}
            sx={{
              '& > :not(style)': { m: 0, width: '790px' },
              '& label, label.Mui-focused': {
                color: 'grey',
              },
              '&.MuiOutlinedInput-root:hover': {
                color: 'grey',
              },
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor: '#d2d2d2' },
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                '& > fieldset': {
                  borderColor: '#d2d2d2',
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
