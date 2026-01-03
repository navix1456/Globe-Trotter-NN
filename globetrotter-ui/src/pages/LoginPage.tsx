import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Backend still expects email, so we use username as email
      await login(username, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2d8b83 0%, #1d5854 100%)',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)'
      }}>
        {/* Photo Circle */}
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 2rem',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2d8b83 0%, #4db0a8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid #e7e5e4'
        }}>
          <User size={48} color="white" strokeWidth={2} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>
            Login Screen
          </h1>
          <p style={{ color: '#78716c', fontSize: '1rem' }}>
            Sign in to continue your journey
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '0.75rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#1c1917',
              marginBottom: '0.5rem',
              fontSize: '0.95rem'
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
              required
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e7e5e4',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2d8b83'}
              onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#1c1917',
              marginBottom: '0.5rem',
              fontSize: '0.95rem'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e7e5e4',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2d8b83'}
              onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#a8a29e' : 'linear-gradient(135deg, #2d8b83 0%, #236f69 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(45,139,131,0.3)'
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(45,139,131,0.4)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(45,139,131,0.3)' }}
          >
            {loading ? 'Signing in...' : 'Login Button'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e7e5e4'
        }}>
          <p style={{ color: '#78716c', fontSize: '0.95rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2d8b83', fontWeight: 600, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
          <p style={{ color: '#a8a29e', fontSize: '0.875rem', marginTop: '1rem' }}>
            <strong>Demo:</strong> demo@globetrotter.app / demo123
          </p>
        </div>
      </div>
    </div>
  )
}
