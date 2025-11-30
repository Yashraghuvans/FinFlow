import React, { useState } from 'react';
import { generateId, saveProject } from '../lib/api/projectTrackerApi';
import { toast } from 'react-toastify';
import CreateMilestoneDialog from './CreateMilestoneDialog';
import { Trash2, Edit2 } from 'lucide-react';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMilestone = (milestoneData) => {
    const newMilestone = {
      id: generateId('ms'),
      ...milestoneData,
    };
    setMilestones(prev => [...prev, newMilestone]);
    toast.success('Milestone added successfully!');
  };

  const handleRemoveMilestone = (id) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
    toast.info('Milestone removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      toast.success('Project saved and synced successfully!');
      onSubmit?.(newProject);
    } catch (error) {
      toast.error('Failed to save project');
      console.error(error);
    }
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
        <div>
          <h3 className="text-white font-medium">Milestones</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {milestones.length > 0 
              ? `${milestones.reduce((sum, m) => sum + m.percentageOfCost, 0)}% of project allocated`
              : 'No milestones added yet'}
          </p>
        </div>
        <button 
          type="button" 
          className="btn-primary text-sm px-4 py-2" 
          onClick={() => setIsDialogOpen(true)}
        >
          + Add Milestone
        </button>
      </div>
      
      {milestones.length > 0 ? (
        <ul className="space-y-2">
          {milestones.map(m => (
            <li key={m.id} className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors group">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{m.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-primary-500/20 text-primary-400 border border-primary-500/30">
                    {m.percentageOfCost}%
                  </span>
                </div>
                {m.description && (
                  <p className="text-xs text-slate-400 mt-1">{m.description}</p>
                )}
                {m.expectedDate && (
                  <p className="text-xs text-slate-500 mt-1">
                    Expected: {new Date(m.expectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMilestone(m.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-error-500/20 rounded-lg text-slate-400 hover:text-error-400"
                title="Remove milestone"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 bg-slate-800/30 border border-slate-700 border-dashed rounded-lg">
          <p className="text-slate-400 text-sm">No milestones added yet</p>
          <p className="text-slate-500 text-xs mt-1">Click "Add Milestone" to create your first milestone</p>
        </div>
      )}

      <CreateMilestoneDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddMilestone}
        existingMilestones={milestones}
      />
      <button type="submit" className="btn btn-primary w-full">Save Project</button>
    </form>
  );
}

export default ProjectSetupForm;


