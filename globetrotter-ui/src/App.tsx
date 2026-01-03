import './App.css'

const featureCards = [
  {
    title: 'Authentication',
    description: 'Register, login, JWT guard, and protected route wrapper to unlock the dashboard.',
    badge: 'Slice 1',
    items: ['POST /api/auth register, login, me', 'Client auth context and redirects', 'Error states, toasts, and loaders'],
  },
  {
    title: 'Profile & Dashboard Landing',
    description: 'Polished landing after login with profile editing and popular destinations feed.',
    badge: 'Slice 2',
    items: ['Profile fetch/update', 'Dashboard hero + recent trips', 'Popular destinations surface'],
  },
  {
    title: 'Community & Sharing',
    description: 'Public trip feed with share/copy actions to showcase itineraries.',
    badge: 'Slice 3',
    items: ['Share token flow', 'Public trip view', 'Copy-to-my-trips CTA'],
  },
]

const swatches = [
  { label: 'Primary 500', color: 'var(--primary-500)', textColor: '#fdfcfb' },
  { label: 'Secondary 500', color: 'var(--secondary-500)', textColor: '#fdfcfb' },
  { label: 'Accent 400', color: 'var(--accent-400)', textColor: '#1c1917' },
  { label: 'Warm Neutral', color: 'var(--bg-secondary)', textColor: '#1c1917' },
]

function App() {
  return (
    <main className="page">
      <header className="hero">
        <div className="hero-content">
          <span className="eyebrow">Developer A • Auth · Profile · Community</span>
          <h1>GlobeTrotter — Sophisticated Explorer</h1>
          <p className="lede">
            Premium, end-to-end vertical slices with the earthy teal and terracotta palette. Design system is loaded;
            next we wire authentication and the dashboard flow.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Start auth flow</button>
            <button className="btn btn-ghost">Review vertical plan</button>
          </div>
          <div className="hero-meta">
            <span className="pill">Vite + React + TypeScript</span>
            <span className="pill">Design tokens applied</span>
            <span className="pill">Ready for protected routes</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Vertical slice focus</h2>
          <p className="muted">Each card is an end-to-end slice we own—from API to UI—using the premium theme.</p>
        </div>
        <div className="card-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="card">
              <span className="badge">{card.badge}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul className="checklist">
                {card.items.map((item) => (
                  <li key={item}>
                    <span className="dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Design system snapshot</h2>
          <p className="muted">Earthy teal base, warm terracotta accents, and gold highlights ready for reuse.</p>
        </div>
        <div className="design-card">
          <div className="swatches">
            {swatches.map((swatch) => (
              <div
                key={swatch.label}
                className="swatch"
                style={{ background: swatch.color, color: swatch.textColor }}
              >
                <span className="label">{swatch.label}</span>
                <span>{swatch.color}</span>
              </div>
            ))}
          </div>
          <div className="token-grid">
            <div className="token-item">
              <strong>Typography</strong>
              <br />
              Display: Playfair Display
              <br />
              Heading: Montserrat
              <br />
              Body: Inter
            </div>
            <div className="token-item">
              <strong>Spacing</strong>
              <br />
              8px base: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64.
            </div>
            <div className="token-item">
              <strong>Elevation</strong>
              <br />
              Layered cards with soft shadows for depth and premium feel.
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
