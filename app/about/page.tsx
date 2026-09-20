import Link from 'next/link';
import { ShieldCheck, Car, Clock, Award, Users, CheckCircle2, ArrowRight, Zap, HeartHandshake, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Us | RideNest Vehicle Rentals',
  description: 'Learn about RideNest, our premium vehicle rental fleet, and our commitment to seamless mobility.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#092328] via-[#12544F] to-[#092328] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#2A835F]/30">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#8BBB92]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12544F]/80 border border-[#8BBB92]/30 text-xs font-semibold uppercase tracking-wider text-[#8BBB92]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About RideNest</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Empowering Seamless Mobility & Premium Vehicle Rentals
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              RideNest is built to redefine standard car rentals into an effortless, transparent, and luxury experience. Whether you need an elegant sedan for business or a spacious SUV for weekend family getaways, we ensure top-tier safety and convenience.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/vehicles"
                className="px-6 py-3 rounded-xl bg-[#2A835F] hover:bg-[#20694B] text-white font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2 text-sm"
              >
                <span>Browse Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition text-sm"
              >
                Contact Our Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics / Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2 hover:border-[#2A835F]/40 transition">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#092328]">500+</div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">Happy Renters</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2 hover:border-[#2A835F]/40 transition">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#092328]">100%</div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">Verified Vehicles</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2 hover:border-[#2A835F]/40 transition">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#092328]">24/7</div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">Instant Support</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2 hover:border-[#2A835F]/40 transition">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#092328]">4.9 / 5</div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">User Rating</div>
          </div>
        </div>
      </section>

      {/* Core Values & Offerings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092328]">Why Renters Choose RideNest</h2>
          <p className="text-sm text-slate-600">
            We prioritize safety, transparent pricing, and instant online bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#12544F] text-[#8BBB92] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#092328]">Instant Booking Confirmation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No lengthy paperwork or manual waiting periods. Choose your pickup dates, review total costs transparently, and confirm your reservation in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#12544F] text-[#8BBB92] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#092328]">Safety & Quality Assured</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every vehicle undergoes routine multi-point mechanical inspections, sanitization, and maintenance to ensure a safe and smooth journey every time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#12544F] text-[#8BBB92] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#092328]">Clear & Honest Pricing</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              What you see is what you pay. No unexpected surcharges, hidden maintenance fees, or surprise deposits at pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Software Process Model Context Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#092328]/5 via-[#12544F]/10 to-[#092328]/5 border border-[#2A835F]/30 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#092328] text-[#8BBB92] rounded-2xl shadow-md shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A835F] bg-[#2A835F]/10 px-3 py-1 rounded-md inline-block">
                Academic Project Information
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092328]">
                Software Engineering Sessional (CSE 3206) – Group #04
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
                This project represents a working <strong>Minimum Viable Product (MVP)</strong> developed following the <strong>Prototype Model</strong> software engineering methodology. Early prototype iterations allow continuous user evaluation, enabling us to refine booking logic, role-based dashboards, administrative vehicle management, and validation before scaling.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#092328]">
                  <CheckCircle2 className="w-4 h-4 text-[#2A835F]" />
                  <span>Customer & Admin Role Management</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#092328]">
                  <CheckCircle2 className="w-4 h-4 text-[#2A835F]" />
                  <span>Real-time Date Range & Cost Calculations</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#092328]">
                  <CheckCircle2 className="w-4 h-4 text-[#2A835F]" />
                  <span>Prisma ORM & SQLite Database Persistence</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#092328]">
                  <CheckCircle2 className="w-4 h-4 text-[#2A835F]" />
                  <span>Interactive Search & Fleet Filtering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
