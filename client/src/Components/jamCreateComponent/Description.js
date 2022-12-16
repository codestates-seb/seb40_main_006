/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { TextField, Box } from '@mui/material';
import { theme } from '../../Styles/theme';

const AboutStudy = css`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  div {
    width: 100%;
  }
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
  @media screen and (max-width: 767px) {
    margin-bottom: 30px;
    width: 100%;
  }
`;

const Description = ({ desc, setDesc }) => {
  const handleDesc = e => {
    setDesc(e.target.value);
  };

  return (
    <div css={AboutStudy}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            '& > :not(style)': {
              m: 0,
              width: {
                mobile: '100%',
                tablet: 650,
                laptop: 800,
                desktop: 800,
              },
            },
          }}
          noValidate
          autoComplete="off"
        >
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
              '& > :not(style)': {
                m: 0,
                width: {
                  mobile: '100%',
                  tablet: '100%',
                  laptop: 790,
                  desktop: 790,
                },
              },
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
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Description;
