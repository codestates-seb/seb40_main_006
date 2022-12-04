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

function Values() {
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
                alt="jam"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, fontWeight: 700 }}>
                잼에 참여하세요
              </Typography>
              <Typography variant="h6">
                위치기반 검색 시스템을 활용해 스터디에 참가하세요
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
                잼을 개설하세요
              </Typography>
              <Typography variant="h6">
                내가 원하는 위치에 스터디를 개설하세요
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
                잼을 선물하세요
              </Typography>
              <Typography variant="h6">
                점수가 높을수록 색이 진해집니다. 잼을 선물해 유저를 평가하세요
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Values;
