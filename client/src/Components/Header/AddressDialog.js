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
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { palette, theme } from '../../Styles/theme';
import getJuso from './getJuso';
import { location, locationChanged } from '../../Atom/atoms';

const addressContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
  padding: 20px;
  white-space: nowrap;
  @media screen and (max-width: 767px) {
    margin: 10px 0px;
    padding: 0px;
  }
`;
const addressBtn = css`
  background-color: ${palette.gray_4};
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  padding: 15px 30px;
  @media screen and (max-width: 767px) {
    margin: 0px;
    padding: 0px;
    background-color: transparent;
    font-weight: bold;
  }
`;

export default function AddressDialog() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('');
  const [gu, setGu] = useState('');
  const [dong, setDong] = useState('');

  const [cityList, setCityList] = useState([]);
  const [guList, setGuList] = useState([]);
  const [dongList, setDongList] = useState([]);

  const navigate = useNavigate();

  function getCityData(code) {
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      setCityList(data.regcodes);
    });
  }
  function getGuData(cityCode) {
    const code = cityCode.slice(0, 2).concat('*00000');
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      setGuList(data.regcodes.slice(1));
    });
  }
  function getDongData(guCode) {
    const code = guCode.slice(0, 5).concat('*&is_ignore_zero=true');
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      setDongList(data.regcodes);
    });
  }

  const handleCityClick = e => {
    const cityCode = cityList.filter(el => el.name === e.target.value)[0].code;
    getGuData(cityCode);
  };
  const handleGuClick = e => {
    const guCode = guList.filter(
      el => el.name.slice(city.length) === e.target.value,
    )[0].code;
    getDongData(guCode);
  };
  const handleDongClick = e => {
    const dongCode = dongList.filter(
      el => el.name.slice(city.length + gu.length) === e.target.value,
    )[0].code;
    getDongData(dongCode);
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
    navigate('/home');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [currentLocation, setCurrentLocation] = useRecoilState(location);
  const [, setIsUserLocationChanged] = useRecoilState(locationChanged);
  const [currentWidth, setCurrentWidth] = useState(1024);
  const onSubmit = () => {
    setCurrentLocation(`${city} ${gu} ${dong}`);
    setIsUserLocationChanged(true);
    handleClose();
  };

  useEffect(() => {
    getCityData('*00000000');
  }, []);

  useEffect(() => {
    setCurrentWidth(window.innerWidth);
  }, [window.innerWidth]);
  return (
    <div className={addressContainer}>
      <button className={addressBtn} onClick={handleClickOpen} type="button">
        {currentWidth > 767 ? '동네선택' : currentLocation} ▾
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>동네를 선택해주세요!</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ThemeProvider theme={theme}>
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
                    <MenuItem key={el.code} value={el.name.slice(city.length)}>
                      {el.name.slice(city.length)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">
                  읍/면/동/리
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  defaultValue=""
                  value={dong}
                  onChange={handleDongChange}
                  input={<OutlinedInput label="읍/면/동/리" />}
                >
                  {dongList.map(el => (
                    <MenuItem
                      key={el.code}
                      value={el.name.slice(city.length + gu.length)}
                    >
                      {el.name.slice(city.length + gu.length)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ThemeProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <ThemeProvider theme={theme}>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={onSubmit}>변경</Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}
