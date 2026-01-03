import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../components/Header'

interface CalendarEvent {
  date: number
  title: string
  color?: string
}

export default function CalendarPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)) // January 2024

  // Mock trip events
  const events: CalendarEvent[] = [
    { date: 4, title: 'PARIS TRIP', color: '#78716c' },
    { date: 9, title: 'SARIS 10', color: '#78716c' },
    { date: 15, title: '15 - 22', color: '#d6d3d1' },
    { date: 16, title: 'NYC - GETAWAY', color: '#78716c' },
    { date: 17, title: 'JAPAN ADVENTURE', color: '#d6d3d1' },
    { date: 28, title: 'NYC GETAWAY', color: '#78716c' }
  ]

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const calendarDays: (number | null)[] = []

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const getEventForDate = (date: number): CalendarEvent | undefined => {
    return events.find(event => event.date === date)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: '#1c1917', 
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Calendar View Screen / Screen 11
        </h1>

        {/* Calendar Container */}
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
            textAlign: 'center'
          }}>
            Calendar View
          </h2>

          {/* Month Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={previousMonth}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                color: '#57534e'
              }}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#1c1917',
              minWidth: '200px',
              textAlign: 'center'
            }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              onClick={nextMonth}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                color: '#57534e'
              }}
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div>
            {/* Day Headers */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {daysOfWeek.map(day => (
                <div key={day} style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#78716c',
                  padding: '0.5rem'
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '0.5rem'
            }}>
              {calendarDays.map((day, index) => {
                const event = day ? getEventForDate(day) : undefined
                return (
                  <div
                    key={index}
                    onClick={() => day && alert(`View trips for ${monthNames[currentDate.getMonth()]} ${day}`)}
                    style={{
                      minHeight: '80px',
                      padding: '0.5rem',
                      border: '2px solid #e7e5e4',
                      borderRadius: '0.5rem',
                      cursor: day ? 'pointer' : 'default',
                      background: day ? (event ? '#f5f5f4' : 'white') : '#fdfcfb',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => { 
                      if (day) {
                        e.currentTarget.style.borderColor = '#2d8b83'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(45,139,131,0.15)'
                      }
                    }}
                    onMouseLeave={(e) => { 
                      if (day) {
                        e.currentTarget.style.borderColor = '#e7e5e4'
                        e.currentTarget.style.boxShadow = 'none'
                      }
                    }}
                  >
                    {day && (
                      <>
                        <div style={{ 
                          fontSize: '0.95rem', 
                          fontWeight: 600,
                          color: '#1c1917',
                          marginBottom: '0.25rem'
                        }}>
                          {day}
                        </div>
                        {event && (
                          <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: event.color || '#78716c',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            marginTop: '0.25rem',
                            textAlign: 'center',
                            color: 'white'
                          }}>
                            {event.title}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
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
