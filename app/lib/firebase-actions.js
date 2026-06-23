import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Property & Loan Setup
 */
export async function firebaseSetupPropertyAndLoan(userId, data) {
  try {
    const propertyRef = await addDoc(collection(db, 'properties'), {
      userId,
      projectName: data.projectName,
      builderName: data.builderName,
      agreementValue: parseFloat(data.agreementValue),
      createdAt: serverTimestamp(),
    });

    const loanRef = await addDoc(collection(db, 'loans'), {
      userId,
      propertyId: propertyRef.id,
      lender: data.lender,
      sanctionedAmount: parseFloat(data.sanctionedAmount),
      interestRate: parseFloat(data.interestRate),
      tenureMonths: parseInt(data.tenureMonths, 10),
      sanctionDate: data.sanctionDate,
      createdAt: serverTimestamp(),
    });

    return { propertyId: propertyRef.id, loanId: loanRef.id };
  } catch (error) {
    console.error("Error setting up property:", error);
    throw error;
  }
}

/**
 * Dashboard Data Fetching
 */
export async function firebaseGetDashboardData(userId) {
  try {
    // 1. Get Property
    const qProperty = query(collection(db, 'properties'), where('userId', '==', userId), limit(1));
    const propertySnap = await getDocs(qProperty);
    
    if (propertySnap.empty) return null;
    
    const property = { id: propertySnap.docs[0].id, ...propertySnap.docs[0].data() };

    // 2. Get Loan
    const qLoan = query(collection(db, 'loans'), where('propertyId', '==', property.id), limit(1));
    const loanSnap = await getDocs(qLoan);
    const loan = loanSnap.empty ? null : { id: loanSnap.docs[0].id, ...loanSnap.docs[0].data() };

    // 3. Get Transactions
    const qTransactions = query(
      collection(db, 'transactions'), 
      where('userId', '==', userId), 
      orderBy('date', 'desc')
    );
    const txSnap = await getDocs(qTransactions);
    const transactions = txSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 4. Calculate Stats
    const totals = transactions.reduce((acc, tx) => {
      if (tx.type === 'bank_disbursement') acc.bankDisbursed += tx.amount;
      if (tx.type === 'owner_direct' || tx.type === 'down_payment') acc.ownerPaid += tx.amount;
      if (tx.type === 'pre_emi') acc.preEmiPaid += tx.amount;
      return acc;
    }, { bankDisbursed: 0, ownerPaid: 0, preEmiPaid: 0 });

    return {
      property,
      loan,
      recentTransactions: transactions.slice(0, 5),
      stats: {
        ...totals,
        totalPaid: totals.bankDisbursed + totals.ownerPaid,
      }
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}

/**
 * Ledger Data
 */
export async function firebaseGetTransactions(userId) {
  const q = query(
    collection(db, 'transactions'), 
    where('userId', '==', userId), 
    orderBy('date', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Scenarios Data
 */
export async function firebaseGetScenarios(userId) {
  try {
    const qLoan = query(collection(db, 'loans'), where('userId', '==', userId), limit(1));
    const loanSnap = await getDocs(qLoan);
    
    if (loanSnap.empty) return { scenarios: [], loanId: null };
    const loanId = loanSnap.docs[0].id;

    const qScenarios = query(
      collection(db, 'scenarios'), 
      where('loanId', '==', loanId), 
      orderBy('createdAt', 'desc')
    );
    const scenarioSnap = await getDocs(qScenarios);
    const scenarios = scenarioSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { scenarios, loanId };
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    return { scenarios: [], loanId: null };
  }
}

/**
 * Add Transaction
 */
export async function firebaseAddTransaction(userId, data) {
  return await addDoc(collection(db, 'transactions'), {
    userId,
    ...data,
    amount: parseFloat(data.amount),
    createdAt: serverTimestamp(),
  });
}
