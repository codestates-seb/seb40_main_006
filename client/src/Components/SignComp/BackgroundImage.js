import React from 'react';
import { CssBaseline, Grid } from '@mui/material/';

const BackgroundImage = () => {
  return (
    <>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={3}
        md={7}
        sx={{
          backgroundImage: 'url(./img/back1.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: t =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </>
  );
};

export default BackgroundImage;
