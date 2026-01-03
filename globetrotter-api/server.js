/*
 * GlobeTrotter API (Developer A slice)
 * - Auth (register, login, me)
 * - Profile endpoints
 * - Community sharing endpoints
 * Connected to Postgres via Prisma
 */

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const PORT = process.env.PORT || 5000

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
}

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.replace('Bearer ', '') : null
  if (!token) return res.status(401).json({ message: 'Missing bearer token' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (!user) return res.status(401).json({ message: 'User not found' })
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'globetrotter-api', timestamp: new Date().toISOString() })
})

// Auth
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body || {}
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) return res.status(409).json({ message: 'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
      },
    })
    const token = generateToken(user)
    res.status(201).json({ token, user: sanitizeUser(user) })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Registration failed' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })
    const token = generateToken(user)
    res.json({ token, user: sanitizeUser(user) })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Login failed' })
  }
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
})

// Profile
app.get('/api/users/:id/profile', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ user: sanitizeUser(user) })
  } catch (err) {
    console.error('Get profile error:', err)
    res.status(500).json({ message: 'Failed to fetch profile' })
  }
})

app.put('/api/users/:id', requireAuth, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Forbidden' })
    const { firstName, lastName, bio, city, country, photoUrl, preferences } = req.body || {}
    
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(bio !== undefined && { bio }),
        ...(city !== undefined && { city }),
        ...(country !== undefined && { country }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(preferences && { preferences }),
      },
    })
    res.json({ user: sanitizeUser(updated) })
  } catch (err) {
    console.error('Update profile error:', err)
    res.status(500).json({ message: 'Failed to update profile' })
  }
})

app.get('/api/destinations/popular', async (_req, res) => {
  try {
    const cities = await prisma.city.findMany({
      where: { isActive: true },
      include: { country: true },
      orderBy: { popularityScore: 'desc' },
      take: 12,
    })
    const items = cities.map((c) => ({
      id: c.id,
      name: c.name,
      country: c.country.name,
      imageUrl: c.imageUrl,
      costIndex: c.costIndex,
      popularityScore: c.popularityScore,
    }))
    res.json({ items })
  } catch (err) {
    console.error('Get popular destinations error:', err)
    res.status(500).json({ message: 'Failed to fetch destinations', items: [] })
  }
})

// Community & sharing
app.post('/api/trips/:id/share', requireAuth, async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    })
    if (!trip) return res.status(404).json({ message: 'Trip not found' })
    
    const updated = await prisma.trip.update({
      where: { id: trip.id },
      data: {
        isPublic: true,
        shareToken: trip.shareToken || `share-${trip.id.slice(0, 8)}`,
      },
    })
    res.json({ trip: updated })
  } catch (err) {
    console.error('Share trip error:', err)
    res.status(500).json({ message: 'Failed to share trip' })
  }
})

app.get('/api/trips/community', async (_req, res) => {
  try {
    const publicTrips = await prisma.trip.findMany({
      where: { isPublic: true },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, photoUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    res.json({ items: publicTrips })
  } catch (err) {
    console.error('Get community trips error:', err)
    res.status(500).json({ message: 'Failed to fetch community trips', items: [] })
  }
})

app.get('/api/trips/public/:shareToken', async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: { shareToken: req.params.shareToken, isPublic: true },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, photoUrl: true } },
        stops: {
          include: {
            city: { include: { country: true } },
            activities: { include: { activity: true } },
          },
          orderBy: { stopOrder: 'asc' },
        },
      },
    })
    if (!trip) return res.status(404).json({ message: 'Public trip not found' })
    
    await prisma.trip.update({
      where: { id: trip.id },
      data: { viewCount: { increment: 1 } },
    })
    res.json({ trip })
  } catch (err) {
    console.error('Get public trip error:', err)
    res.status(500).json({ message: 'Failed to fetch public trip' })
  }
})

app.post('/api/trips/:id/copy', requireAuth, async (req, res) => {
  try {
    const source = await prisma.trip.findFirst({
      where: { id: req.params.id, isPublic: true },
      include: {
        stops: {
          include: { activities: true },
          orderBy: { stopOrder: 'asc' },
        },
      },
    })
    if (!source) return res.status(404).json({ message: 'Trip not found or not public' })
    
    const clone = await prisma.trip.create({
      data: {
        userId: req.user.id,
        name: `${source.name} (copy)`,
        description: source.description,
        coverImageUrl: source.coverImageUrl,
        startDate: source.startDate,
        endDate: source.endDate,
        totalBudget: source.totalBudget,
        currencyCode: source.currencyCode,
        isPublic: false,
        status: 'planning',
        stops: {
          create: source.stops.map((stop) => ({
            cityId: stop.cityId,
            arrivalDate: stop.arrivalDate,
            departureDate: stop.departureDate,
            stopOrder: stop.stopOrder,
            accommodationName: stop.accommodationName,
            accommodationAddress: stop.accommodationAddress,
            accommodationCost: stop.accommodationCost,
            transportType: stop.transportType,
            transportCost: stop.transportCost,
            notes: stop.notes,
            activities: {
              create: stop.activities.map((act) => ({
                activityId: act.activityId,
                scheduledDate: act.scheduledDate,
                scheduledTime: act.scheduledTime,
                activityOrder: act.activityOrder,
                actualCost: act.actualCost,
                notes: act.notes,
                status: 'planned',
              })),
            },
          })),
        },
      },
    })
    
    await prisma.trip.update({
      where: { id: source.id },
      data: { copyCount: { increment: 1 } },
    })
    res.status(201).json({ trip: clone })
  } catch (err) {
    console.error('Copy trip error:', err)
    res.status(500).json({ message: 'Failed to copy trip' })
  }
})

function sanitizeUser(user) {
  const { passwordHash, ...safe } = user
  return safe
}

app.listen(PORT, () => {
  console.log(`GlobeTrotter API running on http://localhost:${PORT}`)
  console.log(`Database: ${process.env.DATABASE_URL ? 'Connected to Neon Postgres' : 'No database configured'}`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
