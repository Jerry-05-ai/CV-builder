import React from 'react';

const LoadingSpinner = ({ message = 'Processing...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContain: 'center',
      padding: '3rem 1.5rem',
      textAlign: 'center'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid var(--primary-light)',
        borderTop: '4px solid var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite',
        marginBottom: '1.25rem'
      }}></div>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        color: 'var(--secondary)',
        fontSize: '1.05rem'
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
