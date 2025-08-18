"use client"
import React, { useState, useEffect } from 'react';
import NavBar from './components/navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import PreLoader from './components/preloader';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PreLoader isVisible={isLoading} />

      {!isLoading && (
        <>
          <NavBar />
          <HeroSection />
          <FeaturesSection />
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
