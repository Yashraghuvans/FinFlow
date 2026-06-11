'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

// Mock current user for now
const CURRENT_USER_EMAIL = 'user@example.com';

export async function getCurrentUser() {
  let user = await prisma.user.findUnique({
    where: { email: CURRENT_USER_EMAIL },
  });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: CURRENT_USER_EMAIL,
        name: 'Demo User',
      },
    });
  }
  return user;
}

export async function setupPropertyAndLoan(data) {
  const user = await getCurrentUser();
  
  const property = await prisma.property.create({
    data: {
      userId: user.id,
      projectName: data.projectName,
      builderName: data.builderName,
      agreementValue: parseFloat(data.agreementValue),
      loans: {
        create: {
          lender: data.lender,
          sanctionedAmount: parseFloat(data.sanctionedAmount),
          interestRate: parseFloat(data.interestRate),
          tenureMonths: parseInt(data.tenureMonths, 10),
          sanctionDate: new Date(data.sanctionDate),
        }
      }
    },
    include: {
      loans: true
    }
  });

  revalidatePath('/dashboard');
  return property;
}

export async function addTransaction(data) {
  const transaction = await prisma.transaction.create({
    data: {
      type: data.type,
      amount: parseFloat(data.amount),
      date: new Date(data.date),
      notes: data.notes,
      milestoneId: data.milestoneId || null,
      invoiceId: data.invoiceId || null,
    }
  });
  
  revalidatePath('/ledger');
  revalidatePath('/dashboard');
  return transaction;
}

export async function getDashboardData() {
  const user = await getCurrentUser();
  const property = await prisma.property.findFirst({
    where: { userId: user.id },
    include: {
      loans: {
        include: {
          schedules: {
            include: {
              milestones: true
            }
          }
        }
      }
    }
  });

  if (!property) return null;

  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  });

  // Calculation Engine
  const totals = transactions.reduce((acc, tx) => {
    if (tx.type === 'bank_disbursement') acc.bankDisbursed += tx.amount;
    if (tx.type === 'owner_direct' || tx.type === 'down_payment') acc.ownerPaid += tx.amount;
    if (tx.type === 'pre_emi') acc.preEmiPaid += tx.amount;
    return acc;
  }, { bankDisbursed: 0, ownerPaid: 0, preEmiPaid: 0 });

  return { 
    property, 
    recentTransactions: transactions.slice(0, 5),
    stats: {
      ...totals,
      totalPaid: totals.bankDisbursed + totals.ownerPaid,
      outstandingPrincipal: totals.bankDisbursed // Simplified for pre-EMI phase
    }
  };
}

export async function getLedgerData() {
  const user = await getCurrentUser();
  const property = await prisma.property.findFirst({
    where: { userId: user.id },
  });

  if (!property) return { transactions: [] };

  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  });

  return { transactions };
}

export async function getScenariosData() {
  const user = await getCurrentUser();
  const property = await prisma.property.findFirst({
    where: { userId: user.id },
    include: { loans: true }
  });

  if (!property || property.loans.length === 0) return { scenarios: [] };

  const scenarios = await prisma.scenario.findMany({
    where: { loanId: property.loans[0].id },
    orderBy: { createdAt: 'desc' }
  });

  return { scenarios, loanId: property.loans[0].id };
}

export async function createScenario(data) {
  const scenario = await prisma.scenario.create({
    data: {
      loanId: data.loanId,
      name: data.name,
      type: data.type,
      inputs: JSON.stringify(data.inputs),
      outputs: JSON.stringify(data.outputs),
    }
  });
  revalidatePath('/scenarios');
  return scenario;
}
