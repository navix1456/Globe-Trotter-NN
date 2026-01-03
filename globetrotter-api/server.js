/*
 * GlobeTrotter API (Developer A slice)
 * - Auth (register, login, me)
 * - Profile endpoints
 * - Community sharing endpoints
 * In-memory data store for fast prototyping; swap with Postgres/Prisma later.
 */

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { randomUUID } = require('crypto')

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const PORT = process.env.PORT || 5000

// Mock data to unblock vertical slices; replace with Postgres reads/writes later.
const users = [
  {
    id: randomUUID(),
    email: 'demo@globetrotter.app',
    passwordHash: bcrypt.hashSync('demo123', 10),
    firstName: 'Demo',
    lastName: 'Explorer',
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    city: 'Lisbon',
    country: 'Portugal',
    bio: 'Finding beautiful journeys with GlobeTrotter.',
    preferences: { language: 'en', currency: 'USD' },
    isActive: true,
    isEmailVerified: true,
    lastLoginAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const popularDestinations = [
  {
    id: randomUUID(),
    name: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b8553f6c0fca',
    costIndex: 1.2,
    popularityScore: 92,
  },
  {
    id: randomUUID(),
    name: 'Lisbon',
    country: 'Portugal',
    imageUrl: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
    costIndex: 0.9,
    popularityScore: 88,
  },
  {
    id: randomUUID(),
    name: 'Reykjavík',
    country: 'Iceland',
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    costIndex: 1.6,
    popularityScore: 84,
  },
]

const trips = [
  {
    id: randomUUID(),
    userId: users[0].id,
    name: 'Iberian Escape',
    description: 'Lisbon, Porto, and coastal gems.',
    isPublic: true,
    shareToken: 'share-iberian-escape',
    viewCount: 42,
    copyCount: 6,
    createdAt: new Date(),
  },
]

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.replace('Bearer ', '') : null
  if (!token) return res.status(401).json({ message: 'Missing bearer token' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = users.find((u) => u.id === payload.id)
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
  const { email, password, firstName, lastName } = req.body || {}
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (existing) return res.status(409).json({ message: 'Email already registered' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = {
    id: randomUUID(),
    email,
    passwordHash,
    firstName,
    lastName,
    photoUrl: '',
    city: '',
    country: '',
    bio: '',
    preferences: {},
    isActive: true,
    isEmailVerified: false,
    lastLoginAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  users.push(user)
  const token = generateToken(user)
  res.status(201).json({ token, user: sanitizeUser(user) })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

  user.lastLoginAt = new Date()
  const token = generateToken(user)
  res.json({ token, user: sanitizeUser(user) })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
})

// Profile
app.get('/api/users/:id/profile', requireAuth, (req, res) => {
  const user = users.find((u) => u.id === req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json({ user: sanitizeUser(user) })
})

app.put('/api/users/:id', requireAuth, (req, res) => {
  if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Forbidden' })
  const { firstName, lastName, bio, city, country, photoUrl, preferences } = req.body || {}
  Object.assign(req.user, {
    firstName: firstName ?? req.user.firstName,
    lastName: lastName ?? req.user.lastName,
    bio: bio ?? req.user.bio,
    city: city ?? req.user.city,
    country: country ?? req.user.country,
    photoUrl: photoUrl ?? req.user.photoUrl,
    preferences: preferences ?? req.user.preferences,
    updatedAt: new Date(),
  })
  res.json({ user: sanitizeUser(req.user) })
})

app.get('/api/destinations/popular', (_req, res) => {
  res.json({ items: popularDestinations })
})

// Community & sharing
app.post('/api/trips/:id/share', requireAuth, (req, res) => {
  const trip = trips.find((t) => t.id === req.params.id && t.userId === req.user.id)
  if (!trip) return res.status(404).json({ message: 'Trip not found' })
  trip.isPublic = true
  trip.shareToken = trip.shareToken || `share-${trip.id}`
  trip.updatedAt = new Date()
  res.json({ trip })
})

app.get('/api/trips/community', (_req, res) => {
  const publicTrips = trips.filter((t) => t.isPublic)
  res.json({ items: publicTrips })
})

app.get('/api/trips/public/:shareToken', (req, res) => {
  const trip = trips.find((t) => t.shareToken === req.params.shareToken)
  if (!trip) return res.status(404).json({ message: 'Public trip not found' })
  res.json({ trip })
})

app.post('/api/trips/:id/copy', requireAuth, (req, res) => {
  const source = trips.find((t) => t.id === req.params.id && t.isPublic)
  if (!source) return res.status(404).json({ message: 'Trip not found or not public' })
  const clone = {
    ...source,
    id: randomUUID(),
    userId: req.user.id,
    isPublic: false,
    shareToken: null,
    copyCount: 0,
    viewCount: 0,
    name: `${source.name} (copy)`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  trips.push(clone)
  source.copyCount = (source.copyCount || 0) + 1
  res.status(201).json({ trip: clone })
})

function sanitizeUser(user) {
  const { passwordHash, ...safe } = user
  return safe
}

app.listen(PORT, () => {
  console.log(`GlobeTrotter API running on http://localhost:${PORT}`)
})
