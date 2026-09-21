'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { OpportunityType } from '@/types';
import { ArrowLeft, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PostOpportunityPage() {
  const router = useRouter();
  const { addOpportunity, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<OpportunityType>('Co-founder');
  const [location, setLocation] = useState(currentUser.location || 'Mumbai, India');
  const [isRemote, setIsRemote] = useState(true);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState(
    'Demonstrated track record\nStrong alignment with domain vision\nExecutive communication skills'
  );
  const [skillsText, setSkillsText] = useState('Strategy, Problem Solving, Leadership');
  const [compensationOrEquity, setCompensationOrEquity] = useState(
    '10% – 15% Equity + Competitive Salary post-seed'
  );
  const [deadline, setDeadline] = useState('2026-11-30');
  const [applicationMethod, setApplicationMethod] = useState<'INTERNAL' | 'EXTERNAL'>('INTERNAL');
  const [externalUrl, setExternalUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const types: OpportunityType[] = [
    'Co-founder',
    'Job',
    'Partnership',
    'Investment',
    'Consulting',
    'Internship',
    'Acquisition',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addOpportunity({
      title,
      type,
      location,
      isRemote,
      summary,
      description,
      requirements,
      skills,
      compensationOrEquity,
      deadline,
      applicationMethod,
      externalUrl: applicationMethod === 'EXTERNAL' ? externalUrl : undefined,
    });

    router.push('/dashboard/investor');
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard/investor"
          className="inline-flex items-center gap-1.5 text-xs text-[#16587B]/75 hover:text-[#16587B] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Investor Dashboard</span>
        </Link>

        <div className="pb-6 border-b border-[#84B3CE]/35 mb-8">
          <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
            New Commercial Listing
          </span>
          <h1 className="text-2xl font-normal text-[#16587B] tracking-tight">
            Post an Opportunity
          </h1>
          <p className="text-xs text-[#16587B]/75 mt-1">
            Publish syndicate allocations, executive co-founder searches, or advisory mandates directly to the Ideasoch network.
          </p>
        </div>

        <div className="border border-[#84B3CE]/35 rounded-lg p-6 sm:p-8 bg-[#fcfaf5]">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div>
              <label className="block font-medium text-[#16587B] mb-1">
                Opportunity Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Technical Co-founder & CTO for Climate Tech Startup"
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B] focus:outline-none focus:border-[#5B0015]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#16587B] mb-1">
                  Opportunity Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as OpportunityType)}
                  className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5]"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#16587B] mb-1">
                  Location & Work Mode
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, India"
                    className="flex-1 p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsRemote(!isRemote)}
                    className={`px-3 py-2 border rounded-md font-medium text-xs transition-colors ${
                      isRemote
                        ? 'bg-[#5B0015] text-[#fcfaf5] border-[#5B0015]'
                        : 'bg-[#fcfaf5] text-[#16587B]/75 border-[#84B3CE]/35'
                    }`}
                  >
                    Remote
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#16587B] mb-1">
                Short Summary (1–2 sentences) *
              </label>
              <input
                type="text"
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Succinct overview of the position or partnership scope..."
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#16587B] mb-1">
                Detailed Scope & Context *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the background, commercial traction, and expectations..."
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#16587B] mb-1">
                Requirements & Selection Criteria (one per line)
              </label>
              <textarea
                rows={3}
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#16587B] mb-1">
                Key Skills (comma separated)
              </label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="e.g. Distributed Systems, Rust, Energy Markets"
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#16587B] mb-1">
                  Terms / Equity / Compensation *
                </label>
                <input
                  type="text"
                  required
                  value={compensationOrEquity}
                  onChange={(e) => setCompensationOrEquity(e.target.value)}
                  placeholder="e.g. 15% Equity or ₹1.5L/mo Retainer"
                  className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#16587B] mb-1">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#84B3CE]/35">
              <label className="block font-medium text-[#16587B] mb-2">
                Application Intake Method
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="intake"
                    checked={applicationMethod === 'INTERNAL'}
                    onChange={() => setApplicationMethod('INTERNAL')}
                    className="text-[#16587B]"
                  />
                  <span>Apply internally via Ideasoch</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="intake"
                    checked={applicationMethod === 'EXTERNAL'}
                    onChange={() => setApplicationMethod('EXTERNAL')}
                    className="text-[#16587B]"
                  />
                  <span>Apply on external website</span>
                </label>
              </div>

              {applicationMethod === 'EXTERNAL' && (
                <input
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://fund.com/opportunity"
                  className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
                />
              )}
            </div>

            <div className="pt-6 border-t border-[#84B3CE]/35 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-[#84B3CE]/35 rounded-md text-[#16587B]/75 hover:text-[#16587B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
              >
                <span>Publish Opportunity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
