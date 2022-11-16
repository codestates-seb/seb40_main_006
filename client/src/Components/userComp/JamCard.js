import React from 'react';
import { Card, CardMedia, CardActions, Button } from '@mui/material/';

const JamCard = () => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        image="https://source.unsplash.com/random"
        alt="random"
        sx={{ width: '30%' }}
      />
      <CardActions className="cardActions">
        <div className="title">제목제목제목제목제목제목제목</div>
        <div className="info">
          <div>시간</div>
          <div>모집인원</div>
          <div>위치</div>
        </div>
      </CardActions>
      <Button size="small" className="cardBtn">
        모집상태
      </Button>
    </Card>
  );
};

export default JamCard;
