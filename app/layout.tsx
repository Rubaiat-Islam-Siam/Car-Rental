import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/footer/footer';

export const metadata: Metadata = {
  title: 'RideNest | CSE 3206 Vehicle Rental Platform',
  description: 'University Lab MVP for Vehicle Rental System built with Next.js, Prisma, and SQLite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50 text-slate-900">
      <body className="min-h-full flex flex-col font-sans antialiased selection:bg-[#F2842F] selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
