'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import Link from 'next/link';
import { PlusCircle, Search } from 'lucide-react';
import { OpportunityType } from '@/types';

export default function OpportunitiesPage() {
  const { opportunities, currentRole } = useApp();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const types: OpportunityType[] = [
    'Co-founder',
    'Job',
    'Partnership',
    'Investment',
    'Consulting',
    'Internship',
    'Acquisition',
  ];

  const filtered = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.summary.toLowerCase().includes(search.toLowerCase()) ||
      opp.postedByName.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'ALL' || opp.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#84B3CE]/35 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
              Ecosystem Marketplace
            </span>
            <h1 className="text-3xl font-normal text-[#16587B] tracking-tight">
              Opportunities Beyond Investment
            </h1>
            <p className="text-xs text-[#16587B]/75 mt-1 max-w-xl">
              Co-founder roles, strategic partnerships, corporate distributions, consulting contracts, and syndicate allocations.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/dashboard/investor/opportunities/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post an Opportunity</span>
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#16587B]/75 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search positions, partnerships, or companies..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
          >
            <option value="ALL">All Opportunity Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Opportunities Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[#84B3CE]/35 rounded-lg">
            <p className="text-xs text-[#16587B]/75">No opportunities found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
