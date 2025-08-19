"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchLoans, createLoan } from "../lib/api/loanApi";

export function useOwnerDashboard(searchParams) {
  const [loanData, setLoanData] = useState([]);
  const [calculatedEMI, setCalculatedEMI] = useState(null);
  const [currentLoanParams, setCurrentLoanParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const param = searchParams?.get?.("loanData");
    if (param) {
      try {
        setLoanData(JSON.parse(param));
      } catch (err) {
        // ignore parse errors
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const loans = await fetchLoans();
        if (mounted && !searchParams?.get?.("loanData")) {
          setLoanData(loans);
        }
      } catch (e) {
        setError("Failed to load loans");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [searchParams]);

  const addLoan = useCallback(async (newLoan) => {
    try {
      setLoanData(prev => [...prev, newLoan]);
      await createLoan(newLoan);
    } catch (e) {
      setError("Failed to add loan");
    }
  }, []);

  const handleCalculateEMI = useCallback((loanParams) => {
    setCurrentLoanParams(loanParams);
  }, []);

  const handleRecalculate = useCallback((loan) => {
    setCurrentLoanParams(loan);
  }, []);

  const stats = useMemo(() => ({
    totalLoans: loanData.length,
    totalAmount: loanData.reduce((s, l) => s + (parseFloat(l.loanAmount) || 0), 0),
    averageInterest: loanData.length
      ? (loanData.reduce((s, l) => s + (parseFloat(l.interestRate) || 0), 0) / loanData.length)
      : 0
  }), [loanData]);

  return {
    loanData,
    calculatedEMI,
    setCalculatedEMI,
    currentLoanParams,
    addLoan,
    handleCalculateEMI,
    handleRecalculate,
    loading,
    error,
    stats,
  };
}


