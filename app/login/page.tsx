'use client';

import { useActionState, useState } from 'react';
import { loginAction } from '@/app/actions';
import Link from 'next/link';
import { Car, Lock, User, LogIn, ShieldAlert, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const fillCustomer = () => {
    setUsernameInput('customer');
    setPasswordInput('customer123');
  };

  const fillAdmin = () => {
    setUsernameInput('admin');
    setPasswordInput('admin123');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B132B] px-8 py-8 text-center text-white relative">
          <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#2563EB]/30">
            <Car className="w-8 h-8 text-[#22D3EE]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Sign in to manage your vehicle rentals or fleet
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {state?.error && (
            <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs font-medium rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-[#EF4444]" />
              <span>{state.error}</span>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="username"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. customer or admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  name="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md shadow-[#2563EB]/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{isPending ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Quick Demo Fillers */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Quick Demo Credentials</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={fillCustomer}
                className="text-left p-3 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/50 transition group cursor-pointer"
              >
                <div className="text-xs font-bold text-[#0B132B] group-hover:text-[#2563EB]">
                  Customer
                </div>
                <div className="text-[11px] text-[#64748B] font-mono mt-0.5">customer / customer123</div>
              </button>

              <button
                type="button"
                onClick={fillAdmin}
                className="text-left p-3 rounded-xl border border-slate-200 hover:border-[#F59E0B] hover:bg-amber-50/50 transition group cursor-pointer"
              >
                <div className="text-xs font-bold text-[#0B132B] group-hover:text-[#F59E0B]">
                  Administrator
                </div>
                <div className="text-[11px] text-[#64748B] font-mono mt-0.5">admin / admin123</div>
              </button>
            </div>

            <div className="mt-5 text-center text-xs text-[#64748B]">
              Need a new customer account?{' '}
              <Link href="/register" className="font-bold text-[#2563EB] hover:underline">
                Create Account (Sign Up)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
