import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#092328] via-[#12544F] to-[#092328] text-white relative overflow-hidden w-full">
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#8BBB92]/15 blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12544F] border border-[#2A835F]/50 text-[#8BBB92] text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#8BBB92]" />
          <span>Special Offer: Free GPS &amp; Roadside Assistance</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Ready to hit the road?
        </h2>
        <p className="text-slate-200 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Unlock your next adventure with RideNest. Explore our premium selection of vehicles, enjoy transparent rates, and experience hassle-free rentals today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/vehicles">
            <Button size="lg" className="w-full sm:w-auto px-8 gap-2 font-semibold bg-[#2A835F] hover:bg-[#20694B] text-white shadow-lg shadow-[#2A835F]/30">
              Browse Vehicles <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-[#12544F]/80 text-white border-slate-700 hover:bg-[#12544F]"
            >
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
