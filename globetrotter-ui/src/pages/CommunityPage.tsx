import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User } from 'lucide-react'
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
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [trips, setTrips] = useState<PublicTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)

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

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', gap: '3rem' }}>
          {/* Main Content - Left Side */}
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#1c1917', 
              marginBottom: '2rem',
              borderBottom: '3px solid #2d8b83',
              paddingBottom: '0.75rem',
              display: 'inline-block'
            }}>
              Community tab
            </h2>

            {/* Trip Cards with Radio Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid #e7e5e4', borderTop: '4px solid #2d8b83', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
                </div>
              ) : trips.length === 0 ? (
                <div style={{ 
                  background: 'white', 
                  padding: '3rem', 
                  borderRadius: '1rem', 
                  textAlign: 'center',
                  border: '3px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>No Public Trips Yet</h3>
                  <p style={{ color: '#78716c', fontSize: '1rem' }}>Be the first to share your travel plans with the community!</p>
                </div>
              ) : (
                trips.slice(0, 4).map((trip) => (
                  <div key={trip.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    {/* Radio Button */}
                    <div
                      onClick={() => setSelectedTrip(trip.id)}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        border: '3px solid #d6d3d1',
                        background: selectedTrip === trip.id ? '#2d8b83' : 'white',
                        cursor: 'pointer',
                        flexShrink: 0,
                        marginTop: '0.5rem',
                        position: 'relative',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { if (selectedTrip !== trip.id) e.currentTarget.style.borderColor = '#a8a29e' }}
                      onMouseLeave={(e) => { if (selectedTrip !== trip.id) e.currentTarget.style.borderColor = '#d6d3d1' }}
                    >
                      {selectedTrip === trip.id && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: 'white'
                        }} />
                      )}
                    </div>

                    {/* Trip Card */}
                    <div style={{
                      flex: 1,
                      background: 'white',
                      borderRadius: '1.5rem',
                      border: '3px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      transition: 'all 0.2s',
                      minHeight: '180px'
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.transform = 'translateY(-4px)'; 
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)' 
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.transform = 'translateY(0)'; 
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' 
                    }}>
                      <div style={{ padding: '2rem' }}>
                        <h3 style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 700, 
                          color: '#1c1917', 
                          marginBottom: '1rem' 
                        }}>
                          {trip.name}
                        </h3>
                        {trip.description && (
                          <p style={{ 
                            color: '#78716c', 
                            fontSize: '0.95rem', 
                            lineHeight: '1.6',
                            marginBottom: '1.5rem'
                          }}>
                            {trip.description.length > 150 ? trip.description.substring(0, 150) + '...' : trip.description}
                          </p>
                        )}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          paddingTop: '1rem',
                          borderTop: '2px solid #f5f5f4'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.875rem'
                            }}>
                              {trip.user.firstName[0]}{trip.user.lastName[0]}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#1c1917', fontSize: '0.95rem' }}>
                                {trip.user.firstName} {trip.user.lastName}
                              </div>
                              <div style={{ color: '#78716c', fontSize: '0.8rem' }}>Trip Creator</div>
                            </div>
                          </div>
                          <div style={{ 
                            color: '#78716c', 
                            fontSize: '0.875rem',
                            fontWeight: 600 
                          }}>
                            {trip.viewCount} views
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Side - Description Box */}
          <div style={{ width: '350px', flexShrink: 0 }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              border: '3px solid #e7e5e4',
              padding: '2rem',
              position: 'sticky',
              top: '120px'
            }}>
              <p style={{ 
                color: '#57534e', 
                fontSize: '0.95rem', 
                lineHeight: '1.8',
                textAlign: 'justify'
              }}>
                Community section where all the users can share their experience about a certain trip or activity.
                Using this search, groupby or Filter and sort by option, the user can search for the details which they are looking form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
