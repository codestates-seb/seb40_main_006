import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material';
import { useRecoilState } from 'recoil';
import { theme } from '../../Styles/theme';
import { totalPageNumber, pageNumber } from '../../Atom/atoms';

export default function JamPagination() {
  const [totalPage] = useRecoilState(totalPageNumber);
  const [pageNum, setNextPage] = useRecoilState(pageNumber);
  React.useEffect(() => {}, [pageNum, totalPage]);
  const handlePageClick = e => {
    if (e.target.dataset.testid === 'NavigateNextIcon')
      setNextPage(pageNum + 1);
    else if (e.target.dataset.testid === 'NavigateBeforeIcon')
      setNextPage(pageNum - 1);
    else {
      const nowPageNum = Number(e.target.outerText);
      setNextPage(nowPageNum);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination
          count={totalPage}
          color="primary"
          onClick={handlePageClick}
        />
      </Stack>
    </ThemeProvider>
  );
}
