import React from 'react';
import Link from 'next/link';
import { Opportunity } from '@/types';
import { ShieldCheck, MapPin, ArrowRight, Calendar } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OPPORTUNITY_IMAGES: Record<string, string> = {
  'Co-founder': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
  'Job': 'https://images.unsplash.com/photo-1497032205916-ac533900bbdb?auto=format&fit=crop&w=400&q=80',
  'Partnership': 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=400&q=80',
  'Investment': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80',
  'Consulting': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80',
  'Internship': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
  'Acquisition': 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=400&q=80',
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'Co-founder':
        return 'text-[#5B0015] bg-[#5B0015]/10 border-[#5B0015]/25 font-semibold';
      case 'Investment':
        return 'text-[#16587B] bg-[#16587B]/10 border-[#16587B]/25 font-semibold';
      case 'Partnership':
        return 'text-[#16587B] bg-[#84B3CE]/20 border-[#84B3CE]/40 font-medium';
      default:
        return 'text-[#16587B] bg-[#84B3CE]/15 border-[#84B3CE]/30';
    }
  };

  return (
    <div className="group bg-[#f5f0e5] border border-[#84B3CE]/35 rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#16587B] hover:shadow-sm transition-all duration-150">
      <div className="h-28 overflow-hidden relative">
        <img 
          src={OPPORTUNITY_IMAGES[opportunity.type] || 'https://images.unsplash.com/photo-1497032205916-ac533900bbdb?auto=format&fit=crop&w=400&q=80'} 
          alt={opportunity.type}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Top: Type Badge & Location */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2 py-0.5 text-[11px] uppercase tracking-wide border rounded ${getTypeBadgeStyle(
              opportunity.type
            )}`}
          >
            {opportunity.type}
          </span>
          <span className="text-[11px] text-[#16587B]/65 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#84B3CE]" />
            {opportunity.isRemote ? 'Remote / Hybrid' : opportunity.location}
          </span>
        </div>

        {/* Title */}
        <Link href={`/opportunities/${opportunity.id}`} className="block group">
          <h3 className="text-base font-semibold text-[#16587B] group-hover:text-[#5B0015] tracking-tight leading-snug mb-1.5 transition-colors">
            {opportunity.title}
          </h3>
        </Link>

        {/* Poster identity */}
        <div className="flex items-center gap-1.5 text-xs text-[#16587B]/75 mb-3">
          <span>{opportunity.postedByName}</span>
          {opportunity.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />}
        </div>

        {/* Summary */}
        <p className="text-xs text-[#16587B]/75 leading-relaxed line-clamp-2 mb-4">
          {opportunity.summary}
        </p>

        {/* Compensation / Equity details */}
        <div className="pt-3 border-t border-[#84B3CE]/25 text-xs mb-4">
          <span className="text-[#16587B]/65 block text-[11px]">Terms & Allocation</span>
          <span className="font-semibold text-[#5B0015] block truncate mt-0.5">
            {opportunity.compensationOrEquity}
          </span>
        </div>
      </div>

      {/* Footer: Date & Action */}
      <div className="pt-3 border-t border-[#84B3CE]/25 flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#16587B]/65 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-[#84B3CE]" /> Deadline: {opportunity.deadline}
        </span>
        <Link
          href={`/opportunities/${opportunity.id}`}
          className="inline-flex items-center gap-1 font-medium text-[#5B0015] hover:text-[#43000f] transition-colors"
        >
          <span>View Opportunity</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      </div>
    </div>
  );
};
