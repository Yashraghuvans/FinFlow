import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

function EMIWithPrepaymentGraph({ loanParams, calculatedEMI }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!loanParams || !calculatedEMI) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
            return;
        }

        const { principalAmount, annualInterestRate, loanTenureYears, prePayment } = loanParams;
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfMonths = loanTenureYears * 12;
        const emi = parseFloat(calculatedEMI);

        if (isNaN(emi)) return;

        const labels = [];
        const outstandingPrincipalData = [];
        const outstandingPrincipalWithPrepaymentData = [];
        let currentOutstandingPrincipal = principalAmount;
        let currentOutstandingPrincipalWithPrepayment = principalAmount - prePayment;

        for (let month = 1; month <= numberOfMonths; month++) {
            labels.push(`Month ${month}`);
            outstandingPrincipalData.push(currentOutstandingPrincipal);
            outstandingPrincipalWithPrepaymentData.push(currentOutstandingPrincipalWithPrepayment);

            const interestPayment = currentOutstandingPrincipal * monthlyInterestRate;
            const principalPayment = emi - interestPayment;
            currentOutstandingPrincipal -= principalPayment;
            if (currentOutstandingPrincipal < 0) currentOutstandingPrincipal = 0;

            const interestPaymentWithPrepayment = currentOutstandingPrincipalWithPrepayment * monthlyInterestRate;
            const principalPaymentWithPrepayment = emi - interestPaymentWithPrepayment;
            currentOutstandingPrincipalWithPrepayment -= principalPaymentWithPrepayment;
            if (currentOutstandingPrincipalWithPrepayment < 0) currentOutstandingPrincipalWithPrepayment = 0;
        }

        const chartConfig = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Outstanding Principal',
                        data: outstandingPrincipalData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1,
                        barThickness: 10,
                        categoryPercentage: 0.8,
                        barPercentage: 0.9,
                    },
                    {
                        label: 'Outstanding Principal with Prepayment',
                        data: outstandingPrincipalWithPrepaymentData,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1,
                        barThickness: 10,
                        categoryPercentage: 0.8,
                        barPercentage: 0.9,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },
                        title: {
                            display: true,
                            text: 'Months',
                            color: 'rgba(255, 255, 255, 0.8)',
                        },
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            stepSize: 50000,
                        },
                        title: {
                            display: true,
                            text: 'Amount (₹)',
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                        },
                    },
                },
                backgroundColor: 'transparent',
            },
        };

        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, chartConfig);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };

    }, [loanParams, calculatedEMI]);

    return (
        <div className="emi-with-prepayment-graph">
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
}

export default EMIWithPrepaymentGraph;
