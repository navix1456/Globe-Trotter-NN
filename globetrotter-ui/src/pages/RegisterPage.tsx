import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: '',
    additionalInfo: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        city: formData.city,
        country: formData.country,
      })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
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
      background: 'linear-gradient(135deg, #e85835 0%, #d43d22 100%)',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        padding: '3rem',
        width: '100%',
        maxWidth: '550px',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)'
      }}>
        {/* Photo Circle */}
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 2rem',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #e85835 0%, #f17d5f 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid #e7e5e4'
        }}>
          <User size={48} color="white" strokeWidth={2} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>
            Registration Screen
          </h1>
          <p style={{ color: '#78716c', fontSize: '1rem' }}>
            Create your account to start exploring
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
          {/* First Name & Last Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
          </div>

          {/* Email Address & Phone Number */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
          </div>

          {/* City & Country */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              Additional Information ....
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Tell us more about yourself and your travel preferences..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e7e5e4',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              onFocus={(e) => e.target.style.borderColor = '#e85835'}
              onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
            />
          </div>

          {/* Password & Confirm Password */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#1c1917', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e7e5e4',
                  borderRadius: '0.75rem',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e85835'}
                onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#a8a29e' : 'linear-gradient(135deg, #e85835 0%, #d43d22 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(232,88,53,0.3)'
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(232,88,53,0.4)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(232,88,53,0.3)' }}
          >
            {loading ? 'Creating account...' : 'Register Users'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e7e5e4'
        }}>
          <p style={{ color: '#78716c', fontSize: '0.95rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#e85835', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
