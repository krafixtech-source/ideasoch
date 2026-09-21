import React from 'react';
import Link from 'next/link';
import { InvestorProfile } from '@/types';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

interface InvestorCardProps {
  investor: InvestorProfile;
}

export const InvestorCard: React.FC<InvestorCardProps> = ({ investor }) => {
  return (
    <div className="bg-[#f5f0e5] border border-[#84B3CE]/35 rounded-lg p-5 flex flex-col justify-between hover:border-[#16587B] hover:shadow-sm transition-all duration-150">
      <div>
        {/* Header with Avatar, Name, Location */}
        <div className="flex items-start gap-3.5 mb-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={investor.avatar}
            alt={investor.name}
            className="w-12 h-12 rounded-full object-cover border border-[#84B3CE]/40 shrink-0"
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-sm font-semibold text-[#16587B] tracking-tight">
                {investor.name}
              </h3>
              {investor.verified && (
                <span title="Verified Investor">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />
                </span>
              )}
            </div>
            <p className="text-xs text-[#16587B]/75 leading-tight mt-0.5">
              {investor.title}, {investor.organization}
            </p>
            <p className="text-[11px] text-[#16587B]/65 flex items-center gap-0.5 mt-1">
              <MapPin className="w-2.5 h-2.5 text-[#84B3CE]" /> {investor.location}
            </p>
          </div>
        </div>

        {/* Bio / Thesis snippet */}
        <p className="text-xs text-[#16587B]/80 line-clamp-2 leading-relaxed mb-4">
          {investor.investmentThesis || investor.bio}
        </p>

        {/* Focus & Ticket Range */}
        <div className="space-y-2 pt-3 border-t border-[#84B3CE]/25 text-xs mb-4">
          <div>
            <span className="text-[#16587B]/65 block text-[11px]">Interested In</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {investor.preferredIndustries.slice(0, 3).map((ind) => (
                <span
                  key={ind}
                  className="px-2 py-0.5 text-[11px] bg-[#84B3CE]/15 border border-[#84B3CE]/35 rounded text-[#16587B] font-medium"
                >
                  {ind.split('&')[0].trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="text-[#16587B]/65 block text-[11px]">Ticket Range</span>
              <span className="font-semibold text-xs text-[#5B0015]">
                {investor.minTicket} – {investor.maxTicket}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[#16587B]/65 block text-[11px]">Portfolio</span>
              <span className="text-xs text-[#16587B] font-medium">{investor.portfolio.length} Startups</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#84B3CE]/25 flex items-center justify-between">
        <span className="text-[11px] text-[#16587B] font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16587B]"></span>
          Accepting Pitches
        </span>
        <Link
          href={`/investors/${investor.userId}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#5B0015] hover:text-[#43000f] transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
