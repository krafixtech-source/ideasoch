'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { INITIAL_INVESTORS } from '@/lib/initialData';
import { X, Check, ShieldCheck, Send } from 'lucide-react';
import { Idea } from '@/types';

interface ApplyToInvestorsModalProps {
  idea: Idea;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyToInvestorsModal: React.FC<ApplyToInvestorsModalProps> = ({
  idea,
  isOpen,
  onClose,
}) => {
  const { applyToInvestors, applications } = useApp();
  const [selectedInvestorIds, setSelectedInvestorIds] = useState<string[]>([]);
  const [pitchNote, setPitchNote] = useState<string>(
    `Hello, we are pitching ${idea.title} (${idea.category}, currently at ${idea.stage} stage). We are raising ${idea.fundingRequired} to scale operations. We would appreciate reviewing our executive brief.`
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter already applied investors
  const appliedInvestorIds = applications
    .filter((a) => a.ideaId === idea.id)
    .map((a) => a.investorId);

  const toggleInvestor = (id: string) => {
    if (appliedInvestorIds.includes(id)) return;
    setSelectedInvestorIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    if (selectedInvestorIds.length === 0) return;
    applyToInvestors(idea.id, selectedInvestorIds, pitchNote);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f3d56]/50 backdrop-blur-xs p-4">
      <div className="bg-[#fcfaf5] border border-[#84B3CE]/35 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#84B3CE]/35">
          <div>
            <h2 className="text-base font-semibold text-[#16587B]">
              Apply to Investors
            </h2>
            <p className="text-xs text-[#16587B]/75">
              Pitch <span className="font-medium text-[#16587B]">{idea.title}</span> to curated angels and VC partners.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#16587B]/75 hover:text-[#16587B] rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#F0F3EF] text-[#5B0015] flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#16587B]">
                Applications Dispatched
              </h3>
              <p className="text-xs text-[#16587B]/75 max-w-sm mx-auto">
                Your pitch note and executive summary were sent to {selectedInvestorIds.length} investors. Track their responses in your Founder Dashboard.
              </p>
            </div>
          ) : (
            <>
              {/* Pitch Note input */}
              <div>
                <label className="block text-xs font-medium text-[#16587B] mb-1">
                  Personalized Pitch Note
                </label>
                <textarea
                  value={pitchNote}
                  onChange={(e) => setPitchNote(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 border border-[#84B3CE]/35 rounded-md focus:outline-none focus:border-[#16587B] text-[#16587B]"
                  placeholder="Summarize your traction and why this investor aligns with your round..."
                />
              </div>

              {/* Investor Selection List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#16587B]">
                    Recommended Matched Investors ({INITIAL_INVESTORS.length})
                  </span>
                  <span className="text-xs text-[#16587B]/75">
                    {selectedInvestorIds.length} selected
                  </span>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {INITIAL_INVESTORS.map((inv) => {
                    const alreadyApplied = appliedInvestorIds.includes(inv.userId);
                    const isSelected = selectedInvestorIds.includes(inv.userId);

                    return (
                      <div
                        key={inv.userId}
                        onClick={() => !alreadyApplied && toggleInvestor(inv.userId)}
                        className={`p-3 border rounded-lg flex items-center justify-between text-xs transition-colors ${
                          alreadyApplied
                            ? 'bg-[#f5f0e5] border-[#84B3CE]/35 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#f5f0e5] border-[#16587B] cursor-pointer'
                            : 'bg-[#fcfaf5] border-[#84B3CE]/35 hover:border-[#16587B] cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            disabled={alreadyApplied}
                            checked={isSelected || alreadyApplied}
                            onChange={() => !alreadyApplied && toggleInvestor(inv.userId)}
                            className="rounded border-[#84B3CE]/35 text-[#16587B] focus:ring-0"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={inv.avatar}
                            alt={inv.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#84B3CE]/35"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-[#16587B]">{inv.name}</span>
                              {inv.verified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />
                              )}
                            </div>
                            <span className="text-[#16587B]/75 block text-[11px]">
                              {inv.title}, {inv.organization} · {inv.location}
                            </span>
                            <span className="text-[#8A7F6A] text-[11px] font-medium">
                              Range: {inv.minTicket} – {inv.maxTicket}
                            </span>
                          </div>
                        </div>

                        <div>
                          {alreadyApplied ? (
                            <span className="text-[11px] px-2 py-0.5 bg-[#f5f0e5] border border-[#84B3CE]/35 text-[#16587B]/75 rounded">
                              Already Applied
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#16587B]/75">
                              {isSelected ? 'Selected' : 'Select'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!isSubmitted && (
          <div className="px-6 py-4 border-t border-[#84B3CE]/35 flex items-center justify-between bg-[#fcfaf5]">
            <span className="text-xs text-[#16587B]/75">
              Direct bilateral pitch dispatch under Ideasoch guidelines.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs font-medium text-[#16587B]/75 hover:text-[#16587B] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={selectedInvestorIds.length === 0}
                onClick={handleSend}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-[#16587B] text-[#fcfaf5] rounded-md hover:bg-[#43000f] disabled:opacity-40 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send {selectedInvestorIds.length > 0 ? `(${selectedInvestorIds.length})` : ''} Applications</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
