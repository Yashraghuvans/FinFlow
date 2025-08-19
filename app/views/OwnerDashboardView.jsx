"use client";

import React, { memo, useMemo } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import { Home, CreditCard, DollarSign, TrendingUp, Calculator, Download } from "lucide-react";
import LoanInputForm from "../components/LoanInputForm";
import EMICalculator from "../components/EMICalculator";
import LoanSavingsPieChart from "../components/LoanSavingsPieChart";
import LoanDataTable from "../components/LoanDataTable";
import LoanDetailsTable from "../components/LoanDetailsTable";
import EMIWithPrepaymentGraph from "../components/EMIWithPrepaymentGraph";
import EMIOutstandingGraph from "../components/EMIOutstandingGraph";

function OwnerDashboardView({
  loanData,
  calculatedEMI,
  setCalculatedEMI,
  currentLoanParams,
  addLoan,
  handleCalculateEMI,
  handleRecalculate,
  loading,
  error,
}) {
  const stats = useMemo(() => {
    const totalLoans = loanData.length;
    const totalAmount = loanData.reduce((s, l) => s + (parseFloat(l.loanAmount) || 0), 0).toLocaleString();
    const avgInterest = loanData.length
      ? (loanData.reduce((s, l) => s + (parseFloat(l.interestRate) || 0), 0) / loanData.length).toFixed(2)
      : "0.00";
    return [
      { title: "Total Loans", value: totalLoans, icon: CreditCard, gradientClass: "from-primary-500 to-primary-600", trend: "+12%", trendType: "positive" },
      { title: "Total Amount", value: `₹${totalAmount}`, icon: DollarSign, gradientClass: "from-success-500 to-success-600", trend: "+6.4%", trendType: "positive" },
      { title: "Avg Interest", value: `${avgInterest}%`, icon: TrendingUp, gradientClass: "from-warning-500 to-warning-600", trend: "-1.2%", trendType: "negative" },
      { title: "EMI (current)", value: calculatedEMI ? `₹${calculatedEMI.toLocaleString()}` : "₹0", icon: Calculator, gradientClass: "from-teal-500 to-teal-600", trend: "+3.1%", trendType: "positive" },
    ];
  }, [loanData, calculatedEMI]);

  return (
    <div className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <DashboardHeader
          title="Owner's Dashboard"
          subtitle="Manage your home loans and track EMI payments"
          icon={Home}
          gradientClass="from-teal-500 to-teal-600"
          actions={[
            { label: "Export", icon: Download, variant: "secondary" },
          ]}
        />
        {error && (
          <div className="status-error rounded-lg p-3 mb-4">
            Something went wrong. Please try again.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card h-64 skeleton" />
            <div className="card h-64 skeleton" />
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((s) => (
                <StatCard key={s.title} {...s} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Add New Loan</h2>
                <LoanInputForm onLoanSubmit={addLoan} onCalculateEMI={handleCalculateEMI} />
              </div>
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">EMI Calculator</h2>
                <EMICalculator loanParams={currentLoanParams} setCalculatedEMI={setCalculatedEMI} />
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4 text-white">Loan Savings Overview</h2>
                  {currentLoanParams && <LoanSavingsPieChart loanParams={currentLoanParams} />}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card overflow-x-auto">
                <h2 className="text-lg font-semibold mb-4 text-white">All Loans</h2>
                <LoanDataTable loans={loanData} onRecalculate={handleRecalculate} />
              </div>
              <div className="card h-[350px]">
                <h2 className="text-lg font-semibold mb-4 text-white">EMI With Prepayment Graph</h2>
                <EMIWithPrepaymentGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
              </div>
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Loan Details</h2>
                <LoanDetailsTable loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
              </div>
              <div className="card h-[350px]">
                <h2 className="text-lg font-semibold mb-4 text-white">EMI Outstanding Graph</h2>
                <EMIOutstandingGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(OwnerDashboardView);


