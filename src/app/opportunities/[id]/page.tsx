'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ScheduleMeetingModal } from '@/components/modals/ScheduleMeetingModal';
import { ReportModal } from '@/components/modals/ReportModal';
import {
  ShieldCheck,
  MapPin,
  Calendar,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Send,
  X,
} from 'lucide-react';

export default function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const oppId = resolvedParams.id;

  const { opportunities, applyToOpportunity, currentUser } = useApp();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [applicantNote, setApplicantNote] = useState('');
  const [isAppliedSuccess, setIsAppliedSuccess] = useState(false);

  const opp = opportunities.find((o) => o.id === oppId);
  if (!opp) {
    notFound();
  }

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyToOpportunity(opp.id, applicantNote);
    setIsAppliedSuccess(true);
    setTimeout(() => {
      setIsAppliedSuccess(false);
      setIsApplyModalOpen(false);
    }, 1200);
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-xs text-[#16587B]/75 hover:text-[#16587B] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Opportunities</span>
        </Link>

        {/* Opportunity Card */}
        <div className="border border-[#84B3CE]/35 rounded-lg p-6 sm:p-8 bg-[#fcfaf5] mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#84B3CE]/35">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-[#f5f0e5] border border-[#84B3CE]/35 rounded text-[#16587B]">
                  {opp.type}
                </span>
                <span className="text-[11px] text-[#16587B]/75 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {opp.isRemote ? 'Remote / Hybrid' : opp.location}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-[#16587B] tracking-tight mb-2">
                {opp.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-[#16587B]/75">
                <span>Posted by {opp.postedByName}</span>
                {opp.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />}
                <span>·</span>
                <span>{opp.applicationsCount} applicants</span>
              </div>
            </div>

            {/* Compensation / Terms box */}
            <div className="p-4 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] text-right min-w-[220px]">
              <span className="text-[11px] uppercase tracking-wider text-[#16587B]/75 block">
                Compensation / Allocation
              </span>
              <span className="text-base font-semibold text-[#16587B] block mt-0.5 leading-snug">
                {opp.compensationOrEquity}
              </span>
              <span className="text-[11px] text-[#16587B]/75 flex items-center justify-end gap-1 mt-1">
                <Calendar className="w-3 h-3" /> Deadline: {opp.deadline}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#16587B]/75">
              Method: {opp.applicationMethod === 'INTERNAL' ? 'Direct on Ideasoch' : 'External Allocation Partner'}
            </span>

            <div className="flex items-center gap-2">
              {opp.applicationMethod === 'INTERNAL' ? (
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply on Ideasoch</span>
                </button>
              ) : (
                <a
                  href={opp.externalUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
                >
                  <span>Apply on External Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Opportunity Overview
              </h2>
              <p className="text-[#16587B]/75 leading-relaxed text-xs">
                {opp.description || opp.summary}
              </p>
            </div>

            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                What We&apos;re Looking For / Requirements
              </h2>
              <ul className="space-y-2 text-[#16587B]/75">
                {opp.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5B0015] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Desired Competencies & Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {opp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded text-[#16587B]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Poster Information
              </h3>
              <div className="font-semibold text-[#16587B]">{opp.postedByName}</div>
              <div className="text-[11px] text-[#16587B]/75">{opp.postedByRole}</div>
              <div className="pt-3 border-t border-[#84B3CE]/35">
                <button
                  type="button"
                  onClick={() => setIsMeetingModalOpen(true)}
                  className="w-full py-2 text-xs border border-[#84B3CE]/35 rounded text-[#16587B] hover:bg-[#f5f0e5]"
                >
                  Schedule Inquiry Sync
                </button>
              </div>
            </div>

            <div className="p-4 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] text-[11px] text-[#16587B]/75 space-y-2">
              <div className="font-semibold text-[#16587B] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />
                <span>Verified Entity</span>
              </div>
              <p>
                All positions and capital opportunities on Ideasoch undergo credential validation before publishing.
              </p>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="underline text-[#16587B]/75 hover:text-[#16587B]"
              >
                Report listing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-[#fcfaf5] border border-[#84B3CE]/35 rounded-lg max-w-md w-full p-6 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#84B3CE]/35">
              <h3 className="text-sm font-semibold text-[#16587B]">
                Apply for {opp.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 text-[#16587B]/75"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAppliedSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#84B3CE]/20 text-[#5B0015] flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#16587B]">Application Dispatched</div>
                <p className="text-[11px] text-[#16587B]/75">
                  Your profile and introduction were transmitted directly to {opp.postedByName}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="mt-4 space-y-4 text-xs">
                <div>
                  <span className="text-[#16587B]/75 block mb-1">Applying as:</span>
                  <div className="font-semibold text-[#16587B]">{currentUser.name} ({currentUser.title})</div>
                </div>

                <div>
                  <label className="block text-[#16587B] font-medium mb-1">
                    Introduction & Relevant Experience
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    placeholder="Describe how your background fits this requirement..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
                  />
                </div>

                <div className="pt-3 border-t border-[#84B3CE]/35 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-[#16587B]/75"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f]"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        targetUser={{
          id: opp.postedById,
          name: opp.postedByName,
          avatar: opp.postedByAvatar,
          role: opp.postedByRole,
        }}
        defaultTitle={`Inquiry on ${opp.title}`}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetType="OPPORTUNITY"
        targetId={opp.id}
        targetTitle={opp.title}
      />
    </div>
  );
}
