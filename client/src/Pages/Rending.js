import React from 'react';
import Hero from '../Components/Rending/Hero';
import Values from '../Components/Rending/Values';
import Categories from '../Components/Rending/Categories';
// import HowItWorks from '../Components/Rending/HowItWorks';
import Works from '../Components/Rending/Works';

const Rending = () => {
  return (
    <div>
      <Hero />
      <Values />
      <Categories />
      {/* <HowItWorks /> */}
      <Works />
    </div>
  );
};

export default Rending;
