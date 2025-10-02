"use client";

export function calculateCumulativeDisbursement(project) {
  if (!project) return 0;
  return (project.transactions || [])
    .filter(t => t.type === 'Bank Disbursement')
    .reduce((s, t) => s + (Number(t.amount) || 0), 0);
}

export function calculatePreEMI(cumulativeDisbursement, annualInterestRate) {
  const principal = Number(cumulativeDisbursement) || 0;
  const rate = Number(annualInterestRate) || 0;
  const monthlyRate = rate / 12 / 100;
  return principal * monthlyRate;
}

export function calculateFullEMI(sanctionedLoanAmount, annualInterestRate, loanTenureYears) {
  const P = Number(sanctionedLoanAmount) || 0;
  const r = (Number(annualInterestRate) || 0) / 12 / 100;
  const n = (Number(loanTenureYears) || 0) * 12;
  if (!P || !r || !n) return 0;
  const numerator = P * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  return numerator / denominator;
}

export function getLoanPhase(project) {
  if (!project) return 'Pre-EMI';
  const allCompleted = (project.milestones || []).every(m => m.isCompleted);
  const disbursed = calculateCumulativeDisbursement(project);
  const fullDisbursed = disbursed >= Number(project.sanctionedLoanAmount || 0);
  return (allCompleted || fullDisbursed) ? 'Full EMI' : 'Pre-EMI';
}


