import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#12544F] bg-[#092328] text-slate-300 w-full">
      {/* Top Banner */}
      <div className="border-b border-[#12544F] bg-[#12544F]/70 py-3 px-4 text-center text-xs text-slate-300">
        <span className="font-semibold text-[#8BBB92]">CSE 3206 – Software Engineering Sessional</span>{" "}
        • Lab 2: Software Process Models, Requirement Analysis &amp; MVP Development •{" "}
        <span className="text-white font-semibold">Group #04 (Section A)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#12544F]/60 border border-[#2A835F]/50 flex items-center justify-center p-1 shadow-md overflow-hidden">
                <img
                  src="/half-shade-muscular-car-3814ld.png"
                  alt="RideNest Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Ride<span className="text-[#8BBB92]">Nest</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
              Your Journey. Your Vehicle. Your Freedom. A modern, transparent, and seamless vehicle rental platform designed with modern engineering standards.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#8BBB92]" />
              <span>Prototype Model MVP Implementation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#8BBB92] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-[#8BBB92] transition-colors">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8BBB92] transition-colors">
                  About RideNest
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8BBB92] transition-colors">
                  Support &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Demo Credentials */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Demo Access
            </h4>
            <div className="space-y-2 text-xs bg-[#12544F]/50 p-3 rounded-xl border border-[#2A835F]/40 text-slate-200">
              <div>
                <span className="text-[#8BBB92] font-semibold block">Customer Account</span>
                <code>customer@ridenest.com</code>
                <span className="block text-slate-300">pw: password123</span>
              </div>
              <div className="pt-2 border-t border-[#2A835F]/40">
                <span className="text-amber-300 font-semibold block">Admin Console</span>
                <code>admin@ridenest.com</code>
                <span className="block text-slate-300">pw: password123</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Hub Locations
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8BBB92] shrink-0" />
                <span className="text-xs text-slate-300">Downtown HQ &amp; Airport Hub</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8BBB92] shrink-0" />
                <span className="text-xs text-slate-300">+880 1700-000000 (24/7)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8BBB92] shrink-0" />
                <span className="text-xs text-slate-300">support@ridenest.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-[#12544F] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RideNest Technologies. Built for Academic Demonstration.</p>
          <div className="flex items-center gap-4">
            <span>Branch: Group #04</span>
            <span>•</span>
            <span>Prototype Model</span>
            <span>•</span>
            <span>Next.js + Prisma + SQLite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
