"use client";

import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import syncManager from '../lib/api/syncManager';

function SyncIndicator() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    const unsubscribe = syncManager.subscribe((project, source) => {
      setSyncing(true);
      setLastSync(new Date());
      
      // Reset syncing indicator after animation
      setTimeout(() => setSyncing(false), 1000);
    });

    return unsubscribe;
  }, []);

  if (!lastSync && !syncing) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        syncing 
          ? 'bg-primary-600 text-white' 
          : 'bg-slate-800 text-slate-300 border border-slate-700'
      }`}>
        <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
        <span className="text-sm font-medium">
          {syncing ? 'Syncing...' : `Synced ${formatTime(lastSync)}`}
        </span>
      </div>
    </div>
  );
}

function formatTime(date) {
  if (!date) return '';
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds
  
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return date.toLocaleTimeString();
}

export default SyncIndicator;
