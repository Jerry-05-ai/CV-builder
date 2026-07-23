import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { addPaidSlot } from '../services/storageService';

const MockPayment = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  
  const [cardData, setCardData] = useState({
    name: 'Alex Mercer',
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '123'
  });

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      addPaidSlot(); // Unlock +1 additional CV slot in LocalStorage
      setProcessing(false);
      navigate('/payment-success');
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '640px' }}>
        <button onClick={() => navigate('/pricing')} className="btn-ghost" style={{ marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to Pricing
        </button>

        <div className="card glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>DEMO CHECKOUT</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>Mock Payment Checkout</h2>
            </div>
            <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} /> Encrypted 256-Bit
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ background: '#111827', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>ORDER SUMMARY</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <span>Additional CV Creation Token</span>
              <span>$3.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <span>Taxes & AI Processing Fees</span>
              <span>$0.00</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>
              <span>Total Due:</span>
              <span style={{ color: '#818cf8' }}>$3.00</span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePay}>
            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input className="form-input" value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value })} required />
            </div>

            <div className="form-group">
              <label className="form-label">Card Number</label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" value={cardData.cardNumber} onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })} required />
                <CreditCard size={18} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Expiry (MM/YY)</label>
                <input className="form-input" value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })} required />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">CVC / CVV</label>
                <input className="form-input" value={cardData.cvc} onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })} required />
              </div>
            </div>

            <button type="submit" disabled={processing} className="btn-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', justifyContent: 'center' }}>
              {processing ? <><Loader2 size={18} className="animate-spin" /> Processing Payment...</> : <><Lock size={18} /> Pay $3.00 Securely</>}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MockPayment;
