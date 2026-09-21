import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#84B3CE] text-[#16587B] border-t border-[#16587B]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1 mb-3">
              <span className="font-semibold text-base tracking-tight text-[#16587B]">
                IDEA<span className="font-light tracking-widest text-[#5B0015] ml-0.5">SOCH</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#5B0015] inline-block mb-1"></span>
            </Link>
            <p className="text-xs text-[#16587B]/85 leading-relaxed mb-4">
              Where Ideas Meet Opportunity. A refined professional network connecting founders, accredited investors, and commercial ventures.
            </p>
            <div className="text-xs text-[#16587B] font-medium">
              Mumbai · Bengaluru · Delhi · Hyderabad
            </div>
          </div>

          {/* Column 1: Ideasoch */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#16587B] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#16587B]/80">
              <li>
                <Link href="/about" className="hover:text-[#5B0015] transition-colors">
                  About Ideasoch
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#5B0015] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#5B0015] transition-colors">
                  Investor Plans
                </Link>
              </li>
              <li>
                <Link href="/submit-idea" className="hover:text-[#5B0015] transition-colors">
                  Submit an Idea
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5B0015] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#16587B] mb-3">
              Discovery
            </h4>
            <ul className="space-y-2 text-xs text-[#16587B]/80">
              <li>
                <Link href="/discover" className="hover:text-[#5B0015] transition-colors">
                  All Discoveries
                </Link>
              </li>
              <li>
                <Link href="/ideas" className="hover:text-[#5B0015] transition-colors">
                  Business Ideas
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-[#5B0015] transition-colors">
                  Angel & VC Network
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-[#5B0015] transition-colors">
                  Co-founder & Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#16587B] mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-[#16587B]/80">
              <li>
                <Link href="/resources" className="hover:text-[#5B0015] transition-colors">
                  Founder Playbooks
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#5B0015] transition-colors">
                  Pitch Deck Frameworks
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-[#5B0015] transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#5B0015] transition-colors">
                  Due Diligence FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#16587B] mb-3">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-[#16587B]/80">
              <li>
                <Link href="/about" className="hover:text-[#5B0015] transition-colors">
                  Confidentiality & NDAs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5B0015] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5B0015] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5B0015] transition-colors">
                  Community Standards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#16587B]/20 space-y-3 text-xs text-[#16587B]/85">
          <p className="text-[11px] leading-relaxed text-[#16587B]/80 max-w-4xl">
            <strong>Regulatory &amp; Platform Disclosure:</strong> Ideasoch is a neutral mediator providing communication and discovery infrastructure. Ideasoch is not an investment fund, registered broker-dealer, or a party to any commercial or investment agreement between users. We take 0% equity, 0% commission on investment rounds, and bear no liability for transactions negotiated between independent founders and verified investors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-xs text-[#16587B]/75 border-t border-[#16587B]/15">
            <div>
              © {new Date().getFullYear()} Ideasoch Technologies Private Limited. All rights reserved.
            </div>
            <div className="mt-2 sm:mt-0 flex items-center space-x-6 text-[#16587B] font-medium">
              <span>Pure Neutral Mediator · Direct Bilateral Outreach</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
