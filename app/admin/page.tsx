import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BookingStatusBadge from '@/components/BookingStatusBadge';
import AdminBookingActionButtons from '@/components/AdminBookingActionButtons';
import {
  Car,
  CalendarCheck,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    redirect('/login');
  }

  // Aggregate statistics
  const totalVehicles = await prisma.vehicle.count();
  const availableVehicles = await prisma.vehicle.count({ where: { availability: true } });
  const totalBookings = await prisma.booking.count();
  const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } });

  // Recent 5 bookings
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    include: {
      user: { select: { username: true } },
      vehicle: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            <span>Administrative Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">System Overview</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Monitor vehicle fleet metrics, approve bookings, and manage availability in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/vehicles"
            className="inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            <Car className="w-4 h-4 text-[#22D3EE]" />
            <span>Manage Vehicles</span>
          </Link>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 bg-[#1C2541] hover:bg-[#1C2541]/80 text-white border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Manage Bookings</span>
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Vehicles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Total Vehicles
            </span>
            <span className="text-3xl font-black text-[#0B132B] mt-1 block">
              {totalVehicles}
            </span>
            <span className="text-xs text-[#64748B] mt-1 block">In fleet inventory</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
            <Car className="w-6 h-6" />
          </div>
        </div>

        {/* Available Vehicles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Available Vehicles
            </span>
            <span className="text-3xl font-black text-[#10B981] mt-1 block">
              {availableVehicles}
            </span>
            <span className="text-xs text-[#64748B] mt-1 block">Ready for customer rent</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Total Bookings
            </span>
            <span className="text-3xl font-black text-[#0B132B] mt-1 block">
              {totalBookings}
            </span>
            <span className="text-xs text-[#64748B] mt-1 block">All-time reservations</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Pending Bookings
            </span>
            <span className="text-3xl font-black text-[#F59E0B] mt-1 block">
              {pendingBookings}
            </span>
            <span className="text-xs text-[#64748B] mt-1 block">Requires admin review</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Bookings Queue */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0B132B]">Recent Customer Bookings</h2>
            <p className="text-xs text-[#64748B]">Quickly review and approve incoming booking requests</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1"
          >
            <span>View all in detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Rental Window</th>
                <th className="py-3.5 px-4">Total (BDT)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-6 font-semibold text-[#0B132B] capitalize">
                    {b.user.username}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#0B132B]">{b.vehicle.name}</div>
                    <div className="text-xs text-[#64748B]">{b.vehicle.type}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#64748B]">
                    {new Date(b.startDate).toLocaleDateString()} &rarr; {new Date(b.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#2563EB]">
                    ৳{b.totalCost.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <BookingStatusBadge status={b.status} />
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <AdminBookingActionButtons bookingId={b.id} currentStatus={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
