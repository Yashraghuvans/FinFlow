"use client";

const STORAGE_KEY = "finflow_projects";

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

export async function fetchProjects() {
  await new Promise(r => setTimeout(r, 200));
  return readLocal();
}

export async function createProject(project) {
  await new Promise(r => setTimeout(r, 150));
  const all = readLocal();
  const updated = [...all, project];
  writeLocal(updated);
  return project;
}

export async function replaceProjects(projects) {
  await new Promise(r => setTimeout(r, 150));
  writeLocal(projects);
  return projects;
}


