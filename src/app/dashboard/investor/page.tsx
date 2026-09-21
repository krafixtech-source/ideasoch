'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { IdeaCard } from '@/components/cards/IdeaCard';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import {
  Lock,
  Sparkles,
  Send,
  Users,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  CreditCard,
} from 'lucide-react';
import { ApplicationStatus } from '@/types';

export default function InvestorDashboardPage() {
  const {
    investorProfile,
    ideas,
    applications,
    opportunities,
    updateApplicationStatus,
    purchaseChatCredits,
    currentUser,
  } = useApp();

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Recommended ideas matching investor's thesis
  const recommendedIdeas = ideas.slice(0, 3);

  // Applications received by this investor
  const receivedApplications = applications.filter(
    (a) => a.investorId === currentUser.id || a.investorName === currentUser.name || a.investorId === 'user-investor-1'
  );

  // Opportunities posted by this investor
  const myOpportunities = opportunities.filter(
    (o) => o.postedById === currentUser.id || o.postedByName.includes('Mehta')
  );

  const handleStatusChange = (appId: string, status: ApplicationStatus) => {
    updateApplicationStatus(appId, status);
  };

  const handleBuyChatPack = () => {
    purchaseChatCredits(3);
    setToastMsg('Added 3 bilateral chats to your account quota!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const totalChats = investorProfile.chatCreditsTotal || 5;
  const usedChats = investorProfile.chatCreditsUsed || 0;
  const remainingChats = Math.max(0, totalChats - usedChats);

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#84B3CE]/35 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-[#16587B] font-semibold">
                Investor Deal Flow Desk · {investorProfile.organization || 'Mehta Ventures'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Security Check: Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#16587B] tracking-tight">
              Investor Command Center
            </h1>
            <p className="text-xs text-[#16587B]/75 mt-1">
              Short idea headlines, founder thesis quotes, and direct bilateral communications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBuyChatPack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border-2 border-[#16587B]/30 rounded-xl text-[#16587B] hover:bg-[#F5F0E5] transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>+ Buy 3 Chats (₹999)</span>
            </button>
            <Link
              href="/dashboard/investor/opportunities/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#16587B] text-[#FCFAF5] rounded-xl hover:bg-[#16587B]/90 transition-all shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Opportunity</span>
            </Link>
          </div>
        </div>

        {/* Toast */}
        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-fade-in font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* SUBSCRIPTION & 5-CHAT QUOTA BANNER */}
        <div className="p-4 rounded-2xl bg-[#F5F0E5] border border-[#16587B]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16587B] text-[#FCFAF5] flex items-center justify-center font-serif font-bold text-sm shrink-0">
              {remainingChats}
            </div>
            <div>
              <div className="font-serif font-bold text-[#16587B] text-sm flex items-center gap-2">
                <span>Direct Bilateral Chat Quota: {usedChats} of {totalChats} Used</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#16587B] text-[#FCFAF5]">
                  {investorProfile.subscriptionPlan === 'yearly' ? 'Annual Pass' : 'Monthly Pass'}
                </span>
              </div>
              <p className="text-[11px] text-[#16587B]/80 mt-0.5">
                Each chat gives you direct bilateral messaging with verified founders. Need more? Buy 3 additional chats for ₹999 anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/pricing"
              className="px-3 py-1.5 rounded-lg border border-[#16587B]/30 text-[#16587B] font-semibold text-xs hover:bg-[#FCFAF5] transition-all"
            >
              Manage Plan
            </Link>
            <button
              type="button"
              onClick={handleBuyChatPack}
              className="px-3 py-1.5 rounded-lg bg-[#84B3CE] text-[#16587B] font-bold text-xs hover:bg-[#84B3CE]/80 transition-all shadow-xs"
            >
              + Add 3 Chats (₹999)
            </button>
          </div>
        </div>

        {/* Top Summary KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Chats Remaining
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">
                {remainingChats} / {totalChats}
              </span>
              <span className="text-xs font-mono text-emerald-700">Active Quota</span>
            </div>
          </div>

          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Founder Pitches
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">
                {receivedApplications.length}
              </span>
              <span className="text-xs font-mono text-[#16587B]/75">Inbound</span>
            </div>
          </div>

          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Active Bilateral Chats
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">
                {(investorProfile.activeChatIds || []).length || 2}
              </span>
              <span className="text-xs font-mono text-[#16587B]/75">Direct Threads</span>
            </div>
          </div>

          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Security Clearance
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">Verified</span>
              <span className="text-xs font-mono text-emerald-700">100% Cleared</span>
            </div>
          </div>
        </div>

        {/* Received Founder Applications Review Table */}
        <div className="border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-[#84B3CE]/35 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-serif font-bold text-[#16587B]">
                Founder Inbound Pitches ({receivedApplications.length})
              </h2>
              <span className="text-xs text-[#16587B]/75">
                Founders who dispatched their short idea and thesis directly to your profile.
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f5f0e5] border-b border-[#84B3CE]/35 text-[#16587B]/75 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Idea &amp; Sector</th>
                  <th className="px-6 py-3">Founder</th>
                  <th className="px-6 py-3">Pitch Note</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#84B3CE]/35">
                {receivedApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#f5f0e5] transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/ideas/${app.ideaId}`} className="font-serif font-bold text-[#16587B] hover:underline block">
                        {app.ideaTitle}
                      </Link>
                      <span className="text-[11px] text-[#16587B]/75">{app.ideaCategory}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#16587B]">
                      {app.founderName}
                    </td>
                    <td className="px-6 py-4 text-[#16587B]/75 max-w-sm truncate">
                      {app.pitchNote}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 text-[11px] border border-[#84B3CE]/35 rounded-full bg-[#fcfaf5] text-[#16587B] font-mono font-medium">
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5">
                      <Link
                        href="/messages"
                        className="inline-flex items-center gap-1 px-3 py-1 text-[11px] bg-[#16587B] text-[#FCFAF5] font-semibold rounded-lg hover:bg-[#16587B]/90 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Let&apos;s Chat</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(app.id, 'Shortlisted')}
                        className="px-2.5 py-1 text-[11px] border border-[#16587B]/30 rounded-lg hover:border-[#16587B] text-[#16587B] font-medium transition-colors"
                      >
                        Shortlist
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Ideas (Headline + Quote + Let's Chat) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#84B3CE]/35">
            <div>
              <h2 className="text-base font-serif font-bold text-[#16587B]">
                Curated High-Impact Discovery Feed
              </h2>
              <p className="text-xs text-[#16587B]/75">
                Review short headlines and founder quotes. Click &quot;Let&apos;s Chat&quot; to initiate direct bilateral dialogue.
              </p>
            </div>
            <Link href="/ideas" className="text-xs font-semibold text-[#16587B] hover:underline">
              Browse All Ideas →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>

        {/* My Posted Opportunities */}
        <div className="border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#84B3CE]/35 mb-6">
            <div>
              <h2 className="text-sm font-serif font-bold text-[#16587B]">
                My Published Opportunities ({myOpportunities.length})
              </h2>
              <span className="text-xs text-[#16587B]/75">
                Syndicate allocations, board positions, and advisory mandates posted by your firm.
              </span>
            </div>
            <Link
              href="/dashboard/investor/opportunities/new"
              className="text-xs font-semibold text-[#16587B] hover:underline"
            >
              + Post Another Opportunity
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
