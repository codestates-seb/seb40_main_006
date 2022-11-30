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
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="./img/borderJam.png"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, fontWeight: 700 }}>
                위치기반서비스
              </Typography>
              <Typography variant="h6">
                내가 원하는 위치를 선택할 수 있습니다
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
                스터디 잼
              </Typography>
              <Typography variant="h6">
                정기 스터디를 모집할 수 있습니다
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
                당일 스터디를 모집할 수 있습니다
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Works;
