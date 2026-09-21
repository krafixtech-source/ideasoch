import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function SuccessStoriesPage() {
  const stories = [
    {
      founder: 'Vikram Deshmukh',
      idea: 'KisanSetu',
      investor: 'Aarohan Seed Syndicate',
      industry: 'AgriTech & Cold Storage',
      summary: 'Aggregating modular solar cold-storage containers at Indian village farm-gates.',
      outcome:
        'Matched with Aarohan Seed Fund on Ideasoch within 18 days of publishing. Completed 14 pilot deployments across Nashik and Satara districts with full bilateral compliance tracking.',
      quote:
        'Ideasoch eliminated the noise of broadcast pitches. The investor who unlocked our dossier already understood rural cold-chain economics before our first 30-minute sync.',
    },
    {
      founder: 'Rahul Sharma',
      idea: 'CleanGrid AI',
      investor: 'Mehta Ventures',
      industry: 'CleanTech & Energy Systems',
      summary: 'Autonomous microgrid energy arbitrage and peak load shaving for manufacturing parks.',
      outcome:
        'Submitted multi-investor application directly from the dashboard; Rajiv Mehta unlocked confidential technical telemetry readings and scheduled a bilateral diligence call.',
      quote:
        'The ability to share confidential hardware schematics securely under platform audit logs gave our engineering team full confidence.',
    },
    {
      founder: 'Dr. Ananya Sen',
      idea: 'Nivaan Diagnostics',
      investor: 'Kaveri Life Sciences Desk',
      industry: 'Medical Devices & IVD',
      summary: 'Point-of-care transdermal optical spectrometry analyzer.',
      outcome:
        'Connected with institutional MedTech partners to structure preliminary CDSCO multi-centric clinical trials and hospital pilot protocols.',
      quote:
        'Finding investors who genuinely comprehend optical biomedical devices in India used to take months of blind networking.',
    },
  ];

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-[#84B3CE]/35 mb-12">
          <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
            Case Studies & Outcomes
          </span>
          <h1 className="text-3xl sm:text-4xl font-normal text-[#16587B] tracking-tight">
            From an Idea to a Conversation
          </h1>
          <p className="text-sm text-[#16587B]/75 mt-2 leading-relaxed">
            Real narratives of founders connecting with early-stage partners and commercial co-builders through Ideasoch.
          </p>
        </div>

        <div className="space-y-8">
          {stories.map((s, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#16587B] font-medium">
                  CASE STUDY 0{idx + 1} · {s.industry.toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#5B0015] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Connection
                </span>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#16587B] mb-1">{s.idea}</h2>
                <p className="text-xs text-[#16587B]/75 leading-relaxed">{s.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-t border-b border-[#84B3CE]/35 text-xs">
                <div>
                  <span className="text-[#16587B]/75 block text-[11px]">Founder Lead</span>
                  <span className="font-semibold text-[#16587B]">{s.founder}</span>
                </div>
                <div>
                  <span className="text-[#16587B]/75 block text-[11px]">Capital Partner</span>
                  <span className="font-semibold text-[#16587B]">{s.investor}</span>
                </div>
              </div>

              <div className="text-xs text-[#16587B]/75 space-y-2">
                <span className="font-semibold text-[#16587B] block">Verified Outcome:</span>
                <p className="leading-relaxed">{s.outcome}</p>
                <blockquote className="pt-2 italic text-[#16587B]">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-12 mt-12 border-t border-[#84B3CE]/35 flex items-center justify-between">
          <span className="text-xs text-[#16587B]/75">Are you building a defensible business?</span>
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
  );
}
