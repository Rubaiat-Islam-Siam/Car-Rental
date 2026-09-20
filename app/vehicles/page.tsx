import { prisma } from '@/lib/prisma';
import VehicleCard from '@/components/VehicleCard';
import Link from 'next/link';
import { Car, Filter } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{
    type?: string;
    available?: string;
    search?: string;
  }>;
}

export default async function VehiclesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedType = params.type || 'all';
  const availableOnly = params.available === 'true';
  const searchTerm = params.search?.toLowerCase().trim() || '';

  const where: any = {};
  if (selectedType !== 'all') {
    where.type = selectedType;
  }
  if (availableOnly) {
    where.availability = true;
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: { id: 'asc' },
  });

  const filteredVehicles = searchTerm
    ? vehicles.filter(
        (v) =>
          v.name.toLowerCase().includes(searchTerm) ||
          v.model.toLowerCase().includes(searchTerm) ||
          v.type.toLowerCase().includes(searchTerm)
      )
    : vehicles;

  const vehicleTypes = ['all', 'Sedan', 'SUV', 'Van'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B132B] tracking-tight">
            Vehicle Fleet Catalog
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Browse reliable sedans, SUVs, and passenger vans with transparent daily rates.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#2563EB]" /> Filter:
          </span>
          {vehicleTypes.map((type) => {
            const isActive = selectedType === type;
            const queryUrl = new URLSearchParams();
            if (type !== 'all') queryUrl.set('type', type);
            if (availableOnly) queryUrl.set('available', 'true');
            if (searchTerm) queryUrl.set('search', searchTerm);

            return (
              <Link
                key={type}
                href={`/vehicles?${queryUrl.toString()}`}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'bg-[#F8FAFC] text-[#0B132B] hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </Link>
            );
          })}
        </div>

        {/* Availability Toggle & Search */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Link
            href={`/vehicles?${new URLSearchParams({
              ...(selectedType !== 'all' ? { type: selectedType } : {}),
              ...(availableOnly ? {} : { available: 'true' }),
              ...(searchTerm ? { search: searchTerm } : {}),
            }).toString()}`}
            className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition ${
              availableOnly
                ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                : 'bg-[#F8FAFC] border-slate-200 text-[#64748B] hover:bg-slate-100'
            }`}
          >
            {availableOnly ? '✓ Available Only' : 'Show All Availability'}
          </Link>
        </div>
      </div>

      {/* Vehicle Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
          <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0B132B]">No vehicles found</h3>
          <p className="text-xs text-[#64748B] mt-1">
            Try adjusting your category filter or availability criteria.
          </p>
          <Link
            href="/vehicles"
            className="inline-block mt-4 text-xs font-semibold text-[#2563EB] hover:underline"
          >
            Reset all filters
          </Link>
        </div>
      )}
    </div>
  );
}
