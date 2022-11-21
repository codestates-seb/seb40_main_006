/** @jsxImportSource @emotion/react */
import 'rsuite/dist/rsuite.min.css';
import React, { useState } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import { css } from '@emotion/react';
import { DateRangePicker } from 'rsuite';

const Container = css`
  width: 100%;
  max-width: 300px;
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

const PeriodContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
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
          '& > :not(style)': { m: 1, width: '280px' },
        }}
        noValidate
        autoComplete="off"
      >
        <div css={InputContainer}>
          <TextField
            id="study-name"
            label="스터디 이름"
            variant="standard"
            placeholder="스터디 이름을 지어주세요"
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
            label="스터디 위치"
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
          {/* <TextField
            id="study-period"
            label="모집기간"
            variant="standard"
            sx={{
              width: 300,
              maxWidth: '100%',
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
            }}
          /> */}
          <div css={PeriodContainer}>
            <span>모집기간</span>
            <DateRangePicker
              format="yyyy-MM-dd hh:mm aa"
              showMeridian
              style={{ color: 'black' }}
              defaultCalendarValue={[
                new Date('2022-02-01 00:00:00'),
                new Date('2022-05-01 23:59:59'),
              ]}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default StudyInputField;
