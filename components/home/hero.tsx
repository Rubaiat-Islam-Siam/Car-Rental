"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Sparkles, Star, MapPin, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [pickupLocation, setPickupLocation] = useState("Downtown Headquarters (Main Branch)");
  const [pickupDate, setPickupDate] = useState("2026-09-19");
  const [returnDate, setReturnDate] = useState("2026-09-22");

  return (
    <div className="relative w-full overflow-hidden bg-[#092328] text-white pt-12 pb-24 md:pt-16 md:pb-28">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#12544F]/40 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#8BBB92]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#092328]/95 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Tag Badge with Muscular Car Logo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12544F]/80 border border-[#2A835F]/40 text-[#8BBB92] text-xs font-semibold shadow-inner">
              <img
                src="/half-shade-muscular-car-3814ld.png"
                alt="RideNest Muscular Car Logo"
                className="w-5 h-5 object-contain"
              />
              <span>Modern Vehicle Rental Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Find the Perfect Ride for Every{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BBB92] via-[#2A835F] to-[#8BBB92]">
                Journey
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Rent reliable cars, SUVs and premium vehicles with a simple and transparent booking experience. Clear pricing, instant confirmation, and 24/7 dedicated support.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/vehicles">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-7 bg-[#2A835F] hover:bg-[#20694B] text-white shadow-lg shadow-[#2A835F]/30">
                  Explore Vehicles <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-[#12544F]/80 text-slate-200 border-[#2A835F]/40 hover:bg-[#12544F] hover:text-white"
                >
                  How It Works
                </Button>
              </a>
            </div>

            {/* Trust Proof */}
            <div className="pt-6 border-t border-[#12544F] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8BBB92]" />
                <span>100% Insured &amp; Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#8BBB92]" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-slate-200">4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#12544F] shadow-2xl bg-[#12544F]/40 backdrop-blur-sm group">
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
                alt="RideNest Premium Sedan"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092328]/95 via-transparent to-transparent" />

              {/* Floating Badge 1 */}
              <div className="absolute bottom-4 left-4 bg-[#092328]/95 backdrop-blur-md border border-[#12544F] p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <img
                  src="/half-shade-muscular-car-3814ld.png"
                  alt="Muscular Car Icon"
                  className="w-8 h-8 object-contain shrink-0"
                />
                <div>
                  <p className="text-[11px] text-[#8BBB92] font-medium">Featured Premium</p>
                  <p className="text-sm font-bold text-white">BMW 3 Series (330i)</p>
                  <p className="text-xs font-semibold text-[#8BBB92] mt-0.5">৳6,500/day</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute top-4 right-4 bg-[#2A835F] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8BBB92]" />
                <span>Top Pick</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Quick Search Bar (White Surface) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 text-[#092328]"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/vehicles?location=${encodeURIComponent(pickupLocation)}`;
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
          >
            {/* Pickup Location */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#12544F]">
                <MapPin className="w-3.5 h-3.5 text-[#2A835F]" />
                Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#092328] focus:outline-none focus:ring-2 focus:ring-[#2A835F] transition"
              >
                <option value="Downtown Headquarters (Main Branch)">Downtown Headquarters (Main Branch)</option>
                <option value="Dhaka Airport Hub (Terminal 2)">Dhaka Airport Hub (Terminal 2)</option>
                <option value="Gulshan 2 Rental Center">Gulshan 2 Rental Center</option>
                <option value="Uttara Sector 7 Branch">Uttara Sector 7 Branch</option>
                <option value="Dhanmondi Road 27 Hub">Dhanmondi Road 27 Hub</option>
              </select>
            </div>

            {/* Pickup Date */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#12544F]">
                <Calendar className="w-3.5 h-3.5 text-[#2A835F]" />
                Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#092328] focus:outline-none focus:ring-2 focus:ring-[#2A835F] transition"
              />
            </div>

            {/* Return Date */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#12544F]">
                <Calendar className="w-3.5 h-3.5 text-[#2A835F]" />
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#092328] focus:outline-none focus:ring-2 focus:ring-[#2A835F] transition"
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-1 flex items-end justify-center md:justify-end pt-2 md:pt-5">
              <button
                type="submit"
                className="w-full h-11 bg-[#2A835F] hover:bg-[#20694B] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#2A835F]/30 transition transform hover:scale-[1.02] cursor-pointer"
                title="Search Available Vehicles"
              >
                <Search className="w-4 h-4" />
                <span className="md:hidden font-bold">Search</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
