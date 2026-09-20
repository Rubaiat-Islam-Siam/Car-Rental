import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import VehicleCard from '@/components/VehicleCard';
import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { CtaBanner } from '@/components/home/cta-banner';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const featuredVehicles = await prisma.vehicle.findMany({
    take: 3,
    orderBy: { id: 'asc' },
  });

  return (
    <div className="w-full space-y-0">
      {/* Hero Section (Full Width with Quick Search Bar) */}
      <Hero />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Prototype Model Card */}
        <section className="bg-gradient-to-r from-[#092328]/5 via-[#12544F]/10 to-[#092328]/5 border border-[#2A835F]/20 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#092328] text-[#8BBB92] rounded-xl shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-[#092328]">
                Software Process Model: Prototype Model (Group #04)
              </h2>
              <p className="text-sm text-[#12544F] leading-relaxed">
                In accordance with the <strong>Prototype Model</strong>, this working MVP demonstrates end-to-end customer and administrative rental workflows. Early feedback gathered from classroom testing allows rapid iteration and refinement of booking rules, cost calculations, and fleet management before building the full-scale system.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Vehicles Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#092328] tracking-tight">
                Featured Fleet
              </h2>
              <p className="text-xs sm:text-sm text-[#12544F]/80 mt-0.5">
                Popular sedans and SUVs available for immediate reservation
              </p>
            </div>
            <Link
              href="/vehicles"
              className="text-xs sm:text-sm font-semibold text-[#2A835F] hover:text-[#20694B] inline-flex items-center gap-1 group"
            >
              <span>View all vehicles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>
      </div>

      {/* How It Works (Full Width) */}
      <HowItWorks />

      {/* Why Choose Us (Full Width) */}
      <WhyChooseUs />

      {/* CTA Banner (Full Width) */}
      <CtaBanner />
    </div>
  );
}
