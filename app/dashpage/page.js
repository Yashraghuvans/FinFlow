import Link from 'next/link';
import React from 'react';
import NavBar from '../components/navbar';
import Image from 'next/image';
import { Building2, Home, ArrowRight, TrendingUp, Calculator } from 'lucide-react';

const DashPage = () => {
    const dashboardOptions = [
        {
            title: "Contractor Dashboard",
            description: "Access comprehensive analytics and tools tailored for contractors to manage projects efficiently.",
            icon: Building2,
            image: "/img2.png",
            href: "/contractorDashboard",
            gradientClass: "from-primary-600 to-primary-800",
            features: ["Project Management", "Budget Analysis", "Profit/Loss Tracking", "Resource Planning"],
            colorClass: "bg-primary-500"
        },
        {
            title: "Owner Dashboard",
            description: "Gain insights and manage your properties with advanced analytics as an owner.",
            icon: Home,
            image: "/img1.png",
            href: "/ownerDashboard",
            gradientClass: "from-teal-600 to-teal-800",
            features: ["EMI Calculator", "Loan Tracking", "Interest Analysis", "Payment Optimization"],
            colorClass: "bg-teal-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <NavBar />
            
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white">
                            Select Your{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Choose the dashboard that best fits your role and start managing your financial data with powerful insights.
                        </p>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                        {dashboardOptions.map((option, index) => {
                            const Icon = option.icon;
                            return (
                                <div 
                                    key={option.title}
                                    className="group animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
                                        {/* Header with Icon */}
                                        <div className={`relative h-48 bg-gradient-to-r ${option.gradientClass} flex items-center justify-center p-8`}>
                                            <div className="absolute inset-0 bg-black/20"></div>
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                                    <Icon className="w-10 h-10 text-white" />
                                                </div>
                                                <Image
                                                    height={80}
                                                    width={80}
                                                    src={option.image}
                                                    alt={`${option.title} Icon`}
                                                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8">
                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                                                {option.title}
                                            </h3>
                                            <p className="text-slate-300 mb-6 leading-relaxed">
                                                {option.description}
                                            </p>

                                            {/* Features List */}
                                            <div className="mb-8">
                                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
                                                    Key Features
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {option.features.map((feature, featureIndex) => (
                                                        <div key={feature} className="flex items-center space-x-2">
                                                            <div className={`w-2 h-2 rounded-full ${option.colorClass}`}></div>
                                                            <span className="text-sm text-slate-300">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <Link href={option.href}>
                                                <button className="w-full group/btn relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus-ring overflow-hidden">
                                                    <span className="relative z-10 flex items-center">
                                                        View Dashboard
                                                        <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                    </span>
                                                    <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Info Section */}
                    <div className="mt-20 text-center animate-fade-in-up animation-delay-500">
                        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 md:p-12 max-w-4xl mx-auto">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center">
                                    <TrendingUp className="w-8 h-8 text-primary-400" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Powerful Analytics at Your Fingertips
                            </h3>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                                Both dashboards provide comprehensive financial insights, real-time data visualization, 
                                and advanced reporting capabilities to help you make informed decisions.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 text-slate-400">
                                <div className="flex items-center space-x-2">
                                    <Calculator className="w-5 h-5 text-primary-400" />
                                    <span className="text-sm font-medium">Advanced Calculators</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-success-400" />
                                    <span className="text-sm font-medium">Real-time Analytics</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Building2 className="w-5 h-5 text-warning-400" />
                                    <span className="text-sm font-medium">Project Management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashPage;