import React from 'react';

const PreLoader = ({ isVisible }) => {
  return (
    isVisible && (
      <div className=' bg-[url(./src/back1.gif)] bg-no-repeat bg-cover h-full w-full fixed z-50'></div>
    )
  );
};

export default PreLoader;