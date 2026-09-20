import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing records to ensure idempotent seed
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const customer = await prisma.user.create({
    data: {
      username: 'customer',
      password: 'customer123',
      role: 'CUSTOMER',
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin123',
      role: 'ADMIN',
    },
  });

  console.log(`Created users: ${customer.username}, ${admin.username}`);

  // Create Vehicles
  const vehiclesData = [
    {
      name: 'Toyota Axio',
      type: 'Sedan',
      model: 'Axio Hybrid',
      year: 2022,
      pricePerDay: 3500,
      availability: true,
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80',
      description: 'Reliable and fuel-efficient compact sedan, ideal for city commutes and family trips with superior mileage.',
    },
    {
      name: 'Toyota Corolla',
      type: 'Sedan',
      model: 'Corolla Altis',
      year: 2023,
      pricePerDay: 4500,
      availability: true,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80',
      description: 'Spacious and modern executive sedan equipped with cutting-edge safety features, plush seating, and smooth handling.',
    },
    {
      name: 'Honda Vezel',
      type: 'SUV',
      model: 'Vezel RS Hybrid',
      year: 2022,
      pricePerDay: 5000,
      availability: true,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
      description: 'Stylish crossover SUV featuring a sleek silhouette, smart hybrid drive, and commanding high road stance.',
    },
    {
      name: 'Nissan X-Trail',
      type: 'SUV',
      model: 'X-Trail 4WD',
      year: 2021,
      pricePerDay: 6000,
      availability: false,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
      description: 'Rugged and capable 4WD SUV with intelligent terrain drive, ample luggage room, and premium road trip comfort.',
    },
    {
      name: 'Toyota Hiace',
      type: 'Van',
      model: 'Hiace Super GL',
      year: 2020,
      pricePerDay: 7000,
      availability: true,
      image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&auto=format&fit=crop&q=80',
      description: 'High-capacity 12-seater passenger van designed for family tours, corporate events, and airport pick-up services.',
    },
    {
      name: 'Hyundai Tucson',
      type: 'SUV',
      model: 'Tucson 1.6 Turbo',
      year: 2023,
      pricePerDay: 5500,
      availability: true,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
      description: 'Futuristic exterior styling with premium dual-zone climate control, leather interior, and dynamic cruise control.',
    },
  ];

  const createdVehicles = [];
  for (const v of vehiclesData) {
    const vehicle = await prisma.vehicle.create({ data: v });
    createdVehicles.push(vehicle);
  }

  console.log(`Created ${createdVehicles.length} vehicles.`);

  // Create Sample Bookings
  const today = new Date();
  const futureDate1 = new Date();
  futureDate1.setDate(today.getDate() + 3);

  const futureDate2 = new Date();
  futureDate2.setDate(today.getDate() + 5);

  const futureDate3 = new Date();
  futureDate3.setDate(today.getDate() + 8);

  await prisma.booking.create({
    data: {
      userId: customer.id,
      vehicleId: createdVehicles[1].id, // Toyota Corolla
      startDate: today,
      endDate: futureDate1,
      totalCost: 3 * createdVehicles[1].pricePerDay,
      status: 'APPROVED',
    },
  });

  await prisma.booking.create({
    data: {
      userId: customer.id,
      vehicleId: createdVehicles[3].id, // Nissan X-Trail
      startDate: futureDate2,
      endDate: futureDate3,
      totalCost: 3 * createdVehicles[3].pricePerDay,
      status: 'PENDING',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
