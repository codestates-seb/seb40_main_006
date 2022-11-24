import * as React from 'react';
import { css } from '@emotion/css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { palette } from '../../Styles/theme';
import getJuso from './getJuso';
import { location } from '../../Atom/atoms';

const addressContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
  padding: 20px;
`;
const addressBtn = css`
  background-color: ${palette.gray_4};
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  padding: 15px 30px;
`;

export default function AddressDialog() {
  const [open, setOpen] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [gu, setGu] = React.useState('');
  const [dong, setDong] = React.useState('');

  const [cityList, setCityList] = useState([]);
  const [guList, setGuList] = useState([]);
  const [dongList, setDongList] = useState([]);

  // 대한민국의 모든 특별/광역시, 도 반환
  function getCityData(code) {
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      setCityList(data.regcodes);
    });
  }
  // 선택한 시(cityCode) 소속의 모든 구 반환
  function getGuData(cityCode) {
    const code = cityCode.slice(0, 2).concat('*000000');
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      setGuList(data.regcodes.slice(1));
    });
  }
  // 선택한 구(guCode)의 모든 동 반환
  function getDongData(guCode) {
    const code = guCode.slice(0, 4).concat('*&is_ignore_zero=true');
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      setDongList(data.regcodes);
    });
  }

  const handleCityClick = e => {
    console.log(e.target.value); // 입력받은 시/도 이름
    const cityCode = cityList.filter(el => el.name === e.target.value)[0].code;
    console.log(cityCode);
    getGuData(cityCode); // 시/도 이름에 맞는 구 코드 찾아서 요청받아오기
  };
  const handleGuClick = e => {
    console.log(e.target.value); // 입력받은 시/군/구 이름
    const guCode = guList.filter(
      el => el.name.split(' ')[1] === e.target.value,
    )[0].code;
    console.log(guCode);
    getDongData(guCode); // 구 이름에 맞는 읍/면/동 코드 찾아서 요청받아오기
  };
  const handleDongClick = e => {
    console.log(e.target.value); // 입력받은 동 이름
    const target = e.target.value;
    const dongCode = dongList.filter(
      target[target.length - 1] === '리'
        ? el => el.name.split(' ')[3] === e.target.value
        : el => el.name.split(' ')[2] === e.target.value,
    )[0].code;
    console.log(dongCode);
    getDongData(dongCode); // 구 이름에 맞는 동 코드 찾아서 요청받아오기
  };
  const handleCityChange = event => {
    setCity(event.target.value || '');
    handleCityClick(event);
  };
  const handleGuChange = event => {
    setGu(event.target.value || '');
    handleGuClick(event);
  };
  const handleDongChange = event => {
    setDong(event.target.value || '');
    handleDongClick(event);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [, setCurrentLocation] = useRecoilState(location);

  const onSubmit = () => {
    setCurrentLocation(`${city} ${gu} ${dong}`);
    handleClose();
  };

  useEffect(() => {
    getCityData('*00000000'); // 대한민국의 모든 특별/광역시, 도 반환
  }, []);

  // useEffect(() => {
  //   console.log(currentLocation);
  // }, [currentLocation]);
  return (
    <div className={addressContainer}>
      <button className={addressBtn} onClick={handleClickOpen} type="button">
        동네 선택
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>동네를 선택해주세요!</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">시/도</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                defaultValue=""
                value={city}
                onChange={handleCityChange}
                input={<OutlinedInput label="시/도" />}
              >
                {cityList.map(el => (
                  <MenuItem key={el.code} value={el.name}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">시/군/구</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                defaultValue=""
                value={gu}
                onChange={handleGuChange}
                input={<OutlinedInput label="시/군/구" />}
              >
                {guList.map(el => (
                  <MenuItem key={el.code} value={el.name.split(' ')[1]}>
                    {el.name.split(' ')[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">읍/면/동</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                defaultValue=""
                value={dong}
                onChange={handleDongChange}
                input={<OutlinedInput label="동/면/읍" />}
              >
                {dongList.map(el => (
                  <MenuItem
                    key={el.code}
                    value={
                      (el.name.split(' ')[2][
                        el.name.split(' ')[2].length - 1
                      ] === '면' ||
                        el.name.split(' ')[2][
                          el.name.split(' ')[2].length - 1
                        ] === '읍') &&
                      el.name.split(' ')[3]
                        ? el.name.split(' ')[3]
                        : el.name.split(' ')[2]
                    }
                  >
                    {(el.name.split(' ')[2][
                      el.name.split(' ')[2].length - 1
                    ] === '면' ||
                      el.name.split(' ')[2][
                        el.name.split(' ')[2].length - 1
                      ] === '읍') &&
                    el.name.split(' ')[3]
                      ? el.name.split(' ')[3]
                      : el.name.split(' ')[2]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={onSubmit}>변경</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
