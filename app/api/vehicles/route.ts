import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const availableOnly = searchParams.get('available') === 'true';

    const where: any = {};
    if (type && type !== 'all') {
      where.type = type;
    }
    if (availableOnly) {
      where.availability = true;
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { id: 'desc' },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const vehicle = await prisma.vehicle.create({
      data: {
        name: body.name,
        type: body.type,
        model: body.model,
        year: Number(body.year),
        pricePerDay: Number(body.pricePerDay),
        availability: body.availability ?? true,
        image: body.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
        description: body.description || '',
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
