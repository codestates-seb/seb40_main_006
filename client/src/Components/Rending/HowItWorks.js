import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// import Btn from './Btn';
import Typography from './Typography';
import { palette } from '../../Styles/theme';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  fontWeight: 'medium',
  marginBottom: 2,
};

// const image = {
//   height: 55,
//   my: 4,
// };

function HowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: `${palette.white}`, overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 30,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography
          variant="h4"
          component="h2"
          sx={{ color: palette.colorTitle, mb: 10 }}
        >
          규칙
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1. 스터디 잼</Box>
                {/* <Box
                  component="img"
                  src="/static/themes/onepirate/productHowItWorks1.svg"
                  alt="suitcase"
                  sx={image}
                /> */}
                <Typography variant="h6" align="center">
                  모집 기간이 지나면 자동으로 종료됩니다.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2. 실시간 잼 </Box>
                {/* <Box
                  component="img"
                  src="/static/themes/onepirate/productHowItWorks2.svg"
                  alt="graph"
                  sx={image}
                /> */}
                <Typography variant="h6" align="center">
                  g당일 자정이 지나면 자동으로 종료됩니다.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3. 신고</Box>
                {/* <Box
                  component="img"
                  src="/static/themes/onepirate/productHowItWorks3.svg"
                  alt="clock"
                  sx={image}
                /> */}
                <Typography variant="h6" align="center">
                  유저 신고 기능은 추후 도입 예정입니다.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default HowItWorks;
