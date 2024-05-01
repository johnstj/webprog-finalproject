import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <img src="https://wallpapers.com/images/hd/food-4k-anl1yr892h6ccjeb.jpg" alt="Restaurant Hero" className="hero-image" />
      <div className="hero-content">
        <br />
        <br />
        <h1 className="hero-title">Welcome to Restaurant Rater!</h1>
        <p className="hero-description">Your favorite place on the Internet to leave restaurant feedback!</p>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Hero;