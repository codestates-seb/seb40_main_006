import React from 'react';
import Hero from '../Components/Landing/Hero';
import Values from '../Components/Landing/Values';
import Categories from '../Components/Landing/Categories';
// import HowItWorks from '../Components/Rending/HowItWorks';
import Works from '../Components/Landing/Works';

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
