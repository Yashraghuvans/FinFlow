"use client";

import React from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  gradientClass = "from-primary-500 to-primary-600",
  trend,
  trendType, // 'positive' | 'negative' | 'neutral'
}) {
  return (
    <div className="group card hover:transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
        {trend != null && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trendType === "positive"
                ? "bg-success-500/20 text-success-400"
                : trendType === "negative"
                ? "bg-error-500/20 text-error-400"
                : "bg-slate-500/20 text-slate-300"
            }`}
          >
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        <div className="w-full bg-slate-700 rounded-full h-1">
          <div
            className={`h-1 rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-1000`}
            style={{ width: "72%" }}
          />
        </div>
      </div>
    </div>
  );
}


