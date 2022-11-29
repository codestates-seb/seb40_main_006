import React from 'react';
import { Grid } from '@mui/material/';
import { useRecoilState } from 'recoil';
import { myPageInfoState } from '../../Atom/atoms';
import OpenJamCard from './OpenJamCard';

const OpenJams = () => {
  const [userInfo] = useRecoilState(myPageInfoState);

  return (
    <div className="container">
      개설한 잼
      {userInfo.createJamList.map(jam => (
        <Grid item key={jam}>
          <OpenJamCard />
        </Grid>
      ))}
    </div>
  );
};

export default OpenJams;
