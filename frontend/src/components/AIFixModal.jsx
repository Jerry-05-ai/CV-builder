import React, { useState } from 'react';
import { Sparkles, X, Check, Loader2 } from 'lucide-react';
import { enhanceContentWithAI } from '../services/aiService';

const AIFixModal = ({ isOpen, onClose, onApply, sectionType = 'summary', initialText = '' }) => {
  const [loading, setLoading] = useState(false);
  const [improvedText, setImprovedText] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    const result = await enhanceContentWithAI(sectionType, initialText);
    setImprovedText(result);
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(7, 10, 18, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 9998,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} color="#818cf8" />
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>AI Writing Assistant</h3>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '0.3rem' }}><X size={20} /></button>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
          {sectionType === 'summary' 
            ? 'Our AI will enhance your professional summary for strong impact and executive tone.' 
            : 'Generate action-oriented bullet points tailored for work experience.'}
        </p>

        {!improvedText ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Current Draft:</label>
            <div style={{ background: '#111827', padding: '1rem', borderRadius: '8px', fontSize: '0.88rem', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.08)' }}>
              {initialText || 'No current text drafted. AI will write a fresh suggestion.'}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ color: '#10b981' }}>✨ AI Improved Output:</label>
            <textarea
              className="form-textarea"
              rows={5}
              value={improvedText}
              onChange={(e) => setImprovedText(e.target.value)}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          {!improvedText ? (
            <button onClick={handleGenerate} disabled={loading} className="btn-primary">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : <><Sparkles size={16} /> Generate Suggestion</>}
            </button>
          ) : (
            <button onClick={() => { onApply(improvedText); onClose(); }} className="btn-primary">
              <Check size={16} /> Apply Change
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIFixModal;
