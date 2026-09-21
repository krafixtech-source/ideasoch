'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Standard Seed Due Diligence Checklist (India & Global)',
      category: 'Diligence & Compliance',
      description: 'A 24-point legal, tax, and IP checklist required by angel syndicates and institutional micro-VCs before issuing term sheets.',
      format: 'PDF Guide · 12 Pages',
    },
    {
      title: '7-Slide Institutional Pitch Deck Framework',
      category: 'Fundraising Architecture',
      description: 'The exact slide structure and narrative sequence optimized for accredited investors who review hundreds of opportunities weekly.',
      format: 'Template & Breakdown',
    },
    {
      title: 'Unit Economics & CAC Payback Primer for B2B SaaS',
      category: 'Financial Modeling',
      description: 'Formulas and benchmarking tables for calculating cohort retention, net revenue retention (NRR), and capital efficiency.',
      format: 'Spreadsheet Model',
    },
    {
      title: 'Bilateral Mutual NDA & IP Protection Agreement',
      category: 'Legal Documents',
      description: 'Standardized non-disclosure agreement compliant with Indian Indian Contract Act and international venture practice.',
      format: 'Legal Template',
    },
  ];

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-[#84B3CE]/35 mb-12">
          <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-4xl font-normal text-[#16587B] tracking-tight">
            Founder & Investor Resources
          </h1>
          <p className="text-sm text-[#16587B]/75 mt-2 leading-relaxed">
            Curated playbooks, financial models, and legal templates to prepare ideas for institutional capital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {resources.map((res, i) => (
            <div
              key={i}
              className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[11px] font-mono text-[#16587B] block mb-1">
                  {res.category.toUpperCase()}
                </span>
                <h3 className="text-base font-semibold text-[#16587B] mb-2 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-[#16587B]/75 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#84B3CE]/35 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#16587B]/75">{res.format}</span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading verified template: ${res.title}`)}
                  className="inline-flex items-center gap-1 font-medium text-[#16587B] hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
