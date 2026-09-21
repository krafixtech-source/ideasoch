import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Ideasoch — Where Ideas Meet Opportunity',
  description:
    'Ideasoch connects ambitious founders with accredited investors, strategic businesses, and career-defining opportunities through focused, curated discovery.',
  keywords: [
    'Ideasoch',
    'Startup funding',
    'Angel investors',
    'Venture capital',
    'Business opportunities',
    'Co-founder search',
    'India startups',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#fcfaf5] antialiased">
      <body className="min-h-full flex flex-col bg-[#fcfaf5] text-[#16587B] selection:bg-[#5B0015] selection:text-[#fcfaf5]">
        <AppProvider>
          <Navbar />
          <main className="flex-1 bg-[#fcfaf5]">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
