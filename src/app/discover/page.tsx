'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { IdeaCard } from '@/components/cards/IdeaCard';
import { InvestorCard } from '@/components/cards/InvestorCard';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import { INITIAL_INVESTORS } from '@/lib/initialData';
import { Search, SlidersHorizontal, X, Check } from 'lucide-react';
import { IdeaCategory, IdeaStage, OpportunityType } from '@/types';

export default function DiscoverPage() {
  const { ideas, opportunities } = useApp();
  const [activeTab, setActiveTab] = useState<'ideas' | 'investors' | 'opportunities'>('ideas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [selectedOppType, setSelectedOppType] = useState<string>('ALL');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  const stages: IdeaStage[] = [
    'Concept',
    'Research & Validation',
    'Prototype',
    'MVP',
    'Early Traction',
    'Scaling',
  ];

  const oppTypes: OpportunityType[] = [
    'Co-founder',
    'Job',
    'Partnership',
    'Investment',
    'Consulting',
    'Internship',
    'Acquisition',
  ];

  // Filtering Ideas
  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || idea.category === selectedCategory;
    const matchesStage = selectedStage === 'ALL' || idea.stage === selectedStage;
    return matchesSearch && matchesCategory && matchesStage;
  });

  // Filtering Investors
  const filteredInvestors = INITIAL_INVESTORS.filter((inv) => {
    const matchesSearch =
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' ||
      inv.preferredIndustries.some((ind) => ind.includes(selectedCategory.split('&')[0]));
    return matchesSearch && matchesCategory;
  });

  // Filtering Opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.postedByName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedOppType === 'ALL' || opp.type === selectedOppType;
    return matchesSearch && matchesType;
  });

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedStage('ALL');
    setSelectedOppType('ALL');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen">
      {/* Top Header */}
      <div className="border-b border-[#84B3CE]/35 bg-[#fcfaf5] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-6">
            <h1 className="text-3xl font-normal text-[#16587B] tracking-tight">
              Discover
            </h1>
            <p className="text-xs text-[#16587B]/75 mt-1 leading-relaxed">
              Explore curated business ideas, accredited angel & venture investors, and strategic commercial opportunities.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="w-4 h-4 text-[#16587B]/75 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ideas, investors or opportunities..."
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-[#84B3CE]/35 rounded-md focus:outline-none focus:border-[#5B0015] text-[#16587B] bg-[#fcfaf5]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16587B]/75 hover:text-[#16587B]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-8 border-b border-[#84B3CE]/35">
            <button
              type="button"
              onClick={() => setActiveTab('ideas')}
              className={`pb-3 text-xs font-semibold tracking-wide uppercase transition-colors relative ${
                activeTab === 'ideas' ? 'text-[#16587B]' : 'text-[#16587B]/75 hover:text-[#16587B]'
              }`}
            >
              Ideas ({filteredIdeas.length})
              {activeTab === 'ideas' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B0015]"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('investors')}
              className={`pb-3 text-xs font-semibold tracking-wide uppercase transition-colors relative ${
                activeTab === 'investors' ? 'text-[#16587B]' : 'text-[#16587B]/75 hover:text-[#16587B]'
              }`}
            >
              Investors ({filteredInvestors.length})
              {activeTab === 'investors' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B0015]"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('opportunities')}
              className={`pb-3 text-xs font-semibold tracking-wide uppercase transition-colors relative ${
                activeTab === 'opportunities'
                  ? 'text-[#16587B]'
                  : 'text-[#16587B]/75 hover:text-[#16587B]'
              }`}
            >
              Opportunities ({filteredOpportunities.length})
              {activeTab === 'opportunities' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B0015]"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Left Sidebar Filters + Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-[#84B3CE]/35">
            <span className="text-xs text-[#16587B]/75">
              Showing results for {activeTab}
            </span>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#84B3CE]/35 rounded-md text-xs font-medium text-[#16587B]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 pr-4 border-r border-[#84B3CE]/35">
            <div className="flex items-center justify-between pb-3 border-b border-[#84B3CE]/35">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                Refine Results
              </span>
              {(selectedCategory !== 'ALL' || selectedStage !== 'ALL' || selectedOppType !== 'ALL') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] text-[#16587B]/75 hover:text-[#16587B] underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#16587B] mb-2">
                Industry & Sector
              </label>
              <div className="space-y-1 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('ALL')}
                  className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                    selectedCategory === 'ALL'
                      ? 'bg-[#5B0015] text-[#fcfaf5] font-medium'
                      : 'text-[#16587B]/75 hover:bg-[#f5f0e5] hover:text-[#16587B]'
                  }`}
                >
                  All Sectors
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors truncate ${
                      selectedCategory === cat
                        ? 'bg-[#5B0015] text-[#fcfaf5] font-medium'
                        : 'text-[#16587B]/75 hover:bg-[#f5f0e5] hover:text-[#16587B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Filter (for Ideas tab) */}
            {activeTab === 'ideas' && (
              <div className="pt-4 border-t border-[#84B3CE]/35">
                <label className="block text-xs font-semibold text-[#16587B] mb-2">
                  Maturity Stage
                </label>
                <div className="space-y-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedStage('ALL')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      selectedStage === 'ALL'
                        ? 'bg-[#5B0015] text-[#fcfaf5] font-medium'
                        : 'text-[#16587B]/75 hover:bg-[#f5f0e5] hover:text-[#16587B]'
                    }`}
                  >
                    All Stages
                  </button>
                  {stages.map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => setSelectedStage(stg)}
                      className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                        selectedStage === stg
                          ? 'bg-[#5B0015] text-[#fcfaf5] font-medium'
                          : 'text-[#16587B]/75 hover:bg-[#f5f0e5] hover:text-[#16587B]'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Opportunity Type Filter (for Opportunities tab) */}
            {activeTab === 'opportunities' && (
              <div className="pt-4 border-t border-[#84B3CE]/35">
                <label className="block text-xs font-semibold text-[#16587B] mb-2">
                  Opportunity Type
                </label>
                <div className="space-y-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedOppType('ALL')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      selectedOppType === 'ALL'
                        ? 'bg-[#5B0015] text-[#fcfaf5] font-medium'
                        : 'text-[#16587B]/75 hover:bg-[#f5f0e5] hover:text-[#16587B]'
                    }`}
                  >
                    All Opportunities
                  </button>
                  {oppTypes.map((typ) => (
                    <button
                      key={typ}
                      type="button"
                      onClick={() => setSelectedOppType(typ)}
                      className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                        selectedOppType === typ
                          ? 'bg-[#5B0015] text-[#fcfaf5] font-medium'
                          : 'text-[#16587B]/75 hover:bg-[#f5f0e5] hover:text-[#16587B]'
                      }`}
                    >
                      {typ}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-9">
            {activeTab === 'ideas' && (
              <>
                {filteredIdeas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIdeas.map((idea) => (
                      <IdeaCard key={idea.id} idea={idea} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center border border-[#84B3CE]/35 rounded-lg p-8">
                    <h3 className="text-sm font-semibold text-[#16587B] mb-1">
                      No matching ideas found
                    </h3>
                    <p className="text-xs text-[#16587B]/75 mb-4">
                      Try clearing your search query or selecting a broader industry category.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="px-4 py-1.5 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#f5f0e5]"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'investors' && (
              <>
                {filteredInvestors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInvestors.map((inv) => (
                      <InvestorCard key={inv.userId} investor={inv} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center border border-[#84B3CE]/35 rounded-lg p-8">
                    <h3 className="text-sm font-semibold text-[#16587B] mb-1">
                      No matching investors found
                    </h3>
                    <p className="text-xs text-[#16587B]/75 mb-4">
                      Adjust your industry filters to view active angels and VC partners.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="px-4 py-1.5 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#f5f0e5]"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'opportunities' && (
              <>
                {filteredOpportunities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOpportunities.map((opp) => (
                      <OpportunityCard key={opp.id} opportunity={opp} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center border border-[#84B3CE]/35 rounded-lg p-8">
                    <h3 className="text-sm font-semibold text-[#16587B] mb-1">
                      No matching opportunities found
                    </h3>
                    <p className="text-xs text-[#16587B]/75 mb-4">
                      Explore co-founder, job, or partnership positions across our broader network.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="px-4 py-1.5 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#f5f0e5]"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Filters */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 lg:hidden">
          <div className="bg-[#fcfaf5] border-t border-[#84B3CE]/35 rounded-t-xl p-6 max-h-[80vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#84B3CE]/35">
              <span className="text-sm font-semibold text-[#16587B]">Filters</span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#16587B]/75"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16587B] mb-2">
                Industry & Sector
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-[#84B3CE]/35 rounded text-xs text-[#16587B] bg-[#fcfaf5]"
              >
                <option value="ALL">All Sectors</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === 'ideas' && (
              <div>
                <label className="block text-xs font-semibold text-[#16587B] mb-2">
                  Stage
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full p-2 border border-[#84B3CE]/35 rounded text-xs text-[#16587B] bg-[#fcfaf5]"
                >
                  <option value="ALL">All Stages</option>
                  {stages.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-3 border-t border-[#84B3CE]/35 flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2 text-xs border border-[#84B3CE]/35 rounded text-[#16587B]/75"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs bg-[#5B0015] text-[#fcfaf5] rounded font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
