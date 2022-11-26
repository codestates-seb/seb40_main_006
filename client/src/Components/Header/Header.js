import { css } from '@emotion/css';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { palette } from '../../Styles/theme';
import logoImage from '../../Assets/images/logo_header.png';
import AddressDialog from './AddressDialog';
import AccountMenu from './AccountMenu';
import { isLoginState } from '../../Atom/atoms';

const header = css`
  padding: 10px 40px 10px 30px;
  display: flex;
  background-color: white;
  width: 100%;
  height: 100px;
  border-bottom: 0.5px ${palette.border} solid;
`;
// logo
const logo = css`
  width: 130px;
  cursor: pointer;
`;

// search
const searchBar = css`
  display: flex;
  align-items: center;
  background-color: ${palette.gray_4};
  border-radius: 10px;
  padding: 20px;
  margin: 15px 10px;
  flex-grow: 1;
`;
// 유저 로그인 파트
const rightHeader = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
`;

// logout
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

// const [searchText, setSearchText] = useState('');
const handleSearch = e => {
  console.log(e.target.value);
  // setSearchText(e.target.value);
  // console.log(searchText);
};
const SearchBar = () => {
  return (
    <form className={searchBar}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleSearch}
          // value={searchText}
          placeholder="제목이나 내용으로 검색해보세요!"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </form>
  );
};

// eslint-disable-next-line react/prop-types
const LoginArea = ({ clickHandler }) => {
  return (
    <div className={rightHeader}>
      <button type="button" className={clickHandler} onClick={clickHandler}>
        로그인
      </button>
    </div>
  );
};

const LogoutArea = () => {
  return (
    <div className={rightHeader}>
      <button type="button" className={createJamBtn}>
        잼 만들기{' '}
      </button>
      <div className={username}>유저이름님</div>
      <AccountMenu />
    </div>
  );
};

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  // const [isAddressClick, setIsAddressClick] = useState(false);
  const clickHandler = () => {
    setIsLogin(true);
  };

  return (
    <div className={header}>
      <Link to="/">
        <img className={logo} alt="logo_jamit" src={logoImage} />
      </Link>
      <AddressDialog />
      <SearchBar />
      {!isLogin ? <LoginArea clickHandler={clickHandler} /> : <LogoutArea />}
    </div>
  );
};

export default Header;
