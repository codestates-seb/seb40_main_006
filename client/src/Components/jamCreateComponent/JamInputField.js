/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import { css } from '@emotion/react';
import KewordAddressModal from './KewordAddressModal';

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

const JamInputField = ({
  jamTitleRef,
  jamCategoryRef,
  jamCapacityRef,
  locationText,
  setLocationText,
  setLatitude,
  setLongitude,
  setAddress,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLocationText = e => {
    setLocationText(e.target.value);
  };

  return (
    <div css={Container}>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '280px' },
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
            defaultValue=""
            inputRef={jamTitleRef}
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
            name="category"
            defaultValue=""
            inputRef={jamCategoryRef}
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
            type="button"
            onClick={handleOpen}
            label="잼 위치"
            variant="standard"
            placeholder="클릭하면 주소 검색창이 나와요"
            value={locationText}
            onChange={handleLocationText}
            sx={{
              width: 300,
              maxWidth: '100%',
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
            }}
          />
          {open && (
            <KewordAddressModal
              open={open}
              handleClose={handleClose}
              setOpen={setOpen}
              locationText={locationText}
              setLocationText={setLocationText}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              setAddress={setAddress}
            />
          )}
          <TextField
            id="study-peopleNumber"
            label="모집인원"
            type="number"
            variant="standard"
            name="numberOfPeople"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            placeholder="숫자를 입력해주세요"
            defaultValue=""
            inputRef={jamCapacityRef}
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

export default JamInputField;
