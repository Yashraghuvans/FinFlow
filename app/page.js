import Link from 'next/link';
import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up">
          <span className="flex w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
          <span className="text-xs font-medium tracking-wide text-gray-300 uppercase">FinFlow 2.0 is live</span>
        </div>
        
        <h1 className="max-w-5xl mx-auto animate-fade-in-up delay-100 mb-8">
          The Ledger for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
            Construction Loans
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up delay-200">
          Stop using spreadsheets to track builder disbursements and pre-EMI interest. 
          FinFlow is the single source of truth for your under-construction property.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300">
          <Link href="/dashboard" className="btn-primary">
            Enter Dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link href="/about" className="btn-outline">
            View Live Demo
          </Link>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="card group hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
              <Activity className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="mb-3 text-white">Dynamic Calculations</h3>
            <p className="text-sm">
              We automatically compute outstanding principal and pre-EMI interest based on bank disbursements in real-time.
            </p>
          </div>

          <div className="card group hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="mb-3 text-white">Scenario Forecasting</h3>
            <p className="text-sm">
              Model lump-sum prepayments or "pay-yourself-instead-of-bank" scenarios to see how much interest you save.
            </p>
          </div>

          <div className="card group hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="mb-3 text-white">Tax Ready Exports</h3>
            <p className="text-sm">
              Generate a clean, PDF ledger of your total interest paid to hand straight to your CA during tax season.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
