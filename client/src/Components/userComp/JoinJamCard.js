/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import React from 'react';
import { Card, CardMedia, CardActions, Button } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
// import jamElapsedTime from './JamElapsedTime';

const JoinJamCard = ({ jamId, jam }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/jamdetail/${jamId}`);
  };

  return (
    <div className="jamContainer" onClick={clickHandler}>
      <Card className="card">
        <CardMedia
          component="img"
          className="cardMedia"
          image={jam.image ? jam.image : '../img/back2.jpg'}
          alt="img"
          sx={{ width: '25%' }}
        />
        <CardActions className="cardActions">
          <div className="title">{jam.title}</div>
          <div className="info">
            <div>
              <img src="../img/userTime.png" alt="시간" />
              {/* <span>{jamElapsedTime(jam.createdTime)}</span> */}
              <span>{jam.realTime ? '실시간' : '스터디'}</span>
            </div>
            <div>
              <img src="../img/userInitImg.png" alt="모집인원" />
              <span>
                {jam.currentPpl}/{jam.capacity}
              </span>
            </div>
            <div>
              <img src="../img/userLocation.png" alt="위치" />
              <span>{jam.location}</span>
            </div>
          </div>
        </CardActions>
      </Card>
      <Button size="small" className="cardBtn">
        {!jam.complete ? '모집완료' : '모집중'}
      </Button>
    </div>
  );
};

export default JoinJamCard;
