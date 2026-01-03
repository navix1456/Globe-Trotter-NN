import { Routes, Route, useNavigate } from 'react-router-dom'
import { Globe, MapPin, Users, Shield, Compass, Heart, Share2, Menu, X, ChevronRight, Star, Award, Zap } from 'lucide-react'
import './App.css'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useState, useEffect } from 'react'

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const heroImages = [
    'https://yqtxgxkwrygjruitbytv.supabase.co/storage/v1/object/public/ODOO/Create_a_dynamic_1080p_202601030933-ezgif.com-crop.webp',
    'https://yqtxgxkwrygjruitbytv.supabase.co/storage/v1/object/public/ODOO/Create_a_cinematic_1080p_202601030921-ezgif.com-crop.webp',
    'https://yqtxgxkwrygjruitbytv.supabase.co/storage/v1/object/public/ODOO/Create_a_cinematic_1080p_202601030912-ezgif.com-crop.webp',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Globe size={32} className="logo-icon" />
            <span className="logo-text">GlobeTrotter</span>
          </div>

          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            {user && <a href="#my-trips" className="nav-link" onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>My Trips</a>}
          </div>

          <div className="nav-actions">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-nav btn-nav-primary">
                Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-nav btn-nav-ghost">
                  Sign In
                </button>
                <button onClick={() => navigate('/register')} className="btn-nav btn-nav-primary">
                  Get Started
                </button>
              </>
            )}
          </div>

          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section with Slideshow */}
      <section id="home" className="hero-landing">
        <div className="hero-slideshow">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="hero-overlay" />
        </div>

        <div className="hero-content-landing">
          <div className="hero-badge-landing">
            <Compass size={18} />
            <span>Your Journey, Perfected</span>
          </div>
          
          <h1 className="hero-title-landing">
            Discover the World <br />
            with <span className="text-gradient-landing">GlobeTrotter</span>
          </h1>
          
          <p className="hero-description-landing">
            Plan breathtaking adventures, connect with fellow travelers, and turn your 
            dream destinations into unforgettable memories. Start your journey today.
          </p>
          
          <div className="hero-actions-landing">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-hero btn-hero-primary">
                <Compass size={20} />
                Go to Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/register')} className="btn-hero btn-hero-primary">
                  <Compass size={20} />
                  Start Planning Free
                </button>
                <button onClick={() => navigate('/login')} className="btn-hero btn-hero-secondary">
                  Sign In
                </button>
              </>
            )}
          </div>

          <div className="slide-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`slide-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header-landing">
            <span className="section-badge">Why Choose GlobeTrotter</span>
            <h2 className="section-title-landing">Everything You Need for the Perfect Trip</h2>
            <p className="section-description-landing">
              From planning to sharing, we've got every aspect of your travel journey covered
            </p>
          </div>

          <div className="features-grid-landing">
            <div className="feature-card-landing">
              <div className="feature-icon-landing">
                <Shield size={32} />
              </div>
              <h3>Secure & Private</h3>
              <p>Your travel plans and personal data are protected with enterprise-grade security and encryption</p>
              <span className="feature-badge badge-success">Active</span>
            </div>

            <div className="feature-card-landing">
              <div className="feature-icon-landing feature-icon-secondary">
                <Heart size={32} />
              </div>
              <h3>Smart Recommendations</h3>
              <p>Get personalized destination suggestions based on your preferences, budget, and travel style</p>
              <span className="feature-badge badge-warning">Coming Soon</span>
            </div>

            <div className="feature-card-landing">
              <div className="feature-icon-landing feature-icon-accent">
                <Share2 size={32} />
              </div>
              <h3>Community Driven</h3>
              <p>Share your itineraries and discover amazing trips created by fellow travelers worldwide</p>
              <span className="feature-badge badge-info">Beta</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header-landing">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title-landing">How GlobeTrotter Works</h2>
            <p className="section-description-landing">
              Get started in minutes and plan your perfect trip in 3 easy steps
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <Users size={32} />
              </div>
              <h3>Create Your Account</h3>
              <p>Sign up for free and set your travel preferences to get personalized recommendations</p>
              <ChevronRight className="step-arrow" size={24} />
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <MapPin size={32} />
              </div>
              <h3>Plan Your Journey</h3>
              <p>Browse destinations, create itineraries, and collaborate with friends on your trip</p>
              <ChevronRight className="step-arrow" size={24} />
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <Globe size={32} />
              </div>
              <h3>Explore & Share</h3>
              <p>Discover hidden gems, share your experiences, and inspire other travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header-landing">
            <span className="section-badge">What Travelers Say</span>
            <h2 className="section-title-landing">Loved by Thousands of Travelers</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "GlobeTrotter made planning our European vacation so easy! The community features 
                helped us discover hidden gems we never would have found on our own."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div>
                  <div className="author-name">Sarah Martinez</div>
                  <div className="author-location">New York, USA</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "The best travel planning platform I've used. Love how I can share my itineraries 
                with friends and get real-time updates. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JC</div>
                <div>
                  <div className="author-name">James Chen</div>
                  <div className="author-location">Singapore</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "As a solo traveler, GlobeTrotter's community feature has been amazing. I've met 
                so many wonderful people and gotten incredible travel tips!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">EP</div>
                <div>
                  <div className="author-name">Emma Patel</div>
                  <div className="author-location">London, UK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <Award size={40} className="stat-icon" />
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-card">
              <Globe size={40} className="stat-icon" />
              <div className="stat-number">150+</div>
              <div className="stat-label">Countries Covered</div>
            </div>
            <div className="stat-card">
              <MapPin size={40} className="stat-icon" />
              <div className="stat-number">50K+</div>
              <div className="stat-label">Trips Planned</div>
            </div>
            <div className="stat-card">
              <Zap size={40} className="stat-icon" />
              <div className="stat-number">4.9★</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Adventure?</h2>
            <p>Join thousands of travelers who trust GlobeTrotter to plan their perfect journeys</p>
            {!user && (
              <button onClick={() => navigate('/register')} className="btn-cta">
                <Compass size={24} />
                Create Free Account
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <div className="footer-logo">
                <Globe size={32} />
                <span>GlobeTrotter</span>
              </div>
              <p className="footer-description">
                Your companion in creating unforgettable travel experiences around the world.
              </p>
            </div>

            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#pricing">Pricing</a>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 GlobeTrotter. All rights reserved.</p>
            <div className="footer-social">
              <span>Follow us:</span>
              <a href="#twitter" aria-label="Twitter">Twitter</a>
              <a href="#instagram" aria-label="Instagram">Instagram</a>
              <a href="#facebook" aria-label="Facebook">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
