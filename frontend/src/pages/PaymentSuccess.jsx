import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentSuccess = ({ user, setUser }) => {
  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '560px', textAlign: 'center' }}>
        <div className="card glass-panel" style={{ padding: '3rem' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid #10b981',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <CheckCircle2 size={40} />
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Payment Successful!
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Thank you for your purchase. One additional AI CV creation slot has been added to your account!
          </p>

          <Link to="/create-cv" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem', width: '100%', justifyContent: 'center' }}>
            <Sparkles size={18} /> Create Additional CV Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
