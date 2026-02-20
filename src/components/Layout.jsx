import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { loadData } from '../data/store';

export default function Layout() {
  const data = loadData();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <nav className="nav-container">
          <NavLink to="/" className="nav-logo" onClick={closeMenu}>
            {data.resume.name}
          </NavLink>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <ul className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
            <li>
              <NavLink to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/resume" onClick={closeMenu}>
                Resume
              </NavLink>
            </li>
          </ul>

          <div className="nav-socials">
            {data.resume.github && (
              <a href={data.resume.github} target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>
            )}
            {data.resume.linkedin && (
              <a href={data.resume.linkedin} target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <div className="cta-banner">
        <div className="cta-inner">
          <h3 className="cta-heading">Start a project</h3>
          <p className="cta-text">
            Interested in working together? We should queue up a time to chat.
            I'll buy the coffee.
          </p>
          <a href={`mailto:${data.resume.email}`} className="cta-button">
            Let's do this
          </a>
        </div>
      </div>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {data.resume.name}. Built with React.</p>
      </footer>
    </div>
  );
}
