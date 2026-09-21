'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { IdeaCategory, IdeaStage } from '@/types';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle2,
  FileText,
  Lock,
  ArrowRight,
  AlertCircle,
  Trash2,
  Sparkles,
  ShieldCheck,
  Send,
  Upload,
  Plus,
  HelpCircle,
} from 'lucide-react';
import { DeckAssistModal } from '@/components/modals/DeckAssistModal';

export default function SubmitIdeaPage() {
  const router = useRouter();
  const { addIdea, currentUser, canFounderCreateIdea, ideas, deleteIdeaFree } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSavedDraft, setIsSavedDraft] = useState(false);
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [fileCountError, setFileCountError] = useState(false);

  const { allowed, activeCount, maxFreeSlots } = canFounderCreateIdea();
  const myIdeas = ideas.filter((i) => i.founderId === currentUser.id);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    headline: '',
    quote: '',
    tagline: '',
    category: 'CleanTech & Energy' as IdeaCategory,
    stage: 'MVP' as IdeaStage,
    fundingRequired: '₹50,00,000',
    location: currentUser.location || 'Bengaluru, India',
    summary: '',
    problem: '',
    solution: '',
    targetMarket: '',
    tamSamSom: '',
    businessModel: '',
    currentTraction: '',
    unitEconomics: '',
    useOfFunds: '',
    file1Name: 'Pitch_Deck_2026.pdf',
    file1Type: 'pdf' as 'pdf' | 'spreadsheet' | 'doc',
    file2Name: 'Executive_OnePager.pdf',
    file2Type: 'pdf' as 'pdf' | 'spreadsheet' | 'doc',
    needsDeckAssistance: false,
  });

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

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Problem & Solution' },
    { num: 3, label: 'Market' },
    { num: 4, label: 'Business Model' },
    { num: 5, label: 'Funding' },
    { num: 6, label: 'Documents (Max 2)' },
    { num: 7, label: 'Review & Submit' },
  ];

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('ideasoch_draft_idea', JSON.stringify(formData));
      setIsSavedDraft(true);
      setTimeout(() => setIsSavedDraft(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = addIdea({
      title: formData.title || 'Untitled Venture',
      headline: formData.headline || `${formData.title || 'Venture'} · High-impact market innovation`,
      quote: formData.quote || `"${(formData.summary || formData.tagline || 'Pioneering breakthrough execution').slice(0, 120)}..."`,
      tagline: formData.tagline || 'Pioneering sector solution on Ideasoch.',
      category: formData.category,
      stage: formData.stage,
      fundingRequired: formData.fundingRequired,
      location: formData.location,
      summary: formData.summary,
      problem: formData.problem,
      solution: formData.solution,
      targetMarket: formData.targetMarket,
      tamSamSom: formData.tamSamSom,
      businessModel: formData.businessModel,
      currentTraction: formData.currentTraction,
      unitEconomics: formData.unitEconomics,
      useOfFunds: formData.useOfFunds,
      needsDeckAssistance: formData.needsDeckAssistance,
      documents: [
        {
          title: 'Executive Pitch Deck',
          fileName: formData.file1Name || 'Pitch_Deck.pdf',
          fileSize: '3.8 MB',
          fileType: 'pdf',
          isConfidential: true,
          url: '#',
        },
        {
          title: 'Executive Summary / Model',
          fileName: formData.file2Name || 'Executive_OnePager.pdf',
          fileSize: '1.2 MB',
          fileType: 'pdf',
          isConfidential: true,
          url: '#',
        },
      ],
    });

    router.push(`/ideas/${created.id}`);
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#84B3CE]/35 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-[#16587B] font-semibold">
                Founder Portal · Free Tier
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#16587B]/10 text-[#16587B]">
                <ShieldCheck className="w-3 h-3 text-[#16587B]" /> Neutral Direct Mediator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#16587B] tracking-tight">
              Publish Business Innovation
            </h1>
            <p className="text-xs text-[#16587B]/75 mt-1">
              2 active idea slots free. Approach unlimited investors with zero intermediary fees.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#84B3CE]/35 rounded-md text-[#16587B] hover:bg-[#f5f0e5] transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavedDraft ? 'Draft Saved' : 'Save Draft'}</span>
            </button>
          </div>
        </div>

        {/* 2-IDEA SLOT QUOTA CHECK: If founder already has 2 active ideas */}
        {!allowed && (
          <div className="mb-8 p-6 rounded-2xl bg-[#F5F0E5] border-2 border-[#5B0015]/30 space-y-4 animate-fade-in shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#5B0015]/10 flex items-center justify-center text-[#5B0015] shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-serif font-bold text-[#5B0015]">
                  Active Idea Slots Limit Reached (2 of 2 Used)
                </h2>
                <p className="text-xs text-[#16587B]/85 mt-1 leading-relaxed">
                  On the Ideasoch Free Tier, founders can hold up to <strong>2 active ideas</strong> simultaneously. You can <span className="underline font-semibold">delete 1 of your existing ideas for free</span> to make room for this new submission, or upgrade your account to hold unlimited active listings.
                </p>
              </div>
            </div>

            {/* Existing ideas list with 1-click free deletion */}
            <div className="space-y-2 pt-2 border-t border-[#16587B]/15">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#16587B]">
                Your Currently Active Ideas ({myIdeas.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {myIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-3.5 rounded-xl bg-[#FCFAF5] border border-[#16587B]/20 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <h3 className="text-xs font-serif font-bold text-[#16587B] truncate">
                        {idea.title}
                      </h3>
                      <p className="text-[11px] text-[#16587B]/70 truncate">{idea.category}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteIdeaFree(idea.id)}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#5B0015]/10 hover:bg-[#5B0015] text-[#5B0015] hover:text-[#FCFAF5] text-[11px] font-medium transition-all"
                      title="Delete this idea to free up slot"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete for Free
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step Progress Indicator */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex items-center justify-between min-w-[660px] text-xs">
            {steps.map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-colors ${
                      isDone
                        ? 'bg-[#16587B] text-[#fcfaf5]'
                        : isCurrent
                        ? 'border-2 border-[#16587B] text-[#16587B] font-semibold bg-[#84B3CE]/20'
                        : 'border border-[#84B3CE]/35 text-[#16587B]/75'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span
                    className={`font-medium ${
                      isCurrent ? 'text-[#16587B] font-semibold' : 'text-[#16587B]/75'
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.num < 7 && <div className="w-5 h-px bg-[#84B3CE]/35 ml-1"></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="border border-[#84B3CE]/35 rounded-2xl p-6 sm:p-8 bg-[#fcfaf5] shadow-xs">
          <form onSubmit={handleSubmit}>
            {/* STEP 1: Basic Information + Headline & Quote */}
            {currentStep === 1 && (
              <div className="space-y-5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#84B3CE]/35">
                  <h2 className="text-sm font-serif font-bold text-[#16587B]">
                    Step 1 · Basic Information & Investor Teaser
                  </h2>
                  <span className="text-[11px] font-mono text-[#16587B]/70">
                    Active Slots: {activeCount} / {maxFreeSlots}
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Business Idea / Venture Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. CleanGrid AI, Nivaan Diagnostics"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>

                {/* HIGH-IMPACT SHORT HEADLINE */}
                <div className="p-3.5 rounded-xl bg-[#F5F0E5] border border-[#16587B]/20 space-y-1.5">
                  <label className="block font-semibold text-[#16587B] text-xs">
                    Short Idea Headline * (Shown directly on Investor Discovery Cards)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    placeholder="e.g. AI-Powered Microgrid Energy Arbitrage for Heavy Industry"
                    className="w-full p-2.5 border border-[#16587B]/25 rounded-lg text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5] text-xs"
                  />
                  <p className="text-[11px] text-[#16587B]/70">
                    A clear, one-line summary that investors read before deciding to hit &quot;Let&apos;s Chat&quot;.
                  </p>
                </div>

                {/* FOUNDER THESIS QUOTE */}
                <div className="p-3.5 rounded-xl bg-[#F5F0E5] border border-[#16587B]/20 space-y-1.5">
                  <label className="block font-semibold text-[#16587B] text-xs">
                    Founder Thesis Quote / Teaser * (Displayed below the headline)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder='e.g. "We slash peak electricity costs by 26% through autonomous real-time battery and solar routing without costly grid modifications."'
                    className="w-full p-2.5 border border-[#16587B]/25 rounded-lg text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5] text-xs leading-relaxed"
                  />
                  <p className="text-[11px] text-[#16587B]/70">
                    A compelling statement highlighting your competitive moat, payback period, or technology breakthrough.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    One-line Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Autonomous microgrid power arbitrage for commercial facilities"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#16587B] mb-1">
                      Industry Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as IdeaCategory })
                      }
                      className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#16587B] mb-1">
                      Current Maturity Stage *
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) =>
                        setFormData({ ...formData, stage: e.target.value as IdeaStage })
                      }
                      className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] bg-[#fcfaf5]"
                    >
                      {stages.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Headquarters / Operations Base
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bengaluru, Karnataka, India"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Executive Summary / Narrative
                  </label>
                  <textarea
                    rows={4}
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="High-level overview of what you are building and why now..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5] leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Problem & Solution */}
            {currentStep === 2 && (
              <div className="space-y-5 text-xs">
                <h2 className="text-sm font-serif font-bold text-[#16587B] pb-2 border-b border-[#84B3CE]/35">
                  Step 2 · Problem & Proposed Solution
                </h2>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Problem Statement & Inefficiencies Addressed *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="Describe the operational, technical, or economic bottleneck your target customers face today..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Your Proprietary Solution & Value Proposition *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="Explain your approach, technical differentiation, and defensible IP..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5] leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Market Size & TAM */}
            {currentStep === 3 && (
              <div className="space-y-5 text-xs">
                <h2 className="text-sm font-serif font-bold text-[#16587B] pb-2 border-b border-[#84B3CE]/35">
                  Step 3 · Target Market & Scale
                </h2>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Primary Target Customer Profile *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                    placeholder="e.g. Over 85,000 industrial clusters, manufacturing parks, and cold storage facilities..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    TAM / SAM / SOM Breakdown
                  </label>
                  <input
                    type="text"
                    value={formData.tamSamSom}
                    onChange={(e) => setFormData({ ...formData, tamSamSom: e.target.value })}
                    placeholder="e.g. TAM: ₹14,200 Cr · SAM: ₹2,400 Cr · SOM: ₹180 Cr"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Business Model & Traction */}
            {currentStep === 4 && (
              <div className="space-y-5 text-xs">
                <h2 className="text-sm font-serif font-bold text-[#16587B] pb-2 border-b border-[#84B3CE]/35">
                  Step 4 · Business Model & Unit Economics
                </h2>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Revenue Architecture & Monetization Model *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.businessModel}
                    onChange={(e) => setFormData({ ...formData, businessModel: e.target.value })}
                    placeholder="e.g. B2B SaaS subscription (₹18,000/month) + 12% realized energy cost savings share..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Current Traction & Customer Proof Points
                  </label>
                  <textarea
                    rows={3}
                    value={formData.currentTraction}
                    onChange={(e) => setFormData({ ...formData, currentTraction: e.target.value })}
                    placeholder="e.g. 3 paid pilot installations operational; ₹4.2L ARR signed..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Unit Economics (CAC, LTV, Gross Margin)
                  </label>
                  <input
                    type="text"
                    value={formData.unitEconomics}
                    onChange={(e) => setFormData({ ...formData, unitEconomics: e.target.value })}
                    placeholder="e.g. CAC: ₹45,000 · LTV: ₹4,80,000 · Payback: 3.5 months"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Funding Requirements */}
            {currentStep === 5 && (
              <div className="space-y-5 text-xs">
                <h2 className="text-sm font-serif font-bold text-[#16587B] pb-2 border-b border-[#84B3CE]/35">
                  Step 5 · Capital Requirements & Deployment
                </h2>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Target Seed / Angel Ask (INR) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fundingRequired}
                    onChange={(e) => setFormData({ ...formData, fundingRequired: e.target.value })}
                    placeholder="e.g. ₹45,00,000 or ₹1.5 Cr"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16587B] mb-1">
                    Planned Allocation of Capital *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.useOfFunds}
                    onChange={(e) => setFormData({ ...formData, useOfFunds: e.target.value })}
                    placeholder="e.g. 50% R&D & certifications, 30% business development, 20% working capital..."
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-xl text-[#16587B] focus:outline-none focus:border-[#16587B] bg-[#FCFAF5] leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Documents (Strict 2-File Limit & Deck Assistance) */}
            {currentStep === 6 && (
              <div className="space-y-6 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#84B3CE]/35">
                  <div>
                    <h2 className="text-sm font-serif font-bold text-[#16587B]">
                      Step 6 · Confidential Documents (2 Files Included Free)
                    </h2>
                    <span className="text-[11px] text-[#16587B]/70">
                      Upload up to 2 files (.pdf, .ppt, .pptx). More than 2 files requires a paid expansion.
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#16587B]/10 text-[#16587B]">
                    2 / 2 Files Attached
                  </span>
                </div>

                {/* File 1: Pitch Deck */}
                <div className="p-4 border border-[#84B3CE]/35 rounded-xl bg-[#f5f0e5] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#16587B]" />
                      <span className="font-semibold text-[#16587B]">
                        File 1: Executive Pitch Deck (PPT or PDF) *
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-[#16587B]/75 font-mono">
                      <Lock className="w-3 h-3 text-[#5B0015]" /> Confidential
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.file1Name}
                    onChange={(e) => setFormData({ ...formData, file1Name: e.target.value })}
                    placeholder="e.g. CleanGrid_Pitch_Deck.pdf"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] text-xs text-[#16587B]"
                  />
                </div>

                {/* File 2: One-Pager or Financial Model */}
                <div className="p-4 border border-[#84B3CE]/35 rounded-xl bg-[#f5f0e5] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#16587B]" />
                      <span className="font-semibold text-[#16587B]">
                        File 2: One-Pager or Financial Model (PDF or Spreadsheet)
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-[#16587B]/75 font-mono">
                      <Lock className="w-3 h-3 text-[#5B0015]" /> Confidential
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.file2Name}
                    onChange={(e) => setFormData({ ...formData, file2Name: e.target.value })}
                    placeholder="e.g. CleanGrid_Financial_Model.pdf"
                    className="w-full p-2.5 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] text-xs text-[#16587B]"
                  />
                </div>

                {/* More than 2 Files notice */}
                <div className="p-3.5 rounded-xl border border-dashed border-[#16587B]/30 bg-[#FCFAF5] flex items-center justify-between gap-3">
                  <div className="text-[11px] text-[#16587B]/80">
                    <span className="font-semibold block text-[#16587B]">Need to attach 3+ documents?</span>
                    Extra document slots (cap tables, patent filings, video walkthroughs) are available via the Pro Vault add-on.
                  </div>
                  <button
                    type="button"
                    onClick={() => setFileCountError(true)}
                    className="px-3 py-1.5 rounded-lg border border-[#16587B]/30 text-xs font-semibold text-[#16587B] hover:bg-[#F5F0E5] transition-colors shrink-0"
                  >
                    + Add 3rd File
                  </button>
                </div>

                {fileCountError && (
                  <div className="p-3 rounded-xl bg-[#5B0015]/10 border border-[#5B0015]/30 text-[#5B0015] text-xs flex items-center justify-between gap-2">
                    <span>
                      Free tier is restricted to <strong>2 files max (PPT/PDF)</strong>. Extra document attachments require an upgrade (₹999/venture).
                    </span>
                    <button
                      type="button"
                      onClick={() => setFileCountError(false)}
                      className="text-xs font-bold underline"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* ASSISTED DECK SERVICE CALLOUT BANNER */}
                <div className="p-5 rounded-xl bg-[#16587B] text-[#FCFAF5] space-y-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#84B3CE]/20 flex items-center justify-center border border-[#84B3CE]/40 shrink-0">
                        <Sparkles className="w-4 h-4 text-[#84B3CE]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-serif font-bold text-[#FCFAF5]">
                          Don&apos;t have a Pitch Deck or Financial Model yet?
                        </h4>
                        <p className="text-xs text-[#84B3CE] mt-0.5">
                          Ideasoch Venture Studio Assistance · Paid Service (₹4,999)
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-[#84B3CE]/20 px-2 py-0.5 rounded text-[#FCFAF5] border border-[#84B3CE]/30 shrink-0">
                      Optional
                    </span>
                  </div>

                  <p className="text-xs text-[#FCFAF5]/90 leading-relaxed">
                    If you have a clear business idea and market concept but lack professional slides or financial models, our institutional team will craft a high-conversion 10-slide deck and unit economics sheet for you.
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#FCFAF5]/15">
                    <span className="text-[11px] font-mono text-[#84B3CE]">
                      Delivery in 48-72 Hours · 2 Revisions Included
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeckModalOpen(true)}
                      className="px-4 py-1.5 rounded-lg bg-[#84B3CE] hover:bg-[#84B3CE]/90 text-[#16587B] text-xs font-bold transition-all shadow-xs"
                    >
                      Request Deck Assistance
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Review & Final Submission */}
            {currentStep === 7 && (
              <div className="space-y-6 text-xs">
                <h2 className="text-sm font-serif font-bold text-[#16587B] pb-2 border-b border-[#84B3CE]/35">
                  Step 7 · Review & Final Verification
                </h2>

                <div className="p-4 border border-[#84B3CE]/35 rounded-xl bg-[#f5f0e5] space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#16587B] font-semibold">
                        {formData.category} · {formData.stage}
                      </span>
                      <h3 className="text-base font-serif font-bold text-[#16587B]">
                        {formData.title || 'Untitled Innovation'}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#16587B] text-[#FCFAF5]">
                      Ask: {formData.fundingRequired}
                    </span>
                  </div>

                  {/* Headline & Quote preview */}
                  <div className="pt-2 border-t border-[#16587B]/15 space-y-1.5">
                    <p className="text-xs font-semibold text-[#16587B]">
                      {formData.headline || 'Short idea headline will appear here.'}
                    </p>
                    <blockquote className="text-xs italic text-[#16587B]/85 bg-[#FCFAF5] p-2.5 rounded-lg border-l-2 border-[#84B3CE]">
                      &ldquo;{formData.quote || 'Founder thesis quote will appear here.'}&rdquo;
                    </blockquote>
                  </div>

                  <div className="text-[11px] text-[#16587B]/70 pt-1 flex items-center justify-between">
                    <span>Attached Documents: 2 / 2 Files (PPT/PDF)</span>
                    <span>Founder: {currentUser.name}</span>
                  </div>
                </div>

                {/* ENDLESS INVESTOR OUTREACH PERK */}
                <div className="p-4 rounded-xl bg-[#84B3CE]/15 border border-[#84B3CE]/40 space-y-1.5">
                  <span className="font-semibold text-xs text-[#16587B] flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-[#16587B]" />
                    Endless Investor Outreach Included:
                  </span>
                  <p className="text-xs text-[#16587B]/85 leading-relaxed">
                    Once published, you can dispatch and share this short idea with <strong>unlimited accredited investors</strong> on Ideasoch. There are zero caps on how many investors can discover your venture.
                  </p>
                </div>

                {/* NEUTRAL MEDIATOR NOTICE */}
                <div className="p-3.5 rounded-xl bg-[#F5F0E5] border border-[#16587B]/20 text-[11px] text-[#16587B]/80 leading-relaxed space-y-1">
                  <span className="font-semibold text-[#16587B] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16587B]" />
                    Platform Mediator Protocol:
                  </span>
                  <p>
                    Ideasoch is an independent platform mediator. We do not broker investments, charge deal commissions, or take equity. Bilateral chats and discussions are between you and the investor directly.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 mt-8 border-t border-[#84B3CE]/35 flex items-center justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold border border-[#84B3CE]/35 rounded-xl text-[#16587B] hover:bg-[#f5f0e5] transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1 px-5 py-2.5 text-xs font-semibold bg-[#16587B] text-[#fcfaf5] rounded-xl hover:bg-[#16587B]/90 transition-all shadow-xs"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!allowed}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold bg-[#16587B] text-[#fcfaf5] rounded-xl hover:bg-[#16587B]/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    <span>Publish Idea & Unlock Endless Outreach</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Deck Assistance Modal */}
      <DeckAssistModal
        isOpen={deckModalOpen}
        onClose={() => setDeckModalOpen(false)}
        prefillTitle={formData.title}
      />
    </div>
  );
}
