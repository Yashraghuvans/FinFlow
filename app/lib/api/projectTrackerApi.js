"use client";

const STORAGE_KEY = "finflow_project_tracker";

/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {string} invoiceId
 * @property {'Owner Direct Payment' | 'Bank Disbursement' | 'Pre-EMI'} type
 * @property {number} amount
 * @property {string} date
 * @property {string} notes
 */

/**
 * @typedef {Object} Invoice
 * @property {string} id
 * @property {string} milestoneId
 * @property {string} invoiceNumber
 * @property {number} amount
 * @property {string} dueDate
 * @property {'Due' | 'Paid' | 'Partially Paid' | 'Overdue'} status
 */

/**
 * @typedef {Object} Milestone
 * @property {string} id
 * @property {string} name // e.g., 'Foundation', '5th Floor Slab'
 * @property {number} percentageOfCost
 * @property {boolean} isCompleted
 */

/**
 * @typedef {Object} Project
 * @property {string} projectName
 * @property {string} builderName
 * @property {number} totalCost
 * @property {number} downPayment
 * @property {number} sanctionedLoanAmount
 * @property {number} annualInterestRate
 * @property {number} loanTenureYears
 * @property {Milestone[]} milestones
 * @property {Invoice[]} invoices
 * @property {Transaction[]} transactions
 */

function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Returns the single Project object from localStorage, or null if none exists.
 */
export async function getProject() {
  await new Promise(r => setTimeout(r, 100));
  return readLocal();
}

/**
 * Saves/overwrites the single Project object in localStorage.
 * @param {Project} projectData
 */
export async function saveProject(projectData) {
  await new Promise(r => setTimeout(r, 100));
  writeLocal(projectData);
  return projectData;
}

/**
 * Clears any stored Project.
 */
export async function clearProject() {
  await new Promise(r => setTimeout(r, 50));
  localStorage.removeItem(STORAGE_KEY);
}

// Utility helpers for simulated workflows

export function generateId(prefix = "id") {
  const rnd = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return `${prefix}_${ts}_${rnd}`;
}

/**
 * Adds or updates an invoice on the stored Project. Returns updated Project.
 * TODO: In a real application, this would be an API call to the backend to ensure real-time updates.
 */
export async function upsertInvoice(invoice) {
  const project = (await getProject()) || null;
  if (!project) throw new Error("No project found to attach invoice.");
  const existingIndex = project.invoices.findIndex(i => i.id === invoice.id);
  if (existingIndex >= 0) {
    project.invoices[existingIndex] = invoice;
  } else {
    project.invoices.push(invoice);
  }
  await saveProject(project);
  return project;
}

/**
 * Appends a transaction and updates invoice status if linked. Returns updated Project.
 * TODO: In a real application, this would be an API call to the backend to ensure real-time updates.
 */
export async function addTransaction(txn) {
  const project = (await getProject()) || null;
  if (!project) throw new Error("No project found to log transaction.");
  project.transactions.push(txn);
  if (txn.invoiceId) {
    const inv = project.invoices.find(i => i.id === txn.invoiceId);
    if (inv) {
      const paid = project.transactions
        .filter(t => t.invoiceId === inv.id && (t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement'))
        .reduce((s, t) => s + (Number(t.amount) || 0), 0);
      inv.status = paid >= Number(inv.amount) ? 'Paid' : (paid > 0 ? 'Partially Paid' : inv.status);
    }
  }
  await saveProject(project);
  return project;
}

/**
 * Seeds a dummy project with milestones and an invoice for quick testing.
 */
export async function seedDummyProject() {
  const demo = {
    projectName: 'Sunrise Meadows - A-704',
    builderName: 'ABC Constructions',
    totalCost: 8000000,
    downPayment: 1000000,
    sanctionedLoanAmount: 6000000,
    annualInterestRate: 8.5,
    loanTenureYears: 20,
    milestones: [
      { id: generateId('ms'), name: 'Foundation', percentageOfCost: 10, isCompleted: true },
      { id: generateId('ms'), name: '1st Floor Slab', percentageOfCost: 12, isCompleted: true },
      { id: generateId('ms'), name: '5th Floor Slab', percentageOfCost: 15, isCompleted: false },
      { id: generateId('ms'), name: 'Brickwork', percentageOfCost: 18, isCompleted: false },
      { id: generateId('ms'), name: 'Finishing', percentageOfCost: 20, isCompleted: false },
    ],
    invoices: [],
    transactions: [],
  };

  // Create one invoice against the second milestone
  const ms = demo.milestones[1];
  const inv = {
    id: generateId('inv'),
    milestoneId: ms.id,
    invoiceNumber: 'INV-10001',
    amount: Math.round((demo.totalCost * ms.percentageOfCost) / 100),
    dueDate: new Date(Date.now() + 5*24*60*60*1000).toISOString(),
    status: 'Due',
  };
  demo.invoices.push(inv);

  // Add a previous bank disbursement and an owner direct payment for realism
  demo.transactions.push({ id: generateId('txn'), invoiceId: inv.id, type: 'Bank Disbursement', amount: Math.round(inv.amount * 0.5), date: new Date(Date.now()-7*24*60*60*1000).toISOString(), notes: 'Initial bank disbursement' });
  demo.transactions.push({ id: generateId('txn'), invoiceId: inv.id, type: 'Owner Direct Payment', amount: Math.round(inv.amount * 0.2), date: new Date(Date.now()-3*24*60*60*1000).toISOString(), notes: 'Owner part payment' });

  await saveProject(demo);
  return demo;
}


