import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

const Home = () => {
  return (
    <div className="relative  w-full">
      <div className="absolute top-0 left-0 inset-0 -z-10 hero-bg lg:bg-cover bg-center bg-no-repeat" style={{backgroundSize: "100% 100%"}}></div>
      <div className="container mx-auto px-16">
        <Navbar />
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default Home;
