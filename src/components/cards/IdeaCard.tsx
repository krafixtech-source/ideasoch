'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Idea } from '@/types';
import {
  ShieldCheck,
  MapPin,
  ArrowRight,
  Bookmark,
  MessageSquare,
  FileText,
  Quote,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LetsChatModal } from '@/components/modals/LetsChatModal';

interface IdeaCardProps {
  idea: Idea;
}

const CATEGORY_IMAGES: Record<string, string> = {
  'Healthcare & Life Sciences': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
  'CleanTech & Energy': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=400&q=80',
  'FinTech & Capital': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80',
  'AgriTech & Food': 'https://images.unsplash.com/photo-1592982537447-6f23f5b0eb68?auto=format&fit=crop&w=400&q=80',
  'B2B SaaS & AI': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
  'Logistics & Supply Chain': 'https://images.unsplash.com/photo-1586528116311-ad8ed7c81d86?auto=format&fit=crop&w=400&q=80',
  'EdTech & Learning': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
  'Consumer & D2C': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80',
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { isIdeaSaved, toggleSaveIdea, investorProfile } = useApp();
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const saved = isIdeaSaved(idea.id);

  const headlineText = idea.headline || idea.title;
  const quoteText = idea.quote || idea.tagline || idea.summary;
  const docCount = idea.documents ? Math.min(idea.documents.length, 2) : 1;

  const isChatActive = (investorProfile.activeChatIds || []).includes(idea.id);

  return (
    <>
      <div className="group bg-[#f5f0e5] border border-[#84B3CE]/40 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#16587B] hover:shadow-md transition-all duration-200">
        <div className="h-32 overflow-hidden relative">
          <img 
            src={CATEGORY_IMAGES[idea.category] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80'} 
            alt={idea.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
          {/* Category & Status Bar */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-semibold tracking-wide uppercase text-[#5B0015] bg-[#5B0015]/8 px-2 py-0.5 rounded">
              {idea.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium text-[#16587B]/70 flex items-center gap-1 bg-[#16587B]/5 px-2 py-0.5 rounded">
                <FileText className="w-3 h-3 text-[#16587B]" /> {docCount}/2 Files
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSaveIdea(idea.id);
                }}
                className="text-[#16587B]/60 hover:text-[#5B0015] transition-colors p-1"
                title={saved ? 'Remove bookmark' : 'Bookmark idea'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#5B0015] text-[#5B0015]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Title & Headline */}
          <Link href={`/ideas/${idea.id}`} className="block group-hover:underline mb-1">
            <h3 className="text-base font-serif font-bold text-[#16587B] group-hover:text-[#5B0015] tracking-tight leading-snug transition-colors">
              {idea.title}
            </h3>
          </Link>

          {/* Short Idea Headline */}
          <p className="text-xs font-semibold text-[#16587B]/90 leading-snug mb-2.5">
            {headlineText}
          </p>

          {/* Punchy Teaser Quote */}
          <div className="relative mb-4 bg-[#FCFAF5] p-3 rounded-lg border-l-2 border-[#84B3CE] shadow-xs">
            <Quote className="w-3 h-3 text-[#84B3CE] absolute top-2 right-2 opacity-50" />
            <p className="text-xs italic text-[#16587B]/80 leading-relaxed font-sans pr-2">
              &ldquo;{quoteText.replace(/^["']|["']$/g, '')}&rdquo;
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-[#84B3CE]/25 text-xs mb-3.5">
            <div>
              <span className="text-[#16587B]/60 block text-[10px] uppercase font-mono tracking-wider">
                Stage
              </span>
              <span className="font-medium text-[#16587B]">{idea.stage}</span>
            </div>
            <div>
              <span className="text-[#16587B]/60 block text-[10px] uppercase font-mono tracking-wider">
                Ask Target
              </span>
              <span className="font-semibold text-[#16587B]">{idea.fundingRequired}</span>
            </div>
          </div>
        </div>

        {/* Footer: Founder, Let's Chat Button, Details */}
        <div className="pt-3 border-t border-[#84B3CE]/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={idea.founderAvatar}
                alt={idea.founderName}
                className="w-6 h-6 rounded-full object-cover border border-[#84B3CE]/40"
              />
              <div className="text-xs">
                <span className="font-medium text-[#16587B] block leading-none flex items-center gap-1">
                  {idea.founderName}
                  <ShieldCheck className="w-3 h-3 text-[#16587B]" />
                </span>
                <span className="text-[10px] text-[#16587B]/65 flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-[#84B3CE]" /> {idea.location.split(',')[0]}
                </span>
              </div>
            </div>

            <Link
              href={`/ideas/${idea.id}`}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#16587B]/70 hover:text-[#16587B] transition-colors"
            >
              <span>Brief</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Highlighted "Let's Chat" Action Button */}
          <button
            type="button"
            onClick={() => setChatModalOpen(true)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs ${
              isChatActive
                ? 'bg-[#84B3CE]/30 hover:bg-[#84B3CE]/40 text-[#16587B] border border-[#16587B]/20'
                : 'bg-[#16587B] hover:bg-[#16587B]/90 text-[#FCFAF5]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {isChatActive ? "Resume Chat" : "Let's Chat"}
          </button>
        </div>
        </div>
      </div>

      {/* Interactive Let's Chat Modal */}
      <LetsChatModal
        idea={idea}
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
      />
    </>
  );
};
