import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';
import Navbar from '@/components/navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aura Pilates | Premium Booking',
  description: 'Premium Pilates Booking SaaS Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-[#3A3331] bg-[#FCFAFA] min-h-screen flex flex-col antialiased selection:bg-[#D2B4A7]/30 selection:text-[#3A3331]" suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 flex flex-col relative w-full h-full">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}

