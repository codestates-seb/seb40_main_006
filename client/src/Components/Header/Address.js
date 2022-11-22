import { NestedMenuItem, IconMenuItem } from 'mui-nested-menu';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { palette } from '../../Styles/theme';
import getJuso from './getJuso';

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
  padding: 15px 10px;
`;
const NestedMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [cityList, setCityList] = useState([]);
  function getData(code) {
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      setCityList(data.regcodes.map(el => el.name));
    });
    // .then(codes => {
    // console.log(si);
    // si.forEach(el => setSi([...el.name]));
    // console.log(codes);
    // });
  }

  useEffect(() => {
    // '*00000000' 행정시
    // '11*000000' 서울 내 구 41 경기도
    // 1153*&is_ignore_zero=true
    getData('*00000000');
  }, []);

  useEffect(() => {
    console.log(cityList);
  }, [cityList]);

  return (
    <div className={addressContainer}>
      <button className={addressBtn} onClick={handleClick} type="button">
        <p>동네 선택</p>
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {cityList.map(el => (
          <NestedMenuItem label={el} parentMenuOpen={open}>
            <MenuItem onClick={handleClose}>{el}</MenuItem>
          </NestedMenuItem>
        ))}
        <NestedMenuItem label="Top Level" parentMenuOpen={open}>
          <MenuItem onClick={handleClose}>Standard Menu Item!</MenuItem>
          <IconMenuItem onClick={handleClose} label="Icon Menu Item" />
          <NestedMenuItem label="Go deeper!" parentMenuOpen={open}>
            <MenuItem onClick={handleClose}>Standard Menu Item!</MenuItem>
            <IconMenuItem onClick={handleClose} label="Icon Menu Item" />
          </NestedMenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  );
};

export default NestedMenu;
