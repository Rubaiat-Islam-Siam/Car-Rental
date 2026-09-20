import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/app/actions';
import { ShieldCheck, LogOut, LogIn, CalendarCheck, LayoutDashboard } from 'lucide-react';
import MobileNav from '@/components/MobileNav';

export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="bg-[#092328] text-white shadow-md sticky top-0 z-50 border-b border-[#12544F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#12544F]/60 border border-[#2A835F]/50 flex items-center justify-center p-1 shadow-lg group-hover:border-[#8BBB92] transition overflow-hidden">
              <img
                src="/half-shade-muscular-car-3814ld.png"
                alt="RideNest Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#8BBB92] transition">
                Ride<span className="text-[#8BBB92] font-extrabold">Nest</span>
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 font-medium text-sm">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition"
            >
              Home
            </Link>
            <Link
              href="/vehicles"
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition"
            >
              Browse Vehicles
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition"
            >
              Contact
            </Link>

            {session?.role === 'CUSTOMER' && (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition flex items-center space-x-1.5"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#8BBB92]" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/bookings"
                  className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition flex items-center space-x-1.5"
                >
                  <CalendarCheck className="w-4 h-4 text-[#8BBB92]" />
                  <span>My Bookings</span>
                </Link>
              </>
            )}

            {session?.role === 'ADMIN' && (
              <>
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-[#12544F] transition flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Admin Dashboard</span>
                </Link>
                <Link
                  href="/admin/vehicles"
                  className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition"
                >
                  Manage Vehicles
                </Link>
                <Link
                  href="/admin/bookings"
                  className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#12544F] transition"
                >
                  Manage Bookings
                </Link>
              </>
            )}
          </nav>

          {/* Right Area: User Controls & Mobile Nav Toggle */}
          <div className="flex items-center space-x-3">
            <MobileNav session={session} />
            {session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-[#12544F] border border-[#2A835F]/50 rounded-full px-3 py-1.5">
                  <div className={`w-2 h-2 rounded-full ${session.role === 'ADMIN' ? 'bg-amber-400' : 'bg-[#8BBB92]'} animate-pulse`} />
                  <span className="text-xs font-semibold text-white capitalize">
                    {session.username}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                    session.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-[#2A835F]/30 text-[#8BBB92] border border-[#8BBB92]/40'
                  }`}>
                    {session.role}
                  </span>
                </div>

                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 border border-rose-900/50 transition cursor-pointer"
                    title="Sign out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="flex items-center space-x-1.5 text-slate-200 hover:text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#12544F] transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-1.5 bg-[#2A835F] hover:bg-[#20694B] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
