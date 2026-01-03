const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Seeding database...')

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@globetrotter.app' },
    update: {},
    create: {
      email: 'demo@globetrotter.app',
      passwordHash: await bcrypt.hash('demo123', 10),
      firstName: 'Demo',
      lastName: 'Explorer',
      photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      city: 'Lisbon',
      country: 'Portugal',
      bio: 'Finding beautiful journeys with GlobeTrotter.',
      preferences: { language: 'en', currency: 'USD' },
      isActive: true,
      isEmailVerified: true,
    },
  })
  console.log('✅ Demo user created:', demoUser.email)

  // Create countries
  const countries = [
    { name: 'Japan', code: 'JPN', region: 'Asia', currencyCode: 'JPY', currencySymbol: '¥' },
    { name: 'Portugal', code: 'PRT', region: 'Europe', currencyCode: 'EUR', currencySymbol: '€' },
    { name: 'Iceland', code: 'ISL', region: 'Europe', currencyCode: 'ISK', currencySymbol: 'kr' },
    { name: 'Thailand', code: 'THA', region: 'Asia', currencyCode: 'THB', currencySymbol: '฿' },
    { name: 'Italy', code: 'ITA', region: 'Europe', currencyCode: 'EUR', currencySymbol: '€' },
    { name: 'Greece', code: 'GRC', region: 'Europe', currencyCode: 'EUR', currencySymbol: '€' },
  ]

  for (const c of countries) {
    await prisma.country.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    })
  }
  console.log('✅ Countries seeded')

  // Create cities
  const japan = await prisma.country.findUnique({ where: { code: 'JPN' } })
  const portugal = await prisma.country.findUnique({ where: { code: 'PRT' } })
  const iceland = await prisma.country.findUnique({ where: { code: 'ISL' } })
  const thailand = await prisma.country.findUnique({ where: { code: 'THA' } })
  const italy = await prisma.country.findUnique({ where: { code: 'ITA' } })
  const greece = await prisma.country.findUnique({ where: { code: 'GRC' } })

  const cities = [
    {
      name: 'Kyoto',
      countryId: japan.id,
      imageUrl: 'https://images.unsplash.com/photo-1504893524553-b8553f6c0fca',
      costIndex: 1.2,
      popularityScore: 92,
      description: 'Ancient temples and traditional culture',
      bestTimeToVisit: 'March to May, September to November',
    },
    {
      name: 'Lisbon',
      countryId: portugal.id,
      imageUrl: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
      costIndex: 0.9,
      popularityScore: 88,
      description: 'Colorful hills and historic neighborhoods',
      bestTimeToVisit: 'April to October',
    },
    {
      name: 'Reykjavík',
      countryId: iceland.id,
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
      costIndex: 1.6,
      popularityScore: 84,
      description: 'Gateway to natural wonders',
      bestTimeToVisit: 'June to August',
    },
    {
      name: 'Bangkok',
      countryId: thailand.id,
      imageUrl: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3',
      costIndex: 0.7,
      popularityScore: 86,
      description: 'Vibrant street life and temples',
      bestTimeToVisit: 'November to February',
    },
    {
      name: 'Rome',
      countryId: italy.id,
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      costIndex: 1.1,
      popularityScore: 90,
      description: 'Ancient history meets modern culture',
      bestTimeToVisit: 'April to June, September to October',
    },
    {
      name: 'Santorini',
      countryId: greece.id,
      imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
      costIndex: 1.3,
      popularityScore: 89,
      description: 'White buildings and blue domes',
      bestTimeToVisit: 'April to November',
    },
  ]

  for (const c of cities) {
    await prisma.city.upsert({
      where: { name_countryId: { name: c.name, countryId: c.countryId } },
      update: {},
      create: c,
    })
  }
  console.log('✅ Cities seeded')

  // Create sample trip
  const lisbon = await prisma.city.findFirst({
    where: { name: 'Lisbon' },
  })

  await prisma.trip.upsert({
    where: { shareToken: 'share-iberian-escape' },
    update: {},
    create: {
      userId: demoUser.id,
      name: 'Iberian Escape',
      description: 'Lisbon, Porto, and coastal gems.',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-10'),
      totalBudget: 2500,
      isPublic: true,
      shareToken: 'share-iberian-escape',
      viewCount: 42,
      copyCount: 6,
      status: 'planning',
    },
  })
  console.log('✅ Sample trip created')

  console.log('🎉 Seeding complete!')
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
