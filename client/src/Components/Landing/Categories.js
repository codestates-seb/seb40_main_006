/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from './Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    // border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: './img/category/exercise.jpg',
    title: '운동/건강',
    width: '35%',
  },
  {
    url: './img/category/lifestyle.jpg',
    title: '라이프스타일',
    width: '30%',
  },
  {
    url: './img/category/cooking.jpg',
    title: '요리',
    width: '35%',
  },
  {
    url: './img/category/art.jpg',
    title: '미술',
    width: '38%',
  },
  {
    url: './img/category/career.jpg',
    title: '커리어',
    width: '38%',
  },
  {
    url: './img/category/crafts.jpg',
    title: '공예',
    width: '24%',
  },
  {
    url: './img/category/photo.jpg',
    title: '사진/영상',
    width: '40%',
  },
  {
    url: './img/category/language.jpg',
    title: '외국어',
    width: '20%',
  },
  {
    url: './img/category/music.jpg',
    title: '음악',
    width: '40%',
  },
  {
    url: './img/category/investment.jpg',
    title: '재테크',
    width: '38%',
  },
  {
    url: './img/category/business.jpg',
    title: '비즈니스',
    width: '38%',
  },
  {
    url: './img/category/development.jpg',
    title: '개발',
    width: '24%',
  },
];

export default function Categories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map(image => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Link to="/category" style={{ color: 'white' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                }}
              >
                <Typography
                  component="h5"
                  variant="h6"
                  color="inherit"
                  className="imageTitle"
                >
                  {image.title}
                </Typography>
              </Box>
            </Link>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
