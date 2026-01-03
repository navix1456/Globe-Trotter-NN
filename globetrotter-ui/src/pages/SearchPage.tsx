import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MapPin, Activity } from 'lucide-react'
import Header from '../components/Header'

interface SearchResult {
  id: string
  title: string
  details: string
  category: string
}

export default function SearchPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('Everything')
  
  // Mock search results
  const mockResults: SearchResult[] = [
    { id: '1', title: 'Eiffel Tower Tour', details: 'Guided tour of Paris iconic landmark with skip-the-line access', category: 'activity' },
    { id: '2', title: 'Tokyo Sushi Making Class', details: 'Learn authentic sushi preparation from master chef', category: 'activity' },
    { id: '3', title: 'Barcelona City Walk', details: 'Explore Gaudi architecture and historic Gothic Quarter', category: 'activity' },
    { id: '4', title: 'New York Museums Pass', details: 'Access to 5 major museums including MoMA and Met', category: 'activity' },
    { id: '5', title: 'Rome Food Tour', details: 'Taste authentic Italian cuisine in local trattorias', category: 'activity' },
    { id: '6', title: 'London Theatre Show', details: 'Premium seats for West End musical performances', category: 'activity' },
    { id: '7', title: 'Dubai Desert Safari', details: 'Evening desert experience with BBQ dinner', category: 'activity' },
    { id: '8', title: 'Sydney Harbour Cruise', details: 'Scenic cruise with views of Opera House and Bridge', category: 'activity' },
  ]

  const [results] = useState<SearchResult[]>(mockResults)

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
          Activity Search Pages / City Search Page (Screen 8)
        </h1>

        {/* Results Section */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          border: '3px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          padding: '2.5rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#1c1917', 
            marginBottom: '2rem',
            paddingBottom: '0.75rem',
            borderBottom: '3px solid #2d8b83'
          }}>
            Results
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => alert('View activity details - Developer B feature!')}
                style={{
                  background: '#fdfcfb',
                  border: '2px solid #e7e5e4',
                  borderRadius: '1rem',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = 'translateX(8px)'
                  e.currentTarget.style.borderColor = '#2d8b83'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,139,131,0.15)'
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.borderColor = '#e7e5e4'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 700, 
                  color: '#1c1917', 
                  marginBottom: '0.5rem' 
                }}>
                  {result.title}
                </h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#78716c', 
                  lineHeight: '1.6' 
                }}>
                  Option and its details - {result.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
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
        </div>
      </div>
    </div>
  )
}
