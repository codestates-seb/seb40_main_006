import React from 'react';
import { useRecoilState } from 'recoil';
import { Grid } from '@mui/material/';
import JoinJamCard from './JoinJamCard';
import { myPageInfoState } from '../../Atom/atoms';

const JoinJams = () => {
  const [userInfo] = useRecoilState(myPageInfoState);

  return (
    <div className="container">
      참여한 잼
      {userInfo.joinJamList.map(jam => (
        <Grid item key={jam}>
          <JoinJamCard jamId={jam.jamId} />
        </Grid>
      ))}
    </div>
  );
};

export default JoinJams;
