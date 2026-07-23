import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Sparkles, Shield, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getFreeCVUsage } from '../services/storageService';

const Pricing = ({ user, setUser }) => {
  const navigate = useNavigate();
  const usage = getFreeCVUsage();

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      <section style={{ padding: '4rem 0 2rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>FREE LIMIT & PAID SLOTS</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Simple, Honest Pricing
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Every account comes with 3 free AI CV creations. Need more? Pay $3 per additional CV.
          </p>

          {/* Usage Badge Card */}
          <div className="card glass-panel" style={{ maxWidth: '420px', margin: '0 auto 3rem auto', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              YOUR CURRENT USAGE STATUS
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Free CVs Used: {usage.usedFree} / {usage.maxFree}
            </h2>
            {usage.paidSlots > 0 && (
              <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600, marginBottom: '0.5rem' }}>
                + {usage.paidSlots} Additional Paid CV Slot(s) Active
              </div>
            )}
            <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginTop: '0.75rem' }}>
              <div style={{ width: `${(usage.usedFree / usage.maxFree) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            </div>
          </div>

          {/* Pricing Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '840px', margin: '0 auto' }}>
            {/* FREE PLAN */}
            <div className="card" style={{ padding: '2.25rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.4rem' }}>Free Plan</h3>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>$0</div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Includes 3 full CV generations with full functionality.</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> 3 Free CV Creations</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> AI Extraction Engine</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> All 10 Templates & Colors</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> A4 Printable PDF Export</li>
              </ul>

              <Link to="/create-cv" className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                Create Free CV
              </Link>
            </div>

            {/* ADDITIONAL CV PLAN */}
            <div className="card" style={{ padding: '2.25rem', textAlign: 'left', border: '2px solid #6366f1', boxShadow: '0 0 30px rgba(99,102,241,0.3)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                PAY AS YOU GO
              </div>

              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.4rem' }}>Additional CV</h3>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>$3 <span style={{ fontSize: '1rem', color: '#94a3b8' }}>/ CV</span></div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Purchase additional CV slots once your free limit is reached.</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> +1 Extra CV Slot Unlocked</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> Priority AI Engine Processing</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> AI Writing Assistant Features</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#10b981" /> High-Res PDF Export</li>
              </ul>

              <Link to="/mock-payment" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Create Another CV for $3
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
