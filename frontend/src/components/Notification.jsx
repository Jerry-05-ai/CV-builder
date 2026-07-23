import React from 'react';

const Notification = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const bgColors = {
    error: '#fee2e2',
    success: '#dcfce7',
    warning: '#fef3c7',
    info: '#e0e7ff'
  };

  const textColors = {
    error: '#991b1b',
    success: '#166534',
    warning: '#92400e',
    info: '#3730a3'
  };

  const borderColors = {
    error: '#fca5a5',
    success: '#86efac',
    warning: '#fde047',
    info: '#a5b4fc'
  };

  return (
    <div style={{
      backgroundColor: bgColors[type] || bgColors.info,
      color: textColors[type] || textColors.info,
      border: `1px solid ${borderColors[type] || borderColors.info}`,
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-md)',
      marginBottom: '1.5rem',
      display: 'flex',
      justifySpaceBetween: 'space-between',
      alignItems: 'center',
      fontSize: '0.925rem',
      fontWeight: 500,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <span>{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginLeft: '1rem'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Notification;
