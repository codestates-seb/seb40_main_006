/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi';

const Container = css`
  overflow: hidden;
`;

const SliderStyle = styled(Slider)`
  .slick-slider {
    /* height: 100%; */
  }
  /* position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  } */
  .slick-list {
    width: 560px;
    height: 275px;
    object-fit: cover;
    border-radius: 3px;
  }

  .slick-slide div {
    outline: none;
    width: 560px;
    height: 150px;
  }
  .slick-slide img {
    width: 100%;
    /* height: 100%; */
    object-fit: cover;
  }
  .slick-dots {
    bottom: -30px;
    .slick-active {
      button::before {
        color: #455d7a;
      }
    }
  }
  .slick-arrow {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 50px;
    z-index: 99;
    ::before {
      display: flex;
      justify-content: center;
      align-items: center;
      /* background-color: rgba(230, 230, 230, 0); */
    }
  }
`;

// const SliderStyle = css`
//   height: 260px;
//   width: 100%;
//   position: relative;
//   .slick-prev::before,
//   .slick-next::before {
//     opacity: 0;
//     display: none;
//   }
//   .slick-slide div {
//     //슬라이더  컨텐츠
//     cursor: pointer;
//   }
// `;

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={`slick-prev slick-arrow${
      currentSlide === 0 ? ' slick-disabled' : ''
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === 0}
    type="button"
    style={{
      display: 'block',
      background: 'rgba(180, 180, 180, 0)',
      transform: 'scale(1.5)',
      top: '130px',
    }}
  >
    Previous
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={`slick-next slick-arrow${
      currentSlide === slideCount - 1 ? ' slick-disabled' : ''
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1}
    type="button"
    style={{
      display: 'block',
      background: 'rgba(180, 180, 180, 0)',
      transform: 'scale(1.5)',
      top: '130px',
    }}
  >
    Next
  </button>
);

const JamCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
  };

  return (
    <div css={Container}>
      <SliderStyle {...settings}>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2022/11/02/04/07/deer-7563934_640.jpg"
            alt="deer"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2022/10/21/08/39/cat-7536508__340.jpg"
            alt="cat"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2022/11/13/20/29/town-7590138__340.jpg"
            alt="nightfestival"
          />
        </div>
      </SliderStyle>
    </div>
  );
};

export default JamCarousel;
