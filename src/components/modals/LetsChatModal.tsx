'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Idea } from '@/types';
import {
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface LetsChatModalProps {
  idea: Idea;
  isOpen: boolean;
  onClose: () => void;
}

export const LetsChatModal: React.FC<LetsChatModalProps> = ({
  idea,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { investorProfile, startInvestorChat, purchaseChatCredits, currentRole } = useApp();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [purchasedSuccess, setPurchasedSuccess] = useState(false);

  if (!isOpen) return null;

  const totalChats = investorProfile.chatCreditsTotal || 5;
  const usedChats = investorProfile.chatCreditsUsed || 0;
  const remainingChats = Math.max(0, totalChats - usedChats);
  const isAlreadyActive = (investorProfile.activeChatIds || []).includes(idea.id);

  const handleStartChat = () => {
    setLoading(true);
    setErrorMsg(null);

    const res = startInvestorChat(idea.id);
    setLoading(false);

    if (res.success) {
      onClose();
      router.push('/messages');
    } else {
      setErrorMsg(res.message || 'Unable to initiate chat. Quota limit reached.');
    }
  };

  const handleBuyChatPack = () => {
    purchaseChatCredits(3);
    setPurchasedSuccess(true);
    setTimeout(() => {
      setPurchasedSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#5B0015]/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FCFAF5] border-2 border-[#16587B]/20 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        {/* Header Ribbon */}
        <div className="bg-[#16587B] text-[#FCFAF5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#84B3CE]/20 flex items-center justify-center border border-[#84B3CE]/40">
              <MessageSquare className="w-5 h-5 text-[#84B3CE]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#84B3CE]">
                  Direct Bilateral Channel
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-[#84B3CE]/25 px-2 py-0.5 rounded-full font-medium">
                  <ShieldCheck className="w-3 h-3 text-[#FCFAF5]" /> Neutral Mediator
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#FCFAF5]">
                Let&apos;s Chat with {idea.founderName}
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

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Startup Teaser Headline & Quote */}
          <div className="p-4 rounded-xl bg-[#F5F0E5] border border-[#16587B]/15 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#16587B]">
                  {idea.category} · {idea.stage}
                </span>
                <h4 className="text-base font-serif font-bold text-[#16587B] mt-0.5">
                  {idea.title}
                </h4>
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#16587B]/10 text-[#16587B] whitespace-nowrap">
                {idea.fundingRequired}
              </span>
            </div>

            {/* Headline */}
            {idea.headline && (
              <p className="text-sm font-semibold text-[#16587B] leading-snug">
                {idea.headline}
              </p>
            )}

            {/* Founder Quote */}
            {idea.quote && (
              <blockquote className="text-xs italic text-[#16587B]/85 bg-[#FCFAF5] p-3 rounded-lg border-l-4 border-[#84B3CE] font-sans">
                {idea.quote}
              </blockquote>
            )}

            {/* Attached Files info */}
            <div className="flex items-center justify-between pt-2 border-t border-[#16587B]/10 text-[11px] text-[#16587B]/70 font-mono">
              <span>Verified Documents: {idea.documents.length} / 2 Files Attached</span>
              <span>Direct Bilateral Messaging Unlocks Instantly</span>
            </div>
          </div>

          {/* Investor Quota Status */}
          <div className="p-4 rounded-xl border border-[#84B3CE]/40 bg-[#84B3CE]/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#16587B] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#16587B]" />
                Investor Direct Chat Allowance
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#16587B] text-[#FCFAF5]">
                {isAlreadyActive ? 'Already Active' : `${remainingChats} of ${totalChats} Left`}
              </span>
            </div>

            <p className="text-xs text-[#16587B]/80 leading-relaxed">
              {isAlreadyActive ? (
                'You already have an active conversation with this founder. Resuming this chat uses 0 additional credits.'
              ) : remainingChats > 0 ? (
                `Initiating this dialogue will use 1 of your ${totalChats} included chats. You will have direct encrypted messaging with the founder.`
              ) : (
                'You have reached your 5 included chats for this billing period. Purchase an additional chat pack or upgrade to unlock new dialogues.'
              )}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-[#F5F0E5] h-2 rounded-full overflow-hidden border border-[#16587B]/10">
              <div
                className="bg-[#16587B] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (usedChats / totalChats) * 100)}%` }}
              />
            </div>
          </div>

          {/* Purchased Alert */}
          {purchasedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>+3 chats added to your account! You can now start chatting immediately.</span>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#5B0015]/10 border border-[#5B0015]/30 text-[#5B0015] text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#5B0015] shrink-0 mt-0.5" />
              <p>{errorMsg}</p>
            </div>
          )}

          {/* Platform Mediator Disclaimer */}
          <div className="p-3.5 rounded-xl bg-[#F5F0E5] border border-[#16587B]/15 text-[11px] text-[#16587B]/75 leading-relaxed space-y-1">
            <p className="font-semibold text-[#16587B] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16587B]" />
              Ideasoch Neutral Mediator Protocol:
            </p>
            <p>
              Ideasoch is purely an independent mediator facilitating bilateral discovery. We do not broker investments, charge transaction commissions, or hold equity in any venture. All subsequent diligence, discussions, and term sheets are strictly between founder and investor.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F5F0E5] border-t border-[#16587B]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          {remainingChats === 0 && !isAlreadyActive ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleBuyChatPack}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#16587B] hover:bg-[#16587B]/90 text-[#FCFAF5] text-xs font-semibold transition-all shadow-sm"
              >
                <CreditCard className="w-4 h-4" />
                Buy 3 Extra Chats (₹999)
              </button>
              <button
                onClick={() => {
                  onClose();
                  router.push('/pricing');
                }}
                className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl border border-[#16587B]/20 text-xs font-semibold text-[#16587B] hover:bg-[#FCFAF5] transition-colors"
              >
                View Plans <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartChat}
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#16587B] hover:bg-[#16587B]/90 text-[#FCFAF5] text-xs font-semibold transition-all shadow-sm"
            >
              {loading ? (
                'Connecting...'
              ) : isAlreadyActive ? (
                <>
                  <MessageSquare className="w-4 h-4" /> Open Conversation
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" /> Initiate Direct Bilateral Chat
                </>
              )}
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-[#16587B]/70 hover:text-[#16587B] transition-colors text-center"
          >
            Review Later
          </button>
        </div>
      </div>
    </div>
  );
};
