"use client";

// Simple localStorage-backed API service. Replace with real HTTP later without touching hooks/UI.
const STORAGE_KEY = "finflow_loans";

function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function fetchLoans() {
  await new Promise(r => setTimeout(r, 200));
  return readLocal();
}

export async function createLoan(loan) {
  await new Promise(r => setTimeout(r, 150));
  const all = readLocal();
  const updated = [...all, loan];
  writeLocal(updated);
  return loan;
}

export async function replaceLoans(loans) {
  await new Promise(r => setTimeout(r, 150));
  writeLocal(loans);
  return loans;
}


