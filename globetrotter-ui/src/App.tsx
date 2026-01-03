import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import CreateTrip from './pages/CreateTrip';
import BuildItinerary from './pages/BuildItinerary';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Plan your perfect journey</span>
          <h1>GlobeTrotter</h1>
          <p className="lede">
            Create personalized travel itineraries, discover amazing destinations, and share your adventures with the world.
          </p>
          <div className="hero-actions">
            <a href="/trips/create" className="btn btn-primary">
              Plan a Trip
            </a>
            <a href="/explore" className="btn btn-ghost">
              Explore Destinations
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>How it works</h2>
          <p className="muted">Plan your trip in three simple steps</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Trip</h3>
            <p>Set your dates, budget, and initial destination to get started.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Build Your Itinerary</h3>
            <p>Add stops, accommodations, and activities to your journey.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Share & Explore</h3>
            <p>Share your plans with friends or discover trips from the community.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trips/create" element={<CreateTrip />} />
            <Route path="/trips/build" element={<BuildItinerary />} />
            <Route path="/trips" element={<div className="page-placeholder">My Trips - Coming Soon</div>} />
            <Route path="/explore" element={<div className="page-placeholder">Explore - Coming Soon</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
