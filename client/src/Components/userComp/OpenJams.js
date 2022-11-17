import React from 'react';
import { Grid } from '@mui/material/';
import JamCard from './JamCard';

const OpenJams = () => {
  const openJams = [1, 2, 3];

  return (
    <div>
      개설한 잼
      {openJams.map(jam => (
        <Grid item key={jam}>
          <JamCard />
        </Grid>
      ))}
    </div>
  );
};

export default OpenJams;
