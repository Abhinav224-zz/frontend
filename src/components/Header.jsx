import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          ShopHub
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <span className="nav-link" style={{ color: 'var(--text-secondary)' }}>
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="btn btn-primary"
                style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

