import React from 'react';
import { useRecoilState } from 'recoil';
import { Grid } from '@mui/material/';
import JoinJamCard from './JoinJamCard';
import { myPageInfoState } from '../../Atom/atoms';

const JoinJams = () => {
  const [userInfo] = useRecoilState(myPageInfoState);

  return (
    <div>
      참여한 잼
      {userInfo.myJamList.map(jam => (
        <Grid item key={jam}>
          <JoinJamCard />
        </Grid>
      ))}
    </div>
  );
};

export default JoinJams;
