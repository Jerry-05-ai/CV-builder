import React from 'react';
import { Check, Sparkles } from 'lucide-react';

const TemplateCard = ({ id, name, category, description, isSelected, onSelect }) => {
  return (
    <div 
      className={`card ${isSelected ? 'selected-card' : ''}`}
      onClick={() => onSelect(id)}
      style={{
        border: isSelected ? '2px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isSelected ? '0 0 25px rgba(99, 102, 241, 0.4)' : 'var(--shadow-sm)',
        background: isSelected ? '#1c2742' : 'var(--bg-card)',
        borderRadius: '16px',
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#ffffff',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Check size={14} />
        </div>
      )}

      {/* Visual Thumbnail Representation */}
      <div style={{
        height: '140px',
        backgroundColor: id === 'tech-dark' ? '#0f172a' : (id === 'creative-gradient' ? '#1e1b4b' : '#ffffff'),
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        marginBottom: '1rem',
        padding: '0.85rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ height: '8px', width: '45%', backgroundColor: id === 'bold-orange' ? '#ea580c' : (id === 'fresh-green' ? '#059669' : '#6366f1'), marginBottom: '8px', borderRadius: '2px' }} />
        <div style={{ height: '4px', width: '75%', backgroundColor: id === 'tech-dark' ? '#334155' : '#cbd5e1', marginBottom: '5px' }} />
        <div style={{ height: '4px', width: '60%', backgroundColor: id === 'tech-dark' ? '#334155' : '#cbd5e1', marginBottom: '14px' }} />
        <div style={{ height: '36px', backgroundColor: id === 'tech-dark' ? '#1e293b' : '#f1f5f9', borderRadius: '4px', border: '1px dashed #cbd5e1' }} />
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{category}</span>
        </div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>{name}</h3>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '1rem' }}>{description}</p>
      </div>

      <button 
        className={isSelected ? 'btn-primary' : 'btn-secondary'}
        style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
      >
        {isSelected ? '✓ Selected' : 'Use Template'}
      </button>
    </div>
  );
};

export default TemplateCard;
