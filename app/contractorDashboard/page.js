"use client"
import React from 'react';
import NavBar from '../components/navbar';
import PreEMIInputForm from '../components/PreEMIInputForm';

const ContractorDashboard = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="w-full bg-gray-900 flex justify-center items-center py-10">
        <h1 className="text-white text-5xl font-semibold text-center px-4">
          Contractors dashboard
        </h1>
      </div>
      <div className="w-full bg-gray-900 flex justify-center items-center py-10">
        <PreEMIInputForm />
      </div>
    </div>
  );
};

export default ContractorDashboard;