'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ReportReason } from '@/types';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'PROFILE' | 'IDEA' | 'OPPORTUNITY' | 'MESSAGE';
  targetId: string;
  targetTitle: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
}) => {
  const { submitReport } = useApp();
  const [reason, setReason] = useState<ReportReason>('Misleading information');
  const [details, setDetails] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const reasons: ReportReason[] = [
    'Fake profile',
    'Fake investment opportunity',
    'Spam',
    'Misleading information',
    'Copyright issue',
    'Harassment',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      reporterId: 'current-user',
      targetType,
      targetId,
      targetTitle,
      reason,
      details,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f3d56]/50 backdrop-blur-xs p-4">
      <div className="bg-[#fcfaf5] border border-[#84B3CE]/35 rounded-lg max-w-md w-full p-6 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-[#84B3CE]/35">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#8A7F6A]" />
            <h3 className="text-sm font-semibold text-[#16587B]">
              Report Content to Platform Admin
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-[#16587B]/75 hover:text-[#16587B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F0F3EF] text-[#5B0015] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-[#16587B]">Report Logged</div>
            <p className="text-[11px] text-[#16587B]/75">
              Our platform integrity officers will review the flagged content and audit logs within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <span className="text-[#16587B]/75 block mb-1">Target:</span>
              <span className="font-semibold text-[#16587B]">{targetTitle}</span>
            </div>

            <div>
              <label className="block text-[#16587B] font-medium mb-1">Reason for report</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5]"
              >
                {reasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#16587B] font-medium mb-1">Additional Context</label>
              <textarea
                required
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide specific details or documentation..."
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B]"
              />
            </div>

            <div className="pt-3 border-t border-[#84B3CE]/35 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-[#16587B]/75 hover:text-[#16587B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-medium bg-[#16587B] text-[#fcfaf5] rounded-md hover:bg-[#43000f]"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
