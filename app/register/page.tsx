'use client';

import { useActionState, useState } from 'react';
import { registerAction } from '@/app/actions';
import Link from 'next/link';
import { Lock, User, UserPlus, ShieldAlert } from 'lucide-react';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B132B] px-8 py-8 text-center text-white relative">
          <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#2563EB]/30">
            <UserPlus className="w-8 h-8 text-[#22D3EE]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Create Account</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Register as a customer to rent vehicles instantly
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {state?.error && (
            <div className="p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs font-medium rounded-xl flex items-center gap-2">
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. john_doe"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 4 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md shadow-[#2563EB]/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isPending ? 'Creating Account...' : 'Sign Up as Customer'}</span>
            </button>
          </form>

          {/* Footer link to login */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-[#64748B]">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#2563EB] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
