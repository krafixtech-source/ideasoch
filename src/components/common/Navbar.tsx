'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  X,
  Compass,
  Lightbulb,
  Briefcase,
  Users,
  ShieldCheck,
  PlusCircle,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { UserRole } from '@/types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    currentUser,
    currentRole,
    switchRole,
    unreadNotificationsCount,
    investorProfile,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Discover', href: '/discover' },
    { label: 'Ideas', href: '/ideas' },
    { label: 'Investors', href: '/investors' },
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'How It Works', href: '/how-it-works' },
  ];

  const getDashboardHref = () => {
    if (currentRole === 'INVESTOR') return '/dashboard/investor';
    if (currentRole === 'ADMIN') return '/admin';
    return '/dashboard/founder';
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fcfaf5]/95 backdrop-blur-md border-b border-[#84B3CE]/30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-1.5 group focus:outline-none">
                <span className="font-semibold text-lg tracking-tight text-[#16587B]">
                  IDEA<span className="font-light tracking-widest text-[#5B0015] ml-0.5">SOCH</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#84B3CE] inline-block mb-1"></span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'text-[#16587B] bg-[#84B3CE]/20 font-semibold'
                          : 'text-[#16587B]/75 hover:text-[#16587B] hover:bg-[#84B3CE]/15'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Log In & Sign Up buttons */}
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-[#16587B] border border-[#16587B]/30 rounded-md bg-[#f5f0e5] hover:bg-[#ede6d8] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-xs font-semibold text-[#fcfaf5] bg-[#16587B] rounded-md hover:bg-[#124864] transition-colors shadow-xs"
                >
                  Sign Up
                </Link>
              </div>

              {/* Messages Shortcut */}
              <Link
                href="/messages"
                className="p-2 text-[#16587B]/75 hover:text-[#16587B] hover:bg-[#84B3CE]/15 rounded-md transition-colors relative"
                title="Messages"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>

              {/* Notifications */}
              <Link
                href="/notifications"
                className="p-2 text-[#16587B]/75 hover:text-[#16587B] hover:bg-[#84B3CE]/15 rounded-md transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#5B0015]"></span>
                )}
              </Link>

              {/* Dashboard / Profile */}
              <Link
                href={getDashboardHref()}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#16587B] border border-[#16587B]/30 rounded-md bg-[#f5f0e5] hover:bg-[#ede6d8] transition-colors"
              >
                <span>Dashboard</span>
              </Link>

              {/* Primary Action Button */}
              <Link
                href="/submit-idea"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f] transition-colors shadow-sm border border-[#5B0015]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Idea</span>
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#16587B]/75 hover:text-[#16587B] hover:bg-[#84B3CE]/15 rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#84B3CE]/30 bg-[#fcfaf5] px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-[#16587B] hover:bg-[#84B3CE]/15 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={getDashboardHref()}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[#16587B] hover:bg-[#84B3CE]/15 rounded-md"
              >
                My Dashboard
              </Link>
              <Link
                href="/meetings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[#16587B] hover:bg-[#84B3CE]/15 rounded-md"
              >
                Meetings
              </Link>
            </div>

            <div className="pt-3 border-t border-[#84B3CE]/30 flex items-center gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-semibold text-[#16587B] border border-[#16587B]/30 rounded-md bg-[#f5f0e5]"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-semibold text-[#fcfaf5] bg-[#16587B] rounded-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fcfaf5] border-t border-[#84B3CE]/30 flex items-center justify-around py-2">
        <Link
          href="/"
          className={`flex flex-col items-center text-xs ${
            pathname === '/' ? 'text-[#5B0015] font-semibold' : 'text-[#16587B]/75'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>
        <Link
          href="/discover"
          className={`flex flex-col items-center text-xs ${
            pathname.startsWith('/discover') ? 'text-[#5B0015] font-semibold' : 'text-[#16587B]/75'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Discover</span>
        </Link>
        <Link
          href="/messages"
          className={`flex flex-col items-center text-xs relative ${
            pathname.startsWith('/messages') ? 'text-[#5B0015] font-semibold' : 'text-[#16587B]/75'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>Messages</span>
        </Link>
        <Link
          href="/notifications"
          className={`flex flex-col items-center text-xs relative ${
            pathname.startsWith('/notifications') ? 'text-[#5B0015] font-semibold' : 'text-[#16587B]/75'
          }`}
        >
          <Bell className="w-5 h-5 mb-0.5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-0 right-3 w-1.5 h-1.5 rounded-full bg-[#5B0015]"></span>
          )}
          <span>Alerts</span>
        </Link>
        <Link
          href={getDashboardHref()}
          className={`flex flex-col items-center text-xs ${
            pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
              ? 'text-[#5B0015] font-semibold'
              : 'text-[#16587B]/75'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
};
