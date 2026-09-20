import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    let bookings;
    if (session.role === 'ADMIN' && all) {
      bookings = await prisma.booking.findMany({
        include: {
          user: { select: { id: true, username: true } },
          vehicle: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      bookings = await prisma.booking.findMany({
        where: { userId: session.id },
        include: {
          vehicle: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { vehicleId, startDate, endDate } = body;

    if (!vehicleId || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return NextResponse.json({ error: 'End date cannot be before start date' }, { status: 400 });
    }

    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const vehicle = await prisma.vehicle.findUnique({ where: { id: Number(vehicleId) } });

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    if (!vehicle.availability) {
      return NextResponse.json({ error: 'Vehicle is not available' }, { status: 400 });
    }

    const totalCost = days * vehicle.pricePerDay;

    const booking = await prisma.booking.create({
      data: {
        userId: session.id,
        vehicleId: vehicle.id,
        startDate: start,
        endDate: end,
        totalCost,
        status: 'PENDING',
      },
      include: {
        vehicle: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
