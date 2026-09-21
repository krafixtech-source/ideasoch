'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Calendar, Clock, Video, Check, X, ArrowLeft, ExternalLink } from 'lucide-react';
import { MeetingStatus } from '@/types';

export default function MeetingsPage() {
  const { meetings, updateMeetingStatus, currentUser } = useApp();

  const getStatusBadge = (status: MeetingStatus) => {
    switch (status) {
      case 'Accepted':
        return 'bg-[#84B3CE]/20 text-[#5B0015] border-[#84B3CE]/35 font-medium';
      case 'Requested':
        return 'bg-[#f5f0e5] text-[#16587B] border-[#84B3CE]/35 font-medium';
      case 'Declined':
      case 'Cancelled':
        return 'bg-[#f5f0e5] text-[#16587B]/75 border-[#84B3CE]/35';
      default:
        return 'bg-[#f5f0e5] text-[#16587B] border-[#84B3CE]/35';
    }
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-[#84B3CE]/35 mb-8">
          <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
            Scheduling & Bilateral Discussions
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight">
            Scheduled Meetings
          </h1>
          <p className="text-xs text-[#16587B]/75 mt-1">
            Encrypted video conferences and due diligence syncs arranged between founders and investors.
          </p>
        </div>

        {/* Meetings List */}
        {meetings.length > 0 ? (
          <div className="space-y-4">
            {meetings.map((meet) => (
              <div
                key={meet.id}
                className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[11px] rounded border ${getStatusBadge(
                        meet.status
                      )}`}
                    >
                      {meet.status}
                    </span>
                    <span className="text-[#16587B]/75 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {meet.date}
                    </span>
                    <span className="text-[#16587B]/75 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {meet.time} ({meet.durationMinutes}m)
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[#16587B]">{meet.title}</h3>

                  <div className="text-[11px] text-[#16587B]/75 flex items-center gap-2">
                    <span>Organizer: {meet.organizerName}</span>
                    <span>·</span>
                    <span>Participant: {meet.participantName}</span>
                  </div>

                  {meet.notes && (
                    <p className="text-[#16587B]/75 text-xs pt-1 max-w-xl">
                      &ldquo;{meet.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  {meet.status === 'Accepted' && (
                    <a
                      href={meet.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Private Room</span>
                    </a>
                  )}

                  {meet.status === 'Requested' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateMeetingStatus(meet.id, 'Accepted')}
                        className="px-3 py-1.5 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f]"
                      >
                        Accept Sync
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMeetingStatus(meet.id, 'Declined')}
                        className="px-3 py-1.5 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B]/75 hover:text-[#16587B]"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  <Link
                    href="/messages"
                    className="text-[11px] text-[#16587B]/75 hover:text-[#16587B] underline"
                  >
                    Open message thread
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[#84B3CE]/35 rounded-lg">
            <p className="text-xs text-[#16587B]/75">No meetings scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
