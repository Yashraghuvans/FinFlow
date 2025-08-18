import React from 'react';
import { Loader2 } from 'lucide-react';

const PreLoader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <img 
              src="favicon.ico" 
              alt="FinFlow Logo" 
              className="w-full h-full rounded-2xl animate-pulse" 
            />
            <div className="absolute inset-0 rounded-2xl bg-primary-500/20 animate-ping"></div>
          </div>
          
          {/* Loading Spinner */}
          <div className="w-16 h-16 border-4 border-slate-700 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white mb-2">FinFlow</h2>
          <p className="text-slate-400 text-sm">Loading your financial dashboard...</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-700 rounded-full mt-8 mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;