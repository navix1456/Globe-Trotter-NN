import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Edit2, Save, X, User } from 'lucide-react'
import api from '../lib/api'
import Header from '../components/Header'

interface Trip {
  id: string
  name: string
  coverImageUrl: string | null
  status: string
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    nationality: '',
    interests: '',
  })

  // Mock trips data - will be replaced by Developer B's API
  const [preplannedTrips] = useState<Trip[]>([
    { id: '1', name: 'European Adventure', coverImageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a', status: 'planning' },
    { id: '2', name: 'Asian Escape', coverImageUrl: 'https://images.unsplash.com/photo-1480796927426-f609979314bd', status: 'planning' },
    { id: '3', name: 'Beach Paradise', coverImageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19', status: 'planning' }
  ])

  const [previousTrips] = useState<Trip[]>([
    { id: '4', name: 'Mountain Trek', coverImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', status: 'completed' },
    { id: '5', name: 'City Tour', coverImageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785', status: 'completed' },
    { id: '6', name: 'Safari Adventure', coverImageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801', status: 'completed' }
  ])

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        bio: user.bio || '',
        nationality: user.nationality || '',
        interests: user.interests || '',
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await api.put(`/users/${user?.id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        nationality: formData.nationality,
        interests: formData.interests,
      })
      updateUser(res.data.user)
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        bio: user.bio || '',
        nationality: user.nationality || '',
        interests: user.interests || '',
      })
    }
    setIsEditing(false)
    setError('')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Profile Section */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '3rem',
          marginBottom: '3rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '3px solid white'
        }}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Profile Image Circle */}
            <div>
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '6px solid #e7e5e4',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative'
              }}>
                {user?.photoUrl ? (
                  <img src={user.photoUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <User size={64} color="white" strokeWidth={2} />
                    <div style={{ color: 'white', marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                      Image of the User
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* User Details Box */}
            <div style={{ flex: 1 }}>
              <div style={{
                border: '3px solid #e7e5e4',
                borderRadius: '1rem',
                padding: '2rem',
                background: '#fdfcfb',
                minHeight: '200px',
                position: 'relative'
              }}>
                {!isEditing ? (
                  <>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>
                        {user?.firstName} {user?.lastName}
                      </h2>
                      <p style={{ color: '#78716c', fontSize: '1rem' }}>{user?.email}</p>
                    </div>

                    {user?.bio && (
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ color: '#57534e', fontSize: '0.95rem', lineHeight: '1.6' }}>{user.bio}</p>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                      {user?.nationality && (
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                            Nationality
                          </div>
                          <div style={{ color: '#1c1917', fontWeight: 600 }}>{user.nationality}</div>
                        </div>
                      )}
                      {user?.interests && (
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                            Interests
                          </div>
                          <div style={{ color: '#1c1917', fontWeight: 600 }}>{user.interests}</div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'linear-gradient(135deg, #2d8b83 0%, #236f69 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 12px rgba(45,139,131,0.3)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(45,139,131,0.4)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,139,131,0.3)' }}
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ fontSize: '0.875rem', color: '#78716c', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                      User Details with appropriate option to edit those information....
                    </div>

                    {error && (
                      <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.875rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
                        {error}
                      </div>
                    )}
                    {success && (
                      <div style={{ background: '#dcfce7', color: '#16a34a', padding: '0.875rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
                        {success}
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem' }}>First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                          style={{ width: '100%', padding: '0.75rem', border: '2px solid #e7e5e4', borderRadius: '0.5rem', fontSize: '0.95rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem' }}>Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                          style={{ width: '100%', padding: '0.75rem', border: '2px solid #e7e5e4', borderRadius: '0.5rem', fontSize: '0.95rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem' }}>Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={2}
                        placeholder="Tell us about yourself..."
                        style={{ width: '100%', padding: '0.75rem', border: '2px solid #e7e5e4', borderRadius: '0.5rem', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem' }}>Nationality</label>
                        <input
                          type="text"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          placeholder="e.g., American"
                          style={{ width: '100%', padding: '0.75rem', border: '2px solid #e7e5e4', borderRadius: '0.5rem', fontSize: '0.95rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem' }}>Interests</label>
                        <input
                          type="text"
                          value={formData.interests}
                          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                          placeholder="e.g., Adventure, Culture"
                          style={{ width: '100%', padding: '0.75rem', border: '2px solid #e7e5e4', borderRadius: '0.5rem', fontSize: '0.95rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                          padding: '0.75rem 1.5rem',
                          border: '2px solid #e7e5e4',
                          background: 'white',
                          borderRadius: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#57534e',
                          fontSize: '0.95rem'
                        }}
                      >
                        <X size={18} />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          padding: '0.75rem 1.5rem',
                          border: 'none',
                          background: loading ? '#a8a29e' : 'linear-gradient(135deg, #2d8b83 0%, #236f69 100%)',
                          color: 'white',
                          borderRadius: '0.75rem',
                          fontWeight: 700,
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.95rem',
                          boxShadow: '0 4px 12px rgba(45,139,131,0.3)'
                        }}
                      >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preplanned Trips */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '1.5rem' }}>
            Preplanned Trips
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {preplannedTrips.map((trip) => (
              <div key={trip.id} style={{
                background: 'white',
                borderRadius: '1rem',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}>
                <div style={{
                  height: '220px',
                  background: trip.coverImageUrl ? `url(${trip.coverImageUrl}) center/cover` : 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    {trip.name}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <button
                    onClick={() => alert('View trip details - Developer B feature')}
                    style={{
                      background: 'white',
                      color: '#2d8b83',
                      border: '2px solid #2d8b83',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#2d8b83'; e.currentTarget.style.color = 'white' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#2d8b83' }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Trips */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '1.5rem' }}>
            Previous Trips
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {previousTrips.map((trip) => (
              <div key={trip.id} style={{
                background: 'white',
                borderRadius: '1rem',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}>
                <div style={{
                  height: '220px',
                  background: trip.coverImageUrl ? `url(${trip.coverImageUrl}) center/cover` : 'linear-gradient(135deg, #e85835 0%, #f17d5f 100%)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    {trip.name}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <button
                    onClick={() => alert('View trip details - Developer B feature')}
                    style={{
                      background: 'white',
                      color: '#2d8b83',
                      border: '2px solid #2d8b83',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#2d8b83'; e.currentTarget.style.color = 'white' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#2d8b83' }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
