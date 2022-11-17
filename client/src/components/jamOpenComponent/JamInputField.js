/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import { css } from '@emotion/react';

const Container = css`
  width: 100%;
  height: 356px;
`;

const InputContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
`;

const JamNotice = css`
  width: 100%;
  height: 60px;
  padding: 10px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 3px solid #dddddd;
  border-radius: 5px;
`;

const categories = [
  { value: 'health', label: '운동/건강' },
  { value: 'lifestyle', label: '라이프스타일' },
  { value: 'cooking', label: '요리' },
  { value: 'art', label: '미술' },
  { value: 'career', label: '커리어' },
  { value: 'craft', label: '공예' },
  { value: 'photography', label: '사진/영상' },
  { value: 'music', label: '음악' },
  { value: 'language', label: '외국어' },
  { value: 'education', label: '교육' },
  { value: 'investment', label: '재테크' },
  { value: 'business', label: '비즈니스' },
  { value: 'development', label: '개발' },
];

const StudyInputField = () => {
  const [category, setCategory] = useState('health');

  const handleChange = e => {
    setCategory(e.target.value);
  };

  return (
    <div css={Container}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '28ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div css={InputContainer}>
          <TextField
            id="study-name"
            label="잼 이름"
            variant="standard"
            placeholder="실시간 잼의 이름을 지어주세요"
            sx={{
              width: 300,
              maxWidth: '100%',
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // 기본 라벨, 포커스시 라벨 색상
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black', // 포커스시 아래라인 색상
              },
            }}
          />
          <TextField
            id="study-category"
            select
            label="카테고리"
            variant="standard"
            value={category}
            defaultValue="클릭해서 선택해주세요"
            onChange={handleChange}
            sx={{
              width: 300,
              maxWidth: '100%',
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
            }}
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="study-location"
            label="잼 위치"
            variant="standard"
            placeholder="클릭하면 주소 검색창이 나와요"
            sx={{
              width: 300,
              maxWidth: '100%',
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
            }}
          />
          <TextField
            id="study-peopleNumber"
            label="모집인원"
            type="number"
            variant="standard"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            placeholder="숫자를 입력해주세요"
            sx={{
              width: 300,
              maxWidth: '100%',
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
            }}
          />
          <div css={JamNotice}>
            <span>실시간 잼은 개설 시점 기준으로 생성되며,</span>
            <span>당일 자정이 지나면 자동으로 종료됩니다.</span>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default StudyInputField;
