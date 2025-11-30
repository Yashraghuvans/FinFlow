"use client";

import React, { useState } from 'react';
import { X, Plus, Calendar, Percent, FileText, AlertCircle } from 'lucide-react';

function CreateMilestoneDialog({ isOpen, onClose, onSubmit, existingMilestones = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    percentageOfCost: '',
    description: '',
    expectedDate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Milestone name is required';
    }

    const percentage = parseFloat(formData.percentageOfCost);
    if (!formData.percentageOfCost || isNaN(percentage)) {
      newErrors.percentageOfCost = 'Percentage is required';
    } else if (percentage <= 0 || percentage > 100) {
      newErrors.percentageOfCost = 'Percentage must be between 0 and 100';
    } else {
      // Check if total percentage exceeds 100
      const totalExisting = existingMilestones.reduce((sum, m) => sum + (Number(m.percentageOfCost) || 0), 0);
      if (totalExisting + percentage > 100) {
        newErrors.percentageOfCost = `Total would exceed 100% (current: ${totalExisting}%)`;
      }
    }

    if (formData.expectedDate) {
      const selectedDate = new Date(formData.expectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.expectedDate = 'Expected date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const milestone = {
        name: formData.name.trim(),
        percentageOfCost: parseFloat(formData.percentageOfCost),
        description: formData.description.trim(),
        expectedDate: formData.expectedDate || null,
        isCompleted: false,
      };
      
      onSubmit(milestone);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      percentageOfCost: '',
      description: '',
      expectedDate: '',
    });
    setErrors({});
    onClose();
  };

  const totalPercentage = existingMilestones.reduce((sum, m) => sum + (Number(m.percentageOfCost) || 0), 0);
  const remainingPercentage = 100 - totalPercentage;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Create New Milestone</h2>
                <p className="text-sm text-slate-400 mt-0.5">Add a construction milestone to track progress</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-700 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Info */}
          {existingMilestones.length > 0 && (
            <div className="px-6 pt-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Project Allocation</span>
                  <span className="text-sm font-medium text-white">{totalPercentage}% / 100%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      totalPercentage >= 100 ? 'bg-error-500' : 
                      totalPercentage >= 80 ? 'bg-warning-500' : 
                      'bg-success-500'
                    }`}
                    style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Percent className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">
                    {remainingPercentage > 0 
                      ? `${remainingPercentage}% remaining to allocate` 
                      : 'Project fully allocated'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Milestone Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Milestone Name <span className="text-error-400">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Foundation & Basement"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 border ${
                    errors.name ? 'border-error-500' : 'border-slate-700'
                  } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 mt-1.5 text-error-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Percentage and Expected Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Percentage of Cost */}
              <div>
                <label htmlFor="percentageOfCost" className="block text-sm font-medium text-slate-300 mb-2">
                  Percentage of Cost <span className="text-error-400">*</span>
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    id="percentageOfCost"
                    name="percentageOfCost"
                    value={formData.percentageOfCost}
                    onChange={handleChange}
                    placeholder="e.g., 15"
                    min="0"
                    max="100"
                    step="0.1"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 border ${
                      errors.percentageOfCost ? 'border-error-500' : 'border-slate-700'
                    } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.percentageOfCost && (
                  <div className="flex items-center gap-1 mt-1.5 text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.percentageOfCost}</span>
                  </div>
                )}
              </div>

              {/* Expected Date */}
              <div>
                <label htmlFor="expectedDate" className="block text-sm font-medium text-slate-300 mb-2">
                  Expected Completion Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    id="expectedDate"
                    name="expectedDate"
                    value={formData.expectedDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 border ${
                      errors.expectedDate ? 'border-error-500' : 'border-slate-700'
                    } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.expectedDate && (
                  <div className="flex items-center gap-1 mt-1.5 text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.expectedDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Excavation, foundation laying, basement construction"
                rows="3"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              />
              <div className="text-xs text-slate-500 mt-1.5">
                Provide additional details about this milestone
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-500 hover:to-primary-400 transition-all font-medium shadow-lg shadow-primary-500/30 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Milestone
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default CreateMilestoneDialog;
