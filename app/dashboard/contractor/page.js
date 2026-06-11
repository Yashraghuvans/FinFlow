'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, Users, FileText, CheckCircle, Plus, Search, ExternalLink, ArrowUpRight, Hexagon, BarChart3, AlertCircle } from 'lucide-react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';

export default function ContractorDashboard() {
  const { user, role, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [clients, setClients] = useState([]);
  const [fetchingClients, setFetchingClients] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || role !== 'contractor')) {
      router.push('/signin');
    }
  }, [user, role, authLoading, router]);

  useEffect(() => {
    if (user && role === 'contractor') {
       // Simulate initial load reveal
       setTimeout(() => setFetching(false), 800);
    }
  }, [user, role]);

  useEffect(() => {
    if (activeTab === 'clients' && user) {
      fetchClients();
    }
  }, [activeTab, user]);

  const fetchClients = async () => {
    setFetchingClients(true);
    try {
      // SECURE: Filter users by assignedContractorId
      const q = query(
        collection(db, 'users'), 
        where('assignedContractorId', '==', user.uid)
      ); 
      const querySnapshot = await getDocs(q);
      const fetchedClients = [];
      querySnapshot.forEach((doc) => {
        fetchedClients.push({ id: doc.id, ...doc.data() });
      });
      setClients(fetchedClients);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    } finally {
      setFetchingClients(false);
    }
  };

  if (authLoading || fetching) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="h-16 w-1/3 bg-white/5 rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
          <div className="h-96 bg-white/5 rounded-[2.5rem] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 space-y-16">
      
      {/* Header with Dramatic Scale */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-12 animate-fade-in-up">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-orange-400 font-mono text-sm tracking-[0.2em] uppercase">
             <div className="w-4 h-4 bg-orange-500/20 rounded rotate-45 border border-orange-500/30" />
            <span>Contractor Control</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white">
            Partner <span className="text-white/40 font-light">Portal</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
            Overseeing <span className="text-white">{clients.length} projects</span> across your organization.
          </p>
        </div>
        
        <div className="flex flex-col items-start lg:items-end space-y-4">
           <div className="flex items-center px-5 py-2.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-300 text-sm font-semibold tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-3 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
            {user.email}
          </div>
          <p className="text-gray-600 text-sm font-mono tracking-tighter">API V1.0 Connected</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex items-center space-x-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit animate-fade-in-up delay-100 overflow-x-auto max-w-full">
        {['overview', 'clients', 'invoices'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 text-sm font-bold rounded-xl transition-all duration-300 capitalize tracking-wide whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-white text-black shadow-xl scale-[1.02]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <div className="space-y-12 animate-fade-in-up delay-200">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group card p-8 hover:-translate-y-2 transition-all duration-500 border-white/5 hover:border-orange-500/20">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-orange-400" />
                </div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Portfolio Reach</h4>
                <p className="text-5xl font-black text-white">{clients.length}</p>
                <p className="text-sm text-gray-500 mt-4">Active project owners</p>
              </div>

              <div className="group card p-8 hover:-translate-y-2 transition-all duration-500 border-white/5 hover:border-blue-500/20">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-blue-400" />
                </div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Outstanding Dues</h4>
                <p className="text-5xl font-black text-white">₹0<span className="text-xl text-gray-600">L</span></p>
                <p className="text-sm text-gray-500 mt-4">Pending invoice value</p>
              </div>

              <div className="group card p-8 hover:-translate-y-2 transition-all duration-500 border-white/5 hover:border-green-500/20">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Disbursement Rate</h4>
                <p className="text-5xl font-black text-white">0%</p>
                <p className="text-sm text-gray-500 mt-4">Avg. bank release speed</p>
              </div>
           </div>

           <div className="card p-12 bg-white/[0.01] border-dashed border-white/10 flex flex-col items-center text-center space-y-6">
              <BarChart3 className="w-16 h-16 text-gray-800" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Revenue Intelligence</h3>
                <p className="text-gray-500 max-w-sm">Detailed cash-flow projections and builder milestone tracking will appear here as clients log data.</p>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="space-y-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  placeholder="Search project owners..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                />
             </div>
             <button className="btn-primary bg-orange-600 hover:bg-orange-700 text-white flex items-center px-8">
               <Plus className="w-4 h-4 mr-2" /> Invite New Project
             </button>
          </div>

          <div className="card p-0 border-white/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
               <span>Owner Entity</span>
               <span className="hidden md:block">Engagement Status</span>
               <span>Actions</span>
            </div>
            
            {fetchingClients ? (
              <div className="py-24 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-orange-500/50" /></div>
            ) : clients.length > 0 ? (
              <div className="divide-y divide-white/5">
                {clients.map((c) => (
                  <div key={c.id} className="group flex items-center justify-between p-8 hover:bg-white/[0.03] transition-all">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-white font-bold group-hover:border-orange-500/50 transition-colors">
                        {c.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{c.email}</p>
                        <p className="text-xs text-gray-500 font-mono tracking-tighter uppercase mt-1">UID: {c.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-black text-green-400 uppercase tracking-widest">
                       <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                       <span>Connected</span>
                    </div>

                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center space-y-4">
                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-gray-700" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-white font-bold">Project database is empty</p>
                    <p className="text-gray-500 text-sm">Start by inviting your first property owner to the platform.</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="card p-32 text-center border-white/5 bg-transparent flex flex-col items-center space-y-8 animate-fade-in-up">
           <div className="w-24 h-24 bg-blue-500/10 rounded-[2rem] flex items-center justify-center">
              <FileText className="w-10 h-10 text-blue-400" />
           </div>
           <div className="max-w-md space-y-4">
              <h3 className="text-3xl font-bold text-white">Invoice Engine</h3>
              <p className="text-gray-500 leading-relaxed">Generate GST-compliant invoices and send them directly to your clients' ledgers.</p>
           </div>
           <button className="btn-primary bg-blue-600 hover:bg-blue-700 border-none px-12 py-4 text-lg">System Offline &rarr;</button>
        </div>
      )}

    </div>
  );
}
