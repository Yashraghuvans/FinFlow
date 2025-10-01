import React from 'react';

function MilestoneTracker({ milestones = [] }) {
  if (!milestones?.length) {
    return <div className="card"><h2 className="text-lg font-semibold mb-4 text-white">Milestones</h2><p className="text-gray-400">No milestones added.</p></div>;
  }
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-white">Milestones</h2>
      <ul className="space-y-3">
        {milestones.map(m => (
          <li key={m.id} className="flex items-center justify-between p-3 bg-slate-800 rounded">
            <div>
              <div className="text-white font-medium">{m.name}</div>
              <div className="text-xs text-gray-400">{m.percentageOfCost}% of total cost</div>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${m.isCompleted ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
              {m.isCompleted ? 'Completed' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MilestoneTracker;


