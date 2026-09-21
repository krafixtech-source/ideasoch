'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  UserCheck,
  Briefcase,
  Lightbulb,
} from 'lucide-react';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole } = useApp();

  const [email, setEmail] = useState('founder@ideasoch.com');
  const [password, setPassword] = useState('founder123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('IDEA_MAKER');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1-Click Autofill Handlers for Dummy Accounts
  const handleAutofillFounder = () => {
    setSelectedRole('IDEA_MAKER');
    setEmail('founder@ideasoch.com');
    setPassword('founder123');
    setErrorMessage('');
  };

  const handleAutofillInvestor = () => {
    setSelectedRole('INVESTOR');
    setEmail('investor@ideasoch.com');
    setPassword('investor123');
    setErrorMessage('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    setTimeout(() => {
      // Authenticate Dummy Idea Person (Founder)
      if (
        cleanEmail === 'founder@ideasoch.com' ||
        cleanEmail === 'rahul.sharma@cleangrid.tech' ||
        cleanEmail.includes('founder')
      ) {
        if (cleanPassword && cleanPassword !== '') {
          switchRole('IDEA_MAKER');
          router.push('/dashboard/founder');
          return;
        } else {
          setErrorMessage('Please enter your password (e.g. founder123).');
          setIsLoading(false);
          return;
        }
      }

      // Authenticate Dummy Investor
      if (
        cleanEmail === 'investor@ideasoch.com' ||
        cleanEmail === 'rajiv@mehtaventures.in' ||
        cleanEmail.includes('investor')
      ) {
        if (cleanPassword && cleanPassword !== '') {
          switchRole('INVESTOR');
          router.push('/dashboard/investor');
          return;
        } else {
          setErrorMessage('Please enter your password (e.g. investor123).');
          setIsLoading(false);
          return;
        }
      }

      // Authenticate Platform Admin
      if (cleanEmail === 'admin@ideasoch.com' || cleanEmail.includes('admin')) {
        switchRole('ADMIN');
        router.push('/admin');
        return;
      }

      // Default fallback: If custom email entered with role selection
      if (selectedRole === 'INVESTOR') {
        switchRole('INVESTOR');
        router.push('/dashboard/investor');
      } else {
        switchRole('IDEA_MAKER');
        router.push('/dashboard/founder');
      }
    }, 350);
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-3">
            <span className="font-semibold text-2xl tracking-tight text-[#16587B]">
              IDEA<span className="font-light tracking-widest text-[#5B0015] ml-0.5">SOCH</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#84B3CE] inline-block mb-1"></span>
          </Link>
          <h1 className="text-2xl font-normal text-[#16587B] tracking-tight">
            Sign in to Ideasoch
          </h1>
          <p className="text-xs text-[#16587B]/75 mt-1">
            Neutral direct mediator connecting founders and accredited investors.
          </p>
        </div>

        {/* Dummy Credentials Callout Box */}
        <div className="mb-6 p-4 rounded-xl bg-[#84B3CE]/15 border border-[#84B3CE]/40 text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#84B3CE]/30">
            <span className="font-semibold text-[#16587B] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <KeyRound className="w-3.5 h-3.5 text-[#5B0015]" />
              Demo Accounts &amp; Credentials
            </span>
            <span className="text-[10px] bg-[#5B0015] text-[#fcfaf5] px-2 py-0.5 rounded font-medium">
              1-Click Ready
            </span>
          </div>

          <div className="space-y-2">
            {/* Founder Dummy Card */}
            <div
              onClick={handleAutofillFounder}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                selectedRole === 'IDEA_MAKER' && email === 'founder@ideasoch.com'
                  ? 'bg-[#fcfaf5] border-[#5B0015] shadow-xs'
                  : 'bg-[#fcfaf5]/60 border-[#84B3CE]/35 hover:bg-[#fcfaf5]'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#5B0015]/10 flex items-center justify-center text-[#5B0015]">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-[#16587B] text-xs">
                    Idea Person / Founder
                  </div>
                  <div className="text-[11px] font-mono text-[#16587B]/80">
                    ID: <span className="font-semibold">founder@ideasoch.com</span> · Pass: <span className="font-semibold">founder123</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-[10px] font-semibold text-[#5B0015] border border-[#5B0015]/30 rounded px-2 py-1 bg-[#5B0015]/5 hover:bg-[#5B0015] hover:text-[#fcfaf5] transition-colors"
              >
                Autofill
              </button>
            </div>

            {/* Investor Dummy Card */}
            <div
              onClick={handleAutofillInvestor}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                selectedRole === 'INVESTOR' && email === 'investor@ideasoch.com'
                  ? 'bg-[#fcfaf5] border-[#16587B] shadow-xs'
                  : 'bg-[#fcfaf5]/60 border-[#84B3CE]/35 hover:bg-[#fcfaf5]'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#16587B]/10 flex items-center justify-center text-[#16587B]">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-[#16587B] text-xs">
                    Accredited Investor
                  </div>
                  <div className="text-[11px] font-mono text-[#16587B]/80">
                    ID: <span className="font-semibold">investor@ideasoch.com</span> · Pass: <span className="font-semibold">investor123</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-[10px] font-semibold text-[#16587B] border border-[#16587B]/30 rounded px-2 py-1 bg-[#16587B]/5 hover:bg-[#16587B] hover:text-[#fcfaf5] transition-colors"
              >
                Autofill
              </button>
            </div>
          </div>
        </div>

        {/* Main Login Form Card */}
        <div className="border border-[#84B3CE]/35 rounded-2xl p-6 bg-[#fcfaf5] shadow-xs">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-[#5B0015]/10 border border-[#5B0015]/30 text-xs text-[#5B0015]">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#16587B] mb-1">
                Account ID / Email Address
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.includes('investor')) setSelectedRole('INVESTOR');
                  else if (e.target.value.includes('founder')) setSelectedRole('IDEA_MAKER');
                }}
                placeholder="e.g. founder@ideasoch.com"
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-[#16587B]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#16587B]/70 hover:text-[#16587B] flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#5B0015] text-[#fcfaf5] rounded-xl text-xs font-semibold hover:bg-[#43000f] transition-all shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              <span>{isLoading ? 'Signing In...' : `Sign In as ${selectedRole === 'INVESTOR' ? 'Investor' : 'Founder'}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Role Indicator Preview */}
          <div className="mt-5 pt-4 border-t border-[#84B3CE]/25 flex items-center justify-between text-[11px] text-[#16587B]/70">
            <span>Target Dashboard:</span>
            <span className="font-semibold text-[#16587B]">
              {selectedRole === 'INVESTOR' ? 'Investor Deal Desk (5 chats quota)' : 'Founder Workspace (2 ideas free)'}
            </span>
          </div>

          <div className="pt-4 mt-4 border-t border-[#84B3CE]/25 text-center text-xs text-[#16587B]/75">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="font-semibold text-[#5B0015] hover:underline">
              Create an Account / Register
            </Link>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-[#16587B]/70 hover:text-[#16587B]">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
