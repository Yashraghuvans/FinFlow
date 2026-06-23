'use client';

import Link from 'next/link';
import { Hexagon, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        // AuthContext will handle state, we just redirect
        // Ideally we redirect based on role. We can fetch role or wait for context.
        // For now, let's just push to /dashboard (which will redirect) or check context in a wrapper.
        // Actually, let's let a ProtectedRoute or the Dashboard index handle the redirect, 
        // or push directly based on role if we fetch it here.
        // Let's redirect to a generic /dashboard which routes to correct one.
        router.push('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Save role in Firestore
        const collectionName = role === 'contractor' ? 'contractors' : 'users';
        await setDoc(doc(db, collectionName, user.uid), {
          email: user.email,
          role: role,
          createdAt: new Date().toISOString()
        });

        toast.success("Account created successfully!");
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[var(--surface)] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative z-10 animate-fade-in-up">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white">
            <Hexagon className="w-8 h-8" strokeWidth={1.5} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          {isLogin ? "Sign in to access your dashboard" : "Sign up to start tracking projects"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">I am a</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`flex-1 py-2 px-4 rounded-xl border transition-all text-sm font-medium ${role === 'user' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                  Property Owner
                </button>
                <button
                  type="button"
                  onClick={() => setRole('contractor')}
                  className={`flex-1 py-2 px-4 rounded-xl border transition-all text-sm font-medium ${role === 'contractor' ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                  Contractor
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" 
              placeholder="you@example.com" 
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
              {isLogin && <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot?</Link>}
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" 
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary mt-4 flex justify-center items-center group disabled:opacity-70">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isLogin ? "Sign In" : "Sign Up"} 
                <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="ml-2 text-white hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>

      </div>
    </div>
  );
}
