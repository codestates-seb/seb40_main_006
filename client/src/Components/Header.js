import { css } from '@emotion/css';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import palette from '../Styles/theme';
import logoImage from '../Assets/images/logo_header.png';

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
  margin-left: 10px;
`;
// address
const addressArea = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
  padding: 20px;
`;
const address = css`
  background-color: ${palette.gray_4};
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  padding: 15px 10px;
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
// const searchInput = css`
//   background-color: transparent;
//   border-radius: 10px;
//   border-width: 0px;
//   width: 100%;
//   padding: 15px 10px;
// `;
// login
const loginArea = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
`;
// const loginBtn = css`
//   border-radius: 10px;
//   padding: 15px 40px;
//   background-color: ${palette.gray_5};
//   cursor: pointer;
// `;

// logout
const createJamBtn = css`
  border-radius: 10px;
  padding: 15px 40px;
  background-color: ${palette.colorMain};
  cursor: pointer;
  margin: 0 10px;
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

const SearchBar = () => {
  return (
    <div className={searchBar}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="제목이나 내용, 유저이름으로 검색해보세요!"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </div>
  );
};

const Address = () => {
  return (
    <div className={addressArea}>
      <div className={address}>주소 선택 영역</div>
    </div>
  );
};

// const LoginArea = () => {
//   return (
//     <div className={loginArea}>
//       <button type="button" className={loginBtn}>
//         로그인{' '}
//       </button>
//     </div>
//   );
// };

const LogoutArea = () => {
  return (
    <div className={loginArea}>
      <button type="button" className={createJamBtn}>
        잼 만들기{' '}
      </button>
      <div className={username}>유저이름님</div>
      <AccountCircleIcon fontSize="large" />
    </div>
  );
};

const Header = () => {
  // const [isLogin, setIsLogin] = useState(false);

  // const onLoginBtnClick = () => {
  //   console.log('버튼클릭');
  //   setIsLogin(!isLogin);
  //   console.log(isLogin);
  // };

  return (
    <div className={header}>
      <img className={logo} alt="logo_jamit" src={logoImage} />
      <Address />
      <SearchBar />
      {/* <LoginArea /> */}
      <LogoutArea />
      {/* {!isLogin ? <LoginArea /> : <LogoutArea />} */}
    </div>
  );
};

export default Header;
