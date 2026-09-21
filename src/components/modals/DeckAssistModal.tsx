'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  HelpCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface DeckAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillTitle?: string;
}

export const DeckAssistModal: React.FC<DeckAssistModalProps> = ({
  isOpen,
  onClose,
  prefillTitle = '',
}) => {
  const { currentUser, requestDeckAssistance } = useApp();

  const [businessTitle, setBusinessTitle] = useState(prefillTitle);
  const [businessModelSummary, setBusinessModelSummary] = useState('');
  const [targetCapital, setTargetCapital] = useState('₹50,00,000');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessTitle.trim() || !businessModelSummary.trim()) return;

    requestDeckAssistance({
      founderId: currentUser.id,
      founderName: currentUser.name,
      founderEmail: currentUser.email,
      founderPhone: phone || '+91 98765 43210',
      businessTitle,
      businessModelSummary,
      targetCapital,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#5B0015]/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FCFAF5] border-2 border-[#16587B]/20 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-[#16587B] text-[#FCFAF5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#84B3CE]/20 flex items-center justify-center border border-[#84B3CE]/40">
              <FileText className="w-5 h-5 text-[#84B3CE]" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#84B3CE] block">
                Ideasoch Venture Studio · Paid Service
              </span>
              <h3 className="text-lg font-serif font-bold text-[#FCFAF5]">
                Assisted Deck & Model Preparation
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#FCFAF5]/70 hover:text-[#FCFAF5] hover:bg-[#84B3CE]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#16587B]">
              Request Received!
            </h4>
            <p className="text-sm text-[#16587B]/80 max-w-sm mx-auto leading-relaxed">
              Our presentation architects will review your business model notes and reach out via WhatsApp/Email within 24 hours to begin crafting your 10-slide deck & model.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-[#F5F0E5] border border-[#16587B]/15 rounded-full text-xs font-mono text-[#16587B]">
                Track status in your Founder Dashboard
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Value Proposition Box */}
            <div className="p-4 rounded-xl bg-[#F5F0E5] border border-[#16587B]/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#16587B]">
                <Sparkles className="w-4 h-4 text-[#16587B]" />
                Have a great business model, but no pitch deck?
              </div>
              <p className="text-xs text-[#16587B]/80 leading-relaxed">
                If you haven&apos;t prepared a PDF or PPT pitch presentation, our editorial and financial modeling team will synthesize your business thesis into an institutional-grade 10-slide deck and unit economics sheet ready for accredited investors.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#16587B]/10 text-[11px] font-mono font-semibold text-[#16587B]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 48-72h Turnaround
                </span>
                <span className="bg-[#16587B] text-[#FCFAF5] px-2.5 py-0.5 rounded-full">
                  ₹4,999 One-Time
                </span>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-semibold text-[#16587B] uppercase tracking-wider mb-1">
                Business Concept / Company Name *
              </label>
              <input
                type="text"
                required
                value={businessTitle}
                onChange={(e) => setBusinessTitle(e.target.value)}
                placeholder="e.g. BioVolt Industrial Battery Systems"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#16587B]/20 text-sm text-[#16587B] placeholder:text-[#16587B]/40 focus:outline-none focus:ring-2 focus:ring-[#16587B]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16587B] uppercase tracking-wider mb-1">
                Target Fundraising Goal
              </label>
              <input
                type="text"
                value={targetCapital}
                onChange={(e) => setTargetCapital(e.target.value)}
                placeholder="e.g. ₹50,00,000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#16587B]/20 text-sm text-[#16587B] placeholder:text-[#16587B]/40 focus:outline-none focus:ring-2 focus:ring-[#16587B]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16587B] uppercase tracking-wider mb-1">
                Describe Your Business Model & Core Idea *
              </label>
              <textarea
                required
                rows={4}
                value={businessModelSummary}
                onChange={(e) => setBusinessModelSummary(e.target.value)}
                placeholder="Explain what problem you solve, who pays you, how much they pay, and your current progress or proof of concept. Our team will do the rest!"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#16587B]/20 text-sm text-[#16587B] placeholder:text-[#16587B]/40 focus:outline-none focus:ring-2 focus:ring-[#16587B]/30 leading-relaxed"
              />
              <p className="text-[11px] text-[#16587B]/60 mt-1">
                Even bullet points or raw notes are perfectly fine. We structure it professionally.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16587B] uppercase tracking-wider mb-1">
                WhatsApp / Contact Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#16587B]/20 text-sm text-[#16587B] placeholder:text-[#16587B]/40 focus:outline-none focus:ring-2 focus:ring-[#16587B]/30"
              />
            </div>

            {/* Platform Mediator Note */}
            <div className="p-3 rounded-lg bg-[#5B0015]/5 border border-[#5B0015]/15 text-[11px] text-[#5B0015] leading-normal flex items-start gap-2">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Ideasoch provides presentation design & financial framing assistance only. We do not offer investment advice or guarantee investor funding.
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-[#16587B]/70 hover:text-[#16587B] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16587B] hover:bg-[#16587B]/90 text-[#FCFAF5] text-xs font-semibold transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Request Deck Preparation (₹4,999)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
