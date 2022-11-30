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
    <div className="jamContainer">
      <Card className="card">
        <CardMedia
          component="img"
          className="cardMedia"
          image="../img/back2.jpg"
          alt="img"
          sx={{ width: '25%' }}
        />
        <CardActions className="cardActions">
          <div className="title">{jamInfo[0].joinJamList[0].title}</div>
          <div className="info">
            <div>
              <img src="../img/userTime.png" alt="시간" />
              <span>
                {jamElapsedTime(jamInfo[0].joinJamList[0].createdTime)}
              </span>
            </div>
            <div>
              <img src="../img/userInitImg.png" alt="모집인원" />
              <span>{jamInfo[0].joinJamList[0].capacity}</span>
            </div>
            <div>
              <img src="../img/userLocation.png" alt="위치" />
              <span>{jamInfo[0].joinJamList[0].location}</span>
            </div>
          </div>
        </CardActions>
      </Card>
      <Button size="small" className="cardBtn">
        {!jamInfo[0].joinJamList[0].complete ? '모집완료' : '모집중'}
      </Button>
    </div>
  );
};

export default JoinJamCard;
