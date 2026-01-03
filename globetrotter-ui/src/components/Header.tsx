import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Search, Filter, Menu, X, User as UserIcon, LogOut, Calendar as CalendarIcon, Compass, Users } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  return (
    <>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '2px solid #e7e5e4',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              color: '#2d8b83',
              transition: 'transform 0.2s',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {menuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>

          {/* Logo */}
          <div style={{ 
            fontSize: '1.75rem', 
            fontWeight: 800, 
            color: '#2d8b83', 
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            flexShrink: 0
          }}
          onClick={() => navigate('/dashboard')}>
            GlobeTrotter
          </div>
          
          {/* Search Bar */}
          <div style={{ flex: 1, position: 'relative', maxWidth: '600px' }}>
            <Search size={18} color="#78716c" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
            <input
              type="text"
              placeholder="Search here......"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                border: '2px solid #e7e5e4',
                borderRadius: '0.75rem',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2d8b83'}
              onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
            />
          </div>
          
          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0, marginLeft: 'auto' }}>
            <button style={{
              padding: '0.75rem 1.25rem',
              background: 'white',
              border: '2px solid #e7e5e4',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#57534e',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = '#2d8b83'
              e.currentTarget.style.background = 'rgba(45,139,131,0.05)'
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = '#e7e5e4'
              e.currentTarget.style.background = 'white'
            }}>
              Group by
            </button>
            <button style={{
              padding: '0.75rem 1.25rem',
              background: 'white',
              border: '2px solid #e7e5e4',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#57534e',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = '#2d8b83'
              e.currentTarget.style.background = 'rgba(45,139,131,0.05)'
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = '#e7e5e4'
              e.currentTarget.style.background = 'white'
            }}>
              <Filter size={16} />
              Filter
            </button>
            <button style={{
              padding: '0.75rem 1.25rem',
              background: 'white',
              border: '2px solid #e7e5e4',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#57534e',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = '#2d8b83'
              e.currentTarget.style.background = 'rgba(45,139,131,0.05)'
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = '#e7e5e4'
              e.currentTarget.style.background = 'white'
            }}>
              Sort by...
            </button>
          </div>

          {/* Profile Avatar with Dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                background: 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
                border: 'none',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(45,139,131,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,139,131,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45,139,131,0.3)'
              }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '60px',
                right: 0,
                background: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                border: '2px solid #e7e5e4',
                minWidth: '220px',
                zIndex: 150,
                overflow: 'hidden'
              }}>
                {/* User Info Section */}
                <div style={{ 
                  padding: '1rem',
                  borderBottom: '2px solid #e7e5e4',
                  background: 'linear-gradient(135deg, rgba(45,139,131,0.05) 0%, rgba(77,176,168,0.05) 100%)'
                }}>
                  <div style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#78716c' }}>
                    {user?.email}
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ padding: '0.5rem' }}>
                  <button
                    onClick={() => { 
                      navigate('/profile')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#57534e',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45,139,131,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <UserIcon size={18} />
                    View Profile
                  </button>
                  <button
                    onClick={() => { 
                      navigate('/trips')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#57534e',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45,139,131,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <CalendarIcon size={18} />
                    My Trips
                  </button>
                </div>

                {/* Logout Section */}
                <div style={{ padding: '0.5rem', borderTop: '2px solid #e7e5e4' }}>
                  <button
                    onClick={() => {
                      logout()
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#e85835',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(232,88,53,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: menuOpen ? 0 : '-100%',
        height: '100vh',
        width: '320px',
        background: 'white',
        boxShadow: menuOpen ? '4px 0 20px rgba(0,0,0,0.15)' : 'none',
        transition: 'left 0.3s ease-in-out',
        zIndex: 200,
        padding: '2rem',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#78716c'
          }}
        >
          <X size={24} />
        </button>

        {/* User Info */}
        <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.25rem'
            }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#1c1917', fontSize: '1rem' }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{ color: '#78716c', fontSize: '0.875rem' }}>
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => { navigate('/dashboard'); setMenuOpen(false) }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '0.75rem',
              textAlign: 'left',
              transition: 'transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <Compass size={20} />
            Dashboard
          </button>
          <button
            onClick={() => { navigate('/profile'); setMenuOpen(false) }}
            style={{
              width: '100%',
              background: 'white',
              color: '#57534e',
              border: '2px solid #e7e5e4',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '0.75rem',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.background = 'rgba(45,139,131,0.1)'
              e.currentTarget.style.borderColor = '#2d8b83'
              e.currentTarget.style.transform = 'translateX(5px)'
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = '#e7e5e4'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <UserIcon size={20} />
            Profile
          </button>
          <button
            onClick={() => { navigate('/community'); setMenuOpen(false) }}
            style={{
              width: '100%',
              background: 'white',
              color: '#57534e',
              border: '2px solid #e7e5e4',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '0.75rem',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.background = 'rgba(45,139,131,0.1)'
              e.currentTarget.style.borderColor = '#2d8b83'
              e.currentTarget.style.transform = 'translateX(5px)'
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = '#e7e5e4'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <Users size={20} />
            Community
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '2px', background: '#e7e5e4', margin: '2rem 0' }} />

        {/* Additional Menu Items */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => { navigate('/trips'); setMenuOpen(false) }}
            style={{
              width: '100%',
              background: 'white',
              color: '#57534e',
              border: 'none',
              padding: '0.875rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '0.5rem',
              textAlign: 'left',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45,139,131,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
          >
            My Trips
          </button>
          <button
            onClick={() => { navigate('/calendar'); setMenuOpen(false) }}
            style={{
              width: '100%',
              background: 'white',
              color: '#57534e',
              border: 'none',
              padding: '0.875rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '0.5rem',
              textAlign: 'left',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45,139,131,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
          >
            Calendar
          </button>
          <button
            onClick={() => { navigate('/search'); setMenuOpen(false) }}
            style={{
              width: '100%',
              background: 'white',
              color: '#57534e',
              border: 'none',
              padding: '0.875rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '0.5rem',
              textAlign: 'left',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45,139,131,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
          >
            Search
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '2px', background: '#e7e5e4', margin: '2rem 0' }} />

        {/* Sign Out Button */}
        <button
          onClick={() => { logout(); setMenuOpen(false) }}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #e85835 0%, #d43d22 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '0.75rem',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(232,88,53,0.3)'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,88,53,0.4)'
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,88,53,0.3)'
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Menu Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 150,
            transition: 'opacity 0.3s'
          }}
        />
      )}

      {/* Profile Dropdown Overlay */}
      {profileDropdownOpen && (
        <div
          onClick={() => setProfileDropdownOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 140
          }}
        />
      )}
    </>
  )
}
