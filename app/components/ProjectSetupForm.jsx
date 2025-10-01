import React, { useState } from 'react';
import { generateId, saveProject } from '../lib/api/projectTrackerApi';

function ProjectSetupForm({ onSubmit, className = "" }) {
  const [formData, setFormData] = useState({
    projectName: '',
    builderName: '',
    totalCost: '',
    downPayment: '',
    sanctionedLoanAmount: '',
    annualInterestRate: '',
    loanTenureYears: '',
  });
  const [milestones, setMilestones] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addMilestone = () => {
    const name = prompt('Milestone name (e.g., Foundation):');
    if (!name) return;
    const pctStr = prompt('Percentage of total cost (number):', '10');
    const percentageOfCost = Number(pctStr) || 0;
    setMilestones(prev => [...prev, { id: generateId('ms'), name, percentageOfCost, isCompleted: false }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      projectName: formData.projectName,
      builderName: formData.builderName,
      totalCost: Number(formData.totalCost) || 0,
      downPayment: Number(formData.downPayment) || 0,
      sanctionedLoanAmount: Number(formData.sanctionedLoanAmount) || 0,
      annualInterestRate: Number(formData.annualInterestRate) || 0,
      loanTenureYears: Number(formData.loanTenureYears) || 0,
      milestones,
      invoices: [],
      transactions: [],
    };
    await saveProject(newProject);
    // TODO: In a real application, this would be an API call to the backend to ensure real-time updates.
    onSubmit?.(newProject);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500" name="projectName" placeholder="Project Name" value={formData.projectName} onChange={handleChange} />
        <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500" name="builderName" placeholder="Builder Name" value={formData.builderName} onChange={handleChange} />
        <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500" name="totalCost" placeholder="Total Cost" value={formData.totalCost} onChange={handleChange} />
        <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500" name="downPayment" placeholder="Down Payment" value={formData.downPayment} onChange={handleChange} />
        <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500" name="sanctionedLoanAmount" placeholder="Sanctioned Loan Amount" value={formData.sanctionedLoanAmount} onChange={handleChange} />
        <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500" name="annualInterestRate" placeholder="Annual Interest Rate (%)" value={formData.annualInterestRate} onChange={handleChange} />
        <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500" name="loanTenureYears" placeholder="Loan Tenure (years)" value={formData.loanTenureYears} onChange={handleChange} />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium">Milestones</h3>
        <button type="button" className="btn btn-secondary" onClick={addMilestone}>Add Milestone</button>
      </div>
      <ul className="space-y-2">
        {milestones.map(m => (
          <li key={m.id} className="flex items-center justify-between p-2 bg-slate-800 rounded text-gray-200">
            <span>{m.name} - {m.percentageOfCost}%</span>
            <span className="text-xs text-gray-400">{m.isCompleted ? 'Completed' : 'Pending'}</span>
          </li>
        ))}
      </ul>
      <button type="submit" className="btn btn-primary w-full">Save Project</button>
    </form>
  );
}

export default ProjectSetupForm;


