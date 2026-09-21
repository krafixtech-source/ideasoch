'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  MessageSquare,
  FileText,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { switchRole } = useApp();
  const [role, setRole] = useState<'IDEA_MAKER' | 'INVESTOR'>('IDEA_MAKER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [investorPlan, setInvestorPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showVerificationPending, setShowVerificationPending] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === 'INVESTOR') {
      setShowVerificationPending(true);
    } else {
      switchRole('IDEA_MAKER');
      router.push('/dashboard/founder');
    }
  };

  const handleEnterInvestorDemo = () => {
    switchRole('INVESTOR');
    router.push('/dashboard/investor');
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-3">
            <span className="font-serif font-bold text-2xl tracking-tight text-[#16587B]">
              IDEA<span className="font-light tracking-widest text-[#16587B]/75 ml-0.5">SOCH</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#16587B] inline-block mb-1"></span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-[#16587B]">
            Join the Ideasoch Bilateral Network
          </h1>
          <p className="text-xs text-[#16587B]/75 mt-1">
            Pure direct mediator connecting ambitious founders with accredited capital.
          </p>
        </div>

        <div className="border border-[#84B3CE]/35 rounded-2xl p-6 sm:p-8 bg-[#fcfaf5] shadow-sm">
          {showVerificationPending ? (
            /* INVESTOR SECURITY BACKGROUND CHECK STATE */
            <div className="text-center space-y-5 py-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#84B3CE]/20 flex items-center justify-center text-[#16587B] border border-[#84B3CE]/40">
                <Clock className="w-8 h-8 text-[#16587B]" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#16587B] bg-[#16587B]/10 px-2.5 py-0.5 rounded-full">
                  Security Protocol Active
                </span>
                <h2 className="text-xl font-serif font-bold text-[#16587B] mt-2">
                  24-Hour Background Check Initiated
                </h2>
                <p className="text-xs text-[#16587B]/80 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong>{name || 'Investor'}</strong>. To protect proprietary founder business models, every investor registration undergoes mandatory credential, syndicate, and accredited backer verification prior to account activation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F0E5] border border-[#16587B]/15 text-left text-xs space-y-2 text-[#16587B]/85">
                <div className="font-semibold text-[#16587B] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#16587B]" />
                  What happens next:
                </div>
                <ul className="space-y-1.5 text-[11px] list-disc list-inside">
                  <li>Our compliance desk cross-references your LinkedIn and professional syndicate records.</li>
                  <li>Selected subscription ({investorPlan === 'monthly' ? 'Monthly Pass · ₹4,999/mo' : 'Annual Pass · ₹3,499/mo'}) will activate upon clearance.</li>
                  <li>You will receive <strong>5 direct bilateral chats</strong> to connect with founders.</li>
                </ul>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleEnterInvestorDemo}
                  className="w-full py-3 bg-[#16587B] text-[#FCFAF5] rounded-xl text-xs font-semibold hover:bg-[#16587B]/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#84B3CE]" />
                  <span>Enter Pre-Verified Demo Investor Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[11px] text-[#16587B]/60">
                  Allows immediate exploration with pre-approved investor Rajiv Mehta credentials.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Dual Role Choice */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  onClick={() => setRole('IDEA_MAKER')}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-xs ${
                    role === 'IDEA_MAKER'
                      ? 'border-[#16587B] bg-[#F5F0E5] shadow-xs'
                      : 'border-[#84B3CE]/35 bg-[#FCFAF5] hover:border-[#16587B]/50'
                  }`}
                >
                  <span className="font-serif font-bold text-xs text-[#16587B] block mb-1">
                    I Have an Idea (Founder)
                  </span>
                  <p className="text-[11px] text-[#16587B]/75 leading-relaxed">
                    2 active ideas free. Attach 2 files (PPT/PDF). Approach endless investors. Free deletion &amp; replacement.
                  </p>
                </div>

                <div
                  onClick={() => setRole('INVESTOR')}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-xs ${
                    role === 'INVESTOR'
                      ? 'border-[#16587B] bg-[#F5F0E5] shadow-xs'
                      : 'border-[#84B3CE]/35 bg-[#FCFAF5] hover:border-[#16587B]/50'
                  }`}
                >
                  <span className="font-serif font-bold text-xs text-[#16587B] block mb-1">
                    I am an Investor
                  </span>
                  <p className="text-[11px] text-[#16587B]/75 leading-relaxed">
                    24h background check verification. Monthly/Yearly plan with 5 direct bilateral chats included.
                  </p>
                </div>
              </div>

              {/* INVESTOR SECURITY NOTICE & PLAN SELECTOR */}
              {role === 'INVESTOR' && (
                <div className="mb-6 space-y-3.5 p-4 rounded-xl bg-[#F5F0E5] border border-[#16587B]/20">
                  <div className="flex items-start gap-2.5 text-xs text-[#16587B]">
                    <Lock className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Mandatory Security Background Check</span>
                      <p className="text-[11px] text-[#16587B]/80 mt-0.5">
                        Investors undergo a 24-hour verification prior to login activation to protect founder confidential assets.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#16587B]/15">
                    <label className="block text-[11px] font-semibold text-[#16587B] uppercase tracking-wider mb-2">
                      Select Access Subscription:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        onClick={() => setInvestorPlan('monthly')}
                        className={`p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                          investorPlan === 'monthly'
                            ? 'border-[#16587B] bg-[#FCFAF5] font-semibold text-[#16587B]'
                            : 'border-[#84B3CE]/40 bg-[#FCFAF5]/60 text-[#16587B]/70'
                        }`}
                      >
                        <div className="font-bold">Monthly Pass</div>
                        <div className="text-[11px]">₹4,999/mo</div>
                        <div className="text-[10px] text-[#16587B]/60 mt-1">5 Direct Chats / mo</div>
                      </div>

                      <div
                        onClick={() => setInvestorPlan('yearly')}
                        className={`p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                          investorPlan === 'yearly'
                            ? 'border-[#16587B] bg-[#FCFAF5] font-semibold text-[#16587B]'
                            : 'border-[#84B3CE]/40 bg-[#FCFAF5]/60 text-[#16587B]/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Yearly Pass</span>
                          <span className="text-[9px] bg-[#16587B] text-[#FCFAF5] px-1.5 py-0.2 rounded">
                            -30%
                          </span>
                        </div>
                        <div className="text-[11px]">₹3,499/mo</div>
                        <div className="text-[10px] text-[#16587B]/60 mt-1">60 Chats + Roll-over</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FOUNDER PERKS NOTICE */}
              {role === 'IDEA_MAKER' && (
                <div className="mb-5 p-3.5 rounded-xl bg-[#84B3CE]/15 border border-[#84B3CE]/35 text-xs text-[#16587B]/85 space-y-1">
                  <span className="font-semibold text-[#16587B] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#16587B]" />
                    Founder Free Allowance:
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Upload up to 2 files per idea (PPT/PDF). 2 active idea slots free. Delete and replace ideas anytime at zero cost. Dispatch your short idea to endless investors.
                  </p>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'INVESTOR' ? 'e.g. Rajiv Mehta' : 'e.g. Rahul Sharma'}
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#16587B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    {role === 'INVESTOR' ? 'Work / Firm Email Address *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'INVESTOR' ? 'partner@venturefund.com' : 'founder@startup.com'}
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#16587B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#16587B] mb-1">
                      Operating City / Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Mumbai or Bengaluru"
                      className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#16587B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#16587B] mb-1">
                      LinkedIn Profile URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#16587B]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded-xl text-[11px] text-[#16587B]/75 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16587B] shrink-0" />
                  <span>
                    Ideasoch is an independent mediator. All conversations are bilateral. 0% equity, 0% commission.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#16587B] text-[#FCFAF5] rounded-xl text-xs font-semibold hover:bg-[#16587B]/90 transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
                >
                  <span>
                    {role === 'INVESTOR'
                      ? 'Submit for Security Verification'
                      : 'Create Free Founder Account'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}

          {/* Footer switch */}
          <div className="mt-6 pt-4 border-t border-[#84B3CE]/25 text-center text-xs text-[#16587B]/70 space-y-1">
            <div>
              Already registered?{' '}
              <Link href="/login" className="font-semibold text-[#5B0015] hover:underline">
                Sign In with Demo Credentials →
              </Link>
            </div>
            <div className="text-[11px] text-[#16587B]/60">
              Demo Founder: founder@ideasoch.com · Demo Investor: investor@ideasoch.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
