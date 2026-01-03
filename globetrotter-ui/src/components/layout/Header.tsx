import { Link, useLocation } from 'react-router-dom';
import { Globe, User } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <Globe className="logo-icon" />
          <span className="logo-text">GlobeTrotter</span>
        </Link>

        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/trips"
            className={`nav-link ${location.pathname.startsWith('/trips') ? 'active' : ''}`}
          >
            My Trips
          </Link>
          <Link
            to="/explore"
            className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`}
          >
            Explore
          </Link>
        </nav>

        <div className="header-actions">
          <button className="avatar-btn">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
