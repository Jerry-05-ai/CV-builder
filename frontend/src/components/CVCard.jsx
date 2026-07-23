import React from 'react';
import { useNavigate } from 'react-router-dom';

const CVCard = ({ cv, onDelete }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(cv.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="cv-card">
      <div>
        <div className="cv-card-header">
          <span className="badge badge-primary">{cv.template_name?.toUpperCase() || 'MODERN'}</span>
          {cv.is_paid ? (
            <span className="badge badge-success">PAID</span>
          ) : (
            <span className="badge badge-warning">FREE</span>
          )}
        </div>

        <h3 className="cv-card-title">{cv.title || 'Untitled CV'}</h3>
        <p className="cv-card-meta">Created on {formattedDate}</p>
      </div>

      <div className="cv-card-actions">
        <button 
          onClick={() => navigate(`/cv-preview/${cv.id}`)} 
          className="btn-secondary btn-icon"
          title="View Printable CV"
        >
          👁️ View
        </button>
        <button 
          onClick={() => navigate(`/edit-cv/${cv.id}`)} 
          className="btn-secondary btn-icon"
          title="Edit CV Information"
        >
          ✏️ Edit
        </button>
        <button 
          onClick={() => navigate(`/cv-preview/${cv.id}?download=true`)} 
          className="btn-primary btn-icon"
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.825rem' }}
          title="Download PDF"
        >
          📥 PDF
        </button>
        <button 
          onClick={() => onDelete(cv.id)} 
          className="btn-danger btn-icon"
          style={{ padding: '0.45rem 0.6rem' }}
          title="Delete CV"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CVCard;
