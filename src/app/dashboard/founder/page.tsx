'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ApplyToInvestorsModal } from '@/components/modals/ApplyToInvestorsModal';
import { DeckAssistModal } from '@/components/modals/DeckAssistModal';
import { Idea } from '@/types';
import {
  Lightbulb,
  Send,
  Eye,
  Users,
  PlusCircle,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Trash2,
  Sparkles,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export default function FounderDashboardPage() {
  const { ideas, applications, currentUser, deleteIdeaFree, deckAssistanceRequests } = useApp();
  const [selectedIdeaForApply, setSelectedIdeaForApply] = useState<Idea | null>(null);
  const [deckModalOpen, setDeckModalOpen] = useState(false);

  // Filter founder's ideas
  const myIdeas = ideas.filter(
    (i) => i.founderId === currentUser.id || i.founderName === currentUser.name || i.id === 'idea-1'
  );

  const totalViews = myIdeas.reduce((sum, i) => sum + i.viewsCount, 0);
  const totalApplications = applications.filter(
    (a) => a.founderId === currentUser.id || a.founderName === currentUser.name
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Discussion':
        return 'bg-[#f5f0e5] text-[#16587B] border-[#84B3CE]/35';
      case 'Shortlisted':
      case 'Meeting':
        return 'bg-[#84B3CE]/20 text-[#5B0015] border-[#84B3CE]/35 font-semibold';
      case 'Rejected':
      case 'Closed':
        return 'bg-[#f5f0e5] text-[#16587B]/75 border-[#84B3CE]/35';
      default:
        return 'bg-[#f5f0e5] text-[#16587B] border-[#84B3CE]/35';
    }
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#84B3CE]/35 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-[#16587B] font-semibold">
                Founder Command Center
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#16587B]/10 text-[#16587B]">
                <ShieldCheck className="w-3 h-3 text-[#16587B]" /> Neutral Mediator Protocol
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#16587B] tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs text-[#16587B]/75 mt-1">
              Manage your published venture ideas, investor diligence pipelines, and direct meetings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDeckModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border-2 border-[#16587B]/30 rounded-xl text-[#16587B] hover:bg-[#F5F0E5] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Request Deck Assistance</span>
            </button>
            <Link
              href="/submit-idea"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#16587B] text-[#FCFAF5] rounded-xl hover:bg-[#16587B]/90 transition-all shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit New Idea</span>
            </Link>
          </div>
        </div>

        {/* FREE TIER IDEA SLOTS & ENDLESS OUTREACH BANNER */}
        <div className="p-4 rounded-2xl bg-[#F5F0E5] border border-[#16587B]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16587B] text-[#FCFAF5] flex items-center justify-center font-serif font-bold text-base shrink-0">
              {myIdeas.length}/2
            </div>
            <div>
              <div className="font-serif font-bold text-[#16587B] text-sm">
                Active Idea Slots: {myIdeas.length} of 2 Used (Free Forever)
              </div>
              <p className="text-[11px] text-[#16587B]/80 mt-0.5">
                You can delete 1 of your ideas anytime for free to list a new one. Each idea supports 2 uploaded files (PPT/PDF) and endless outreach to unlimited investors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/submit-idea"
              className="px-3 py-1.5 rounded-lg bg-[#16587B] text-[#FCFAF5] font-semibold text-xs hover:bg-[#16587B]/90 transition-all shadow-xs"
            >
              {myIdeas.length < 2 ? '+ Use Free Slot' : 'Manage Slots'}
            </Link>
          </div>
        </div>

        {/* Dashboard KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Active Idea Slots
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">
                {myIdeas.length} / 2
              </span>
              <span className="text-xs font-mono font-medium text-emerald-700">Free Tier</span>
            </div>
          </div>

          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Endless Investor Outreach
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">
                {totalApplications.length}
              </span>
              <span className="text-xs font-mono text-[#16587B]/75">Unlimited</span>
            </div>
          </div>

          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Investor Views
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">{totalViews}</span>
              <span className="text-xs font-mono text-[#16587B]/75">Direct Inbounds</span>
            </div>
          </div>

          <div className="p-5 border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] shadow-xs">
            <span className="text-[11px] font-mono text-[#16587B]/75 uppercase tracking-wider block">
              Platform Brokerage Fee
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-serif font-bold text-[#16587B]">₹0 (0%)</span>
              <span className="text-xs font-mono text-emerald-700">100% Equity Yours</span>
            </div>
          </div>
        </div>

        {/* My Ideas Management Table */}
        <div className="border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-[#84B3CE]/35 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-serif font-bold text-[#16587B]">
                My Published Ideas ({myIdeas.length} / 2 Slots)
              </h2>
              <span className="text-xs text-[#16587B]/75">
                Live venture profiles accessible to verified accredited investors.
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#16587B]/70">
              Delete any idea to free up a slot at zero cost
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f5f0e5] border-b border-[#84B3CE]/35 text-[#16587B]/75 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Idea Name</th>
                  <th className="px-6 py-3">Category &amp; Stage</th>
                  <th className="px-6 py-3">Funding Target</th>
                  <th className="px-6 py-3">Documents</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#84B3CE]/35">
                {myIdeas.map((idea) => (
                  <tr key={idea.id} className="hover:bg-[#f5f0e5] transition-colors">
                    <td className="px-6 py-4 font-serif font-bold text-[#16587B]">
                      <Link href={`/ideas/${idea.id}`} className="hover:underline">
                        {idea.title}
                      </Link>
                      {idea.headline && (
                        <p className="text-[11px] font-sans font-normal text-[#16587B]/75 line-clamp-1 mt-0.5">
                          {idea.headline}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#16587B]/75">
                      {idea.category} · {idea.stage}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#16587B]">
                      {idea.fundingRequired}
                    </td>
                    <td className="px-6 py-4 text-[#16587B]/75 font-mono">
                      {idea.documents.length} / 2 Files
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[11px] rounded border border-[#84B3CE]/35 bg-[#fcfaf5] text-[#16587B] font-medium font-mono">
                        {idea.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedIdeaForApply(idea)}
                        className="px-2.5 py-1 text-[11px] font-semibold border border-[#16587B]/30 rounded-lg hover:border-[#16587B] text-[#16587B] transition-colors"
                        title="Dispatch this idea to unlimited investors"
                      >
                        Endless Pitch
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteIdeaFree(idea.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#5B0015] hover:bg-[#5B0015]/10 rounded-lg transition-colors"
                        title="Delete this idea to free up slot"
                      >
                        Delete (Free)
                      </button>
                      <Link
                        href={`/ideas/${idea.id}`}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-[#16587B] text-[#FCFAF5] rounded-lg hover:bg-[#16587B]/90 transition-colors"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ASSISTED DECK REQUESTS SECTION */}
        {deckAssistanceRequests.length > 0 && (
          <div className="border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-[#84B3CE]/35 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-serif font-bold text-[#16587B]">
                  Assisted Deck &amp; Model Requests ({deckAssistanceRequests.length})
                </h2>
                <span className="text-xs text-[#16587B]/75">
                  Ideasoch Venture Studio preparation status
                </span>
              </div>
            </div>

            <div className="divide-y divide-[#84B3CE]/35">
              {deckAssistanceRequests.map((req) => (
                <div key={req.id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <h3 className="font-serif font-bold text-[#16587B]">{req.businessTitle}</h3>
                    <p className="text-[#16587B]/75 line-clamp-1">{req.businessModelSummary}</p>
                    <span className="text-[10px] font-mono text-[#16587B]/60">
                      Requested on {req.requestedAt} · Target: {req.targetCapital}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#84B3CE]/20 text-[#16587B] font-mono text-[11px] font-semibold">
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Application Pipeline Table */}
        <div className="border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-[#84B3CE]/35 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-serif font-bold text-[#16587B]">
                Investor Application Pipeline ({totalApplications.length})
              </h2>
              <span className="text-xs text-[#16587B]/75">
                Track which investors viewed, shortlisted, or requested meetings for your ideas
              </span>
            </div>
            <Link
              href="/investors"
              className="text-xs font-semibold text-[#16587B] hover:underline"
            >
              Discover More Investors →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f5f0e5] border-b border-[#84B3CE]/35 text-[#16587B]/75 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Investor</th>
                  <th className="px-6 py-3">Idea</th>
                  <th className="px-6 py-3">Pitch Note</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last Updated</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#84B3CE]/35">
                {totalApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#f5f0e5] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={app.investorAvatar}
                          alt={app.investorName}
                          className="w-7 h-7 rounded-full object-cover border border-[#84B3CE]/35"
                        />
                        <span className="font-semibold text-[#16587B]">{app.investorName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#16587B]">
                      {app.ideaTitle}
                    </td>
                    <td className="px-6 py-4 text-[#16587B]/75 max-w-xs truncate">
                      {app.pitchNote}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 text-[11px] rounded border ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#16587B]/75">{app.updatedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/messages"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16587B] hover:underline"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Open Chat</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Batch Apply Modal */}
      {selectedIdeaForApply && (
        <ApplyToInvestorsModal
          idea={selectedIdeaForApply}
          isOpen={!!selectedIdeaForApply}
          onClose={() => setSelectedIdeaForApply(null)}
        />
      )}

      {/* Deck Assist Modal */}
      <DeckAssistModal
        isOpen={deckModalOpen}
        onClose={() => setDeckModalOpen(false)}
      />
    </div>
  );
}
