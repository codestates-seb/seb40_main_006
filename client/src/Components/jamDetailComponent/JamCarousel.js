/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = css`
  overflow: hidden;
`;

const SliderStyle = styled(Slider)`
  object-fit: cover;
  .slick-list {
    width: 560px;
    height: 275px;
    object-fit: cover;
    border-radius: 3px;
  }

  .slick-slide div {
    outline: none;
    width: 560px;
    height: 100%;
    object-fit: cover;
    span {
      white-space: pre-line;
      object-fit: cover;
    }
  }
  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &.defaultImage {
      opacity: 0.5;
    }
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
    }
  }
`;

const backgroundImage = '/img/back1.jpg';

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

const JamCarousel = ({ jamData }) => {
  const { content, image } = jamData;

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
          <span>{content}</span>
        </div>
        <div>
          {image ? (
            <img src={image} alt="jamImage" />
          ) : (
            <img
              className="defaultImage"
              src={backgroundImage}
              alt="jamDefaultImage"
            />
          )}
        </div>
      </SliderStyle>
    </div>
  );
};

export default JamCarousel;
