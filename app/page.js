"use client"
import React, { useState, useEffect } from 'react'
import NavBar from './components/navbar'
import Main from './components/main'
import PreLoader from './components/preloader'

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PreLoader isVisible={isLoading} />
      {!isLoading && (
        <>
          <NavBar />
          <Main />
        </>
      )}
    </>
  )
}

export default Page