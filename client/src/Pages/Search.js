import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { IconButton } from '@material-ui/core';
import { MdArrowBackIosNew } from 'react-icons/md';
import { palette } from '../Styles/theme';

const SearchContainer = styled('div')(({ theme }) => ({
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

const container = css`
  display: flex;
`;

const searchBar = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette.gray_4};
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
  margin-right: 20px;
  flex-grow: 1;
`;
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
      <SearchContainer>
        <SearchIconWrapper>
          <BiSearch />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleSearch}
          placeholder="제목이나 내용으로 검색해보세요!"
          inputProps={{ 'aria-label': 'search' }}
          onClick={() => sessionStorage.clear()}
          autoFocus
        />
      </SearchContainer>
    </form>
  );
};
const backBtn = css`
  display: flex;
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
    </div>
  );
};
const Search = () => {
  return (
    <nav className={container}>
      <BackBtn />
      <SearchBar />
    </nav>
  );
};

export default Search;
