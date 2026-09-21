'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  X,
  Lock,
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  Briefcase,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  initialRole?: 'IDEA_MAKER' | 'INVESTOR';
  redirectUrl?: string;
  title?: string;
  subtitle?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'IDEA_MAKER',
  redirectUrl,
  title,
  subtitle,
}) => {
  const router = useRouter();
  const { switchRole } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'IDEA_MAKER' | 'INVESTOR'>(initialRole);

  // Form fields
  const [email, setEmail] = useState(initialRole === 'INVESTOR' ? 'investor@ideasoch.com' : 'founder@ideasoch.com');
  const [password, setPassword] = useState(initialRole === 'INVESTOR' ? 'investor123' : 'founder123');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedRole(initialRole);
      setEmail(initialRole === 'INVESTOR' ? 'investor@ideasoch.com' : 'founder@ideasoch.com');
      setPassword(initialRole === 'INVESTOR' ? 'investor123' : 'founder123');
      setErrorMessage('');
    }
  }, [isOpen, initialMode, initialRole]);

  if (!isOpen) return null;

  const defaultTitle = mode === 'login'
    ? (selectedRole === 'INVESTOR' ? 'Sign in to Explore Ideas & Backers' : 'Sign in to Submit Your Idea')
    : (selectedRole === 'INVESTOR' ? 'Create an Accredited Investor Account' : 'Create Free Founder Account');

  const defaultSubtitle = mode === 'login'
    ? (selectedRole === 'INVESTOR' ? 'Accredited backers receive 5 bilateral chats to connect with founders directly.' : 'Founders receive 2 active idea slots free with endless investor reach.')
    : (selectedRole === 'INVESTOR' ? 'Undergo mandatory 24h security clearance to access proprietary startup dossiers.' : 'Publish your 7-part brief and pitch unlimited verified investors with 0% platform fee.');

  const handleSelectRole = (role: 'IDEA_MAKER' | 'INVESTOR') => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'INVESTOR') {
      setEmail('investor@ideasoch.com');
      setPassword('investor123');
    } else {
      setEmail('founder@ideasoch.com');
      setPassword('founder123');
    }
  };

  const handle1ClickDemo = (role: 'IDEA_MAKER' | 'INVESTOR') => {
    setIsLoading(true);
    switchRole(role);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (role === 'INVESTOR') {
        router.push('/dashboard/investor');
      } else {
        router.push('/dashboard/founder');
      }
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    setTimeout(() => {
      if (!cleanPassword) {
        setErrorMessage('Please enter your password.');
        setIsLoading(false);
        return;
      }

      if (mode === 'signup') {
        if (!cleanEmail) {
          setErrorMessage('Please enter a valid email.');
          setIsLoading(false);
          return;
        }
        // Signup success
        switchRole(selectedRole);
        setIsLoading(false);
        onClose();
        if (selectedRole === 'INVESTOR') {
          router.push('/register');
        } else {
          router.push(redirectUrl || '/submit-idea');
        }
        return;
      }

      // Login mode
      if (cleanEmail.includes('investor') || selectedRole === 'INVESTOR') {
        switchRole('INVESTOR');
        setIsLoading(false);
        onClose();
        router.push(redirectUrl || '/ideas');
      } else {
        switchRole('IDEA_MAKER');
        setIsLoading(false);
        onClose();
        router.push(redirectUrl || '/submit-idea');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#16587B]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#fcfaf5] border border-[#84B3CE]/40 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-7 text-[#16587B]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#16587B]/70 hover:text-[#16587B] hover:bg-[#84B3CE]/15 rounded-md transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-8 mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#84B3CE]/20 text-[#16587B] border border-[#84B3CE]/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />
            <span>Neutral Direct Mediator</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-[#16587B]">
            {title || defaultTitle}
          </h3>
          <p className="text-xs text-[#16587B]/75 mt-1 leading-relaxed">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Mode Selector (Login vs Sign Up) */}
        <div className="grid grid-cols-2 p-1 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded-xl mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-[#5B0015] text-[#fcfaf5] shadow-xs'
                : 'text-[#16587B]/75 hover:text-[#16587B]'
            }`}
          >
            Sign In / Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-[#5B0015] text-[#fcfaf5] shadow-xs'
                : 'text-[#16587B]/75 hover:text-[#16587B]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <button
            type="button"
            onClick={() => handleSelectRole('IDEA_MAKER')}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all text-left ${
              selectedRole === 'IDEA_MAKER'
                ? 'border-[#5B0015] bg-[#5B0015]/10 text-[#5B0015] font-semibold'
                : 'border-[#84B3CE]/35 bg-[#f5f0e5]/60 text-[#16587B]/75 hover:bg-[#f5f0e5]'
            }`}
          >
            <Lightbulb className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-xs">Founder / Idea</div>
              <div className="text-[10px] opacity-75">2 free ideas · 0% fee</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectRole('INVESTOR')}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all text-left ${
              selectedRole === 'INVESTOR'
                ? 'border-[#16587B] bg-[#16587B]/10 text-[#16587B] font-semibold'
                : 'border-[#84B3CE]/35 bg-[#f5f0e5]/60 text-[#16587B]/75 hover:bg-[#f5f0e5]'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-xs">Investor / Backer</div>
              <div className="text-[10px] opacity-75">5 bilateral chats</div>
            </div>
          </button>
        </div>

        {/* 1-Click Quick Demo Login Shortcuts */}
        {mode === 'login' && (
          <div className="mb-4 p-3 rounded-xl bg-[#84B3CE]/15 border border-[#84B3CE]/35">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#16587B] mb-2">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#5B0015]" />
                1-Click Demo Sign In:
              </span>
              <span className="text-[10px] text-[#5B0015] font-mono">Ready to test</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handle1ClickDemo('IDEA_MAKER')}
                className="py-1.5 px-2 rounded-lg bg-[#fcfaf5] border border-[#5B0015]/30 hover:bg-[#5B0015] hover:text-[#fcfaf5] text-[11px] font-medium text-[#16587B] transition-colors flex items-center justify-center gap-1"
              >
                <span>⚡ Founder Login</span>
              </button>
              <button
                type="button"
                onClick={() => handle1ClickDemo('INVESTOR')}
                className="py-1.5 px-2 rounded-lg bg-[#fcfaf5] border border-[#16587B]/30 hover:bg-[#16587B] hover:text-[#fcfaf5] text-[11px] font-medium text-[#16587B] transition-colors flex items-center justify-center gap-1"
              >
                <span>⚡ Investor Login</span>
              </button>
            </div>
          </div>
        )}

        {/* Error message if any */}
        {errorMessage && (
          <div className="mb-3 p-2.5 rounded-lg bg-[#5B0015]/10 border border-[#5B0015]/30 text-xs text-[#5B0015]">
            {errorMessage}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block font-semibold text-[#16587B] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={selectedRole === 'INVESTOR' ? 'Rajiv Mehta' : 'Rahul Sharma'}
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-[#16587B] mb-1">
              Work Email / ID
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={selectedRole === 'INVESTOR' ? 'investor@ideasoch.com' : 'founder@ideasoch.com'}
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
              placeholder="Enter password (e.g. founder123)"
              className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-[#5B0015] text-[#fcfaf5] rounded-xl text-xs font-semibold hover:bg-[#43000f] transition-all shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            <span>
              {isLoading
                ? 'Processing...'
                : mode === 'signup'
                ? `Create ${selectedRole === 'INVESTOR' ? 'Investor' : 'Founder'} Account & Continue`
                : `Sign In & Continue as ${selectedRole === 'INVESTOR' ? 'Investor' : 'Founder'}`}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Guest fallback for exploring */}
        {selectedRole === 'INVESTOR' && (
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push('/ideas');
              }}
              className="text-[11px] text-[#16587B]/70 hover:text-[#16587B] underline"
            >
              Or browse verified ideas as guest explorer →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
