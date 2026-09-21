'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ScheduleMeetingModal } from '@/components/modals/ScheduleMeetingModal';
import { ReportModal } from '@/components/modals/ReportModal';
import {
  ShieldCheck,
  Paperclip,
  Send,
  Calendar,
  AlertTriangle,
  MoreVertical,
  FileText,
  Search,
  CheckCheck,
  User as UserIcon,
} from 'lucide-react';
import { MessageAttachment } from '@/types';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    sendMessage,
    currentUser,
    currentRole,
    investorProfile,
    purchaseChatCredits,
  } = useApp();

  const [inputContent, setInputContent] = useState('');
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [attachmentPreview, setAttachmentPreview] = useState<MessageAttachment | null>(null);

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const activeMessages = activeConv ? messages[activeConv.id] || [] : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim() && !attachmentPreview) return;

    sendMessage(
      activeConv.id,
      inputContent,
      attachmentPreview ? [attachmentPreview] : undefined
    );

    setInputContent('');
    setAttachmentPreview(null);
  };

  const handleAttachDummy = () => {
    setAttachmentPreview({
      name: 'CleanGrid_Series_Seed_Deck.pdf',
      size: '4.8 MB',
      type: 'pdf',
      url: '#',
    });
  };

  const totalInvestorChats = investorProfile.chatCreditsTotal || 5;
  const usedInvestorChats = investorProfile.chatCreditsUsed || 0;
  const remainingInvestorChats = Math.max(0, totalInvestorChats - usedInvestorChats);

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* INVESTOR CHAT QUOTA BAR */}
        {currentRole === 'INVESTOR' && (
          <div className="mb-4 p-3.5 rounded-xl bg-[#F5F0E5] border border-[#16587B]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#16587B]/10 flex items-center justify-center text-[#16587B]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif font-bold text-[#16587B] block">
                  Active Investor Plan: {investorProfile.subscriptionPlan === 'yearly' ? 'Annual Pass' : 'Monthly Pass'}
                </span>
                <span className="text-[11px] text-[#16587B]/75">
                  Verified Accredited Backer · {remainingInvestorChats} of {totalInvestorChats} Bilateral Chats Available
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#16587B] text-[#FCFAF5] font-bold">
                {usedInvestorChats}/{totalInvestorChats} Used
              </span>
              <button
                type="button"
                onClick={() => purchaseChatCredits(3)}
                className="px-3 py-1.5 rounded-lg bg-[#84B3CE] hover:bg-[#84B3CE]/80 text-[#16587B] font-bold text-xs transition-colors shadow-xs"
              >
                + Add 3 Chats (₹999)
              </button>
            </div>
          </div>
        )}

        <div className="border border-[#84B3CE]/35 rounded-2xl bg-[#fcfaf5] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
          {/* Left Sidebar: Conversations List */}
          <div className="md:col-span-4 border-r border-[#84B3CE]/35 bg-[#fcfaf5] flex flex-col">
            <div className="p-4 border-b border-[#84B3CE]/35">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-base font-serif font-bold text-[#16587B]">Direct Messages</h1>
                <span className="text-[11px] text-[#16587B]/75 font-mono">
                  {conversations.length} Active Threads
                </span>
              </div>
              <p className="text-[11px] text-[#16587B]/75">
                Bilateral encrypted communication between founders and verified investors.
              </p>
            </div>

            {/* Conversation Threads */}
            <div className="divide-y divide-[#84B3CE]/35 overflow-y-auto flex-1">
              {conversations.map((conv) => {
                const isSelected = conv.id === activeConv?.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#f5f0e5]' : 'hover:bg-[#f5f0e5]'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={conv.otherParticipant.avatar}
                      alt={conv.otherParticipant.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#84B3CE]/35 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-xs text-[#16587B] truncate flex items-center gap-1">
                          {conv.otherParticipant.name}
                          {conv.otherParticipant.verified && (
                            <ShieldCheck className="w-3 h-3 text-[#16587B]" />
                          )}
                        </span>
                        <span className="text-[10px] text-[#16587B]/75">
                          {conv.lastMessageTimestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#16587B]/75 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Pane: Active Chat Window */}
          {activeConv ? (
            <div className="md:col-span-8 flex flex-col justify-between bg-[#fcfaf5]">
              {/* Neutral Mediator Protocol Subheader */}
              <div className="px-4 py-2 bg-[#84B3CE]/15 border-b border-[#84B3CE]/25 flex items-center justify-between text-[11px] text-[#16587B]/85">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16587B]" />
                  Ideasoch Neutral Channel · Direct bilateral conversation. Zero intermediary commission.
                </span>
                <span className="hidden sm:inline font-mono text-[10px]">0% Platform Equity</span>
              </div>

              {/* Chat Header */}
              <div className="p-4 border-b border-[#84B3CE]/35 flex items-center justify-between bg-[#fcfaf5]">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeConv.otherParticipant.avatar}
                    alt={activeConv.otherParticipant.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#84B3CE]/35"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-[#16587B]">
                        {activeConv.otherParticipant.name}
                      </span>
                      {activeConv.otherParticipant.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#16587B]" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#16587B]/75">
                      <span>{activeConv.otherParticipant.title}</span>
                      <span>·</span>
                      <span className="text-emerald-700 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {activeConv.otherParticipant.online ? 'Online' : 'Active today'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMeetingModalOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-[#84B3CE]/35 rounded-xl text-[#16587B] hover:bg-[#f5f0e5]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#16587B]" />
                    <span>Schedule Meeting</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(true)}
                    className="p-1.5 text-[#16587B]/75 hover:text-[#16587B]"
                    title="Report conversation"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Thread */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                {activeMessages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-lg leading-relaxed ${
                          isMe
                            ? 'bg-[#5B0015] text-[#fcfaf5]'
                            : 'bg-[#f5f0e5] border border-[#84B3CE]/35 text-[#16587B]'
                        }`}
                      >
                        <p>{msg.content}</p>

                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2.5 space-y-1.5">
                            {msg.attachments.map((att, i) => (
                              <div
                                key={i}
                                className={`p-2 rounded border flex items-center justify-between text-[11px] ${
                                  isMe
                                    ? 'bg-[#23272B] border-white/20 text-[#fcfaf5]'
                                    : 'bg-[#fcfaf5] border-[#84B3CE]/35 text-[#16587B]'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="w-3.5 h-3.5 text-[#16587B]" />
                                  <span className="truncate max-w-[180px]">{att.name}</span>
                                </div>
                                <span className="opacity-70">{att.size}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <span suppressHydrationWarning className="text-[10px] text-[#16587B]/75 mt-1 flex items-center gap-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {isMe && <CheckCheck className="w-3 h-3 text-[#5B0015]" />}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Attachment Preview Banner */}
              {attachmentPreview && (
                <div className="px-4 py-2 bg-[#f5f0e5] border-t border-[#84B3CE]/35 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#16587B]" />
                    <span>{attachmentPreview.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachmentPreview(null)}
                    className="text-[#16587B]/75 hover:text-[#16587B]"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Input Form */}
              <form
                onSubmit={handleSend}
                className="p-4 border-t border-[#84B3CE]/35 flex items-center gap-2 bg-[#fcfaf5]"
              >
                <button
                  type="button"
                  onClick={handleAttachDummy}
                  className="p-2 border border-[#84B3CE]/35 text-[#16587B]/75 hover:text-[#16587B] rounded-md transition-colors"
                  title="Attach Pitch Deck or PDF"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder="Write a message to discuss opportunities..."
                  className="flex-1 p-2.5 border border-[#84B3CE]/35 rounded-md text-xs text-[#16587B] focus:outline-none focus:border-[#5B0015]"
                />

                <button
                  type="submit"
                  disabled={!inputContent.trim() && !attachmentPreview}
                  className="px-4 py-2.5 bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-medium"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="md:col-span-8 flex items-center justify-center text-xs text-[#16587B]/75">
              Select a conversation thread to review message history.
            </div>
          )}
        </div>
      </div>

      {activeConv && (
        <>
          <ScheduleMeetingModal
            isOpen={isMeetingModalOpen}
            onClose={() => setIsMeetingModalOpen(false)}
            targetUser={{
              id: activeConv.otherParticipant.id,
              name: activeConv.otherParticipant.name,
              avatar: activeConv.otherParticipant.avatar,
              role: activeConv.otherParticipant.role,
            }}
            defaultTitle={`Strategic Sync with ${activeConv.otherParticipant.name}`}
          />

          <ReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            targetType="MESSAGE"
            targetId={activeConv.id}
            targetTitle={`Conversation with ${activeConv.otherParticipant.name}`}
          />
        </>
      )}
    </div>
  );
}
