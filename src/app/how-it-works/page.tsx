import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="bg-[#fcfaf5] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-[#84B3CE]/35 mb-12">
          <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
            Platform Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-normal text-[#16587B] tracking-tight">
            How Ideasoch Works
          </h1>
          <p className="text-sm text-[#16587B]/75 mt-2 leading-relaxed">
            A quiet, disciplined ecosystem engineered to replace the friction of cold outreach with verified commercial relevance.
          </p>
        </div>

        {/* Section 1: The Dual Engine */}
        <div className="space-y-12 text-xs">
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#16587B] uppercase tracking-wider">
              01 · The Founder Journey
            </h2>
            <p className="text-[#16587B]/75 leading-relaxed">
              Founders document their business ideas across a comprehensive 7-stage taxonomy: from problem-solution validation and addressable market metrics (TAM/SAM/SOM) to revenue models and regulatory timelines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 border border-[#84B3CE]/35 rounded bg-[#fcfaf5]">
                <span className="font-semibold text-[#16587B] block mb-1">Structured Submission</span>
                <p className="text-[#16587B]/75">No messy PDFs scattered in email threads. A standardized due diligence dossier.</p>
              </div>
              <div className="p-4 border border-[#84B3CE]/35 rounded bg-[#fcfaf5]">
                <span className="font-semibold text-[#16587B] block mb-1">Targeted Multi-Pitch</span>
                <p className="text-[#16587B]/75">Apply directly to up to 10 vetted investors with matching sector theses in one action.</p>
              </div>
              <div className="p-4 border border-[#84B3CE]/35 rounded bg-[#fcfaf5]">
                <span className="font-semibold text-[#16587B] block mb-1">Document Control</span>
                <p className="text-[#16587B]/75">Sensitive cap tables and models stay encrypted until unlocked by accredited partners.</p>
              </div>
            </div>
          </section>

          {/* Section 2: The Investor Discovery Engine */}
          <section className="space-y-4 pt-8 border-t border-[#84B3CE]/35">
            <h2 className="text-base font-semibold text-[#16587B] uppercase tracking-wider">
              02 · The Controlled Discovery Philosophy
            </h2>
            <p className="text-[#16587B]/75 leading-relaxed">
              Most platforms suffer from feed fatigue: endless low-signal scrolling where neither founders nor investors win. Ideasoch enforces a deliberate discovery credit limit:
            </p>
            <div className="p-5 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] space-y-3">
              <div className="font-semibold text-[#16587B]">Why Limited Access Matters:</div>
              <ul className="space-y-2 text-[#16587B]/75">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B0015] shrink-0 mt-0.5" />
                  <span>Investors evaluate 3 to 25 carefully chosen ideas per cycle, leading to significantly higher response rates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B0015] shrink-0 mt-0.5" />
                  <span>Founders know that every confidential unlock represents genuine capital intent and committed diligence time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B0015] shrink-0 mt-0.5" />
                  <span>Tamper-evident audit logs record who viewed your proprietary metrics and when.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Commercial Opportunities */}
          <section className="space-y-4 pt-8 border-t border-[#84B3CE]/35">
            <h2 className="text-base font-semibold text-[#16587B] uppercase tracking-wider">
              03 · Opportunities Beyond Capital
            </h2>
            <p className="text-[#16587B]/75 leading-relaxed">
              Great ideas need co-founders, distribution channels, and advisory mandates as much as equity capital. Ideasoch allows verified businesses and funds to post direct commercial positions, board requirements, and syndications.
            </p>
          </section>

          <div className="pt-8 border-t border-[#84B3CE]/35 flex items-center justify-between">
            <span className="text-xs text-[#16587B]/75">Ready to share your venture?</span>
            <Link
              href="/submit-idea"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f]"
            >
              <span>Submit Your Idea</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
