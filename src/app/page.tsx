'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { IdeaCard } from '@/components/cards/IdeaCard';
import { InvestorCard } from '@/components/cards/InvestorCard';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import { AuthModal } from '@/components/modals/AuthModal';
import { INITIAL_INVESTORS } from '@/lib/initialData';
import {
  ArrowRight,
  ShieldCheck,
  Paperclip,
  Calendar,
  Send,
  Lock,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
  FileText,
} from 'lucide-react';

export default function HomePage() {
  const { ideas, opportunities, users } = useApp();

  // Featured items
  const featuredIdeas = ideas.slice(0, 3);
  const featuredOpportunities = opportunities.slice(0, 3);
  const featuredInvestors = INITIAL_INVESTORS.slice(0, 3);

  // Auth modal state for hero button clicks
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authConfig, setAuthConfig] = useState<{
    mode: 'login' | 'signup';
    role: 'IDEA_MAKER' | 'INVESTOR';
    redirectUrl: string;
    title?: string;
    subtitle?: string;
  }>({
    mode: 'login',
    role: 'IDEA_MAKER',
    redirectUrl: '/submit-idea',
  });

  const handleOpenAuth = (
    mode: 'login' | 'signup',
    role: 'IDEA_MAKER' | 'INVESTOR',
    redirectUrl: string,
    title?: string,
    subtitle?: string
  ) => {
    setAuthConfig({ mode, role, redirectUrl, title, subtitle });
    setIsAuthModalOpen(true);
  };

  return (
    <div className="bg-[#fcfaf5]">
      {/* ==================================================
          SECTION 1 — HERO
          ================================================== */}
      <section className="border-b border-[#84B3CE]/30 bg-[#fcfaf5] pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#84B3CE]/40 bg-[#f5f0e5] text-xs text-[#16587B] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B0015]"></span>
                <span className="font-medium">Neutral Direct Mediator · 0% Equity · 0% Commission</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#16587B] tracking-tight leading-[1.12] mb-6">
                Where Ideas Meet Opportunity.
              </h1>

              <p className="text-base sm:text-lg text-[#16587B]/75 leading-relaxed mb-6 font-normal">
                Ideasoch is the neutral mediator connecting founders with accredited investors. Pitch unlimited investors with 2 active ideas for free, or discover vetted ventures through short thesis headlines and direct bilateral chat.
              </p>

              {/* Feature highlight badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-2.5 py-1 text-[11px] font-medium rounded border border-[#84B3CE]/40 bg-[#f5f0e5] text-[#16587B]">
                  ✓ 2 Active Ideas Free
                </span>
                <span className="px-2.5 py-1 text-[11px] font-medium rounded border border-[#84B3CE]/40 bg-[#f5f0e5] text-[#16587B]">
                  ✓ Endless Investor Reach
                </span>
                <span className="px-2.5 py-1 text-[11px] font-medium rounded border border-[#84B3CE]/40 bg-[#f5f0e5] text-[#16587B]">
                  ✓ 2 File Deck Limit (.pdf/.ppt)
                </span>
                <span className="px-2.5 py-1 text-[11px] font-medium rounded border border-[#5B0015]/30 bg-[#5B0015]/10 text-[#5B0015]">
                  ✓ 24h Security Verified Backers
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => handleOpenAuth('login', 'IDEA_MAKER', '/submit-idea', 'Sign in to Submit Your Idea (Free)', 'Founders receive 2 active idea slots free with endless investor reach.')}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] shadow-sm border border-[#5B0015] transition-colors cursor-pointer"
                >
                  Submit Your Idea (Free)
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('login', 'INVESTOR', '/ideas', 'Sign in to Explore Ideas & Backers', 'Verified investors receive 5 bilateral chats to connect with founders directly.')}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-[#16587B]/30 text-[#16587B] bg-[#f5f0e5] rounded-md hover:bg-[#ede6d8] transition-colors cursor-pointer"
                >
                  Explore Ideas &amp; Backers
                </button>
              </div>

              {/* Direct Quick Login / Sign Up options */}
              <div className="flex items-center gap-2 text-xs text-[#16587B]/75 mb-12">
                <span>Already have an account?</span>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('login', 'IDEA_MAKER', '/dashboard/founder', 'Sign in to Ideasoch', 'Sign in with demo founder (founder@ideasoch.com) or investor credentials.')}
                  className="font-semibold text-[#5B0015] hover:underline cursor-pointer"
                >
                  Log In
                </button>
                <span>·</span>
                <span>New here?</span>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('signup', 'IDEA_MAKER', '/submit-idea', 'Join Ideasoch as Founder or Investor', 'Create your account to submit ideas or back high-conviction ventures.')}
                  className="font-semibold text-[#16587B] hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </div>

              {/* Subtle platform activity line */}
              <div className="pt-6 border-t border-[#84B3CE]/30 flex items-center space-x-6 sm:space-x-10 text-xs text-[#16587B]/70">
                <div>
                  <span className="font-semibold text-sm text-[#5B0015] block">840+</span>
                  <span>Ideas Evaluated</span>
                </div>
                <div className="h-6 w-px bg-[#84B3CE]/30"></div>
                <div>
                  <span className="font-semibold text-sm text-[#5B0015] block">160+</span>
                  <span>Verified Investors</span>
                </div>
                <div className="h-6 w-px bg-[#84B3CE]/30"></div>
                <div>
                  <span className="font-semibold text-sm text-[#5B0015] block">380+</span>
                  <span>Direct Chats Initiated</span>
                </div>
                <div className="h-6 w-px bg-[#84B3CE]/30 hidden sm:block"></div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-sm text-[#5B0015] block">0%</span>
                  <span>Platform Equity / Cut</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sophisticated Editorial Visual */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 bg-[#16587B] text-[#fcfaf5] border border-[#84B3CE]/40 rounded-xl shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#84B3CE]/25 text-xs">
                  <span className="text-[#84B3CE] font-mono tracking-wider uppercase text-[11px] font-bold">
                    SYSTEM / ARCHITECTURE
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#fcfaf5] font-medium text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#84B3CE] animate-pulse"></span>
                    Live Direct Mediator
                  </span>
                </div>

                {/* Node 1: Founder Pitch */}
                <div className="p-3.5 border border-[#16587B]/20 rounded-lg bg-[#84B3CE] text-[#16587B] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#16587B]">01 · FOUNDER IDEA PITCH</span>
                    <span className="text-[10px] text-[#16587B] font-semibold bg-[#fcfaf5]/40 px-1.5 py-0.5 rounded border border-[#16587B]/20">2/2 Files Attached</span>
                  </div>
                  <div className="text-xs font-bold text-[#16587B] mt-1">CleanGrid AI · Industrial IoT Energy Arbitrage</div>
                  <div className="text-[11px] text-[#16587B]/80 mt-0.5 font-medium">Pitch Deck (.pdf) &amp; Financial Model (.pptx) · Raising ₹45L Seed</div>
                </div>

                {/* Connecting Vector */}
                <div className="flex justify-center my-0.5">
                  <div className="w-px h-5 bg-[#84B3CE]/50"></div>
                </div>

                {/* Node 2: Headline & Thesis Quote */}
                <div className="p-3.5 border border-[#16587B]/20 rounded-lg bg-[#84B3CE] text-[#16587B] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#16587B]">02 · HEADLINE &amp; THESIS QUOTE</span>
                    <span className="text-[10px] text-[#fcfaf5] font-semibold bg-[#5B0015] px-1.5 py-0.5 rounded border border-[#5B0015]">Short Preview</span>
                  </div>
                  <p className="text-xs text-[#16587B] mt-1 font-semibold">
                    &ldquo;AI battery arbitrage for industrial microgrids reducing peak tariffs 34%.&rdquo;
                  </p>
                  <p className="text-[11px] text-[#16587B]/85 italic mt-1">
                    — &ldquo;Indian factories lose ₹28,000/day on peak power demand surcharges.&rdquo;
                  </p>
                </div>

                {/* Connecting Vector */}
                <div className="flex justify-center my-0.5">
                  <div className="w-px h-5 bg-[#84B3CE]/50"></div>
                </div>

                {/* Node 3: Direct Bilateral Chat */}
                <div className="p-3.5 border border-[#16587B]/20 rounded-lg bg-[#84B3CE] text-[#16587B] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#16587B]">03 · DIRECT BILATERAL CHAT</span>
                    <span className="text-[10px] text-[#16587B] font-semibold bg-[#fcfaf5]/40 px-1.5 py-0.5 rounded border border-[#16587B]/20">1 of 5 Chats Used</span>
                  </div>
                  <div className="text-xs font-medium text-[#16587B] mt-1 leading-relaxed">
                    Rajiv Mehta clicked &ldquo;Let&apos;s Chat&rdquo; · Private bilateral encrypted channel open.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — PLATFORM CONCEPT
          ================================================== */}
      <section className="py-20 border-b border-[#84B3CE]/30 bg-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight mb-3">
              One platform. Multiple ways to connect.
            </h2>
            <p className="text-sm text-[#16587B]/75 leading-relaxed">
              We act as a pure, neutral mediator. We do not intermediate deals, take equity, or take commissions. Founders pitch endless investors with 2 ideas for free, and verified investors connect directly via high-signal chats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 01: Ideas */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] hover:border-[#16587B] transition-all space-y-3">
              <span className="text-xs font-mono text-[#5B0015] font-bold block">01</span>
              <h3 className="text-base font-semibold text-[#16587B]">Ideas</h3>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                2 active ideas free with 2 deck files each. Delete and swap ideas anytime without penalty. Need help building a deck? Our Venture Studio assists you.
              </p>
              <div className="pt-2">
                <Link href="/ideas" className="inline-flex items-center gap-1 text-xs font-medium text-[#5B0015] hover:underline">
                  <span>Browse Ideas</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Column 02: Investors */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] hover:border-[#16587B] transition-all space-y-3">
              <span className="text-xs font-mono text-[#5B0015] font-bold block">02</span>
              <h3 className="text-base font-semibold text-[#16587B]">Investors</h3>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                Thorough 24h background check before login activation. Transparent monthly or yearly plans with 5 high-intent bilateral chats included.
              </p>
              <div className="pt-2">
                <Link href="/investors" className="inline-flex items-center gap-1 text-xs font-medium text-[#5B0015] hover:underline">
                  <span>Explore Investors</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Column 03: Opportunities */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] hover:border-[#16587B] transition-all space-y-3">
              <span className="text-xs font-mono text-[#5B0015] font-bold block">03</span>
              <h3 className="text-base font-semibold text-[#16587B]">Opportunities</h3>
              <p className="text-xs text-[#16587B]/75 leading-relaxed">
                Positions, partnerships, co-founder roles and syndicates. Connect directly with people who have complementary operational capabilities.
              </p>
              <div className="pt-2">
                <Link href="/opportunities" className="inline-flex items-center gap-1 text-xs font-medium text-[#5B0015] hover:underline">
                  <span>View Opportunities</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — HOW IT WORKS
          ================================================== */}
      <section className="py-20 border-y border-[#84B3CE]/30 bg-[#16587B] text-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-wider text-[#84B3CE] font-semibold block mb-2">
              Mediator Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#fcfaf5] tracking-tight">
              A transparent path from brief to bilateral chat.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Launch 2 ideas free',
                desc: 'Upload up to 2 files (.pdf, .ppt). Swap or delete ideas anytime for free, or request assisted deck preparation.',
              },
              {
                step: '02',
                title: 'Endless investor reach',
                desc: 'Send your brief headline and quote teaser to unlimited accredited investors across India with zero caps.',
              },
              {
                step: '03',
                title: '24h security clearance',
                desc: 'Investors undergo a rigorous 24h background verification and choose a Monthly or Yearly access pass.',
              },
              {
                step: '04',
                title: 'Headline & "Let\'s Chat"',
                desc: 'Investors read your headline and quote teaser, then click "Let\'s Chat" using their 5 included chat quota.',
              },
              {
                step: '05',
                title: 'Direct bilateral deal',
                desc: 'Engage in private direct messaging. Ideasoch takes 0% commission, 0% equity, and acts strictly as mediator.',
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="relative p-5 border border-[#16587B]/20 rounded-lg bg-[#84B3CE] text-[#16587B] hover:border-[#5B0015] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#5B0015] font-bold">
                      {item.step}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5B0015]"></span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#16587B] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#16587B]/85 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <span className="text-xs text-[#fcfaf5] font-bold">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — FEATURED IDEAS
          ================================================== */}
      <section className="py-20 border-b border-[#84B3CE]/30 bg-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#5B0015] font-semibold block mb-1">
                Curated Marketplace
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight">
                Ideas worth discovering.
              </h2>
            </div>
            <Link
              href="/ideas"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-xs font-semibold text-[#5B0015] hover:underline"
            >
              <span>Explore All Verified Ideas ({ideas.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — LIMITED ACCESS CONCEPT
          ================================================== */}
      <section className="py-20 border-b border-[#84B3CE]/30 bg-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 max-w-xl">
              <span className="text-xs uppercase tracking-wider text-[#5B0015] font-semibold block mb-2">
                Investor Discovery Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight leading-tight mb-4">
                High-intent chats, not endless spam.
              </h2>
              <p className="text-sm text-[#16587B]/75 leading-relaxed mb-6">
                Verified investors receive 5 high-intent bilateral chats with their Monthly or Yearly plan. Read the short headline &amp; thesis quote teaser, then click &ldquo;Let&apos;s Chat&rdquo; to connect directly. Need more bandwidth? Top up with 3 extra chats anytime.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs text-[#16587B]/75">
                  <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                  <span>24h security background check protects founders from corporate espionage.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#16587B]/75">
                  <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                  <span>5 focused bilateral chats encourage genuine diligence over spray-and-pray browsing.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#16587B]/75">
                  <CheckCircle2 className="w-4 h-4 text-[#16587B] shrink-0 mt-0.5" />
                  <span>Neutral mediation: 0% equity, 0% platform take, direct founder-investor autonomy.</span>
                </div>
              </div>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium border border-[#16587B]/30 rounded-md text-[#16587B] bg-[#f5f0e5] hover:bg-[#ede6d8] transition-colors"
              >
                <span>Explore Investor &amp; Founder Pricing</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* UI Mockup of Credits in Action */}
            <div className="lg:col-span-6">
              <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#84B3CE]/25">
                  <div>
                    <span className="text-xs font-semibold text-[#16587B] block">
                      Active Investor Chat Quota
                    </span>
                    <span className="text-[11px] text-[#16587B]/65">Verified Backer · Monthly Plan</span>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-mono font-semibold border border-[#5B0015]/30 rounded bg-[#5B0015]/10 text-[#5B0015]">
                    2 / 5 Bilateral Chats Used
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 border border-[#84B3CE]/25 rounded bg-[#fcfaf5] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#16587B]/65 block">Chat 01 · Active</span>
                      <span className="font-medium text-[#16587B]">CleanGrid AI · Microgrid Power</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#16587B] bg-[#84B3CE]/30 px-2 py-0.5 rounded">
                      In Discussion
                    </span>
                  </div>

                  <div className="p-3 border border-[#84B3CE]/25 rounded bg-[#fcfaf5] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#16587B]/65 block">Chat 02 · Active</span>
                      <span className="font-medium text-[#16587B]">Nivaan Diagnostics · Spectrometry</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#16587B] bg-[#84B3CE]/30 px-2 py-0.5 rounded">
                      Term Sheet Review
                    </span>
                  </div>

                  <div className="p-3 border border-dashed border-[#84B3CE]/50 rounded bg-[#fcfaf5]/60 flex items-center justify-between text-[#16587B]/60">
                    <div>
                      <span className="text-[11px] block">Chats 03 – 05</span>
                      <span>3 Available Slots Remaining</span>
                    </div>
                    <span className="text-[11px] text-[#5B0015] font-semibold">Ready to Initiate</span>
                  </div>
                </div>

                <div className="p-3 bg-[#84B3CE]/15 border border-[#84B3CE]/35 rounded text-[11px] text-[#16587B]/65 flex items-center justify-between">
                  <span>Need more chats? +3 Extra Chats Pack for ₹999.</span>
                  <Link href="/pricing" className="font-semibold text-[#5B0015] hover:underline">
                    View Add-ons →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — INVESTOR DISCOVERY
          ================================================== */}
      <section className="py-20 border-b border-[#84B3CE]/30 bg-[#5B0015] text-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#84B3CE] font-semibold block mb-1">
                Accredited Backers
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#fcfaf5] tracking-tight">
                Find people who understand your opportunity.
              </h2>
            </div>
            <Link
              href="/investors"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#84B3CE] hover:text-[#fcfaf5] transition-colors"
            >
              <span>View All Investors ({featuredInvestors.length}+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredInvestors.map((inv) => (
              <InvestorCard key={inv.userId} investor={inv} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — OPPORTUNITIES
          ================================================== */}
      <section className="py-20 border-b border-[#84B3CE]/30 bg-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#5B0015] font-semibold block mb-1">
                Ecosystem Positions & Syndicates
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight">
                Opportunities beyond investment.
              </h2>
            </div>
            <Link
              href="/opportunities"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B0015] hover:underline transition-colors"
            >
              <span>Explore Marketplace ({opportunities.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8 — CONVERSATIONS
          ================================================== */}
      <section className="py-20 border-b border-[#84B3CE]/30 bg-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-wider text-[#5B0015] font-semibold block mb-1">
              Internal Messaging
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight">
              Good opportunities start with a conversation.
            </h2>
            <p className="text-xs text-[#16587B]/75 leading-relaxed mt-2">
              Unsolicited mass messaging is disallowed. Communication is reserved for matched pitches, mutual connections, and opportunity applicants.
            </p>
          </div>

          {/* Realistic Chat Interface Preview */}
          <div className="border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 max-w-4xl mx-auto">
            {/* Left: Conversation List */}
            <div className="md:col-span-5 border-r border-[#84B3CE]/30 p-4 bg-[#f5f0e5]">
              <div className="text-xs font-semibold text-[#16587B] pb-3 border-b border-[#84B3CE]/25 flex items-center justify-between">
                <span>Recent Conversations</span>
                <span className="text-[11px] text-[#16587B]/65">2 Active</span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="p-3 border border-[#5B0015] rounded bg-[#84B3CE]/20 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#16587B]">Rajiv Mehta</span>
                    <span className="text-[10px] text-[#16587B]/60">10:45 AM</span>
                  </div>
                  <p className="text-[11px] text-[#16587B]/65 line-clamp-1">
                    Rahul, I reviewed your Peenya pilot data. The peak shaving savings look genuine...
                  </p>
                </div>
                <div className="p-3 border border-[#84B3CE]/30 rounded bg-[#fcfaf5] hover:bg-[#84B3CE]/10 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#16587B]">Dr. Priya Nair</span>
                    <span className="text-[10px] text-[#16587B]/60">Yesterday</span>
                  </div>
                  <p className="text-[11px] text-[#16587B]/65 line-clamp-1">
                    Please share the spectroscopy optical tolerance metrics when available...
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Active Conversation Pane */}
            <div className="md:col-span-7 flex flex-col justify-between p-4 bg-[#fcfaf5] min-h-[380px]">
              {/* Header */}
              <div className="pb-3 border-b border-[#84B3CE]/25 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80"
                    alt="Rajiv Mehta"
                    className="w-8 h-8 rounded-full object-cover border border-[#84B3CE]/35"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-[#16587B]">Rajiv Mehta</span>
                      <ShieldCheck className="w-3 h-3 text-[#687565]" />
                    </div>
                    <span className="text-[10px] text-[#687565] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B0015]"></span> Online
                    </span>
                  </div>
                </div>
                <Link
                  href="/meetings"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium border border-[#16587B]/30 rounded hover:bg-[#84B3CE]/20 text-[#16587B] bg-[#f5f0e5]"
                >
                  <Calendar className="w-3 h-3 text-[#8A7F6A]" />
                  <span>Schedule Meeting</span>
                </Link>
              </div>

              {/* Message History */}
              <div className="py-4 space-y-3 text-xs overflow-y-auto">
                <div className="max-w-xs p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded text-[#16587B]">
                  <p className="text-xs leading-relaxed">
                    Hello Rajiv, thank you for accepting our connection. Attached is our verified pitch deck and pilot readings from Peenya.
                  </p>
                  <div className="mt-2 p-2 border border-[#84B3CE]/35 rounded bg-[#fcfaf5] flex items-center gap-2 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-[#8A7F6A]" />
                    <span className="truncate">CleanGrid_Series_Seed_Deck.pdf</span>
                  </div>
                </div>

                <div className="max-w-xs ml-auto p-3 bg-[#5B0015] text-[#fcfaf5] rounded">
                  <p className="text-xs leading-relaxed">
                    Rahul, I reviewed your Peenya pilot data. The peak shaving savings look genuine. Let us schedule a 30-min sync this Thursday.
                  </p>
                </div>
              </div>

              {/* Input Footer */}
              <div className="pt-3 border-t border-[#84B3CE]/25 flex items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 text-[#16587B]/70 hover:text-[#16587B] border border-[#84B3CE]/35 rounded"
                  title="Attach file"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  placeholder="Write a message..."
                  readOnly
                  value="Looking forward to our Thursday call. I will prepare the unit economics report."
                  className="flex-1 text-xs p-2 border border-[#84B3CE]/35 rounded text-[#16587B] bg-[#fcfaf5]"
                />
                <Link
                  href="/messages"
                  className="p-2 bg-[#5B0015] text-[#fcfaf5] rounded hover:bg-[#43000f] transition-colors"
                  title="Open live chat"
                >
                  <Send className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9 — SUCCESS STORIES
          ================================================== */}
      <section className="py-20 border-b border-[#84B3CE]/30 bg-[#fcfaf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-wider text-[#5B0015] font-semibold block mb-1">
              Case Studies
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight">
              From an idea to a conversation.
            </h2>
            <p className="text-xs text-[#16587B]/75 leading-relaxed mt-2">
              Representative examples of founders matching with early believers and commercial partners on Ideasoch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                founder: 'Vikram Deshmukh',
                idea: 'KisanSetu',
                investor: 'Aarohan Seed Syndicate',
                industry: 'AgriTech & Cold Chain',
                outcome: 'Connected on Ideasoch; secured 14 micro-pod deployments and institutional co-investment.',
              },
              {
                founder: 'Rahul Sharma',
                idea: 'CleanGrid AI',
                investor: 'Mehta Ventures',
                industry: 'CleanTech & Energy',
                outcome: 'Matched through multi-investor application; currently finalizing terms for ₹45L seed syndicate.',
              },
              {
                founder: 'Dr. Ananya Sen',
                idea: 'Nivaan Diagnostics',
                investor: 'Kaveri Life Sciences Desk',
                industry: 'Medical Devices & IVD',
                outcome: 'Secured clinical advisory partnership and structured regulatory trial framework.',
              },
            ].map((story, i) => (
              <div
                key={i}
                className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5] hover:border-[#16587B] transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold text-[#5B0015] uppercase tracking-wide block">
                    {story.industry}
                  </span>
                  <h3 className="text-base font-semibold text-[#16587B] mt-1 mb-2">
                    {story.idea}
                  </h3>
                  <div className="text-xs text-[#16587B]/75 space-y-1 mb-3">
                    <div>
                      <span className="font-medium text-[#16587B]">Founder:</span> {story.founder}
                    </div>
                    <div>
                      <span className="font-medium text-[#16587B]">Partner:</span> {story.investor}
                    </div>
                  </div>
                  <p className="text-xs text-[#16587B]/75 leading-relaxed pt-3 border-t border-[#84B3CE]/25">
                    &ldquo;{story.outcome}&rdquo;
                  </p>
                </div>
                <div className="pt-2">
                  <span className="text-[11px] text-[#16587B] font-medium">Verified Connection</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10 — FINAL CTA
          ================================================== */}
      <section className="py-24 bg-[#16587B] text-[#fcfaf5] border-t border-[#84B3CE]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#fcfaf5] tracking-tight mb-4">
            Your next opportunity could start with an idea.
          </h2>
          <p className="text-base text-[#fcfaf5]/85 max-w-2xl mx-auto leading-relaxed mb-8">
            Create your profile, share your idea and start connecting with the people who can help move it forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenAuth('login', 'IDEA_MAKER', '/submit-idea', 'Sign in to Submit Your Idea', 'Share your structured idea with accredited investors for free.')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] shadow-sm border border-[#5B0015] transition-colors cursor-pointer"
            >
              Submit Your Idea
            </button>
            <Link
              href="/opportunities"
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium border border-[#84B3CE] text-[#fcfaf5] bg-transparent rounded-md hover:bg-[#84B3CE]/15 transition-colors"
            >
              Explore Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authConfig.mode}
        initialRole={authConfig.role}
        redirectUrl={authConfig.redirectUrl}
        title={authConfig.title}
        subtitle={authConfig.subtitle}
      />
    </div>
  );
}
