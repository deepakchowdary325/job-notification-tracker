import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavShell = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Saved', path: '/saved' },
    { name: 'Digest', path: '/digest' },
    { name: 'Settings', path: '/settings' },
    { name: 'Proof', path: '/proof' },
  ];

  return (
    <div className="nav-shell">
      <nav className="top-nav">
        <div className="container flex items-center justify-between">
          <Link to="/" className="brand">Job Notification Tracker</Link>

          {/* Desktop Nav */}
          <div className="desktop-links flex gap-24">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="container">
        {children}
      </main>

      <style jsx>{`
        .nav-shell {
          min-height: 100vh;
        }
        .top-nav {
          height: 80px;
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
        }
        .brand {
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 20px;
          color: var(--text);
        }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.6);
          padding: 8px 0;
          position: relative;
          transition: color var(--transition);
        }
        .nav-link.active {
          color: var(--text);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
        }
        
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          padding: 4px;
        }
        .bar {
          width: 24px;
          height: 1px;
          background: var(--text);
          transition: all 0.3s ease;
        }
        
        .mobile-menu {
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          padding: var(--s-16) var(--s-24);
          display: flex;
          flex-direction: column;
          gap: var(--s-16);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .mobile-link {
          font-size: 16px;
          font-weight: 500;
          color: var(--text);
        }

        @media (max-width: 768px) {
          .desktop-links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
          .nav-shell {
             padding-bottom: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default NavShell;
