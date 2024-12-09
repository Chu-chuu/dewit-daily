import React from 'react';
import heroImage from "../assets/hero.jpeg";

const Hero = () => {
  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <img 
        src={heroImage} 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full space-y-4 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Track your skincare routine, progress, and more.
        </h1>
        <button className="bg-secondary text-black font-semibold px-6 py-3 rounded-md hover:bg-accent transition duration-300">
          Explore Features
        </button>
      </div>
    </section>
  );
};

export default Hero;
