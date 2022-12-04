import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material';
import { useRecoilState } from 'recoil';
import { theme } from '../../Styles/theme';
import { totalJamLength, pageNumber } from '../../Atom/atoms';

export default function JamPagination() {
  const [totalJamCount] = useRecoilState(totalJamLength);
  const [, setNextPage] = useRecoilState(pageNumber);
  const handlePageClick = e => {
    const nowPageNum = Number(e.target.outerText);
    console.log(nowPageNum);
    setNextPage(nowPageNum);
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination
          count={totalJamCount}
          color="primary"
          onClick={handlePageClick}
        />
      </Stack>
    </ThemeProvider>
  );
}
