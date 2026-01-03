import { useAuth } from '../contexts/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-content">
          <span className="eyebrow">Dashboard</span>
          <h1>Welcome back, {user?.firstName}!</h1>
          <p className="lede">Your travel planning hub is ready.</p>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Your Trips</h2>
          <p className="muted">Plan and manage your journeys</p>
        </div>
        <div className="card">
          <p>Trips coming soon...</p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Popular Destinations</h2>
          <p className="muted">Explore trending travel spots</p>
        </div>
        <div className="card">
          <p>Destinations coming soon...</p>
        </div>
      </section>
    </div>
  )
}
