'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Car, Info, PhoneCall, LayoutDashboard, CalendarCheck, ShieldCheck } from 'lucide-react';
import { SessionUser } from '@/lib/auth';

interface MobileNavProps {
  session: SessionUser | null;
}

export default function MobileNav({ session }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] focus:outline-none transition"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#092328] border-b border-[#12544F] shadow-xl py-4 px-4 space-y-2 z-50">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
          >
            <Home className="w-4 h-4 text-[#8BBB92]" />
            <span>Home</span>
          </Link>

          <Link
            href="/vehicles"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
          >
            <Car className="w-4 h-4 text-[#8BBB92]" />
            <span>Browse Vehicles</span>
          </Link>

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
          >
            <Info className="w-4 h-4 text-[#8BBB92]" />
            <span>About</span>
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
          >
            <PhoneCall className="w-4 h-4 text-[#8BBB92]" />
            <span>Contact</span>
          </Link>

          {session?.role === 'CUSTOMER' && (
            <>
              <div className="pt-2 border-t border-[#12544F]/60" />
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
              >
                <LayoutDashboard className="w-4 h-4 text-[#8BBB92]" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/bookings"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
              >
                <CalendarCheck className="w-4 h-4 text-[#8BBB92]" />
                <span>My Bookings</span>
              </Link>
            </>
          )}

          {session?.role === 'ADMIN' && (
            <>
              <div className="pt-2 border-t border-[#12544F]/60" />
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-[#12544F] transition text-sm font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Dashboard</span>
              </Link>
              <Link
                href="/admin/vehicles"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
              >
                <span>Manage Vehicles</span>
              </Link>
              <Link
                href="/admin/bookings"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition text-sm font-medium"
              >
                <span>Manage Bookings</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
