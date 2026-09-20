import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import VehicleCard from '@/components/VehicleCard';
import BookingStatusBadge from '@/components/BookingStatusBadge';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default async function CustomerDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch customer bookings
  const myBookings = await prisma.booking.findMany({
    where: { userId: session.id },
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  const totalBookings = await prisma.booking.count({
    where: { userId: session.id },
  });

  const pendingBookings = await prisma.booking.count({
    where: { userId: session.id, status: 'PENDING' },
  });

  const approvedBookings = await prisma.booking.count({
    where: { userId: session.id, status: 'APPROVED' },
  });

  // Available vehicles
  const availableVehicles = await prisma.vehicle.findMany({
    where: { availability: true },
    take: 6,
    orderBy: { id: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#092328] via-[#12544F] to-[#092328] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#2A835F]/30">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8BBB92]">
            Customer Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
            Hello, <span className="capitalize text-[#8BBB92]">{session.username}</span> 👋
          </h1>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Welcome to your vehicle rental dashboard. Explore the fleet, reserve a car with daily calculations, or check the status of your existing rental requests.
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="mt-8 pt-6 border-t border-[#12544F] grid grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left">
          <div className="bg-[#092328]/70 p-4 rounded-2xl border border-[#12544F]">
            <div className="text-2xl sm:text-3xl font-black text-white">{totalBookings}</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Total Bookings</div>
          </div>
          <div className="bg-[#092328]/70 p-4 rounded-2xl border border-[#12544F]">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{pendingBookings}</div>
            <div className="text-xs text-amber-300/80 font-medium mt-0.5">Pending Approval</div>
          </div>
          <div className="bg-[#092328]/70 p-4 rounded-2xl border border-[#12544F]">
            <div className="text-2xl sm:text-3xl font-black text-[#8BBB92]">{approvedBookings}</div>
            <div className="text-xs text-[#8BBB92]/80 font-medium mt-0.5">Approved Trips</div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Glance */}
      {myBookings.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#092328]">Recent Booking Requests</h2>
              <p className="text-xs text-[#12544F]">Track your most recent reservations</p>
            </div>
            <Link
              href="/bookings"
              className="text-xs font-semibold text-[#2A835F] hover:text-[#20694B] inline-flex items-center gap-1"
            >
              <span>View all bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {myBookings.map((b) => (
              <div key={b.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={b.vehicle.image}
                    alt={b.vehicle.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#092328]">{b.vehicle.name}</h4>
                    <p className="text-xs text-[#12544F]/80">
                      {new Date(b.startDate).toLocaleDateString()} &rarr; {new Date(b.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-extrabold text-[#2A835F]">৳{b.totalCost.toLocaleString()}</span>
                  <BookingStatusBadge status={b.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Available Vehicles Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#092328] tracking-tight">Available Vehicles for Rent</h2>
            <p className="text-xs sm:text-sm text-[#12544F]/80 mt-0.5">
              Select any vehicle below to inspect details or calculate your rental price
            </p>
          </div>
          <Link
            href="/vehicles"
            className="text-xs sm:text-sm font-semibold text-[#2A835F] hover:text-[#20694B] inline-flex items-center gap-1 group"
          >
            <span>All vehicles catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </div>
  );
}
