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
    <div className="flex flex-col min-h-screen bg-gray-900">
      <NavBar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header
          className="w-full bg-gray-950/80 border-b border-gray-800 shadow flex items-center px-6 py-4 sticky z-20"
          style={{ marginTop: '64px' }}
        >
          <span className="text-2xl font-bold text-white tracking-tight">Contractor's Dashboard</span>
          
        </header>
        <main className="flex-1 overflow-y-auto px-2 md:px-8 py-4 md:py-8 bg-gradient-to-br from-gray-900/80 to-black/90">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-3 md:mb-4 text-white">Enter Project Details</h2>
              <PreEMIInputForm onSubmit={handleFormSubmit} className="w-full m-0" />
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-3 md:mb-4 text-white">Budget Analysis Chart</h2>
              <BudgetPieChart projects={formData} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-3 md:mb-4 text-white">Details</h2>
              <FormInputDetails formData={formData} />
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-3 md:mb-4 text-white">Budget Analysis</h2>
              <BudgetAnalysis projects={formData} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-3 md:mb-4 text-white">Profit/Loss Analysis</h2>
              <ProfitLossComparison projects={formData} />
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-3 md:mb-4 text-white">Profit Bar Chart</h2>
              <ProfitBarChart projects={formData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContractorDashboard;