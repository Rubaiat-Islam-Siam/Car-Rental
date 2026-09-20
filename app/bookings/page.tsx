import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BookingStatusBadge from '@/components/BookingStatusBadge';
import { Car, ArrowRight, PlusCircle } from 'lucide-react';

export default async function MyBookingsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.id },
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B132B] tracking-tight">
            My Rental Bookings
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Review status updates and history for your vehicle reservations.
          </p>
        </div>

        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Reservation</span>
        </Link>
      </div>

      {/* Bookings Table / Cards */}
      {bookings.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-4 px-6">Vehicle</th>
                  <th className="py-4 px-4">Start Date</th>
                  <th className="py-4 px-4">End Date</th>
                  <th className="py-4 px-4">Duration</th>
                  <th className="py-4 px-4">Total Cost</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {bookings.map((b) => {
                  const start = new Date(b.startDate);
                  const end = new Date(b.endDate);
                  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition">
                      {/* Vehicle Cell */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.vehicle.image}
                            alt={b.vehicle.name}
                            className="w-14 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <Link
                              href={`/vehicles/${b.vehicle.id}`}
                              className="font-bold text-[#0B132B] hover:text-[#2563EB] transition"
                            >
                              {b.vehicle.name}
                            </Link>
                            <span className="block text-xs text-[#64748B] font-medium">
                              {b.vehicle.model} &bull; {b.vehicle.type}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Start Date */}
                      <td className="py-4 px-4 font-medium text-[#111827]">
                        {start.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* End Date */}
                      <td className="py-4 px-4 font-medium text-[#111827]">
                        {end.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4">
                        <span className="inline-block bg-[#F8FAFC] text-[#0B132B] border border-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                          {days} {days === 1 ? 'Day' : 'Days'}
                        </span>
                      </td>

                      {/* Total Cost */}
                      <td className="py-4 px-4">
                        <span className="font-extrabold text-[#2563EB] text-base">
                          ৳{b.totalCost.toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-right">
                        <BookingStatusBadge status={b.status} />
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
          <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0B132B]">No bookings yet</h3>
          <p className="text-xs text-[#64748B] mt-1">
            You haven't requested any vehicle rentals yet.
          </p>
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <span>Browse Vehicles to Rent</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
