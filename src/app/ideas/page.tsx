'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { IdeaCard } from '@/components/cards/IdeaCard';
import Link from 'next/link';
import { PlusCircle, Search, SlidersHorizontal } from 'lucide-react';
import { IdeaCategory, IdeaStage } from '@/types';

export default function IdeasPage() {
  const { ideas } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('ALL');
  const [stage, setStage] = useState<string>('ALL');

  const categories: IdeaCategory[] = [
    'Healthcare & Life Sciences',
    'CleanTech & Energy',
    'FinTech & Capital',
    'AgriTech & Food',
    'B2B SaaS & AI',
    'Logistics & Supply Chain',
    'EdTech & Learning',
    'Consumer & D2C',
  ];

  const stages: IdeaStage[] = ['Prototype', 'MVP', 'Early Traction', 'Scaling'];

  const filtered = ideas.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'ALL' || item.category === category;
    const matchesStage = stage === 'ALL' || item.stage === stage;
    return matchesSearch && matchesCat && matchesStage;
  });

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#84B3CE]/35 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
              Curated Opportunities
            </span>
            <h1 className="text-3xl font-normal text-[#16587B] tracking-tight">
              Business Ideas
            </h1>
            <p className="text-xs text-[#16587B]/75 mt-1 max-w-xl">
              Verified business concepts and commercial projects submitted by founders across key sectors.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/submit-idea"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Your Idea</span>
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#16587B]/75 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by idea name or description..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
            >
              <option value="ALL">All Sectors</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="px-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
            >
              <option value="ALL">All Stages</option>
              {stages.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ideas Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[#84B3CE]/35 rounded-lg">
            <p className="text-xs text-[#16587B]/75 mb-2">No ideas match the selected filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('ALL');
                setStage('ALL');
              }}
              className="text-xs font-semibold text-[#16587B] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
