'use server';

import { prisma } from '@/lib/prisma';
import { authenticate, clearSession, getSession, setSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Please enter both username and password.' };
  }

  const result = await authenticate(username, password);
  if (!result.success || !result.user) {
    return { error: result.error || 'Invalid credentials.' };
  }

  if (result.user.role === 'ADMIN') {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
}

export async function quickLoginAction(role: 'customer' | 'admin') {
  const username = role === 'admin' ? 'admin' : 'customer';
  const password = role === 'admin' ? 'admin123' : 'customer123';
  const result = await authenticate(username, password);
  
  if (result.success && result.user) {
    if (result.user.role === 'ADMIN') {
      redirect('/admin');
    } else {
      redirect('/dashboard');
    }
  }
}

export async function logoutAction() {
  await clearSession();
  redirect('/login');
}

export async function registerAction(prevState: any, formData: FormData) {
  const username = (formData.get('username') as string)?.trim().toLowerCase();
  const password = (formData.get('password') as string)?.trim();
  const confirmPassword = (formData.get('confirmPassword') as string)?.trim();

  if (!username || !password) {
    return { error: 'Please fill in all required fields.' };
  }

  if (username.length < 3) {
    return { error: 'Username must be at least 3 characters.' };
  }

  if (password.length < 4) {
    return { error: 'Password must be at least 4 characters.' };
  }

  if (confirmPassword && password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    return { error: 'Username already exists. Please choose a different one.' };
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      role: 'CUSTOMER',
    },
  });

  await setSession({
    id: newUser.id,
    username: newUser.username,
    role: 'CUSTOMER',
  });

  redirect('/dashboard');
}

export type ActionResponse = {
  success?: boolean;
  error?: string;
};

// ================= VEHICLE ACTIONS ================= //

export async function createVehicleAction(formData: FormData): Promise<ActionResponse> {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    return { error: 'Unauthorized: Only administrators can add vehicles.' };
  }

  const name = (formData.get('name') as string)?.trim();
  const type = (formData.get('type') as string)?.trim();
  const model = (formData.get('model') as string)?.trim();
  const year = parseInt(formData.get('year') as string, 10);
  const pricePerDay = parseFloat(formData.get('pricePerDay') as string);
  const availability = formData.get('availability') === 'true';
  const image = (formData.get('image') as string)?.trim();
  const description = (formData.get('description') as string)?.trim();

  if (!name || !type || !model || isNaN(year) || isNaN(pricePerDay)) {
    return { error: 'Please provide all required vehicle details.' };
  }

  await prisma.vehicle.create({
    data: {
      name,
      type,
      model,
      year,
      pricePerDay,
      availability,
      image: image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      description: description || `${year} ${name} ${model}. Premium condition vehicle ready for rental.`,
    },
  });

  revalidatePath('/vehicles');
  revalidatePath('/admin');
  revalidatePath('/admin/vehicles');
  return { success: true };
}

export async function updateVehicleAction(id: number, formData: FormData): Promise<ActionResponse> {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const name = (formData.get('name') as string)?.trim();
  const type = (formData.get('type') as string)?.trim();
  const model = (formData.get('model') as string)?.trim();
  const year = parseInt(formData.get('year') as string, 10);
  const pricePerDay = parseFloat(formData.get('pricePerDay') as string);
  const availability = formData.get('availability') === 'true';
  const image = (formData.get('image') as string)?.trim();
  const description = (formData.get('description') as string)?.trim();

  await prisma.vehicle.update({
    where: { id },
    data: {
      name,
      type,
      model,
      year,
      pricePerDay,
      availability,
      image,
      description,
    },
  });

  revalidatePath('/vehicles');
  revalidatePath(`/vehicles/${id}`);
  revalidatePath('/admin');
  revalidatePath('/admin/vehicles');
  return { success: true };
}

export async function deleteVehicleAction(id: number) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  await prisma.vehicle.delete({
    where: { id },
  });

  revalidatePath('/vehicles');
  revalidatePath('/admin');
  revalidatePath('/admin/vehicles');
  return { success: true };
}

export async function toggleVehicleAvailabilityAction(id: number) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) return { error: 'Vehicle not found' };

  await prisma.vehicle.update({
    where: { id },
    data: {
      availability: !vehicle.availability,
    },
  });

  revalidatePath('/vehicles');
  revalidatePath(`/vehicles/${id}`);
  revalidatePath('/admin');
  revalidatePath('/admin/vehicles');
  return { success: true };
}

// ================= BOOKING ACTIONS ================= //

export async function createBookingAction(formData: FormData): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const vehicleId = parseInt(formData.get('vehicleId') as string, 10);
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;

  if (!vehicleId || !startDateStr || !endDateStr) {
    return { error: 'Start date and end date are required.' };
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return { error: 'Invalid dates selected.' };
  }

  if (endDate < startDate) {
    return { error: 'End date cannot be before start date.' };
  }

  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const rentalDays = diffDays === 0 ? 1 : diffDays;

  if (rentalDays < 1) {
    return { error: 'Rental duration must be at least 1 day.' };
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    return { error: 'Vehicle not found.' };
  }

  if (!vehicle.availability) {
    return { error: 'Sorry, this vehicle is currently unavailable for rent.' };
  }

  const totalCost = rentalDays * vehicle.pricePerDay;

  await prisma.booking.create({
    data: {
      userId: session.id,
      vehicleId: vehicle.id,
      startDate,
      endDate,
      totalCost,
      status: 'PENDING',
    },
  });

  revalidatePath('/bookings');
  revalidatePath('/admin');
  revalidatePath('/admin/bookings');
  redirect('/bookings');
}

export async function updateBookingStatusAction(bookingId: number, status: 'APPROVED' | 'REJECTED') {
  const session = await getSession();
  if (session?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  revalidatePath('/bookings');
  revalidatePath('/admin');
  revalidatePath('/admin/bookings');
  return { success: true };
}
