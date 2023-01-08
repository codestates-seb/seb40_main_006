import { css } from '@emotion/css';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useRecoilState } from 'recoil';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Avatar } from '@mui/material/';
import { MdArrowBackIosNew } from 'react-icons/md';
import { IconButton } from '@material-ui/core';
import { BiSearch } from 'react-icons/bi';
import { palette } from '../../Styles/theme';
import logoImage from '../../Assets/images/logo_header.png';
import AddressDialog from './AddressDialog';
import AccountMenu from './AccountMenu';
import { isLoginState, loginUserInfoState } from '../../Atom/atoms';
import MenuDrawer from './MenuDrawer';

const headerBox = css`
  height: 100px;
  @media screen and (max-width: 767px) {
    height: 70px;
  }
`;
const header = css`
  padding: 10px 40px 10px 30px;
  display: flex;
  background-color: white;
  width: 100vw;
  height: 100px;
  border-bottom: 0.5px ${palette.border} solid;
  position: fixed;
  z-index: 10;
  @media screen and (max-width: 767px) {
    padding: 10px;
    height: 70px;
  }
`;

const backBtn = css`
  display: none;
  @media screen and (max-width: 767px) {
    display: flex;
  }
`;

const logo = css`
  margin-left: 10px;
  width: 130px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const searchBar = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette.gray_4};
  border-radius: 10px;
  padding: 20px;
  margin: 15px 10px;
  flex-grow: 1;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const rightHeader = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  white-space: nowrap;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const loginBtn = css`
  border-radius: 10px;
  padding: 15px 40px;
  background-color: ${palette.gray_5};
  cursor: pointer;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const avataBtn = css`
  display: none;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const createJamBtn = css`
  border-radius: 10px;
  padding: 15px 40px;
  background-color: ${palette.colorMain};
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
  &:hover {
    background-color: ${palette.colorAccent};
    color: ${palette.white};
  }
`;
const username = css`
  margin: 10px;
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: (theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: (theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchContainer = css`
  display: none;
  @media screen and (max-width: 767px) {
    display: flex;
    height: 100%;
  }
`;

const drawerContainer = css`
  display: none;
  @media screen and (max-width: 767px) {
    display: flex;
    height: 100%;
  }
`;

const AddressDialogContainer = css`
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
`;

const marginBtn = css`
  width: 42px;
  height: auto;
`;
const BackBtn = () => {
  const navigate = useNavigate();
  const handleBackBtnClick = () => {
    navigate(-1);
  };
  return (
    <div className={backBtn}>
      <IconButton aria-label="back" onClick={handleBackBtnClick}>
        <MdArrowBackIosNew fontSize="large" />
      </IconButton>
      <div className={marginBtn} />
    </div>
  );
};
const CityBtn = () => {
  return (
    <div className={AddressDialogContainer}>
      <AddressDialog />
    </div>
  );
};

const SearchBtn = () => {
  const navigate = useNavigate();
  const handleSearchBtnClick = () => {
    navigate('/search');
  };
  return (
    <div className={SearchContainer}>
      <IconButton aria-label="search" onClick={handleSearchBtnClick}>
        <BiSearch />
      </IconButton>
    </div>
  );
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const handleSearch = e => {
    setSearchText(e.target.value);
  };

  const handleSubmit = () => {
    sessionStorage.setItem('searchText', searchText);
    navigate('/category');
  };

  return (
    <form className={searchBar} onSubmit={handleSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleSearch}
          placeholder="제목이나 내용으로 검색해보세요!"
          inputProps={{ 'aria-label': 'search' }}
          onClick={() => sessionStorage.clear()}
        />
      </Search>
    </form>
  );
};

const LoginArea = () => {
  return (
    <div className={rightHeader}>
      <Link to="/login">
        {' '}
        <div className={avataBtn}>
          <Avatar sx={{ width: 32, height: 32 }} />
        </div>
        <button type="button" className={loginBtn}>
          로그인{' '}
        </button>
      </Link>
    </div>
  );
};

const LogoutArea = () => {
  const [user] = useRecoilState(loginUserInfoState);

  const handleReload = () => {
    // eslint-disable-next-line no-restricted-globals
    location.replace('/jammake');
  };

  return (
    <div className={rightHeader}>
      <button type="button" className={createJamBtn} onClick={handleReload}>
        잼 만들기{' '}
      </button>
      <div className={username}>{user.nickname}님</div>
      <AccountMenu />
    </div>
  );
};

const Drawer = () => {
  return (
    <div className={drawerContainer}>
      <IconButton aria-label="back">
        <MenuDrawer fontSize="large" />
      </IconButton>
    </div>
  );
};

const Header = () => {
  const [isLogin] = useRecoilState(isLoginState);
  const locationNow = useLocation();
  if (locationNow.pathname === '/search') return null;
  return (
    <div className={headerBox}>
      <div className={header}>
        <Link to="/" onClick={() => sessionStorage.clear}>
          <img className={logo} alt="logo_jamit" src={logoImage} />
        </Link>
        <BackBtn />
        <CityBtn />
        <SearchBar />
        <SearchBtn />
        {!isLogin ? <LoginArea /> : <LogoutArea />}
        <Drawer />
      </div>
    </div>
  );
};

export default Header;
