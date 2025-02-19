import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const LoanSavingsPieChart = ({ loanParams }) => {
  const [normalEMI, setNormalEMI] = useState(0);
  const [prepaymentSavings, setPrepaymentSavings] = useState(0);
  const [processingFees, setProcessingFees] = useState(0);

  const bankFees = {
    SBI: { percentage: 0.35, max: 10000 },
    HDFC: { percentage: 0.50, min: 3000 },
    Axis: { percentage: 1, min: 10000 },
    ICICI: { percentage: 1 },
    PNB: { percentage: 0.35, min: 2500, max: 15000, docCharges: 1350 },
    LIC: { percentage: 1 },
    Citibank: { percentage: 0.40 },
  };

  useEffect(() => {
    if (loanParams) {
      const { principalAmount, annualInterestRate, loanTenureYears, prePayment, bankName } = loanParams;

      if (principalAmount && annualInterestRate && loanTenureYears && prePayment && bankName) {
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfMonths = loanTenureYears * 12;

        const emi =
          (principalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
          (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

        const newPrincipalAmount = principalAmount - prePayment;
        const emiWithPrePayment =
          (newPrincipalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
          (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

        let fee = 0;
        const bankData = bankFees[bankName];

        if (bankData) {
          fee = (principalAmount * bankData.percentage) / 100;

          if (bankData.max && fee > bankData.max) {
            fee = bankData.max;
          }
          if (bankData.min && fee < bankData.min) {
            fee = bankData.min;
          }

          if (bankData.docCharges) {
            fee += bankData.docCharges;
          }
        }
        setProcessingFees(fee);

        const totalEmi = emi + (fee / numberOfMonths);
        const totalEmiWithPrePayment = emiWithPrePayment + (fee / numberOfMonths);

        const monthlySavings = totalEmi - totalEmiWithPrePayment;
        const totalSavings = monthlySavings * numberOfMonths;

        setNormalEMI(totalEmi.toFixed(3));
        setPrepaymentSavings(totalSavings.toFixed(3));

      } else {
        setNormalEMI(0);
        setPrepaymentSavings(0);
        setProcessingFees(0);
      }
    } else {
      setNormalEMI(0);
      setPrepaymentSavings(0);
      setProcessingFees(0);
    }
  }, [loanParams]);

  const data = [
    { name: 'Normal EMI Payments', value: parseFloat(normalEMI) },
    { name: 'Savings from Prepayments', value: parseFloat(prepaymentSavings) },
  ];

  const total = parseFloat(normalEMI) + parseFloat(prepaymentSavings);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const percentage = ((dataPoint.value / total) * 100).toFixed(2);
      return (
        <div className="custom-tooltip">
          <p className="label">{dataPoint.name}</p>
          <p className="value">₹{dataPoint.value.toLocaleString()} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="loan-savings-chart">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoanSavingsPieChart;