import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RentalBookingForm from './RentalBookingForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RentVehiclePage({ params }: PageProps) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

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
      <div>
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0B132B] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {vehicle.name} details</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl mx-auto">
        {/* Banner Header */}
        <div className="bg-[#0B132B] px-6 sm:px-8 py-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">
              Booking Confirmation
            </span>
            <h1 className="text-2xl font-black mt-0.5 text-white">Rent {vehicle.name}</h1>
            <p className="text-xs text-[#64748B] mt-1">
              Select your rental duration to calculate total costs in Bangladeshi Taka (৳).
            </p>
          </div>
          <div className="bg-[#1C2541] border border-slate-700 px-4 py-2 rounded-2xl text-right shrink-0">
            <span className="text-[11px] text-[#64748B] block font-medium">Daily Rate</span>
            <span className="text-xl font-extrabold text-white">৳{vehicle.pricePerDay.toLocaleString()}</span>
          </div>
        </div>

        {/* Booking Form and Preview */}
        <RentalBookingForm vehicle={vehicle} customerName={session.username} />
      </div>
    </div>
  );
}
