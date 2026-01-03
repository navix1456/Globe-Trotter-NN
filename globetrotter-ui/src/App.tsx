import { Routes, Route, useNavigate } from 'react-router-dom'
import { Globe, MapPin, Users, Shield, Compass, Heart, Share2, Menu, X, ChevronRight, Star, Award, Zap, ArrowRight, Play } from 'lucide-react'
import './App.css'
import './animations.css'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import CommunityPage from './pages/CommunityPage'
import CreateTripPage from './pages/CreateTripPage'
import BuildItineraryPage from './pages/BuildItineraryPage'
import TripListingPage from './pages/TripListingPage'
import SearchPage from './pages/SearchPage'
import ItineraryViewPage from './pages/ItineraryViewPage'
import CalendarPage from './pages/CalendarPage'
import AdminPanelPage from './pages/AdminPanelPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useState, useEffect } from 'react'

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([false, false, false])

  const heroImages = [
    'https://yqtxgxkwrygjruitbytv.supabase.co/storage/v1/object/public/ODOO/Create_a_dynamic_1080p_202601030933-ezgif.com-crop.webp',
    'https://yqtxgxkwrygjruitbytv.supabase.co/storage/v1/object/public/ODOO/Create_a_cinematic_1080p_202601030921-ezgif.com-crop.webp',
    'https://yqtxgxkwrygjruitbytv.supabase.co/storage/v1/object/public/ODOO/Create_a_cinematic_1080p_202601030912-ezgif.com-crop.webp',
  ]

  const featuredTrips = [
    {
      id: 1,
      title: 'European Adventure',
      description: 'Explore historic cities and cultural landmarks',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 234,
      duration: '14 days'
    },
    {
      id: 2,
      title: 'Asian Escapade',
      description: 'Journey through temples and vibrant markets',
      image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 456,
      duration: '21 days'
    },
    {
      id: 3,
      title: 'Beach Paradise',
      description: 'Relax on pristine beaches and crystal waters',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 189,
      duration: '7 days'
    }
  ]

  const testimonialUsers = [
    {
      id: 1,
      name: 'Sarah Martinez',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'GlobeTrotter made planning our European vacation so easy! The community features helped us discover hidden gems we never would have found.',
      rating: 5
    },
    {
      id: 2,
      name: 'James Chen',
      location: 'Singapore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      text: 'The best travel planning platform I\'ve used. Love how I can share itineraries with friends and get real-time updates.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Patel',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      text: 'As a solo traveler, GlobeTrotter\'s community feature has been amazing. I\'ve met wonderful people and gotten incredible travel tips!',
      rating: 5
    }
  ]

  // Preload images
  useEffect(() => {
    heroImages.forEach((src, index) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageLoaded(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector((e.currentTarget as HTMLAnchorElement).getAttribute('href')!)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
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
                <Compass size={18} />
                Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-nav btn-nav-ghost">
                  Sign In
                </button>
                <button onClick={() => navigate('/register')} className="btn-nav btn-nav-primary">
                  <ArrowRight size={18} />
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

      {/* Hero Section with Enhanced Slideshow */}
      <section id="home" className="hero-landing">
        <div className="hero-slideshow">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`hero-slide ${index === currentImageIndex ? 'active' : ''} ${imageLoaded[index] ? 'loaded' : ''}`}
            >
              <div 
                className="hero-slide-image"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
          <div className="hero-overlay" />
          <div className="hero-pattern" />
        </div>

        <div className="hero-content-landing">
          <div className="hero-badge-landing animate-fade-in">
            <Compass size={18} />
            <span>Your Journey, Perfected</span>
          </div>
          
          <h1 className="hero-title-landing animate-fade-in-up">
            Discover the World <br />
            with <span className="text-gradient-landing">GlobeTrotter</span>
          </h1>
          
          <p className="hero-description-landing animate-fade-in-up delay-1">
            Plan breathtaking adventures, connect with fellow travelers, and turn your 
            dream destinations into unforgettable memories. Start your journey today.
          </p>
          
          <div className="hero-actions-landing animate-fade-in-up delay-2">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-hero btn-hero-primary pulse-on-hover">
                <Compass size={20} />
                Go to Dashboard
                <ArrowRight size={20} />
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/register')} className="btn-hero btn-hero-primary pulse-on-hover">
                  <Compass size={20} />
                  Start Planning Free
                  <ArrowRight size={20} />
                </button>
                <button onClick={() => navigate('/login')} className="btn-hero btn-hero-secondary">
                  <Play size={18} />
                  Watch Demo
                </button>
              </>
            )}
          </div>

          <div className="slide-indicators animate-fade-in-up delay-3">
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

      {/* Trust Banner */}
      <section className="trust-banner scroll-reveal">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <Shield size={24} />
              <span>100% Secure</span>
            </div>
            <div className="trust-item">
              <Users size={24} />
              <span>10K+ Travelers</span>
            </div>
            <div className="trust-item">
              <Star size={24} />
              <span>4.9/5 Rating</span>
            </div>
            <div className="trust-item">
              <Globe size={24} />
              <span>150+ Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header-landing scroll-reveal">
            <span className="section-badge">Why Choose GlobeTrotter</span>
            <h2 className="section-title-landing">Everything You Need for the Perfect Trip</h2>
            <p className="section-description-landing">
              From planning to sharing, we've got every aspect of your travel journey covered
            </p>
          </div>

          <div className="features-grid-landing">
            <div className="feature-card-landing scroll-reveal hover-lift">
              <div className="feature-card-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop)' }}></div>
              <div className="feature-card-overlay"></div>
              <div className="feature-card-content">
                <div className="feature-icon-landing">
                  <Shield size={32} />
                </div>
                <h3>Secure & Private</h3>
                <p>Your travel plans and personal data are protected with enterprise-grade security and encryption</p>
                <span className="feature-badge badge-success">Active</span>
              </div>
            </div>

            <div className="feature-card-landing scroll-reveal hover-lift delay-1">
              <div className="feature-card-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop)' }}></div>
              <div className="feature-card-overlay"></div>
              <div className="feature-card-content">
                <div className="feature-icon-landing feature-icon-secondary">
                  <Heart size={32} />
                </div>
                <h3>Smart Recommendations</h3>
                <p>Get personalized destination suggestions based on your preferences, budget, and travel style</p>
                <span className="feature-badge badge-warning">Coming Soon</span>
              </div>
            </div>

            <div className="feature-card-landing scroll-reveal hover-lift delay-2">
              <div className="feature-card-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop)' }}></div>
              <div className="feature-card-overlay"></div>
              <div className="feature-card-content">
                <div className="feature-icon-landing feature-icon-accent">
                  <Share2 size={32} />
                </div>
                <h3>Community Driven</h3>
                <p>Share your itineraries and discover amazing trips created by fellow travelers worldwide</p>
                <span className="feature-badge badge-info">Beta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header-landing scroll-reveal">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title-landing">How GlobeTrotter Works</h2>
            <p className="section-description-landing">
              Get started in minutes and plan your perfect trip in 3 easy steps
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card scroll-reveal hover-lift">
              <div className="step-image-wrapper">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop" alt="Create Account" className="step-image" />
                <div className="step-number">01</div>
              </div>
              <div className="step-content">
                <div className="step-icon">
                  <Users size={32} />
                </div>
                <h3>Create Your Account</h3>
                <p>Sign up for free and set your travel preferences to get personalized recommendations</p>
              </div>
              <ChevronRight className="step-arrow" size={24} />
            </div>

            <div className="step-card scroll-reveal hover-lift delay-1">
              <div className="step-image-wrapper">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop" alt="Plan Journey" className="step-image" />
                <div className="step-number">02</div>
              </div>
              <div className="step-content">
                <div className="step-icon">
                  <MapPin size={32} />
                </div>
                <h3>Plan Your Journey</h3>
                <p>Browse destinations, create itineraries, and collaborate with friends on your trip</p>
              </div>
              <ChevronRight className="step-arrow" size={24} />
            </div>

            <div className="step-card scroll-reveal hover-lift delay-2">
              <div className="step-image-wrapper">
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=250&fit=crop" alt="Explore Share" className="step-image" />
                <div className="step-number">03</div>
              </div>
              <div className="step-content">
                <div className="step-icon">
                  <Globe size={32} />
                </div>
                <h3>Explore & Share</h3>
                <p>Discover hidden gems, share your experiences, and inspire other travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Trips Section */}
      <section className="featured-trips-section scroll-reveal">
        <div className="container">
          <div className="section-header-landing scroll-reveal">
            <span className="section-badge">Explore Popular Destinations</span>
            <h2 className="section-title-landing">Featured Trip Experiences</h2>
            <p className="section-description-landing">
              Discover inspiring journeys created by our community travelers
            </p>
          </div>

          <div className="trips-showcase-grid">
            {featuredTrips.map((trip) => (
              <div key={trip.id} className="trip-showcase-card scroll-reveal hover-lift">
                <div className="trip-image-wrapper">
                  <img src={trip.image} alt={trip.title} className="trip-image" />
                  <div className="trip-overlay">
                    <button className="btn-view-trip" onClick={() => navigate('/community')}>
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="trip-content">
                  <div className="trip-meta">
                    <span className="trip-duration">📅 {trip.duration}</span>
                    <span className="trip-rating">⭐ {trip.rating} ({trip.reviewCount})</span>
                  </div>
                  <h3 className="trip-title">{trip.title}</h3>
                  <p className="trip-description">{trip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Popular Destinations */}
      <section className="gallery-section scroll-reveal">
        <div className="container">
          <div className="section-header-landing scroll-reveal">
            <span className="section-badge">Inspiration Gallery</span>
            <h2 className="section-title-landing">Explore Breathtaking Destinations</h2>
            <p className="section-description-landing">
              Get inspired by stunning locations our travelers have discovered
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item gallery-item-large scroll-reveal hover-lift">
              <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop" alt="Parisian Streets" />
              <div className="gallery-overlay">
                <h3>Parisian Charm</h3>
                <p>12 days</p>
              </div>
            </div>

            <div className="gallery-item scroll-reveal hover-lift delay-1">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" alt="Mountain Peak" />
              <div className="gallery-overlay">
                <h3>Alpine Adventure</h3>
                <p>8 days</p>
              </div>
            </div>

            <div className="gallery-item scroll-reveal hover-lift delay-2">
              <img src="https://images.unsplash.com/photo-1512207736139-c3c1b2db3a00?w=400&h=400&fit=crop" alt="Tropical Beach" />
              <div className="gallery-overlay">
                <h3>Tropical Paradise</h3>
                <p>7 days</p>
              </div>
            </div>

            <div className="gallery-item scroll-reveal hover-lift delay-1">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=400&fit=crop" alt="City Lights" />
              <div className="gallery-overlay">
                <h3>Metropolitan Wonder</h3>
                <p>5 days</p>
              </div>
            </div>

            <div className="gallery-item gallery-item-large scroll-reveal hover-lift delay-2">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop" alt="Desert Sunset" />
              <div className="gallery-overlay">
                <h3>Desert Exploration</h3>
                <p>6 days</p>
              </div>
            </div>

            <div className="gallery-item scroll-reveal hover-lift delay-1">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" alt="Ocean Wave" />
              <div className="gallery-overlay">
                <h3>Coastal Escape</h3>
                <p>10 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section scroll-reveal">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Adventure?</h2>
            <p>Join thousands of travelers who trust GlobeTrotter to plan their perfect journeys</p>
            {!user && (
              <button onClick={() => navigate('/register')} className="btn-cta pulse-on-hover">
                <Compass size={24} />
                Create Free Account
                <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Images */}
      <section id="testimonials" className="testimonials-section-enhanced scroll-reveal">
        <div className="container">
          <div className="section-header-landing scroll-reveal">
            <span className="section-badge">What Travelers Say</span>
            <h2 className="section-title-landing">Loved by Travelers Worldwide</h2>
            <p className="section-description-landing">
              Join thousands who have transformed their travel experiences with GlobeTrotter
            </p>
          </div>

          <div className="testimonials-enhanced-grid">
            {testimonialUsers.map((user, idx) => (
              <div key={user.id} className={`testimonial-card-enhanced scroll-reveal hover-lift ${idx === 1 ? 'delay-1' : idx === 2 ? 'delay-2' : ''}`}>
                <div className="testimonial-header-enhanced">
                  <img src={user.image} alt={user.name} className="user-avatar-image" />
                  <div className="user-info-enhanced">
                    <h4 className="user-name-enhanced">{user.name}</h4>
                    <p className="user-location-enhanced">📍 {user.location}</p>
                  </div>
                </div>
                <div className="stars-enhanced">
                  {[...Array(user.rating)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <p className="testimonial-text-enhanced">"{user.text}"</p>
                <div className="testimonial-badge">Verified Traveler</div>
              </div>
            ))}
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
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <CommunityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-trip"
        element={
          <ProtectedRoute>
            <CreateTripPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/build-itinerary"
        element={
          <ProtectedRoute>
            <BuildItineraryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <TripListingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/itinerary-view"
        element={
          <ProtectedRoute>
            <ItineraryViewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanelPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
