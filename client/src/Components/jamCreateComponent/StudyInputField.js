/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import 'rsuite/dist/rsuite.min.css';
import React, { useState } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import { css, ThemeProvider } from '@emotion/react';
import { DateRangePicker } from 'rsuite';
import KewordAddressModal from './KewordAddressModal';
import { theme } from '../../Styles/theme';
// import 'rsuite/dist/rsuite-rtl.css';

const Container = css`
  width: 100%;
  max-width: 280px;
  height: 356px;
  @media screen and (max-width: 767px) {
    max-width: 220px;
  }
  @media screen and (max-width: 479px) {
    max-width: none;
  }
  * {
    .rs-picker
      .rs-picker-menu
      .rs-picker-daterange
      .rs-picker-daterange-menu
      .rs-picker-daterange-panel
      .rs-stack
      .rs-stack-item
      .rs-picker-daterange-content
      .rs-picker-daterange-calendar-group {
      display: flex;
      flex-direction: column;
      height: auto;
    }
  }
`;

const InputContainer = css`
  /* width: 100%; */
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

export const categories = [
  { value: 'HEALTH', label: '운동/건강' },
  { value: 'LIFESTYLE', label: '라이프스타일' },
  { value: 'COOK', label: '요리' },
  { value: 'ART', label: '미술' },
  { value: 'CAREER', label: '커리어' },
  { value: 'HANDCRAFT', label: '공예' },
  { value: 'MEDIA', label: '사진/영상' },
  { value: 'MUSIC', label: '음악' },
  { value: 'LANGUAGE', label: '외국어' },
  { value: 'EDUCATION', label: '교육' },
  { value: 'FINANCE', label: '재테크' },
  { value: 'BUSINESS', label: '비즈니스' },
  { value: 'DEVELOPMENT', label: '개발' },
];

const StudyInputField = ({
  title,
  period,
  setPeriod,
  locationText,
  setLocationText,
  setLatitude,
  setLongitude,
  setAddress,
  setTitle,
  setCategory,
  category,
  capacity,
  setCapacity,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePeriodChange = pickDate => {
    setPeriod([pickDate[0], pickDate[1]]);
  };

  const handleLocationText = e => {
    setLocationText(e.target.value);
  };

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleCategory = e => {
    setCategory(e.target.value);
  };

  const handleCapacity = e => {
    setCapacity(e.target.value);
  };

  return (
    <div css={Container}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            '& > :not(style)': {
              m: 1,
              width: {
                mobile: 360,
                tablet: 290,
                laptop: 290,
                desktop: 290,
              },
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div css={InputContainer}>
            <TextField
              id="study-name"
              label="스터디 이름"
              variant="standard"
              name="title"
              placeholder="스터디 이름을 지어주세요"
              value={title || ''}
              onChange={handleTitle}
              sx={{
                width: {
                  mobile: 360,
                  tablet: 290,
                  laptop: 290,
                  desktop: 290,
                },
                maxWidth: '100%',
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // 기본 라벨, 포커스시 라벨 색상
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'black',
                },
              }}
            />
            <TextField
              id="study-category"
              select
              label="카테고리"
              variant="standard"
              name="category"
              value={category || ''}
              onChange={handleCategory}
              sx={{
                width: {
                  mobile: 360,
                  tablet: 290,
                  laptop: 290,
                  desktop: 290,
                },
                maxWidth: '100%',
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'black',
                },
              }}
            >
              {categories.map(option => (
                <MenuItem key={option.value} value={option.value || ''}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="study-location"
              type="button"
              onClick={handleOpen}
              label="스터디 위치"
              variant="standard"
              value={locationText || ''}
              onChange={handleLocationText}
              placeholder="클릭하면 주소 검색창이 나와요"
              sx={{
                width: {
                  mobile: 360,
                  tablet: 290,
                  laptop: 290,
                  desktop: 290,
                },
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
              value={capacity || ''}
              onChange={handleCapacity}
              sx={{
                width: {
                  mobile: 360,
                  tablet: 290,
                  laptop: 290,
                  desktop: 290,
                },
                maxWidth: '100%',
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'black',
                },
              }}
            />
            <div css={PeriodContainer}>
              <span>모집기간</span>
              <DateRangePicker
                format="yyyy-MM-dd hh:mm aa"
                placement="bottomEnd"
                // placement="topEnd"
                // showOneCalendar="true"
                preventOverflow
                showMeridian
                style={{ color: 'black' }}
                name="period"
                value={period}
                onChange={handlePeriodChange}
              />
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default StudyInputField;
