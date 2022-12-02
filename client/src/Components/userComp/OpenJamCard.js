/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Card, CardMedia, CardActions, Button } from '@mui/material/';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { myPageInfoState } from '../../Atom/atoms';
import jamElapsedTime from './JamElapsedTime';

const OpenJamCard = ({ jamId }) => {
  const jamInfo = useRecoilState(myPageInfoState);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/jamdetail/${jamId}`);
  };

  return (
    <div className="jamContainer" onClick={clickHandler}>
      <Card className="card">
        <CardMedia
          component="img"
          image="../img/back2.jpg"
          alt="random"
          sx={{ width: '25%' }}
        />
        <CardActions className="cardActions">
          <div className="title">{jamInfo[0].createJamList[0].title}</div>
          <div className="info">
            <div>
              <img src="../img/userTime.png" alt="시간" />
              {jamElapsedTime(jamInfo[0].createJamList[0].createdTime)}
            </div>
            <div>
              <img src="../img/userInitImg.png" alt="모집인원" />
              {jamInfo[0].createJamList[0].capacity}
            </div>
            <div>
              <img src="../img/userLocation.png" alt="위치" />
              {jamInfo[0].createJamList[0].location}
            </div>
          </div>
        </CardActions>
      </Card>
      <Button size="small" className="cardBtn">
        {!jamInfo[0].createJamList[0].complete ? '모집완료' : '모집중'}
      </Button>
    </div>
  );
};

export default OpenJamCard;
