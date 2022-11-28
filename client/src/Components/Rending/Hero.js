import * as React from 'react';
import Btn from './Btn';
import Typography from './Typography';
import ProductHeroLayout from './HeroLayout';

const backgroundImage = './img/back2.jpg';

export default function Hero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        // backgroundColor: palette.colorMain,
        backgroundPosition: 'center',
        height: '100%',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h3">
        위치기반 스터디, 잼잇
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h6"
        sx={{ mb: 10, mt: { sx: 4, sm: 4 } }}
      >
        강의실을 떠나 함께 학습하고 교류하는 경험을 통해 새로운 가치를
        찾아보세요
      </Typography>
      <Btn
        color="warning"
        variant="contained"
        size="large"
        component="a"
        href="/home"
        sx={{ minWidth: 150 }}
      >
        시작하기
      </Btn>
    </ProductHeroLayout>
  );
}
