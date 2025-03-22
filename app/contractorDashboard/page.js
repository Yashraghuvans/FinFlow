"use client"
import React, { useState } from 'react';
import NavBar from '../components/navbar';
import PreEMIInputForm from '../components/PreEMIInputForm';
import FormInputDetails from '../components/FormInputDetails';
import BudgetAnalysis from '../components/BudgetAnalysis';
import BudgetPieChart from '../components/BudgetPieChart';
import ProfitLossComparison from '../components/ProfitLossComparison';
import ProfitBarChart from '../components/ProfitBarChart';

const ContractorDashboard = () => {
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (data) => {
    const { projectValue, projectTimePeriod, plannedBudget, actualSpending, revenue, expenses } = data;
    const preEmi = projectValue && projectTimePeriod ? (projectValue / projectTimePeriod).toFixed(2) : 0;
    setFormData([...formData, { ...data, preEmi }]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="w-full bg-gray-900 flex justify-center items-center py-10">
        <h1 className="text-white text-5xl font-semibold text-center pt-32 z-[99]">
          Contractors dashboard
        </h1>
      </div>
      <div className="w-full bg-gray-900 flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <PreEMIInputForm onSubmit={handleFormSubmit} />
          <div className='border-2 border-white w-1/2 h-1/2 p-5'>
          <h1 className='text-3xl text-center p-2 pb-6'>Budget Analysis Chart</h1>
          <hr className='border-b-2 bg-white'/>
            <BudgetPieChart projects={formData} />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-900 p-8 border-2 border-white">
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">Details</h2>
        <div className="w-1/2">
          <FormInputDetails formData={formData} />
        </div>
      </div>
      <div className="w-full bg-gray-900 p-8 border-2 border-white">
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">Budget Analysis</h2>
        <BudgetAnalysis projects={formData} />
      </div>
      <div className="w-full bg-gray-900 p-8 border-2 border-white">
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">Profit/Loss Analysis</h2>
        <ProfitLossComparison projects={formData} />
      </div>
      <div className="w-full bg-gray-900 p-8 border-2 border-white">
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">Profit Bar Chart</h2>
        <ProfitBarChart projects={formData} />
      </div>
    </div>
  );
};

export default ContractorDashboard;