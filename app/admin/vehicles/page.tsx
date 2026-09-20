import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import AdminVehicleManager from '@/components/AdminVehicleManager';

export default async function AdminVehiclesPage() {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    redirect('/login');
  }

  const vehicles = await prisma.vehicle.findMany({
    orderBy: { id: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <AdminVehicleManager initialVehicles={vehicles} />
    </div>
  );
}
