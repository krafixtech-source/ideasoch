import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#fcfaf5] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-[#84B3CE]/35 mb-12">
          <span className="text-xs uppercase tracking-wider text-[#16587B]/75 font-medium block mb-1">
            Founding Narrative
          </span>
          <h1 className="text-3xl sm:text-4xl font-normal text-[#16587B] tracking-tight">
            About Ideasoch
          </h1>
          <p className="text-sm text-[#16587B]/75 mt-2 leading-relaxed">
            Named after the synthesis of <span className="text-[#16587B] font-medium">Idea</span> and <span className="text-[#16587B] font-medium">Soch</span> (deep thought, deliberation, and contemplation).
          </p>
        </div>

        <div className="space-y-10 text-xs text-[#16587B]/75 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#16587B]">
              Our Thesis
            </h2>
            <p>
              Venture creation is not social media. Serious entrepreneurs do not need viral engagement or algorithmic dopamine; they need high-conviction partners who understand unit economics, regulatory pathways, and hard operational hurdles.
            </p>
            <p>
              Ideasoch was built to bring quiet, institutional rigor back to early-stage business creation. By coupling structured founder dossiers with capped investor discovery credits, we turn noisy market friction into focused commercial relationships.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-[#84B3CE]/35">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#16587B]">
              Guiding Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-[#84B3CE]/35 rounded bg-[#fcfaf5]">
                <span className="font-semibold text-[#16587B] block mb-1">Deliberate Restraint</span>
                <p>We say no to endless scrolling, aggressive upselling, and noisy feeds. Every pixel is designed for calm evaluation.</p>
              </div>
              <div className="p-4 border border-[#84B3CE]/35 rounded bg-[#fcfaf5]">
                <span className="font-semibold text-[#16587B] block mb-1">Strict Confidentiality</span>
                <p>Proprietary IP and financial models remain encrypted until unlocked under mutual confidentiality agreements.</p>
              </div>
              <div className="p-4 border border-[#84B3CE]/35 rounded bg-[#fcfaf5]">
                <span className="font-semibold text-[#16587B] block mb-1">Bilateral Respect</span>
                <p>Founders get direct responses; investors receive high-signal pitches that match their specific mandate.</p>
              </div>
              <div className="p-4 border border-[#84B3CE]/35 rounded bg-[#fcfaf5]">
                <span className="font-semibold text-[#16587B] block mb-1">Ecosystem Beyond Equity</span>
                <p>Co-founders, strategic distribution partners, and operational leaders are treated with equal priority as capital.</p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-[#84B3CE]/35 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#16587B]">
              Offices & Operations
            </h2>
            <p>
              Ideasoch maintains representative presence across Bengaluru, Mumbai, and New Delhi, operating across clean energy, industrial deeptech, healthcare diagnostics, and software infrastructure.
            </p>
          </section>

          <div className="pt-8 border-t border-[#84B3CE]/35 flex items-center justify-between">
            <span className="text-xs text-[#16587B]/75">Join our vetted investor and founder network.</span>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#5B0015] text-[#fcfaf5] rounded-md hover:bg-[#43000f]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
