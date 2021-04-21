import React from 'react';
import '../../src/App.css';
import Cards from '../componentHome/Cards';
import HeroSection from '../componentHome/HeroSection';
import Footer from '../componentHome/Footer';
import Navbar from './Navbar';
function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;