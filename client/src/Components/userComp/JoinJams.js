import React from 'react';
import { Grid } from '@mui/material/';
import JamCard from './JamCard';

const JoinJams = () => {
  const joinJams = [1, 2, 3, 4, 5];

  return (
    <div>
      참여한 잼
      {joinJams.map(jam => (
        <Grid item key={jam}>
          <JamCard />
        </Grid>
      ))}
    </div>
  );
};

export default JoinJams;
