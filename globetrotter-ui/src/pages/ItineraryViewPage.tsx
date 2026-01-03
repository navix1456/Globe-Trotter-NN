import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Plus } from 'lucide-react'
import Header from '../components/Header'

interface Activity {
  id: string
  description: string
  expense: string
}

interface DayItinerary {
  day: number
  activities: Activity[]
}

export default function ItineraryViewPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [itinerary, setItinerary] = useState<DayItinerary[]>([
    {
      day: 1,
      activities: [
        { id: '1-1', description: 'Morning city tour and breakfast', expense: '$45' },
        { id: '1-2', description: 'Visit historical museum', expense: '$25' },
        { id: '1-3', description: 'Lunch at local restaurant', expense: '$30' },
      ]
    },
    {
      day: 2,
      activities: [
        { id: '2-1', description: 'Beach day and water sports', expense: '$80' },
        { id: '2-2', description: 'Sunset dinner cruise', expense: '$120' },
        { id: '2-3', description: 'Evening entertainment show', expense: '$65' },
      ]
    }
  ])

  const addDay = () => {
    const newDay: DayItinerary = {
      day: itinerary.length + 1,
      activities: [
        { id: `${itinerary.length + 1}-1`, description: '', expense: '' }
      ]
    }
    setItinerary([...itinerary, newDay])
  }

  const addActivity = (dayIndex: number) => {
    const updatedItinerary = [...itinerary]
    const newActivityId = `${dayIndex + 1}-${updatedItinerary[dayIndex].activities.length + 1}`
    updatedItinerary[dayIndex].activities.push({
      id: newActivityId,
      description: '',
      expense: ''
    })
    setItinerary(updatedItinerary)
  }

  const updateActivity = (dayIndex: number, activityIndex: number, field: 'description' | 'expense', value: string) => {
    const updatedItinerary = [...itinerary]
    updatedItinerary[dayIndex].activities[activityIndex][field] = value
    setItinerary(updatedItinerary)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: '#1c1917', 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Itinerary View Screen with budget section (Screen 9)
        </h1>
        
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          color: '#57534e', 
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Itinerary for a selected place
        </h2>

        {/* Itinerary Container */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          border: '3px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          padding: '2.5rem'
        }}>
          {/* Column Headers */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 200px', 
            gap: '1.5rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '3px solid #e7e5e4'
          }}>
            <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1c1917' }}>
              Physical Activity
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1c1917', textAlign: 'center' }}>
              Expense
            </div>
          </div>

          {/* Days */}
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} style={{ marginBottom: '2.5rem' }}>
              {/* Day Label */}
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 700,
                fontSize: '1rem',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 12px rgba(45,139,131,0.3)'
              }}>
                Day {day.day}
              </div>

              {/* Activities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {day.activities.map((activity, activityIndex) => (
                  <div key={activity.id}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 200px', 
                      gap: '1.5rem',
                      alignItems: 'start'
                    }}>
                      <input
                        type="text"
                        value={activity.description}
                        onChange={(e) => updateActivity(dayIndex, activityIndex, 'description', e.target.value)}
                        placeholder="Activity description..."
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          border: '2px solid #e7e5e4',
                          borderRadius: '0.75rem',
                          fontSize: '0.95rem',
                          outline: 'none',
                          background: '#fdfcfb'
                        }}
                      />
                      <input
                        type="text"
                        value={activity.expense}
                        onChange={(e) => updateActivity(dayIndex, activityIndex, 'expense', e.target.value)}
                        placeholder="$0"
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          border: '2px solid #e7e5e4',
                          borderRadius: '0.75rem',
                          fontSize: '0.95rem',
                          outline: 'none',
                          background: '#fdfcfb',
                          textAlign: 'center'
                        }}
                      />
                    </div>
                    
                    {/* Connector line (except for last activity) */}
                    {activityIndex < day.activities.length - 1 && (
                      <div style={{
                        width: '2px',
                        height: '20px',
                        background: '#d6d3d1',
                        margin: '0.5rem 0 0.5rem 2rem'
                      }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Add Activity Button */}
              <button
                onClick={() => addActivity(dayIndex)}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  border: '2px dashed #d6d3d1',
                  background: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#78716c',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderColor = '#2d8b83'
                  e.currentTarget.style.color = '#2d8b83'
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderColor = '#d6d3d1'
                  e.currentTarget.style.color = '#78716c'
                }}
              >
                <Plus size={16} />
                Add Activity
              </button>
            </div>
          ))}

          {/* Add Day Button */}
          <button
            onClick={addDay}
            style={{
              width: '100%',
              padding: '1rem',
              border: '3px dashed #d6d3d1',
              background: 'white',
              borderRadius: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '1rem',
              color: '#2d8b83',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
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
            Add Another Day
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => navigate('/trips')}
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
            Back to Trips
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
  )
}
