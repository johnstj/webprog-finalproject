import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/3c/f9/f4/4k-restaurant-koh-samui.jpg?w=1400&h=-1&s=1" alt="Restaurant Hero" className="hero-image" />
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