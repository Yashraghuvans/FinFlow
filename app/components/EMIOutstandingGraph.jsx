import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

function EMIOutstandingGraph({ loanParams, calculatedEMI }) {
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

        const { principalAmount, annualInterestRate, loanTenureYears } = loanParams;
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfMonths = loanTenureYears * 12;
        const emi = parseFloat(calculatedEMI);

        if (isNaN(emi)) return;

        const labels = [];
        const outstandingPrincipalData = [];
        const principalData = [];
        let currentOutstandingPrincipal = principalAmount;

        for (let month = 1; month <= numberOfMonths; month++) {
            labels.push(`Month ${month}`);
            outstandingPrincipalData.push(currentOutstandingPrincipal);
            principalData.push(principalAmount);

            const interestPayment = currentOutstandingPrincipal * monthlyInterestRate;
            const principalPayment = emi - interestPayment;
            currentOutstandingPrincipal -= principalPayment;
            if (currentOutstandingPrincipal < 0) currentOutstandingPrincipal = 0;
        }

        const chartConfig = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Outstanding Principal',
                        data: outstandingPrincipalData,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1,
                        fill: true,
                    },
                    {
                        label: 'Principal Amount',
                        data: principalData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.1,
                        fill: true,
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
        <div className="emi-outstanding-graph">
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
}

export default EMIOutstandingGraph;