'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Idea } from '@/types';
import { X, Lock, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

interface UnlockIdeaModalProps {
  idea: Idea;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UnlockIdeaModal: React.FC<UnlockIdeaModalProps> = ({
  idea,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { investorProfile, unlockIdea } = useApp();
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'limit'; message: string }>({
    status: 'idle',
    message: '',
  });

  if (!isOpen) return null;

  const hasCredits = investorProfile.discoveryCreditsRemaining > 0;

  const handleUnlock = () => {
    const res = unlockIdea(idea.id);
    if (res.success) {
      setFeedback({ status: 'success', message: res.message });
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1000);
    } else {
      setFeedback({ status: 'limit', message: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f3d56]/50 backdrop-blur-xs p-4">
      <div className="bg-[#fcfaf5] border border-[#84B3CE]/35 rounded-lg max-w-md w-full p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f5f0e5] border border-[#84B3CE]/35 flex items-center justify-center text-[#16587B]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#16587B]">
                Confidential Idea Access
              </h3>
              <span className="text-[11px] text-[#16587B]/75">
                Controlled discovery credit allocation
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#16587B]/75 hover:text-[#16587B] rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded-md">
            <div className="font-semibold text-[#16587B] mb-0.5">{idea.title}</div>
            <div className="text-[#16587B]/75 text-[11px] leading-relaxed">
              Target: {idea.fundingRequired} · {idea.category} · Founder: {idea.founderName}
            </div>
          </div>

          <p className="text-[#16587B]/75 leading-relaxed">
            Unlocking reveals sensitive commercial information, including the detailed 3-year financial model, unit economics, regulatory reports, and allows direct founder messaging.
          </p>

          {/* Credit Counter */}
          <div className="border-t border-b border-[#84B3CE]/35 py-3 flex items-center justify-between">
            <span className="text-[#16587B]/75">Your Discovery Credits:</span>
            <span className="font-semibold text-xs text-[#16587B]">
              {investorProfile.discoveryCreditsRemaining} of {investorProfile.totalCreditsGranted} remaining
            </span>
          </div>

          {/* Status notices */}
          {feedback.status === 'success' && (
            <div className="p-3 bg-[#F0F3EF] border border-[#84B3CE]/35 rounded text-[#5B0015] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback.message}</span>
            </div>
          )}

          {(!hasCredits || feedback.status === 'limit') && (
            <div className="p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded text-[#16587B] space-y-2">
              <div className="flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 text-[#8A7F6A]" />
                <span>Monthly discovery limit reached</span>
              </div>
              <p className="text-[11px] text-[#16587B]/75">
                To maintain meaningful engagement, Free accounts receive 3 monthly credits. You can upgrade to Angel Pro (25 credits) or Venture Fund plans.
              </p>
              <Link
                href="/pricing"
                onClick={onClose}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16587B] hover:underline"
              >
                <span>View Investor Plans</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="mt-6 pt-3 border-t border-[#84B3CE]/35 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-[#16587B]/75 hover:text-[#16587B] transition-colors"
          >
            Cancel
          </button>
          {hasCredits && feedback.status !== 'success' && (
            <button
              type="button"
              onClick={handleUnlock}
              className="px-4 py-1.5 text-xs font-medium bg-[#16587B] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
            >
              Consume 1 Credit & Unlock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
