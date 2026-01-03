import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

export default function CreateTripPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    startDate: '',
    selectPlace: '',
    startDate2: '',
    endDate: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Trip creation - Developer B feature coming soon!')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: '#1c1917', 
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Create a new Trip (Screen 4)
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Form Section */}
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            border: '3px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            padding: '2.5rem',
            marginBottom: '3rem'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: '#1c1917', 
              marginBottom: '2rem' 
            }}>
              Plan a new trip
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#1c1917', 
                  marginBottom: '0.5rem' 
                }}>
                  Start Date:
                </label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e7e5e4',
                    borderRadius: '0.75rem',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#1c1917', 
                  marginBottom: '0.5rem' 
                }}>
                  Select a Place:
                </label>
                <input
                  type="text"
                  value={formData.selectPlace}
                  onChange={(e) => setFormData({ ...formData, selectPlace: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e7e5e4',
                    borderRadius: '0.75rem',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#1c1917', 
                  marginBottom: '0.5rem' 
                }}>
                  Start Date:
                </label>
                <input
                  type="text"
                  value={formData.startDate2}
                  onChange={(e) => setFormData({ ...formData, startDate2: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e7e5e4',
                    borderRadius: '0.75rem',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#1c1917', 
                  marginBottom: '0.5rem' 
                }}>
                  End Date:
                </label>
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e7e5e4',
                    borderRadius: '0.75rem',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Suggestions Section */}
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            border: '3px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            padding: '2.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#1c1917', 
              marginBottom: '2rem' 
            }}>
              Suggestion for Places to Visit/Activities to prefere
            </h3>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1.5rem' 
            }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  style={{
                    aspectRatio: '1',
                    border: '3px solid #e7e5e4',
                    borderRadius: '1rem',
                    background: '#fdfcfb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '150px'
                  }}
                >
                  <div style={{ color: '#d6d3d1', fontSize: '0.875rem', textAlign: 'center' }}>
                    Place/Activity {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.875rem 2rem',
                border: '2px solid #e7e5e4',
                background: 'white',
                borderRadius: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.95rem',
                color: '#57534e'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.875rem 2rem',
                border: 'none',
                background: 'linear-gradient(135deg, #2d8b83 0%, #236f69 100%)',
                color: 'white',
                borderRadius: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(45,139,131,0.3)'
              }}
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
