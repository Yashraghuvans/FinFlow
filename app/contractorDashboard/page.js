"use client"
import React, { useState } from 'react';
import NavBar from '../components/navbar';
import PreEMIInputForm from '../components/PreEMIInputForm';
import DataTable from '../components/DataTable';

const ContractorDashboard = () => {
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (data) => {
    setFormData([...formData, data]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="w-full bg-gray-900 flex justify-center items-center py-10">
        <h1 className="text-white text-5xl font-semibold text-center px-4">
          Contractors dashboard
        </h1>
      </div>
      <div className="w-full bg-gray-900 flex justify-center items-center py-10">
        <PreEMIInputForm onSubmit={handleFormSubmit} />
      </div>
      <div className="w-full bg-gray-900 flex justify-center items-center py-10">
        <DataTable data={formData} />
      </div>
    </div>
  );
};

export default ContractorDashboard;