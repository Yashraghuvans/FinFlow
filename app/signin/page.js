'use client';

import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
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
        router.push('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

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
    <div className="page-shell flex min-h-[calc(100vh-var(--nav-height))] items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.12)_0%,_transparent_55%)]" aria-hidden />

      <div className="w-full max-w-md animate-fade-in-up">
        <div className="card p-8 sm:p-10">
          <div className="mb-8 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-lg font-semibold text-indigo-300">
              F
            </span>
            <h1 className="text-2xl font-semibold text-white">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {isLogin
                ? 'Sign in to open your dashboard.'
                : 'Choose your role and start tracking your project.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <span className="label-field">I am a</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`rounded-[var(--radius-md)] border px-3 py-2.5 text-sm font-medium transition-colors ${
                      role === 'user'
                        ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-200'
                        : 'border-[color:var(--surface-border)] bg-black/20 text-zinc-400 hover:bg-white/5'
                    }`}
                  >
                    Property owner
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('contractor')}
                    className={`rounded-[var(--radius-md)] border px-3 py-2.5 text-sm font-medium transition-colors ${
                      role === 'contractor'
                        ? 'border-teal-500/50 bg-teal-500/15 text-teal-200'
                        : 'border-[color:var(--surface-border)] bg-black/20 text-zinc-400 hover:bg-white/5'
                    }`}
                  >
                    Contractor
                  </button>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="label-field">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="label-field mb-0">Password</label>
                {isLogin && (
                  <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300">
                    Forgot?
                  </Link>
                )}
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="••••••••"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full py-3">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-label="Loading" />
              ) : (
                <>
                  {isLogin ? 'Sign in' : 'Sign up'}
                  <ArrowRight className="h-4 w-4 opacity-80" aria-hidden />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-medium text-white hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
