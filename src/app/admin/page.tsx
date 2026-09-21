'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Check,
  X,
  AlertTriangle,
  FileText,
  UserCheck,
  Search,
  Filter,
  Eye,
  Lock,
} from 'lucide-react';
import { IdeaStatus, OpportunityStatus, UserRole } from '@/types';

export default function AdminPage() {
  const {
    users,
    ideas,
    opportunities,
    applications,
    reports,
    auditLogs,
    updateIdeaStatus,
    updateOpportunityStatus,
    updateReportStatus,
    toggleUserVerification,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'ideas' | 'opportunities' | 'reports' | 'audit'
  >('overview');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'ALL' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-[#fcfaf5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#84B3CE]/35 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
              Platform Integrity & Governance
            </span>
            <h1 className="text-2xl sm:text-3xl font-normal text-[#16587B] tracking-tight">
              Ideasoch Administration
            </h1>
            <p className="text-xs text-[#16587B]/75 mt-1">
              Compliance monitoring, user accreditation, idea validation, and trust & safety reporting.
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <span className="px-3 py-1 text-xs border border-[#84B3CE]/35 rounded-md bg-[#f5f0e5] text-[#16587B] font-medium">
              Admin Session Active
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-[#84B3CE]/35 mb-8 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'users', label: `Users (${users.length})` },
            { id: 'ideas', label: `Ideas (${ideas.length})` },
            { id: 'opportunities', label: `Opportunities (${opportunities.length})` },
            { id: 'reports', label: `Reports (${reports.length})` },
            { id: 'audit', label: `Audit Log (${auditLogs.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 font-semibold tracking-wide uppercase whitespace-nowrap transition-colors relative ${
                activeTab === tab.id ? 'text-[#16587B]' : 'text-[#16587B]/75 hover:text-[#16587B]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B0015]"></span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5]">
                <span className="text-[11px] font-medium text-[#16587B]/75 uppercase tracking-wider block">
                  Total Accounts
                </span>
                <span className="text-2xl font-semibold text-[#16587B] block mt-2">
                  {users.length}
                </span>
                <span className="text-[11px] text-[#5B0015]">Accreditation verified</span>
              </div>

              <div className="p-5 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5]">
                <span className="text-[11px] font-medium text-[#16587B]/75 uppercase tracking-wider block">
                  Published Ideas
                </span>
                <span className="text-2xl font-semibold text-[#16587B] block mt-2">
                  {ideas.length}
                </span>
                <span className="text-[11px] text-[#16587B]/75">Commercial ventures</span>
              </div>

              <div className="p-5 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5]">
                <span className="text-[11px] font-medium text-[#16587B]/75 uppercase tracking-wider block">
                  Live Opportunities
                </span>
                <span className="text-2xl font-semibold text-[#16587B] block mt-2">
                  {opportunities.length}
                </span>
                <span className="text-[11px] text-[#5B0015]">Active co-founder/partnerships</span>
              </div>

              <div className="p-5 border border-[#84B3CE]/35 rounded-lg bg-[#f5f0e5]">
                <span className="text-[11px] font-medium text-[#16587B]/75 uppercase tracking-wider block">
                  Pending Reports
                </span>
                <span className="text-2xl font-semibold text-[#16587B] block mt-2">
                  {reports.filter((r) => r.status === 'PENDING').length}
                </span>
                <span className="text-[11px] text-[#16587B]/75">Under investigation</span>
              </div>
            </div>

            {/* Quick Status Check */}
            <div className="p-6 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] space-y-4 text-xs">
              <h3 className="font-semibold text-[#16587B] uppercase tracking-wider">
                System Governance & Platform Health
              </h3>
              <div className="space-y-2 text-[#16587B]/75">
                <div className="flex items-center justify-between p-3 border border-[#84B3CE]/35 rounded">
                  <span>Server-side discovery quota enforcement</span>
                  <span className="text-[#5B0015] font-semibold">Active · Non-bypassable</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-[#84B3CE]/35 rounded">
                  <span>Confidential documents security gate</span>
                  <span className="text-[#5B0015] font-semibold">Active · Encrypted links</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-[#84B3CE]/35 rounded">
                  <span>Spam prevention & restricted chat access</span>
                  <span className="text-[#5B0015] font-semibold">Enforced on bilateral events</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#16587B]/75 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users by name or email..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5] focus:outline-none focus:border-[#5B0015]"
                />
              </div>

              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-[#84B3CE]/35 rounded-md text-[#16587B] bg-[#fcfaf5]"
              >
                <option value="ALL">All Roles</option>
                <option value="IDEA_MAKER">Idea Makers (Founders)</option>
                <option value="INVESTOR">Investors</option>
                <option value="ADMIN">Administrators</option>
              </select>
            </div>

            <div className="border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#f5f0e5] border-b border-[#84B3CE]/35 text-[#16587B]/75 uppercase text-[10px]">
                  <tr>
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Verification</th>
                    <th className="px-6 py-3 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#84B3CE]/35">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#f5f0e5]">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#16587B] flex items-center gap-1.5">
                          {u.name}
                          {u.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#5B0015]" />}
                        </div>
                        <div className="text-[11px] text-[#16587B]/75">{u.email}</div>
                      </td>
                      <td className="px-6 py-4 text-[#16587B]/75">{u.role}</td>
                      <td className="px-6 py-4 text-[#16587B]/75">{u.location}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 text-[11px] border rounded ${
                            u.verified
                              ? 'bg-[#84B3CE]/20 text-[#5B0015] border-[#84B3CE]/35'
                              : 'bg-[#fcfaf5] text-[#16587B]/75 border-[#84B3CE]/35'
                          }`}
                        >
                          {u.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => toggleUserVerification(u.id)}
                          className="px-2.5 py-1 text-[11px] border border-[#84B3CE]/35 rounded hover:border-[#5B0015] text-[#16587B]"
                        >
                          {u.verified ? 'Revoke Verification' : 'Verify Credentials'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: IDEA MANAGEMENT */}
        {activeTab === 'ideas' && (
          <div className="border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#f5f0e5] border-b border-[#84B3CE]/35 text-[#16587B]/75 uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-3">Idea</th>
                  <th className="px-6 py-3">Founder</th>
                  <th className="px-6 py-3">Stage & Funding</th>
                  <th className="px-6 py-3">Current Status</th>
                  <th className="px-6 py-3 text-right">Approval Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#84B3CE]/35">
                {ideas.map((idea) => (
                  <tr key={idea.id} className="hover:bg-[#f5f0e5]">
                    <td className="px-6 py-4">
                      <Link href={`/ideas/${idea.id}`} className="font-semibold text-[#16587B] hover:underline">
                        {idea.title}
                      </Link>
                      <div className="text-[11px] text-[#16587B]/75">{idea.category}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#16587B]">{idea.founderName}</td>
                    <td className="px-6 py-4 text-[#16587B]/75">
                      {idea.stage} · {idea.fundingRequired}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[11px] border border-[#84B3CE]/35 rounded bg-[#fcfaf5] text-[#16587B] font-medium">
                        {idea.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5">
                      <button
                        type="button"
                        onClick={() => updateIdeaStatus(idea.id, 'Approved')}
                        className="px-2.5 py-1 text-[11px] bg-[#5B0015] text-[#fcfaf5] rounded hover:bg-[#43000f]"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateIdeaStatus(idea.id, 'Rejected')}
                        className="px-2.5 py-1 text-[11px] border border-[#84B3CE]/35 rounded text-[#16587B]/75 hover:text-[#16587B]"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => updateIdeaStatus(idea.id, 'Featured')}
                        className="px-2.5 py-1 text-[11px] border border-[#16587B] text-[#16587B] rounded"
                      >
                        Feature
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: OPPORTUNITY MANAGEMENT */}
        {activeTab === 'opportunities' && (
          <div className="border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#f5f0e5] border-b border-[#84B3CE]/35 text-[#16587B]/75 uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Posted By</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#84B3CE]/35">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-[#f5f0e5]">
                    <td className="px-6 py-4 font-semibold text-[#16587B]">
                      <Link href={`/opportunities/${opp.id}`} className="hover:underline">
                        {opp.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[#16587B]/75">{opp.type}</td>
                    <td className="px-6 py-4 text-[#16587B]/75">{opp.postedByName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[11px] border border-[#84B3CE]/35 rounded bg-[#fcfaf5] font-medium text-[#16587B]">
                        {opp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5">
                      <button
                        type="button"
                        onClick={() => updateOpportunityStatus(opp.id, 'Published')}
                        className="px-2.5 py-1 text-[11px] bg-[#5B0015] text-[#fcfaf5] rounded"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateOpportunityStatus(opp.id, 'Paused')}
                        className="px-2.5 py-1 text-[11px] border border-[#84B3CE]/35 rounded text-[#16587B]/75"
                      >
                        Pause
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: REPORTS QUEUE */}
        {activeTab === 'reports' && (
          <div className="space-y-4 text-xs">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="p-5 border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[11px] font-semibold border border-[#16587B] text-[#16587B] rounded">
                      {rep.reason}
                    </span>
                    <span className="text-[#16587B]/75">Target Type: {rep.targetType}</span>
                    <span className="text-[#16587B]/75">· {rep.createdAt}</span>
                  </div>

                  <h4 className="font-semibold text-sm text-[#16587B]">
                    {rep.targetTitle} (ID: {rep.targetId})
                  </h4>

                  <p className="text-[#16587B]/75 max-w-2xl leading-relaxed">
                    &ldquo;{rep.details}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateReportStatus(rep.id, 'RESOLVED')}
                    className="px-3 py-1 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded hover:bg-[#43000f]"
                  >
                    Resolve & Warn
                  </button>
                  <button
                    type="button"
                    onClick={() => updateReportStatus(rep.id, 'DISMISSED')}
                    className="px-3 py-1 text-xs border border-[#84B3CE]/35 text-[#16587B]/75 rounded hover:text-[#16587B]"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="border border-[#84B3CE]/35 rounded-lg bg-[#fcfaf5] overflow-hidden text-xs">
            <div className="p-4 bg-[#f5f0e5] border-b border-[#84B3CE]/35 text-[#16587B]/75 font-mono text-[11px]">
              Tamper-evident system activity log for discovery credit debits and confidentiality releases.
            </div>
            <div className="divide-y divide-[#84B3CE]/35">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-semibold text-[#16587B]">{log.action}</span>
                      <span className="text-[#16587B]/75">by {log.userName}</span>
                    </div>
                    <p className="text-[#16587B]/75 text-[11px] leading-relaxed">
                      {log.details}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#16587B]/75 font-mono shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
