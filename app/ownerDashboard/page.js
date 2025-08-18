"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EMICalculator from '../components/EMICalculator';
import EMIOutstandingGraph from '../components/EMIOutstandingGraph';
import LoanDataTable from '../components/LoanDataTable';
import LoanInputForm from '../components/LoanInputForm';
import NavBar from '../components/navbar';
import LoanSavingsPieChart from '../components/LoanSavingsPieChart';
import EMIWithPrepaymentGraph from '../components/EMIWithPrepaymentGraph';
import LoanDetailsTable from '../components/LoanDetailsTable';
import { Home, Calculator, PieChart, BarChart3, DollarSign, TrendingUp, FileText, CreditCard, Plus, Activity, Target, Shield } from 'lucide-react';

function HomePage() {
    const searchParams = useSearchParams();
    const [loanData, setLoanData] = useState([]);
    const [calculatedEMI, setCalculatedEMI] = useState(null);
    const [currentLoanParams, setCurrentLoanParams] = useState(null);

    useEffect(() => {
        const loanDataParam = searchParams.get('loanData');
        if (loanDataParam) {
            setLoanData(JSON.parse(loanDataParam));
        }
    }, [searchParams]);

    const addLoan = (newLoan) => {
        setLoanData([...loanData, newLoan]);
    };

    const handleCalculateEMI = (loanParams) => {
        setCurrentLoanParams(loanParams);
    };

    const handleRecalculate = (loan) => {
        setCurrentLoanParams(loan);
    };

    const dashboardStats = [
        {
            title: "Total Loans",
            value: loanData.length,
            icon: CreditCard,
            gradientClass: "from-primary-500 to-primary-600",
            change: "+15%",
            changeType: "positive"
        },
        {
            title: "Total Loan Amount",
            value: `₹${loanData.reduce((sum, loan) => sum + (parseFloat(loan.loanAmount) || 0), 0).toLocaleString()}`,
            icon: DollarSign,
            gradientClass: "from-success-500 to-success-600",
            change: "+12.3%",
            changeType: "positive"
        },
        {
            title: "Average Interest Rate",
            value: loanData.length > 0 ? 
                `${(loanData.reduce((sum, loan) => sum + (parseFloat(loan.interestRate) || 0), 0) / loanData.length).toFixed(2)}%` : "0%",
            icon: TrendingUp,
            gradientClass: "from-warning-500 to-warning-600",
            change: "-2.1%",
            changeType: "negative"
        },
        {
            title: "Total EMI",
            value: calculatedEMI ? `₹${calculatedEMI.toLocaleString()}` : "₹0",
            icon: Calculator,
            gradientClass: "from-teal-500 to-teal-600",
            change: "+8.7%",
            changeType: "positive"
        }
    ];

    const quickActions = [
        { name: "Add Loan", icon: Plus, action: () => {}, color: "primary" },
        { name: "View Reports", icon: BarChart3, action: () => {}, color: "success" },
        { name: "Set Goals", icon: Target, action: () => {}, color: "warning" },
        { name: "Security", icon: Shield, action: () => {}, color: "teal" }
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
                                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Home className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Owner's Dashboard</h1>
                                    <p className="text-slate-400 text-lg">Manage your home loans and track EMI payments</p>
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
                            {/* Add New Loan */}
                            <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-200">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <CreditCard className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Add New Loan</h2>
                                        <p className="text-slate-400 text-sm">Enter loan details and calculate EMI</p>
                                    </div>
                                </div>
                                <LoanInputForm onLoanSubmit={addLoan} onCalculateEMI={handleCalculateEMI} />
                            </div>

                            {/* EMI Calculator */}
                            <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-300">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Calculator className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">EMI Calculator</h2>
                                        <p className="text-slate-400 text-sm">Calculate monthly EMI payments</p>
                                    </div>
                                </div>
                                <EMICalculator loanParams={currentLoanParams} setCalculatedEMI={setCalculatedEMI} />
                            </div>

                            {/* Loan Savings Overview */}
                            <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-400">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <PieChart className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Loan Savings Overview</h2>
                                        <p className="text-slate-400 text-sm">Visual breakdown of loan savings</p>
                                    </div>
                                </div>
                                {currentLoanParams && <LoanSavingsPieChart loanParams={currentLoanParams} />}
                            </div>
                        </div>

                        {/* Right Column - Analytics and Charts */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Top Row - Tables and Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* All Loans */}
                                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-500">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <FileText className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">All Loans</h2>
                                            <p className="text-slate-400 text-sm">Overview of all your loans</p>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <LoanDataTable loans={loanData} onRecalculate={handleRecalculate} />
                                    </div>
                                </div>

                                {/* Loan Details */}
                                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-600">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <BarChart3 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">Loan Details</h2>
                                            <p className="text-slate-400 text-sm">Detailed loan information</p>
                                        </div>
                                    </div>
                                    <LoanDetailsTable loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                                </div>
                            </div>

                            {/* Bottom Row - Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* EMI With Prepayment Graph */}
                                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-700">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-error-500 to-error-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">EMI With Prepayment</h2>
                                            <p className="text-slate-400 text-sm">Prepayment impact analysis</p>
                                        </div>
                                    </div>
                                    <div className="h-[350px]">
                                        <EMIWithPrepaymentGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                                    </div>
                                </div>

                                {/* EMI Outstanding Graph */}
                                <div className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-800">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Activity className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">EMI Outstanding</h2>
                                            <p className="text-slate-400 text-sm">Outstanding balance trends</p>
                                        </div>
                                    </div>
                                    <div className="h-[350px]">
                                        <EMIOutstandingGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Empty State */}
                    {loanData.length === 0 && !currentLoanParams && (
                        <div className="text-center py-20 animate-fade-in-up animation-delay-900">
                            <div className="w-32 h-32 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                                <Home className="w-16 h-16 text-teal-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No Loans Added Yet</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto text-lg">
                                Start by adding your first loan to see detailed EMI calculations and analytics.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button className="btn-primary text-lg px-8 py-4">
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add First Loan
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function HomePageWrapper() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading dashboard...</p>
                </div>
            </div>
        }>
            <HomePage />
        </Suspense>
    );
}

export default HomePageWrapper;