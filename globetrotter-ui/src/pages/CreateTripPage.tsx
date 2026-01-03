import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, CalendarRange, Sparkles } from 'lucide-react'
import Header from '../components/Header'

export default function CreateTripPage() {
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(45,139,131,0.12), rgba(232,88,53,0.12))',
          border: '1px solid #e7e5e4',
          borderRadius: '1.5rem',
          padding: '1.75rem 2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#57534e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trip Builder</p>
            <h1 style={{ margin: '0.35rem 0', fontSize: '2rem', fontWeight: 800, color: '#1c1917' }}>Create a new Trip</h1>
            <p style={{ margin: 0, color: '#6b7280' }}>Pick your dates, choose a place, and we’ll suggest activities.</p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'white',
            border: '1px solid #e7e5e4',
            padding: '0.9rem 1.1rem',
            borderRadius: '1rem',
            boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
          }}>
            <Sparkles size={18} color="#2d8b83" />
            <span style={{ color: '#1c1917', fontWeight: 700 }}>Smart suggestions ready</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Form Section */}
          <div style={{
            background: 'white',
            borderRadius: '1.25rem',
            border: '1px solid #e7e5e4',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step 1</p>
                <h2 style={{ margin: '0.4rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Plan the basics</h2>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#2d8b83', fontWeight: 700 }}>
                <CalendarRange size={18} />
                <span>Date + Place</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.9rem',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Select a Place</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', top: '50%', left: '0.9rem', transform: 'translateY(-50%)', color: '#6b7280' }} />
                  <input
                    type="text"
                    value={formData.selectPlace}
                    onChange={(e) => setFormData({ ...formData, selectPlace: e.target.value })}
                    placeholder="e.g., Paris, Kyoto, Banff"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.5rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.9rem',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Trip Start</label>
                <input
                  type="date"
                  value={formData.startDate2}
                  onChange={(e) => setFormData({ ...formData, startDate2: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.9rem',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.9rem',
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
            borderRadius: '1.25rem',
            border: '1px solid #e7e5e4',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Ideas</p>
                <h3 style={{ margin: '0.4rem 0', fontSize: '1.3rem', fontWeight: 700, color: '#111827' }}>Suggestions for Places & Activities</h3>
              </div>
              <span style={{ color: '#2d8b83', fontWeight: 700 }}>Auto-curated</span>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {["Coastal walk", "Night market", "Museum hop", "Sunrise hike", "Food tour", "Hidden cafe"].map((item) => (
                <div
                  key={item}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '1rem',
                    background: '#f9fafb',
                    padding: '1rem',
                    minHeight: '110px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    color: '#374151',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  {item}
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
                padding: '0.9rem 2rem',
                border: '2px solid #e7e5e4',
                background: 'white',
                borderRadius: '0.9rem',
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
                padding: '0.9rem 2.4rem',
                border: 'none',
                background: 'linear-gradient(135deg, #2d8b83 0%, #236f69 100%)',
                color: 'white',
                borderRadius: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 10px 30px rgba(45,139,131,0.35)'
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
