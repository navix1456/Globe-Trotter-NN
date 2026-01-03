import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Plus } from 'lucide-react'
import Header from '../components/Header'

interface Section {
  id: number
  title: string
  dateRange: string
  budget: string
}

export default function BuildItineraryPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [sections, setSections] = useState<Section[]>([
    { id: 1, title: 'Section 1:', dateRange: 'xxx to yyy', budget: 'Budget of this section' },
    { id: 2, title: 'Section 2:', dateRange: 'xxx to yyy', budget: 'Budget of this section' },
    { id: 3, title: 'Section 3:', dateRange: 'xxx to yyy', budget: 'Budget of this section' }
  ])

  const addSection = () => {
    const newSection: Section = {
      id: sections.length + 1,
      title: `Section ${sections.length + 1}:`,
      dateRange: 'xxx to yyy',
      budget: 'Budget of this section'
    }
    setSections([...sections, newSection])
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
          Build Itinerary Screen (Screen 5)
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                background: 'white',
                borderRadius: '1.5rem',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '2.5rem'
              }}
            >
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#1c1917', 
                marginBottom: '1rem' 
              }}>
                {section.title}
              </h2>
              
              <p style={{ 
                fontSize: '0.95rem', 
                color: '#57534e', 
                lineHeight: '1.6',
                marginBottom: '1.5rem' 
              }}>
                All the necessary information about this section.<br />
                This can be anything like theme section, hotel or any other activity
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #e7e5e4',
                    background: 'white',
                    borderRadius: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#1c1917',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Date Range: {section.dateRange}
                </button>
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #e7e5e4',
                    background: 'white',
                    borderRadius: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#1c1917',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {section.budget}
                </button>
              </div>
            </div>
          ))}

          {/* Add Another Section Button */}
          <button
            onClick={addSection}
            style={{
              padding: '1rem',
              border: '3px dashed #d6d3d1',
              background: 'white',
              borderRadius: '1.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '1rem',
              color: '#2d8b83',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = '#2d8b83'
              e.currentTarget.style.background = '#f0fffe'
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = '#d6d3d1'
              e.currentTarget.style.background = 'white'
            }}
          >
            <Plus size={24} strokeWidth={3} />
            Add another Section
          </button>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button
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
              Back to Dashboard
            </button>
            <button
              onClick={() => alert('Save itinerary - Developer B feature!')}
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
              Save Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
