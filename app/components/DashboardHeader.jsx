"use client";

import React from "react";

export default function DashboardHeader({
  title,
  subtitle,
  icon: Icon,
  gradientClass = "from-primary-500 to-primary-600",
  actions = [],
}) {
  return (
    <header className="mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-4 mb-6 lg:mb-0">
          <div className={`w-16 h-16 bg-gradient-to-r ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg`}>
            {Icon && <Icon className="w-8 h-8 text-white" />}
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
            <p className="text-slate-400 text-lg">{subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {actions.map(({ label, onClick, icon: AIcon, variant = "ghost" }, idx) => (
            <button
              key={label}
              onClick={onClick}
              className={
                variant === "primary"
                  ? "btn-primary"
                  : variant === "secondary"
                  ? "btn-secondary"
                  : "btn-ghost"
              }
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {AIcon && <AIcon className="w-4 h-4 mr-2" />}
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}


