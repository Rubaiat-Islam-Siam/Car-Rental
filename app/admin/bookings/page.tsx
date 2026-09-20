import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BookingStatusBadge from '@/components/BookingStatusBadge';
import AdminBookingActionButtons from '@/components/AdminBookingActionButtons';
import { CalendarCheck, Filter, ArrowLeft } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    redirect('/login');
  }

  const params = await searchParams;
  const filterStatus = params.status?.toUpperCase() || 'ALL';

  const where: any = {};
  if (filterStatus !== 'ALL') {
    where.status = filterStatus;
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      user: { select: { id: true, username: true } },
      vehicle: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const statuses = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin"
              className="text-xs font-semibold text-[#64748B] hover:text-[#0B132B] inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B132B] tracking-tight">
            Booking Management
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Review customer reservations, approve schedules, or reject conflicts.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-fit">
        <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider px-3 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-[#2563EB]" /> Status:
        </span>
        {statuses.map((st) => {
          const isActive = filterStatus === st;
          return (
            <Link
              key={st}
              href={st === 'ALL' ? '/admin/bookings' : `/admin/bookings?status=${st.toLowerCase()}`}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition ${
                isActive
                  ? 'bg-[#0B132B] text-white shadow-sm'
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {st === 'ALL' ? 'All Bookings' : st}
            </Link>
          );
        })}
      </div>

      {/* Bookings Table */}
      {bookings.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-4 px-6">ID & Customer</th>
                  <th className="py-4 px-4">Vehicle Reserved</th>
                  <th className="py-4 px-4">Rental Window</th>
                  <th className="py-4 px-4">Duration</th>
                  <th className="py-4 px-4">Total Price (BDT)</th>
                  <th className="py-4 px-4">Current Status</th>
                  <th className="py-4 px-6 text-right">Approval Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {bookings.map((b) => {
                  const start = new Date(b.startDate);
                  const end = new Date(b.endDate);
                  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition">
                      {/* Customer */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0B132B] capitalize">
                          {b.user.username}
                        </div>
                        <div className="text-xs text-[#64748B] font-mono">
                          Ref: #{b.id.toString().padStart(4, '0')}
                        </div>
                      </td>

                      {/* Vehicle */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={b.vehicle.image}
                            alt={b.vehicle.name}
                            className="w-10 h-8 rounded-lg object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-semibold text-[#0B132B] block">
                              {b.vehicle.name}
                            </span>
                            <span className="text-xs text-[#64748B]">
                              {b.vehicle.model} &bull; {b.vehicle.type}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Dates */}
                      <td className="py-4 px-4 font-medium text-[#64748B] text-xs">
                        <div>
                          <strong>Pickup:</strong> {start.toLocaleDateString('en-GB')}
                        </div>
                        <div>
                          <strong>Return:</strong> {end.toLocaleDateString('en-GB')}
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4">
                        <span className="inline-block bg-[#F8FAFC] text-[#0B132B] border border-slate-200 text-xs font-semibold px-2 py-0.5 rounded-md">
                          {days} {days === 1 ? 'Day' : 'Days'}
                        </span>
                      </td>

                      {/* Total Cost */}
                      <td className="py-4 px-4 font-extrabold text-[#2563EB]">
                        ৳{b.totalCost.toLocaleString()}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <BookingStatusBadge status={b.status} />
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <AdminBookingActionButtons
                          bookingId={b.id}
                          currentStatus={b.status}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0B132B]">No bookings match criteria</h3>
          <p className="text-xs text-[#64748B] mt-1">
            There are currently no bookings with the selected status filter.
          </p>
          <Link
            href="/admin/bookings"
            className="inline-block mt-4 text-xs font-semibold text-[#2563EB] hover:underline"
          >
            Show all bookings
          </Link>
        </div>
      )}
    </div>
  );
}
