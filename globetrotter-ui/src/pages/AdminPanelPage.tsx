import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Users, MapPin, Activity, TrendingUp, Search, Filter, SlidersHorizontal } from 'lucide-react'
import Header from '../components/Header'

export default function AdminPanelPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'users' | 'cities' | 'activities' | 'trends'>('users')
  const [searchQuery, setSearchQuery] = useState('')
  const [groupBy, setGroupBy] = useState('Segment')
  const [filterBy, setFilterBy] = useState('All')
  const [sortBy, setSortBy] = useState('Recent')

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfb' }}>
      <Header />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>Admin Panel Screen / Screen 12</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Monitor users, destinations, and trends with quick grouping, filtering, and sorting controls.</p>
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.85rem 1rem',
          background: 'white',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontWeight: 700, color: '#1f2937', minWidth: '140px' }}>GlobalTrotter</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '0.5rem 0.75rem', background: '#f9fafb' }}>
            <Search size={16} color="#6b7280" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bar ..."
              style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent', fontSize: '0.95rem', color: '#111827' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#374151' }}>Group by</label>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} style={{ padding: '0.45rem 0.75rem', borderRadius: '0.6rem', border: '1px solid #e5e7eb', background: 'white' }}>
              <option>Segment</option>
              <option>Region</option>
              <option>Activity</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.9rem', borderRadius: '0.6rem', border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontWeight: 600 }}>
              <Filter size={16} />
              {filterBy}
            </button>
            <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.9rem', borderRadius: '0.6rem', border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontWeight: 600 }}>
              <SlidersHorizontal size={16} />
              Sort by {sortBy}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {/* Tab Navigation */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              marginBottom: '1.5rem',
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
              border: '1px solid #e5e7eb',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              padding: '2.5rem',
              minHeight: '540px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#1f2937' }}>Overview</span>
                <span style={{ padding: '0.35rem 0.65rem', background: '#f3f4f6', borderRadius: '0.65rem', color: '#4b5563', fontSize: '0.9rem' }}>Live snapshot</span>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#2d8b83', display: 'inline-block' }} /> Users</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#f97316', display: 'inline-block' }} /> Activities</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#10b981', display: 'inline-block' }} /> Cities</span>
                </div>
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                View set • Group: {groupBy} · Filter: {filterBy} · Sort: {sortBy} · Search: {searchQuery || 'All'}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
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
                minHeight: '230px'
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
          <aside style={{ width: '350px', flexShrink: 0 }}>
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
          </aside>
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
