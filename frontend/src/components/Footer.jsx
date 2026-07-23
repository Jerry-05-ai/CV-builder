import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#070a12',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4.5rem 0 2.5rem 0',
      color: '#94a3b8',
      marginTop: '5rem'
    }}>
      <div className="container">
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Column */}
          <div className="footer-brand" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>CVForge <span style={{ color: '#818cf8' }}>AI</span></span>
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#94a3b8', maxWidth: '340px', marginBottom: '1.5rem' }}>
              AI-powered resume builder helping candidates convert unstructured experience into job-winning CVs in under 2 minutes.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: '#cbd5e1' }}>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><Twitter size={20} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><Github size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><Linkedin size={20} /></a>
              <a href="mailto:support@cvforge.ai" style={{ color: 'inherit' }}><Mail size={20} /></a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.2rem', letterSpacing: '0.03em' }}>PRODUCT</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link to="/create-cv" style={{ color: '#94a3b8' }}>AI CV Builder</Link></li>
              <li><Link to="/templates" style={{ color: '#94a3b8' }}>10 CV Templates</Link></li>
              <li><Link to="/dashboard" style={{ color: '#94a3b8' }}>CV Editor Dashboard</Link></li>
              <li><Link to="/pricing" style={{ color: '#94a3b8' }}>Free & Premium Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.2rem', letterSpacing: '0.03em' }}>COMPANY</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><a href="#how-it-works" style={{ color: '#94a3b8' }}>How It Works</a></li>
              <li><a href="#features" style={{ color: '#94a3b8' }}>AI Features</a></li>
              <li><a href="#faq" style={{ color: '#94a3b8' }}>FAQ</a></li>
              <li><Link to="/pricing" style={{ color: '#94a3b8' }}>Careers & Team</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.2rem', letterSpacing: '0.03em' }}>LEGAL</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><a href="#privacy" style={{ color: '#94a3b8' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ color: '#94a3b8' }}>Terms of Service</a></li>
              <li><a href="#cookies" style={{ color: '#94a3b8' }}>Cookie Settings</a></li>
              <li><a href="#security" style={{ color: '#94a3b8' }}>Security & AI Ethics</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>© {new Date().getFullYear()} CVForge AI. All rights reserved.</div>
          <div style={{ color: '#818cf8', fontWeight: 500 }}>Built with AI to help you build your future.</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { gap: 2rem !important; }
          .footer-brand { grid-column: span 1 !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
