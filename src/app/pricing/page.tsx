'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Check,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  FileText,
  Upload,
  CreditCard,
  Send,
  HelpCircle,
  Clock,
  Briefcase,
} from 'lucide-react';
import { DeckAssistModal } from '@/components/modals/DeckAssistModal';

export default function PricingPage() {
  const {
    investorProfile,
    investorBillingCycle,
    toggleInvestorBillingCycle,
    purchaseChatCredits,
  } = useApp();

  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleBuyChatPack = () => {
    purchaseChatCredits(3);
    setSuccessToast('Added 3 extra bilateral chats to your investor account!');
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const isYearly = investorBillingCycle === 'yearly';

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16587B]/10 border border-[#16587B]/20 text-xs font-semibold text-[#16587B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16587B]" />
            Transparent Mediator Pricing · Zero Deal Commission
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-[#16587B] tracking-tight">
            Fair Plans for Founders & Accredited Backers
          </h1>

          <p className="text-xs sm:text-sm text-[#16587B]/80 leading-relaxed">
            Ideasoch is an independent direct mediator connecting founders with vetted capital. We charge zero broker percentages, take no equity, and keep communications direct and bilateral.
          </p>

          {/* Monthly / Yearly Billing Toggle for Investors */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span
              className={`text-xs font-semibold transition-colors ${
                !isYearly ? 'text-[#16587B]' : 'text-[#16587B]/60'
              }`}
            >
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={toggleInvestorBillingCycle}
              className="relative w-14 h-7 rounded-full bg-[#16587B] p-1 transition-colors focus:outline-none"
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#FCFAF5] transition-transform shadow-sm ${
                  isYearly ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-semibold transition-colors ${
                  isYearly ? 'text-[#16587B]' : 'text-[#16587B]/60'
                }`}
              >
                Yearly Pass
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#84B3CE]/30 text-[#16587B] border border-[#84B3CE]/40">
                Save 30%
              </span>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="max-w-md mx-auto p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs text-emerald-900 flex items-center justify-center gap-2 font-medium animate-fade-in shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* SECTION 1: INVESTOR ACCESS PLANS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#84B3CE]/35 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#16587B] font-bold">
                For Accredited Investors & Angels
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#16587B]">
                Investor Access & Chat Quotas
              </h2>
            </div>
            <div className="text-xs font-mono text-[#16587B]/80">
              Security Check: 24h Background Verification Required
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Investor Monthly Plan */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                !isYearly
                  ? 'border-[#16587B] bg-[#FCFAF5] shadow-lg ring-1 ring-[#16587B]'
                  : 'border-[#84B3CE]/40 bg-[#FCFAF5]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider">
                    Monthly Pass
                  </span>
                  {!isYearly && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#16587B] text-[#FCFAF5]">
                      Active Selection
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif font-bold text-[#16587B] mb-1">
                  Individual Angel
                </h3>
                <p className="text-xs text-[#16587B]/75 leading-relaxed mb-6">
                  For active angels seeking direct deal discovery with verified Indian founders.
                </p>

                <div className="py-4 border-t border-b border-[#84B3CE]/30 mb-6 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-serif font-bold text-[#16587B]">₹4,999</span>
                    <span className="text-xs text-[#16587B]/70">/ month</span>
                  </div>
                  <div className="text-xs font-semibold text-[#16587B] flex items-center gap-1.5 pt-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#16587B]" />
                    <span>5 Direct Bilateral Chats Included / mo</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-[#16587B]/85 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Mandatory 24h background security verification check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>5 Direct &quot;Let&apos;s Chat&quot; founder connections per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Short idea headlines & founder thesis quote previews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Download up to 2 verified files per idea (PPT, PDF)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Extra chat pack available (₹999 for 3 extra chats)</span>
                  </li>
                  <li className="flex items-start gap-2 font-medium text-[#16587B]">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>0% equity taken · 0% transaction commission</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={toggleInvestorBillingCycle}
                className="w-full py-2.5 text-xs font-semibold rounded-xl border-2 border-[#16587B] text-[#16587B] hover:bg-[#16587B] hover:text-[#FCFAF5] transition-colors"
              >
                Choose Monthly Pass
              </button>
            </div>

            {/* Investor Yearly Plan */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                isYearly
                  ? 'border-[#16587B] bg-[#FCFAF5] shadow-xl ring-2 ring-[#84B3CE]'
                  : 'border-[#84B3CE]/40 bg-[#FCFAF5]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider">
                    Annual Pass
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#16587B] text-[#FCFAF5]">
                    Best Value · 30% Off
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#16587B] mb-1">
                  Active Syndicate Lead
                </h3>
                <p className="text-xs text-[#16587B]/75 leading-relaxed mb-6">
                  For experienced angel syndicates and advisors evaluating ongoing monthly deal flow.
                </p>

                <div className="py-4 border-t border-b border-[#84B3CE]/30 mb-6 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-serif font-bold text-[#16587B]">₹3,499</span>
                    <span className="text-xs text-[#16587B]/70">/ month</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#16587B]/70">
                    Billed annually at ₹41,988/year
                  </div>
                  <div className="text-xs font-semibold text-[#16587B] flex items-center gap-1.5 pt-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#16587B]" />
                    <span>60 Direct Chats Total (5 per month + roll-over)</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-[#16587B]/85 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Priority expedited 4-hour background security clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Roll-over unused bilateral chats across months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Priority notifications on newly approved seed briefs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Dedicated concierge for video meeting scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Discounted extra chat packs (₹799 for 3 chats)</span>
                  </li>
                  <li className="flex items-start gap-2 font-medium text-[#16587B]">
                    <Check className="w-3.5 h-3.5 text-[#16587B] shrink-0 mt-0.5" />
                    <span>Zero transaction brokerage or deal commission</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={toggleInvestorBillingCycle}
                className="w-full py-2.5 text-xs font-semibold rounded-xl bg-[#16587B] text-[#FCFAF5] hover:bg-[#16587B]/90 transition-all shadow-sm"
              >
                Choose Annual Pass
              </button>
            </div>

            {/* Extra Chat Pack Add-on Card */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#84B3CE]/60 bg-[#F5F0E5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider">
                    On-Demand Add-On
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#84B3CE]/30 text-[#16587B]">
                    Instant Quota
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#16587B] mb-1">
                  Extra 3 Chats Pack
                </h3>
                <p className="text-xs text-[#16587B]/75 leading-relaxed mb-6">
                  Need to initiate more conversations beyond your 5 included chats? Unlock 3 additional founder chats anytime.
                </p>

                <div className="py-4 border-t border-b border-[#84B3CE]/30 mb-6 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-serif font-bold text-[#16587B]">₹999</span>
                    <span className="text-xs text-[#16587B]/70">one-time</span>
                  </div>
                  <div className="text-xs font-semibold text-[#16587B]">
                    +3 Direct Bilateral Chats (Never Expire)
                  </div>
                </div>

                <p className="text-xs text-[#16587B]/80 leading-relaxed mb-8">
                  Available to any verified investor on a monthly or yearly plan whose current chat quota has been exhausted.
                </p>
              </div>

              <button
                type="button"
                onClick={handleBuyChatPack}
                className="w-full py-2.5 text-xs font-semibold rounded-xl bg-[#84B3CE] text-[#16587B] hover:bg-[#84B3CE]/80 transition-colors shadow-xs"
              >
                Buy 3 Extra Chats (₹999)
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: FOUNDER ("IDEA PERSON") TIERS & SERVICES */}
        <div className="space-y-6 pt-6 border-t border-[#84B3CE]/35">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#16587B] font-bold">
              For Founders & Innovators
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#16587B]">
              Founder Tiers & Presentation Services
            </h2>
            <p className="text-xs text-[#16587B]/80 mt-1">
              Start free with 2 active ideas and endless investor reach. Add professional presentation design when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Free Founder Tier */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#16587B]/30 bg-[#FCFAF5] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider">
                    Idea Person Free Tier
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#16587B]/10 text-[#16587B]">
                    Free Forever
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#16587B] mb-2">
                  Free Innovation Launchpad
                </h3>

                <div className="py-3 border-t border-b border-[#84B3CE]/30 mb-5">
                  <span className="text-3xl font-serif font-bold text-[#16587B]">₹0</span>
                  <span className="text-xs text-[#16587B]/70 ml-1.5 font-medium">Free forever</span>
                </div>

                <ul className="space-y-3 text-xs text-[#16587B]/85 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>2 Active Idea Slots:</strong> Publish up to 2 distinct venture concepts simultaneously.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Free Delete &amp; Replace:</strong> Delete 1 idea anytime at zero cost to free up a slot and publish a new one.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>2 File Uploads per Idea:</strong> Attach up to 2 verified documents (.pdf, .ppt, .pptx) for confidential investor unlocks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Endless Investor Outreach:</strong> Dispatch your short idea and quote to unlimited accredited investors on the platform.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Direct Inbound Chats:</strong> Receive direct bilateral chat invitations from accredited investors at zero cost.
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href="/submit-idea"
                className="w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-[#16587B] text-[#FCFAF5] hover:bg-[#16587B]/90 transition-all shadow-sm"
              >
                Submit Your Idea (Free)
              </a>
            </div>

            {/* Paid Deck & Financial Model Assistance Service */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#16587B] bg-[#F5F0E5] flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider">
                    Venture Studio Service
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#16587B] text-[#FCFAF5]">
                    Paid Assistance
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#16587B] mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#16587B]" />
                  Pitch Deck &amp; Financial Model Preparation
                </h3>

                <div className="py-3 border-t border-b border-[#84B3CE]/30 mb-5 space-y-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-serif font-bold text-[#16587B]">₹4,999</span>
                    <span className="text-xs text-[#16587B]/70 ml-1">one-time</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#16587B]/70">
                    Turnaround in 48-72 hours · 2 revision cycles included
                  </span>
                </div>

                <p className="text-xs text-[#16587B]/80 leading-relaxed mb-4">
                  Have a proven business idea or model, but lack slides or spreadsheets to present to serious investors? Our venture presentation architects will build your complete investor kit.
                </p>

                <ul className="space-y-3 text-xs text-[#16587B]/85 mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>10-Slide Institutional Pitch Deck:</strong> Problem, solution, market size, competition, and unit economics crafted in PPT &amp; PDF.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>3-Year Unit Economics Model:</strong> LTV, CAC, gross margins, and milestone-based cash burn modeling.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Executive One-Pager:</strong> Compact teaser PDF ready for WhatsApp and email dispatch.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Direct Platform Match:</strong> Featured placement in the curated discovery feed once delivered.
                    </span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setDeckModalOpen(true)}
                className="w-full py-2.5 text-xs font-semibold rounded-xl bg-[#16587B] text-[#FCFAF5] hover:bg-[#16587B]/90 transition-all shadow-sm"
              >
                Request Deck Assistance (₹4,999)
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: PLATFORM MEDIATOR ARCHITECTURE GUARANTEE */}
        <div className="p-8 rounded-2xl bg-[#16587B] text-[#FCFAF5] space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#84B3CE]/25 flex items-center justify-center border border-[#84B3CE]/40">
              <ShieldCheck className="w-6 h-6 text-[#84B3CE]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#FCFAF5]">
                The Ideasoch Mediator Guarantee
              </h3>
              <p className="text-xs text-[#84B3CE]">
                We are neutral connectors — never brokers, syndicate managers, or equity holders.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs text-[#FCFAF5]/85 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#FCFAF5]/10 border border-[#FCFAF5]/15 space-y-1">
              <span className="font-bold text-[#FCFAF5] block">0% Equity Taken</span>
              <p>
                Founders keep 100% of their cap table equity. Ideasoch never demands warrants, advisory shares, or options.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FCFAF5]/10 border border-[#FCFAF5]/15 space-y-1">
              <span className="font-bold text-[#FCFAF5] block">0% Deal Commissions</span>
              <p>
                Whether you raise ₹15 Lakhs or ₹5 Crores, Ideasoch charges ₹0 in success commissions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FCFAF5]/10 border border-[#FCFAF5]/15 space-y-1">
              <span className="font-bold text-[#FCFAF5] block">Direct Bilateral Dialogue</span>
              <p>
                Once an investor initiates &quot;Let&apos;s Chat&quot;, communications happen directly between both parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deck Assist Modal */}
      <DeckAssistModal
        isOpen={deckModalOpen}
        onClose={() => setDeckModalOpen(false)}
      />
    </div>
  );
}
