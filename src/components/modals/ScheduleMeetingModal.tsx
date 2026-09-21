'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  defaultTitle?: string;
}

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  isOpen,
  onClose,
  targetUser,
  defaultTitle,
}) => {
  const { currentUser, scheduleMeeting } = useApp();

  const [title, setTitle] = useState(
    defaultTitle || `Introductory Discussion with ${targetUser.name}`
  );
  const [date, setDate] = useState('2026-10-08');
  const [time, setTime] = useState('15:00 IST');
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState(
    'Discuss strategic milestones, pilot validation metrics, and potential participation in upcoming financing round.'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleMeeting({
      title,
      organizerId: currentUser.id,
      organizerName: currentUser.name,
      participantId: targetUser.id,
      participantName: targetUser.name,
      participantAvatar: targetUser.avatar,
      date,
      time,
      durationMinutes: duration,
      meetingLink: `https://meet.ideasoch.com/sync-${Math.random().toString(36).substring(2, 7)}`,
      notes,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f3d56]/50 backdrop-blur-xs p-4">
      <div className="bg-[#fcfaf5] border border-[#84B3CE]/35 rounded-lg max-w-lg w-full p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#84B3CE]/35">
          <div>
            <h3 className="text-base font-semibold text-[#16587B]">
              Schedule Professional Discussion
            </h3>
            <p className="text-xs text-[#16587B]/75">
              Coordination with <span className="text-[#16587B] font-medium">{targetUser.name}</span>
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

        {isSuccess ? (
          <div className="py-12 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F0F3EF] text-[#5B0015] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-[#16587B]">Meeting Proposed</h4>
            <p className="text-xs text-[#16587B]/75">
              The meeting request and calendar invite were sent. You will be notified upon confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block text-[#16587B] font-medium mb-1">
                Meeting Topic / Agenda
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B] focus:outline-none focus:border-[#16587B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#16587B] font-medium mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#16587B]/75" /> Proposed Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B] focus:outline-none focus:border-[#16587B]"
                />
              </div>

              <div>
                <label className="block text-[#16587B] font-medium mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#16587B]/75" /> Time Slot
                </label>
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 15:30 IST"
                  className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B] focus:outline-none focus:border-[#16587B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#16587B] font-medium mb-1">
                Duration
              </label>
              <div className="flex gap-2">
                {[15, 30, 45, 60].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`flex-1 py-1.5 border rounded-md text-xs font-medium transition-colors ${
                      duration === dur
                        ? 'bg-[#16587B] text-[#fcfaf5] border-[#16587B]'
                        : 'bg-[#fcfaf5] text-[#16587B]/75 border-[#84B3CE]/35 hover:bg-[#f5f0e5]'
                    }`}
                  >
                    {dur} mins
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#16587B] font-medium mb-1">
                Confidential Notes / Pre-read Material
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 border border-[#84B3CE]/35 rounded-md text-[#16587B] focus:outline-none focus:border-[#16587B]"
                placeholder="Key talking points or link to pitch deck..."
              />
            </div>

            <div className="p-3 bg-[#f5f0e5] border border-[#84B3CE]/35 rounded-md flex items-center gap-2 text-[11px] text-[#16587B]/75">
              <Video className="w-4 h-4 text-[#8A7F6A] shrink-0" />
              <span>An encrypted Ideasoch private video meeting link will be generated automatically.</span>
            </div>

            <div className="pt-3 border-t border-[#84B3CE]/35 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-[#16587B]/75 hover:text-[#16587B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-medium bg-[#16587B] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
              >
                Send Meeting Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
