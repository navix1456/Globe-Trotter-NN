import { useEffect, useMemo, useState } from 'react'
import { Search, Eye, Copy, CalendarRange } from 'lucide-react'
import api from '../lib/api'
import Header from '../components/Header'

interface PublicTrip {
  id: string
  name: string
  description: string | null
  coverImageUrl: string | null
  startDate: string | null
  endDate: string | null
  viewCount: number
  user: {
    id: string
    firstName: string
    lastName: string
    photoUrl: string | null
  }
}

export default function CommunityPage() {
  const [trips, setTrips] = useState<PublicTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'az'>('popular')
  const [groupBy, setGroupBy] = useState<'destination' | 'creator'>('destination')
  const [createLoading, setCreateLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    coverImageUrl: '',
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    loadCommunityTrips()
  }, [])

  const loadCommunityTrips = async () => {
    try {
      const res = await api.get('/trips/community')
      setTrips(res.data.items || [])
    } catch (err) {
      console.error('Failed to load community trips:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.description) return
    setCreateLoading(true)
    try {
      const payload = {
        name: form.name,
        description: form.description,
        coverImageUrl: form.coverImageUrl || null,
        startDate: form.startDate || null,
        endDate: form.endDate || null
      }
      const res = await api.post('/trips/community', payload)
      const newTrip = res.data?.item || { ...payload, id: crypto.randomUUID(), viewCount: 0, user: { id: 'me', firstName: 'You', lastName: '', photoUrl: null } }
      setTrips((prev) => [newTrip as PublicTrip, ...prev])
      setForm({ name: '', description: '', coverImageUrl: '', startDate: '', endDate: '' })
    } catch (err) {
      console.error('Failed to share trip:', err)
    } finally {
      setCreateLoading(false)
    }
  }

  const filteredTrips = useMemo(() => {
    const items = trips.filter((trip) => {
      const haystack = `${trip.name} ${trip.description ?? ''} ${trip.user.firstName} ${trip.user.lastName}`.toLowerCase()
      return haystack.includes(search.toLowerCase())
    })

    return items.sort((a, b) => {
      if (sortBy === 'popular') return b.viewCount - a.viewCount
      if (sortBy === 'recent') return (new Date(b.startDate ?? 0).getTime()) - (new Date(a.startDate ?? 0).getTime())
      return a.name.localeCompare(b.name)
    })
  }, [search, sortBy, trips])

  const groupedTrips = useMemo(() => {
    const groups: Record<string, PublicTrip[]> = {}

    filteredTrips.forEach((trip) => {
      const destinationLabel = trip.name?.split('–')[0]?.split('-')[0]?.trim() || 'Destination TBD'
      const creatorLabel = [trip.user.firstName, trip.user.lastName].filter(Boolean).join(' ') || 'Unknown creator'
      const key = groupBy === 'creator' ? creatorLabel : destinationLabel
      groups[key] = groups[key] ? [...groups[key], trip] : [trip]
    })

    return Object.entries(groups).map(([label, items]) => ({ label, items }))
  }, [filteredTrips, groupBy])

  const stats = useMemo(() => ({
    total: trips.length,
    creators: new Set(trips.map((t) => t.user.id)).size,
    popular: trips.filter((t) => t.viewCount > 50).length
  }), [trips])

  return (
    <div className="community-page">
      <Header />

      <div className="community-shell">
        <div className="community-hero">
          <div>
            <p className="eyebrow">Community</p>
            <h1>Discover Trips Shared by Travelers</h1>
            <p className="lede">Search, filter, and get inspired by journeys planned by the GlobeTrotter community.</p>
            <div className="community-stats">
              <div className="stat-pill">
                <span className="pill-label">Public trips</span>
                <strong>{stats.total}</strong>
              </div>
              <div className="stat-pill">
                <span className="pill-label">Creators</span>
                <strong>{stats.creators}</strong>
              </div>
              <div className="stat-pill">
                <span className="pill-label">Trending</span>
                <strong>{stats.popular}</strong>
              </div>
            </div>
          </div>
          <div className="community-hero-card">
            <p>Share your trip, discover hidden gems, and copy itineraries that match your style.</p>
            <div className="hero-bullets">
              <span>🔍 Search by destination</span>
              <span>🎯 Filter by popularity</span>
              <span>📅 Sort by recency</span>
            </div>
          </div>
        </div>

        <div className="community-layout">
          <div className="community-main">
            <div className="form-toggle">
              <button className="primary" onClick={() => setShowForm((v) => !v)}>
                {showForm ? 'Hide post form' : 'Post to community'}
              </button>
            </div>

            {showForm && (
            <div className="community-form-card">
              <div className="form-header">
                <div>
                  <p className="eyebrow">Share your trip</p>
                  <h3>Post to the community</h3>
                </div>
                <span className="pill">Public</span>
              </div>
              <form className="community-form" onSubmit={handleCreate}>
                <div className="form-row">
                  <label>Trip name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g., Alps Hiking Escape"
                    required
                  />
                </div>
                <div className="form-row">
                  <label>Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="What makes this trip special? Add key highlights, vibe, and who it's great for."
                    rows={3}
                    required
                  />
                </div>
                <div className="form-grid">
                  <div className="form-row">
                    <label>Cover image URL</label>
                    <input
                      value={form.coverImageUrl}
                      onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="form-row">
                    <label>Start date</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <label>End date</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="primary" disabled={createLoading}>
                    {createLoading ? 'Posting...' : 'Share trip'}
                  </button>
                </div>
              </form>
            </div>
            )}

            <div className="community-filters">
              <div className="filter-input">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trips, destinations, or creators"
                />
              </div>
              <div className="filter-select">
                <label>Group by</label>
                <select value={groupBy} onChange={(e) => setGroupBy(e.target.value as any)}>
                  <option value="destination">Destination</option>
                  <option value="creator">Creator</option>
                </select>
              </div>
              <div className="filter-select">
                <label>Sort</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                  <option value="popular">Most viewed</option>
                  <option value="recent">Newest</option>
                  <option value="az">A → Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="community-grid">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="trip-card skeleton" />
                ))}
              </div>
            ) : filteredTrips.length === 0 ? (
              <div className="empty-card">
                <h3>No public trips yet</h3>
                <p>Be the first to share your travel plans with the community.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {groupedTrips.map((group) => (
                  <div key={group.label} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="pill">{group.label}</div>
                        <span style={{ color: '#6b7280', fontWeight: 600 }}>{group.items.length} trip{group.items.length > 1 ? 's' : ''}</span>
                      </div>
                      <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{groupBy === 'creator' ? 'Grouped by creator' : 'Grouped by destination'}</span>
                    </div>

                    <div className="community-grid">
                      {group.items.map((trip) => (
                        <div key={trip.id} className={`trip-card ${selectedTrip === trip.id ? 'active' : ''}`}>
                          <div className="trip-cover" style={{ backgroundImage: `url(${trip.coverImageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&h=600&fit=crop'})` }} />
                          <div className="trip-body">
                            <div className="trip-meta">
                              <div className="pill">{trip.viewCount} views</div>
                              {trip.startDate && trip.endDate && (
                                <div className="meta-inline">
                                  <CalendarRange size={16} />
                                  <span>{trip.startDate} → {trip.endDate}</span>
                                </div>
                              )}
                            </div>
                            <h3>{trip.name}</h3>
                            {trip.description && <p>{trip.description.length > 140 ? `${trip.description.slice(0, 140)}...` : trip.description}</p>}

                            <div className="trip-footer">
                              <div className="author">
                                <div className="avatar">
                                  {trip.user.photoUrl ? (
                                    <img src={trip.user.photoUrl} alt={trip.user.firstName} />
                                  ) : (
                                    <span>{trip.user.firstName[0]}{trip.user.lastName[0]}</span>
                                  )}
                                </div>
                                <div>
                                  <div className="author-name">{trip.user.firstName} {trip.user.lastName}</div>
                                  <div className="author-role">Trip creator</div>
                                </div>
                              </div>
                              <div className="trip-actions">
                                <button className="ghost" onClick={() => setSelectedTrip(trip.id)}>
                                  <Eye size={16} /> View
                                </button>
                                <button className="primary">
                                  <Copy size={16} /> Copy trip
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="community-aside">
            <div className="aside-card">
              <h4>How to use the community tab</h4>
              <ul>
                <li>Search by destination, trip name, or creator</li>
                <li>Sort by popularity or recency to spot trending trips</li>
                <li>Open a trip to view highlights and details</li>
                <li>Copy an itinerary to start planning instantly</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
