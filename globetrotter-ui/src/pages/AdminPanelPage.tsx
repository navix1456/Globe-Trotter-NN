import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Users, MapPin, Activity, TrendingUp } from 'lucide-react'
import Header from '../components/Header'

export default function AdminPanelPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'users' | 'cities' | 'activities' | 'trends'>('users')

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: '#1c1917', 
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Admin Panel Screen / Screen 12
        </h1>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {/* Tab Navigation */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setActiveTab('users')}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #e7e5e4',
                  background: activeTab === 'users' ? 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)' : 'white',
                  color: activeTab === 'users' ? 'white' : '#57534e',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Users size={18} />
                Manage Users
              </button>
              <button
                onClick={() => setActiveTab('cities')}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #e7e5e4',
                  background: activeTab === 'cities' ? 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)' : 'white',
                  color: activeTab === 'cities' ? 'white' : '#57534e',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MapPin size={18} />
                Popular cities
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #e7e5e4',
                  background: activeTab === 'activities' ? 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)' : 'white',
                  color: activeTab === 'activities' ? 'white' : '#57534e',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Activity size={18} />
                Popular Activities
              </button>
              <button
                onClick={() => setActiveTab('trends')}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #e7e5e4',
                  background: activeTab === 'trends' ? 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)' : 'white',
                  color: activeTab === 'trends' ? 'white' : '#57534e',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <TrendingUp size={18} />
                User Trends and Analytics
              </button>
            </div>

            {/* Content Area with Charts Placeholder */}
            <div style={{
              background: 'white',
              borderRadius: '1.5rem',
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              padding: '3rem',
              minHeight: '500px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                {/* Pie Chart Placeholder */}
                <div style={{
                  background: '#f5f5f4',
                  borderRadius: '1rem',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '250px'
                }}>
                  <div style={{ textAlign: 'center', color: '#a8a29e' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
                    <div style={{ fontWeight: 600 }}>Pie Chart Visualization</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>User Distribution</div>
                  </div>
                </div>

                {/* Bar Chart Placeholder */}
                <div style={{
                  background: '#f5f5f4',
                  borderRadius: '1rem',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '250px'
                }}>
                  <div style={{ textAlign: 'center', color: '#a8a29e' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📈</div>
                    <div style={{ fontWeight: 600 }}>Bar Chart Visualization</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Activity Stats</div>
                  </div>
                </div>
              </div>

              {/* Line Chart Placeholder */}
              <div style={{
                background: '#f5f5f4',
                borderRadius: '1rem',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '250px'
              }}>
                <div style={{ textAlign: 'center', color: '#a8a29e' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📉</div>
                  <div style={{ fontWeight: 600 }}>Line Chart Visualization</div>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Trend Analysis Over Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div style={{ width: '350px', flexShrink: 0 }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              border: '3px solid #e7e5e4',
              padding: '2rem',
              position: 'sticky',
              top: '120px'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '1.5rem'
              }}>
                {activeTab === 'users' && 'Manage User Section:'}
                {activeTab === 'cities' && 'Popular cities:'}
                {activeTab === 'activities' && 'Popular Activities:'}
                {activeTab === 'trends' && 'User Trends and Analytics:'}
              </h3>
              
              <div style={{
                fontSize: '0.95rem',
                color: '#57534e',
                lineHeight: '1.8'
              }}>
                {activeTab === 'users' && (
                  <p>
                    This Section is responsible for the managing the users, and their actions. 
                    This section will also allow the access to the view of the trips made by the users.
                  </p>
                )}
                {activeTab === 'cities' && (
                  <p>
                    Lists all the popular cities where the users are visiting based on the current user trends.
                  </p>
                )}
                {activeTab === 'activities' && (
                  <p>
                    Lists all the popular activities that the users are doing based on the current user trend data.
                  </p>
                )}
                {activeTab === 'trends' && (
                  <p>
                    This section will major focus on the providing analysis accross various points and give useful information to the user.
                  </p>
                )}
              </div>
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
