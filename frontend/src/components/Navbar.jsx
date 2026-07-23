import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, User, LogOut, FileText, LayoutDashboard } from 'lucide-react';
import api from '../services/api';
import { logoutUser } from '../services/storageService';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post('/logout.php');
    } catch (err) {
      console.log('Session cleared locally.');
    }
    logoutUser();
    setUser(null);
    navigate('/login');
  };


  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(11, 15, 25, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.85rem 0'
    }}>
      <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '1.4rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          flexShrink: 0
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.5)'
          }}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <span>CVForge <span style={{ color: '#818cf8' }}>AI</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
          <li><Link to="/templates" className={isActive('/templates')}>Templates</Link></li>
          <li><Link to="/pricing" className={isActive('/pricing')}>Pricing</Link></li>
          <li><a href="#faq" className="nav-link">FAQ</a></li>
          {user && (
            <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
          )}
        </ul>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Link to="/dashboard" className="btn-secondary hide-mobile" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <LayoutDashboard size={16} /> My CVs
              </Link>
              <button onClick={handleLogout} className="btn-ghost hide-mobile" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn-ghost hide-mobile" style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                Sign In
              </Link>
              <Link to="/create-cv" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
                <Sparkles size={16} /> Create My CV
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '0.4rem',
              cursor: 'pointer'
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0d1322',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxHeight: 'calc(100vh - 70px)',
          overflowY: 'auto'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#ffffff', fontWeight: 600, padding: '0.4rem 0' }}>Home</Link>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', fontWeight: 500, padding: '0.4rem 0' }}>Features</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', fontWeight: 500, padding: '0.4rem 0' }}>How It Works</a>
          <Link to="/templates" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', fontWeight: 500, padding: '0.4rem 0' }}>Templates</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', fontWeight: 500, padding: '0.4rem 0' }}>Pricing</Link>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', fontWeight: 500, padding: '0.4rem 0' }}>FAQ</a>
          
          {user && (
            <>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.5rem 0' }} />
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ color: '#ffffff', fontWeight: 600, padding: '0.4rem 0' }}>
                <LayoutDashboard size={16} style={{ marginRight: '0.5rem' }} /> Dashboard
              </Link>
              <Link to="/create-cv" onClick={() => setMobileMenuOpen(false)} style={{ color: '#ffffff', fontWeight: 600, padding: '0.4rem 0' }}>
                <FileText size={16} style={{ marginRight: '0.5rem' }} /> Create New CV
              </Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: 'none', color: '#fca5a5', fontWeight: 500, textAlign: 'left', padding: '0.4rem 0', cursor: 'pointer', fontSize: '0.95rem', fontFamily: 'inherit' }}>
                <LogOut size={16} style={{ marginRight: '0.5rem' }} /> Logout
              </button>
            </>
          )}
          
          {!user && (
            <>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.5rem 0' }} />
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} style={{ color: '#818cf8', fontWeight: 600, padding: '0.4rem 0' }}>Sign In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} style={{ color: '#818cf8', fontWeight: 600, padding: '0.4rem 0' }}>Create Account</Link>
            </>
          )}
          
          <Link to="/create-cv" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center', marginTop: '0.75rem', padding: '0.75rem' }}>
            <Sparkles size={16} /> Create My CV
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;