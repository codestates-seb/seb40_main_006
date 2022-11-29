import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import { palette } from '../../Styles/theme';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function Works() {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        overflow: 'hidden',
        bgcolor: `${palette.colorwhite}`,
      }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        {/* <Box
          component="img"
          src="./img/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        /> */}
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="./img/borderJam.png"
                alt="jam"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, fontWeight: 700 }}>
                스터디 잼
              </Typography>
              <Typography variant="h6">
                모집 기간이 지나면 자동으로 종료됩니다.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="./img/borderJam.png"
                alt="jam"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, fontWeight: 700 }}>
                실시간 잼
              </Typography>
              <Typography variant="h6">
                당일 자정이 지나면 자동으로 종료됩니다.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="./img/borderJam.png"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, fontWeight: 700 }}>
                신고
              </Typography>
              <Typography variant="h6">
                유저 신고 기능은 추후 도입 예정입니다.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Works;
