import Link from 'next/link';
import { ArrowRight, Activity, Shield, Zap, Hexagon, ChevronRight, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-indigo-500/30">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Hero Section - Awwwards Style */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-32 lg:pt-56 lg:pb-48 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-2xl mb-12 animate-fade-in-up">
          <Hexagon className="w-4 h-4 text-indigo-500 mr-3 fill-indigo-500/20" />
          <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">Version 2.0 Engineering</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-12 animate-fade-in-up delay-100">
          The <span className="text-white/20">Asset</span> <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Command Center
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-500 font-medium leading-relaxed mb-16 animate-fade-in-up delay-200">
          Orchestrating construction loans, builder milestones, and pre-EMI interest 
          with <span className="text-white">mathematical precision</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-300">
          <Link href="/signin" className="btn-primary px-12 py-5 text-lg rounded-2xl bg-white text-black hover:bg-gray-200 border-none shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all active:scale-95">
            Initialize Project <ArrowRight className="ml-3 w-5 h-5" />
          </Link>
          <Link href="/signin" className="btn-outline px-12 py-5 text-lg rounded-2xl border-white/10 hover:bg-white/5 transition-all">
            Contractor Portal
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
           <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full" />
        </div>
      </section>

      {/* Feature Architecture */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 border-t border-white/5 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           
           <div className="lg:col-span-4 space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">Built for <br/><span className="text-gray-600">Institutional Accuracy</span></h2>
              <p className="text-gray-500 leading-relaxed">We replaced messy spreadsheets with a high-fidelity ledger designed for property owners and real estate partners.</p>
              
              <div className="flex items-center space-x-4 pt-4">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-800" />)}
                 </div>
                 <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Trusted by 500+ Owners</p>
              </div>
           </div>

           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="group card p-10 space-y-8 hover:bg-white/[0.03] transition-all duration-500 border-white/5 hover:border-indigo-500/20">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-7 h-7 text-indigo-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">Dynamic Calculations</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Real-time computation of outstanding principal and pre-EMI interest as the bank releases funds.
                  </p>
                </div>
              </div>

              <div className="group card p-10 space-y-8 hover:bg-white/[0.03] transition-all duration-500 border-white/5 hover:border-orange-500/20">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-orange-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">Scenario Forecasting</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Model lump-sum prepayments and visualize your "Interest Saved" metric across the loan lifecycle.
                  </p>
                </div>
              </div>

              <div className="group card p-10 space-y-8 hover:bg-white/[0.03] transition-all duration-500 border-white/5 hover:border-green-500/20">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-green-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">Fiscal Compliance</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Generate structured PDF ledgers ready for tax filing and annual financial audits.
                  </p>
                </div>
              </div>

              <div className="group card p-10 space-y-8 hover:bg-white/[0.03] transition-all duration-500 border-white/5 hover:border-blue-500/20">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-blue-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">Partner Portal</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Dedicated dashboards for contractors to manage milestones and client payment cycles.
                  </p>
                </div>
              </div>

           </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-white/5 text-center space-y-8">
         <div className="flex justify-center items-center space-x-3 opacity-40">
            <Hexagon className="w-6 h-6" />
            <span className="font-bold tracking-tighter">FINFLOW</span>
         </div>
         <p className="text-xs text-gray-600 font-mono tracking-widest uppercase">&copy; 2026 Architectural Finance Lab</p>
      </footer>

    </div>
  );
}
