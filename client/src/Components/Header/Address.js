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

  useEffect(() => {
    // '*00000000' 행정시
    // '11*000000' 서울 내 구 41 경기도
    // 1153*&is_ignore_zero=true
    /*
    '*00000000', // 대한민국의 모든 특별/광역시, 도 반환
    '11*', // 서울시 소속 모든 구, 동 반환
    '11*000000', // 서울시 소속 모든 구 반환
    '1153*', // 구로구를 포함한 구로구의 모든 동 반환
    '1153*&is_ignore_zero=true', // 구로구의 모든 동만 반환
    */
    getCityData('*00000000');
  }, []);

  useEffect(() => {
    // console.log(dongList);
  }, [dongList]);
  return (
    <div className={addressContainer}>
      <button className={addressBtn} onClick={handleClick} type="button">
        <p>동네 선택</p>
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {cityList.map(el => (
          <NestedMenuItem
            label={el.name}
            parentMenuOpen={open}
            onMouseOver={() => getGuData(el.code)}
          >
            {guList.map(gu => (
              <NestedMenuItem
                label={gu.name.split(' ')[1]}
                parentMenuOpen={open}
                onMouseOver={() => getDongData(gu.code)}
              >
                {dongList.map(dong => (
                  <MenuItem onClick={handleClose}>
                    {dong.name.split(' ')[2]}
                  </MenuItem>
                ))}
              </NestedMenuItem>
            ))}
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
