"use client"
import React, { useState } from 'react';
import NavBar from '../components/navbar';
import PreEMIInputForm from '../components/PreEMIInputForm';
import FormInputDetails from '../components/FormInputDetails';
import BudgetAnalysis from '../components/BudgetAnalysis';
import BudgetPieChart from '../components/BudgetPieChart';
import ProfitLossComparison from '../components/ProfitLossComparison';
import ProfitBarChart from '../components/ProfitBarChart';
import { Building2, TrendingUp, BarChart3, Calculator, DollarSign, PieChart, Plus, Activity, Target, Users } from 'lucide-react';

const ContractorDashboard = () => {
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (data) => {
    const { projectValue, projectTimePeriod, plannedBudget, actualSpending, revenue, expenses } = data;
    const preEmi = projectValue && projectTimePeriod ? (projectValue / projectTimePeriod).toFixed(2) : 0;
    setFormData([...formData, { ...data, preEmi }]);
  };

  const dashboardStats = [
    {
      title: "Total Projects",
      value: formData.length,
      icon: Building2,
      gradientClass: "from-primary-500 to-primary-600",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Total Revenue",
      value: `₹${formData.reduce((sum, project) => sum + (parseFloat(project.revenue) || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      gradientClass: "from-success-500 to-success-600",
      change: "+8.2%",
      changeType: "positive"
    },
    {
      title: "Total Expenses",
      value: `₹${formData.reduce((sum, project) => sum + (parseFloat(project.expenses) || 0), 0).toLocaleString()}`,
      icon: TrendingUp,
      gradientClass: "from-warning-500 to-warning-600",
      change: "-3.1%",
      changeType: "negative"
    },
    {
      title: "Profit Margin",
      value: formData.length > 0 ? 
        `${((formData.reduce((sum, project) => sum + (parseFloat(project.revenue) || 0) - (parseFloat(project.expenses) || 0), 0) / 
          formData.reduce((sum, project) => sum + (parseFloat(project.revenue) || 0), 0)) * 100).toFixed(1)}%` : "0%",
      icon: BarChart3,
      gradientClass: "from-teal-500 to-teal-600",
      change: "+5.7%",
      changeType: "positive"
    }
  ];

  const quickActions = [
    { name: "Add Project", icon: Plus, action: () => {}, color: "primary" },
    { name: "View Reports", icon: BarChart3, action: () => {}, color: "success" },
    { name: "Team Activity", icon: Users, action: () => {}, color: "warning" },
    { name: "Set Targets", icon: Target, action: () => {}, color: "teal" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavBar />
      
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Contractor's Dashboard</h1>
                  <p className="text-slate-400 text-lg">Manage your projects and track financial performance</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.name}
                      className={`flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className={`w-4 h-4 text-${action.color}-400`} />
                      <span className="text-slate-300 font-medium">{action.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.title}
                  className="group card hover:transform hover:scale-105 transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradientClass} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.changeType === 'positive' 
                        ? 'bg-success-500/20 text-success-400' 
                        : 'bg-error-500/20 text-error-400'
                    }`}>
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                    <div className="w-full bg-slate-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full bg-gradient-to-r ${stat.gradientClass} transition-all duration-1000`}
                        style={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Forms and Input */}
            <div className="xl:col-span-1 space-y-8">
              {/* Project Details Form */}
              <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Add New Project</h2>
                    <p className="text-slate-400 text-sm">Enter project details and financial information</p>
                  </div>
                </div>
                <PreEMIInputForm onSubmit={handleFormSubmit} className="w-full m-0" />
              </div>

              {/* Project Details Table */}
              <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Project Details</h2>
                    <p className="text-slate-400 text-sm">Overview of all your projects</p>
                  </div>
                </div>
                <FormInputDetails formData={formData} />
              </div>
            </div>

            {/* Right Column - Analytics and Charts */}
            <div className="xl:col-span-2 space-y-8">
              {/* Top Row - Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget Analysis Chart */}
                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-400">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <PieChart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Budget Analysis</h2>
                      <p className="text-slate-400 text-sm">Visual breakdown of project budgets</p>
                    </div>
                  </div>
                  <BudgetPieChart projects={formData} />
                </div>

                {/* Profit/Loss Analysis */}
                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-500">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Profit/Loss Analysis</h2>
                      <p className="text-slate-400 text-sm">Financial performance overview</p>
                    </div>
                  </div>
                  <ProfitLossComparison projects={formData} />
                </div>
              </div>

              {/* Bottom Row - Full Width Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget Analysis */}
                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-600">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Budget Analysis</h2>
                      <p className="text-slate-400 text-sm">Detailed budget breakdown</p>
                    </div>
                  </div>
                  <BudgetAnalysis projects={formData} />
                </div>

                {/* Profit Bar Chart */}
                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-error-500 to-error-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Profit Trends</h2>
                      <p className="text-slate-400 text-sm">Profit trends over time</p>
                    </div>
                  </div>
                  <ProfitBarChart projects={formData} />
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {formData.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up animation-delay-800">
              <div className="w-32 h-32 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Calculator className="w-16 h-16 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Added Yet</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto text-lg">
                Start by adding your first project to see detailed analytics and insights.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="btn-primary text-lg px-8 py-4">
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;