'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  Eye,
  Send,
  Calendar,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { NotificationType } from '@/types';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'VIEW':
        return <Eye className="w-4 h-4 text-[#16587B]" />;
      case 'APPLICATION':
        return <Send className="w-4 h-4 text-[#16587B]" />;
      case 'MEETING':
        return <Calendar className="w-4 h-4 text-[#5B0015]" />;
      case 'MESSAGE':
        return <MessageSquare className="w-4 h-4 text-[#16587B]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#16587B]/75" />;
    }
  };

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#84B3CE]/35 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
              Activity Stream
            </span>
            <h1 className="text-2xl font-normal text-[#16587B] tracking-tight">
              Notifications
            </h1>
          </div>

          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-1 text-xs text-[#16587B]/75 hover:text-[#16587B] underline"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>

        {notifications.length > 0 ? (
          <div className="divide-y divide-[#84B3CE]/35 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] overflow-hidden">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-5 flex items-start gap-4 transition-colors ${
                  notif.isRead ? 'bg-[#fcfaf5]' : 'bg-[#f5f0e5]'
                }`}
              >
                <div className="w-8 h-8 rounded-full border border-[#84B3CE]/35 bg-[#fcfaf5] flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#16587B] flex items-center gap-2">
                      {notif.title}
                      {!notif.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B0015]"></span>
                      )}
                    </h3>
                    <span className="text-[10px] text-[#16587B]/75">{notif.createdAt}</span>
                  </div>

                  <p className="text-[#16587B]/75 leading-relaxed mb-2">
                    {notif.message}
                  </p>

                  <Link
                    href={notif.link}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16587B] hover:underline"
                  >
                    <span>View details →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[#84B3CE]/35 rounded-lg">
            <p className="text-xs text-[#16587B]/75">No new notifications at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
