'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ApplyToInvestorsModal } from '@/components/modals/ApplyToInvestorsModal';
import { UnlockIdeaModal } from '@/components/modals/UnlockIdeaModal';
import { ScheduleMeetingModal } from '@/components/modals/ScheduleMeetingModal';
import { ReportModal } from '@/components/modals/ReportModal';
import { LetsChatModal } from '@/components/modals/LetsChatModal';
import {
  ShieldCheck,
  MapPin,
  Bookmark,
  Send,
  Lock,
  Unlock,
  FileText,
  Calendar,
  MessageSquare,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const ideaId = resolvedParams.id;

  const {
    ideas,
    isIdeaSaved,
    toggleSaveIdea,
    canAccessIdeaDetails,
    currentRole,
    investorProfile,
    startOrGetConversationWith,
  } = useApp();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const idea = ideas.find((i) => i.id === ideaId);
  if (!idea) {
    notFound();
  }

  const isSaved = isIdeaSaved(idea.id);
  const hasAccess = canAccessIdeaDetails(idea.id);

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/ideas"
          className="inline-flex items-center gap-1.5 text-xs text-[#16587B]/75 hover:text-[#16587B] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Business Ideas</span>
        </Link>

        {/* Header Profile Section */}
        <div className="border border-[#84B3CE]/35 rounded-lg p-6 sm:p-8 bg-[#fcfaf5] mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#84B3CE]/35">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider bg-[#f5f0e5] border border-[#84B3CE]/35 rounded text-[#16587B]">
                  {idea.category}
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-medium border border-[#84B3CE]/35 rounded text-[#16587B]/75">
                  Stage: {idea.stage}
                </span>
                <span className="text-[11px] text-[#16587B]/75 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {idea.location}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold border border-[#84B3CE]/40 bg-[#84B3CE]/20 text-[#16587B] rounded">
                  2/2 Files Max
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-[#16587B] tracking-tight mb-1">
                {idea.title}
              </h1>

              {idea.headline && (
                <p className="text-sm font-medium text-[#16587B] mb-3 leading-snug">
                  {idea.headline}
                </p>
              )}

              {idea.quote && (
                <div className="p-3 bg-[#f5f0e5] border-l-2 border-[#5B0015] rounded-r text-xs text-[#16587B] italic mb-3">
                  &ldquo;{idea.quote}&rdquo;
                </div>
              )}

              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                {idea.tagline || idea.summary}
              </p>
            </div>

            {/* Target Funding Card */}
            <div className="p-4 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] text-right min-w-[200px] shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-[#16587B]/75 block">
                Target Capital
              </span>
              <span className="text-2xl font-semibold text-[#16587B] block mt-0.5">
                {idea.fundingRequired}
              </span>
              <span className="text-[11px] text-[#5B0015] font-medium block mt-1">
                Verified Term Sheet Target
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={idea.founderAvatar}
                alt={idea.founderName}
                className="w-10 h-10 rounded-full object-cover border border-[#84B3CE]/35"
              />
              <div className="text-xs">
                <div className="font-semibold text-[#16587B] flex items-center gap-1">
                  {idea.founderName}
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />
                </div>
                <span className="text-[11px] text-[#16587B]/75">Founder &amp; Lead</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsChatModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Let&apos;s Chat</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSaveIdea(idea.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border rounded-md transition-colors ${
                  isSaved
                    ? 'border-[#5B0015] bg-[#5B0015] text-[#fcfaf5]'
                    : 'border-[#84B3CE]/35 bg-[#fcfaf5] text-[#16587B] hover:bg-[#f5f0e5]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#f5f0e5] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply to Investors</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Dossier Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <section className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#16587B]">
                Executive Overview
              </h2>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                {idea.summary}
              </p>
            </section>

            {/* Problem & Solution */}
            <section className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B] mb-2">
                  The Problem
                </h3>
                <p className="text-xs text-[#16587B]/75 leading-relaxed">
                  {idea.problem}
                </p>
              </div>

              <div className="pt-4 border-t border-[#84B3CE]/35">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B] mb-2">
                  The Solution & Core Innovation
                </h3>
                <p className="text-xs text-[#16587B]/75 leading-relaxed">
                  {idea.solution}
                </p>
              </div>
            </section>

            {/* Market & Target Audience */}
            <section className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Target Market & Addressable Demand
              </h3>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                {idea.targetMarket}
              </p>
              {idea.tamSamSom && (
                <div className="p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded text-xs text-[#16587B] font-mono">
                  {idea.tamSamSom}
                </div>
              )}
            </section>

            {/* Business Model & Traction */}
            <section className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Business Model & Revenue Architecture
              </h3>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                {idea.businessModel}
              </p>
              {idea.currentTraction && (
                <div className="pt-3 border-t border-[#84B3CE]/35">
                  <span className="text-xs font-semibold text-[#16587B] block mb-1">
                    Current Measured Traction:
                  </span>
                  <p className="text-xs text-[#16587B]/75 leading-relaxed">
                    {idea.currentTraction}
                  </p>
                </div>
              )}
            </section>

            {/* SENSITIVE & LOCKED SECTION: Financials & Confidential Pitch Deck */}
            <section className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5]">
              <div className="flex items-center justify-between pb-4 border-b border-[#84B3CE]/35 mb-4">
                <div className="flex items-center gap-2">
                  {hasAccess ? (
                    <Unlock className="w-4 h-4 text-[#5B0015]" />
                  ) : (
                    <Lock className="w-4 h-4 text-[#16587B]" />
                  )}
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                    Confidential Due Diligence Dossier
                  </h3>
                </div>
                <span className="text-[11px] text-[#16587B]/75">
                  {hasAccess ? 'Access Unlocked' : 'Discovery Credit Required'}
                </span>
              </div>

              {hasAccess ? (
                /* Unlocked State */
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-[#84B3CE]/20 border border-[#84B3CE]/35 rounded text-[#5B0015] flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>You have full verified access to this idea&apos;s proprietary financial and deck files.</span>
                  </div>

                  {idea.unitEconomics && (
                    <div className="p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded">
                      <span className="font-semibold text-[#16587B] block mb-1">Unit Economics:</span>
                      <p className="text-[#16587B]/75">{idea.unitEconomics}</p>
                    </div>
                  )}

                  {idea.useOfFunds && (
                    <div className="p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded">
                      <span className="font-semibold text-[#16587B] block mb-1">Use of Funds Allocation:</span>
                      <p className="text-[#16587B]/75">{idea.useOfFunds}</p>
                    </div>
                  )}

                  <div>
                    <span className="font-semibold text-[#16587B] block mb-2">Available Documents:</span>
                    <div className="space-y-2">
                      {idea.documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-3 border border-[#84B3CE]/35 rounded flex items-center justify-between hover:bg-[#f5f0e5]"
                        >
                          <div className="flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-[#16587B]" />
                            <div>
                              <span className="font-medium text-[#16587B] block">{doc.title}</span>
                              <span className="text-[11px] text-[#16587B]/75">{doc.fileName} ({doc.fileSize})</span>
                            </div>
                          </div>
                          <span className="text-xs text-[#16587B] underline cursor-pointer">Download Verified</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Locked State with Credit Unlock */
                <div className="py-6 px-4 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded-lg text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#fcfaf5] border border-[#84B3CE]/35 flex items-center justify-center mx-auto text-[#16587B]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#16587B]">
                      Protected Financials & Pitch Deck
                    </h4>
                    <p className="text-xs text-[#16587B]/75 max-w-md mx-auto mt-1 leading-relaxed">
                      To protect founder confidentiality and intellectual property, the verified 3-year model, unit economics, and cap table are restricted.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsUnlockModalOpen(true)}
                      className="px-4 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
                    >
                      Unlock with 1 Discovery Credit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsUnlockModalOpen(true)}
                      className="px-4 py-2 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#fcfaf5]"
                    >
                      Request Access
                    </button>
                  </div>

                  <div className="text-[11px] text-[#16587B]/75 pt-1">
                    Your account balance: {investorProfile.discoveryCreditsRemaining} of {investorProfile.totalCreditsGranted} monthly discovery credits available.
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar: Founder & Coordination */}
          <div className="lg:col-span-4 space-y-6">
            {/* Founder Profile Card */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#16587B] block pb-2 border-b border-[#84B3CE]/35">
                Founder Profile
              </span>

              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={idea.founderAvatar}
                  alt={idea.founderName}
                  className="w-12 h-12 rounded-full object-cover border border-[#84B3CE]/35"
                />
                <div>
                  <div className="text-sm font-semibold text-[#16587B] flex items-center gap-1">
                    {idea.founderName}
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />
                  </div>
                  <span className="text-xs text-[#16587B]/75 block">{idea.location}</span>
                </div>
              </div>

              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                {idea.founderBio}
              </p>

              {idea.founderLinkedIn && (
                <a
                  href={idea.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#16587B] hover:underline"
                >
                  <span>Verified LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-[#16587B]/75" />
                </a>
              )}

              <div className="pt-4 border-t border-[#84B3CE]/35 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsMeetingModalOpen(true)}
                  className="w-full py-2 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#f5f0e5] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#16587B]" />
                  <span>Schedule Video Sync</span>
                </button>
              </div>
            </div>

            {/* Platform Trust & Report */}
            <div className="p-4 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] text-xs space-y-2">
              <div className="font-semibold text-[#16587B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5B0015]" />
                <span>Ideasoch Trust Assurance</span>
              </div>
              <p className="text-[#16587B]/75 leading-relaxed text-[11px]">
                Founders on Ideasoch are verified against identity and business registrations. Pitch materials are governed by standard mutual bilateral confidentiality.
              </p>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="text-[11px] text-[#16587B]/75 hover:text-[#16587B] underline flex items-center gap-1 pt-1"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>Report inaccurate info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ApplyToInvestorsModal
        idea={idea}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      <UnlockIdeaModal
        idea={idea}
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
      />

      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        targetUser={{
          id: idea.founderId,
          name: idea.founderName,
          avatar: idea.founderAvatar,
          role: 'Founder',
        }}
        defaultTitle={`Diligence Discussion: ${idea.title}`}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetType="IDEA"
        targetId={idea.id}
        targetTitle={idea.title}
      />

      <LetsChatModal
        idea={idea}
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </div>
  );
}
