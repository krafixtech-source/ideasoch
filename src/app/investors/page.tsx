'use client';

import React, { useState } from 'react';
import { INITIAL_INVESTORS } from '@/lib/initialData';
import { InvestorCard } from '@/components/cards/InvestorCard';
import { Search } from 'lucide-react';

export default function InvestorsPage() {
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');

  const filtered = INITIAL_INVESTORS.filter((inv) => {
    const matchesSearch =
      inv.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.organization.toLowerCase().includes(search.toLowerCase()) ||
      inv.investmentThesis.toLowerCase().includes(search.toLowerCase());
    const matchesSector =
      sectorFilter === 'ALL' ||
      inv.preferredIndustries.some((ind) => ind.includes(sectorFilter));
    return matchesSearch && matchesSector;
  });

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-8 border-b border-[#84B3CE]/35 mb-8">
          <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
            Capital Partners
          </span>
          <h1 className="text-3xl font-normal text-[#16587B] tracking-tight">
            Accredited Investors
          </h1>
          <p className="text-xs text-[#16587B]/75 mt-1 max-w-xl">
            Active angel investors, family offices, and seed fund managers investing across key sectors in India and globally.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#16587B]/75 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by investor name, fund, or thesis..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
            />
          </div>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
          >
            <option value="ALL">All Focus Sectors</option>
            <option value="CleanTech">CleanTech & Energy</option>
            <option value="Healthcare">Healthcare & BioTech</option>
            <option value="FinTech">FinTech & Capital</option>
            <option value="Logistics">Logistics & Supply Chain</option>
            <option value="SaaS">B2B SaaS & AI</option>
          </select>
        </div>

        {/* Investor Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((inv) => (
              <InvestorCard key={inv.userId} investor={inv} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[#84B3CE]/35 rounded-lg">
            <p className="text-xs text-[#16587B]/75">No investors found matching the search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
