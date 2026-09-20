import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const vehicleId = parseInt(id, 10);

  if (isNaN(vehicleId)) {
    notFound();
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
      {/* Back navigation */}
      <div>
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0B132B] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet Catalog</span>
        </Link>
      </div>

      {/* Main Vehicle Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Image */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px] bg-[#0B132B]">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#0B132B]/90 backdrop-blur-md text-[#22D3EE] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
              {vehicle.type}
            </span>
          </div>
        </div>

        {/* Right: Specs & Rent Action */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header & Status */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  {vehicle.model}
                </span>
                {vehicle.availability ? (
                  <span className="inline-flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#10B981]/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-[#EF4444]/10 text-[#EF4444] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#EF4444]/20">
                    <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                    Currently Booked
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] leading-tight">
                {vehicle.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#64748B]">Daily Rental Rate</span>
                <div className="text-2xl font-black text-[#2563EB]">
                  ৳{vehicle.pricePerDay.toLocaleString()}
                  <span className="text-xs font-normal text-[#64748B] ml-1">/ day</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-medium text-[#64748B]">Currency</span>
                <div className="text-xs font-bold text-[#0B132B]">BDT (৳)</div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <span className="text-[11px] text-[#64748B] font-semibold block uppercase">Year</span>
                <span className="text-sm font-bold text-[#0B132B]">{vehicle.year}</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <span className="text-[11px] text-[#64748B] font-semibold block uppercase">Category</span>
                <span className="text-sm font-bold text-[#0B132B]">{vehicle.type}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
                Overview
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {vehicle.description}
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-slate-100">
            {vehicle.availability ? (
              <Link
                href={`/vehicles/${vehicle.id}/rent`}
                className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-[#2563EB]/20 transition transform hover:-translate-y-0.5"
              >
                <span>Proceed to Rent</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="text-center">
                <button
                  disabled
                  className="w-full py-3.5 px-6 bg-slate-200 text-[#64748B] font-bold rounded-2xl cursor-not-allowed text-sm"
                >
                  Currently Unavailable
                </button>
                <p className="text-[11px] text-[#64748B] mt-2">
                  This vehicle is currently assigned to an active booking.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
