'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_INVESTORS } from '@/lib/initialData';
import { useApp } from '@/context/AppContext';
import { ScheduleMeetingModal } from '@/components/modals/ScheduleMeetingModal';
import {
  ShieldCheck,
  MapPin,
  MessageSquare,
  Calendar,
  ExternalLink,
  ArrowLeft,
  Briefcase,
  Layers,
  Send,
} from 'lucide-react';

export default function InvestorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const investorId = resolvedParams.id;
  const { startOrGetConversationWith, ideas } = useApp();

  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  const investor = INITIAL_INVESTORS.find((inv) => inv.userId === investorId);
  if (!investor) {
    notFound();
  }

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/investors"
          className="inline-flex items-center gap-1.5 text-xs text-[#16587B]/75 hover:text-[#16587B] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Investors</span>
        </Link>

        {/* Profile Card */}
        <div className="border border-[#84B3CE]/35 rounded-lg p-6 sm:p-8 bg-[#fcfaf5] mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#84B3CE]/35">
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={investor.avatar}
                alt={investor.name}
                className="w-16 h-16 rounded-full object-cover border border-[#84B3CE]/35"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-2xl font-semibold text-[#16587B] tracking-tight">
                    {investor.name}
                  </h1>
                  {investor.verified && (
                    <span title="24h Background Security Verified Backer" className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#5B0015]/10 border border-[#5B0015]/30 text-[#5B0015]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>24h Verified Backer</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#16587B]/75 mt-0.5">
                  {investor.title} · {investor.organization}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#16587B]/75 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {investor.location}
                  </span>
                  <span>•</span>
                  <span className="text-[#16587B] font-medium">5 Included Bilateral Chats</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] text-right min-w-[200px]">
              <span className="text-[11px] uppercase tracking-wider text-[#16587B]/75 block">
                Standard Check Size
              </span>
              <span className="text-lg font-semibold text-[#16587B] block mt-0.5">
                {investor.minTicket} – {investor.maxTicket}
              </span>
              <span className="text-[11px] text-[#5B0015] font-medium block mt-0.5">
                Direct / Syndicate Allocation
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-[#16587B]/75">
              {investor.linkedIn && (
                <a
                  href={investor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#16587B] hover:underline font-medium"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-[#16587B]/75" />
                </a>
              )}
              {investor.website && (
                <a
                  href={investor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#16587B] hover:underline font-medium"
                >
                  <span>Fund Website</span>
                  <ExternalLink className="w-3 h-3 text-[#16587B]/75" />
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMeetingModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#f5f0e5]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#16587B]" />
                <span>Schedule Discussion</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  startOrGetConversationWith({
                    id: investor.userId,
                    name: investor.name,
                    role: 'INVESTOR',
                    avatar: investor.avatar,
                    title: investor.title,
                    verified: investor.verified,
                  });
                  window.location.href = '/messages';
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Connect & Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6 text-xs">
            {/* Investment Thesis */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Investment Thesis & Philosophy
              </h2>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                {investor.investmentThesis}
              </p>
            </div>

            {/* Background & Bio */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Background & Experience
              </h2>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                {investor.bio}
              </p>
            </div>

            {/* Portfolio Highlights */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Notable Investments & Portfolio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {investor.portfolio.map((port, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-[#84B3CE]/35 rounded-md bg-[#f5f0e5]"
                  >
                    <div className="font-semibold text-[#16587B] text-xs">{port.name}</div>
                    <div className="text-[11px] text-[#16587B]/75 mt-0.5">
                      {port.sector} · {port.stage} ({port.year})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6 text-xs">
            {/* Focus Industries */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Target Sectors
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {investor.preferredIndustries.map((ind) => (
                  <span
                    key={ind}
                    className="px-2.5 py-1 text-[11px] border border-[#84B3CE]/35 rounded bg-[#f5f0e5] text-[#16587B]"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Value-Add & Advisory
              </h3>
              <ul className="space-y-1.5 text-xs text-[#16587B]/75">
                {investor.areasOfExpertise.map((exp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16587B]"></span>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        targetUser={{
          id: investor.userId,
          name: investor.name,
          avatar: investor.avatar,
          role: 'Investor',
        }}
        defaultTitle={`Pitch Discussion with ${investor.name}`}
      />
    </div>
  );
}
