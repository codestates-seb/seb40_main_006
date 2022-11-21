/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import React from 'react';
import { Card, CardMedia, CardActions, Button } from '@mui/material/';
import { useRecoilState } from 'recoil';
import { myPageInfoState } from '../../Atom/atoms';
import jamElapsedTime from './JamElapsedTime';

const JoinJamCard = () => {
  const jamInfo = useRecoilState(myPageInfoState);

  return (
    <Card className="card">
      <CardMedia
        component="img"
        image="https://source.unsplash.com/random"
        alt="random"
        sx={{ width: '30%' }}
      />
      <CardActions className="cardActions">
        <div className="title">{jamInfo[0].myJamList[0].title}</div>
        <div className="info">
          <div>
            <img src="./img/userTime.png" alt="시간" />
            {jamElapsedTime(jamInfo[0].myJamList[0].createdTime)}
          </div>
          <div>
            <img src="./img/userInitImg.png" alt="모집인원" />
            {jamInfo[0].myJamList[0].capacity}
          </div>
          <div>
            <img src="./img/userLocation.png" alt="위치" />
            {jamInfo[0].myJamList[0].location}
          </div>
        </div>
      </CardActions>
      <Button size="small" className="cardBtn">
        {!jamInfo[0].myJamList[0].complete ? '모집완료' : '모집중'}
      </Button>
    </Card>
  );
};

export default JoinJamCard;
