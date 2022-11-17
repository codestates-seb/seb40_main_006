import React from 'react';
import { Avatar } from '@mui/material/';

const AvatarImg = () => {
  return (
    <Avatar sx={{ bgcolor: 'white' }}>
      <img style={{ width: '30px' }} src="./img/orangeJam.png" alt="jamIcon" />
    </Avatar>
  );
};

export default AvatarImg;
