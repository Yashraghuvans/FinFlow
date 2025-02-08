"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
const LoanDesc = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const principal = searchParams.get('principal');
  const rate = searchParams.get('rate');
  const time = searchParams.get('time');
  const [emi, setEmi] = useState();
  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = time * 12;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    setEmi(emiValue.toFixed(2));
  };
  return (
    <div>
      <h1>EMI Calculator</h1>
      <div>
        <p>Principal Amount: {principal}</p>
        <p>Interest Rate: {rate}</p>
        <p>Time Period: {time}</p>
        <p>EMI: {emi}</p>
        <button onClick={calculate}>Calculate</button>
      </div>
    </div>
  );
};

export default LoanDesc;