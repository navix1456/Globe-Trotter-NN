import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

interface Trip {
  id: string
  name: string
  description: string | null
  status: string
  startDate: string | null
  endDate: string | null
  coverImageUrl: string | null
}

export default function TripListingPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)

  // Mock data - will be replaced by Developer B's API
  const mockTrips: Trip[] = [
    { id: '1', name: 'European Adventure', description: 'Exploring historic cities and cultural landmarks across Europe', status: 'ongoing', startDate: '2026-01-01', endDate: '2026-01-15', coverImageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a' },
    { id: '2', name: 'Asian Discovery', description: 'Journey through temples, markets, and beautiful landscapes', status: 'ongoing', startDate: '2026-01-05', endDate: '2026-01-20', coverImageUrl: 'https://images.unsplash.com/photo-1480796927426-f609979314bd' },
    { id: '3', name: 'Beach Paradise', description: 'Relaxing on pristine beaches and crystal clear waters', status: 'upcoming', startDate: '2026-02-01', endDate: '2026-02-10', coverImageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19' },
    { id: '4', name: 'Mountain Trek', description: 'Hiking through spectacular mountain ranges and valleys', status: 'upcoming', startDate: '2026-02-15', endDate: '2026-02-25', coverImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' },
    { id: '5', name: 'City Explorer', description: 'Discovering urban culture, food, and nightlife', status: 'completed', startDate: '2025-12-01', endDate: '2025-12-10', coverImageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785' },
    { id: '6', name: 'Safari Adventure', description: 'Wildlife viewing and camping under the stars', status: 'completed', startDate: '2025-11-15', endDate: '2025-11-25', coverImageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801' },
    { id: '7', name: 'Desert Journey', description: 'Exploring ancient deserts and oasis towns', status: 'completed', startDate: '2025-10-01', endDate: '2025-10-12', coverImageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35' },
  ]

  useEffect(() => {
    // TODO: Replace with actual API call when Developer B implements it
    setTrips(mockTrips)
  }, [])

  const getStatusTrips = (status: string) => {
    return trips.filter(trip => trip.status === status)
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'TBD'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const TripCard = ({ trip }: { trip: Trip }) => (
    <div
      onClick={() => navigate('/build-itinerary')}
      style={{
        background: 'white',
        borderRadius: '1rem',
        border: '3px solid white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        minHeight: '120px'
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 700, 
        color: '#1c1917', 
        marginBottom: '0.75rem' 
      }}>
        {trip.name}
      </h3>
      <p style={{ 
        fontSize: '0.95rem', 
        color: '#78716c', 
        lineHeight: '1.6',
        marginBottom: '1rem'
      }}>
        {trip.description || 'Short Over View of the Trip'}
      </p>
      {trip.startDate && trip.endDate && (
        <div style={{ 
          fontSize: '0.875rem', 
          color: '#57534e', 
          fontWeight: 600 
        }}>
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </div>
      )}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: '#1c1917', 
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          User Trip Listing (Screen 6)
        </h1>

        {/* Ongoing Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#1c1917', 
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '3px solid #2d8b83'
          }}>
            Ongoing
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {getStatusTrips('ongoing').length > 0 ? (
              getStatusTrips('ongoing').map(trip => <TripCard key={trip.id} trip={trip} />)
            ) : (
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '2rem',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: '#a8a29e', fontSize: '0.95rem', textAlign: 'center' }}>
                  Short Over View of the Trip
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#1c1917', 
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '3px solid #e85835'
          }}>
            Upcoming
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {getStatusTrips('upcoming').length > 0 ? (
              getStatusTrips('upcoming').map(trip => <TripCard key={trip.id} trip={trip} />)
            ) : (
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '2rem',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: '#a8a29e', fontSize: '0.95rem', textAlign: 'center' }}>
                  Short Over View of the Trip
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Completed Section */}
        <section>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#1c1917', 
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '3px solid #78716c'
          }}>
            Completed
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {getStatusTrips('completed').length > 0 ? (
              getStatusTrips('completed').map(trip => <TripCard key={trip.id} trip={trip} />)
            ) : (
              <>
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  border: '3px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  padding: '2rem',
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p style={{ color: '#a8a29e', fontSize: '0.95rem', textAlign: 'center' }}>
                    Short Over View of the Trip
                  </p>
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  border: '3px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  padding: '2rem',
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p style={{ color: '#a8a29e', fontSize: '0.95rem', textAlign: 'center' }}>
                    Short Over View of the Trip
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
