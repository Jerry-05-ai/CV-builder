import React from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

const AILoadingModal = ({ isOpen, activeStepIndex = 0 }) => {
  if (!isOpen) return null;

  const steps = [
    'Analyzing your input text and story',
    'Organizing education & experience timelines',
    'Improving professional summary impact',
    'Extracting skills & technical keywords',
    'Formatting your CV structure'
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(7, 10, 18, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card glass-panel" style={{
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop behind modal */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          left: '20%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 70%, transparent 100%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />

        {/* Animated AI Icon Container */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          boxShadow: '0 0 35px rgba(99, 102, 241, 0.6)',
          animation: 'pulseGlow 2s infinite ease-in-out'
        }}>
          <Sparkles size={36} color="#ffffff" className="animate-spin" />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
          CVForge AI is crafting your CV...
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '2rem' }}>
          Please hold on while our AI analyzes and structures your professional profile.
        </p>

        {/* Step Progress List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'left' }}>
          {steps.map((label, idx) => {
            const isDone = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            return (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.88rem',
                color: isDone ? '#10b981' : isCurrent ? '#818cf8' : '#64748b',
                fontWeight: isCurrent ? 600 : 400
              }}>
                {isDone ? (
                  <CheckCircle2 size={18} color="#10b981" />
                ) : isCurrent ? (
                  <Loader2 size={18} color="#818cf8" className="animate-spin" />
                ) : (
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid #334155' }} />
                )}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AILoadingModal;
