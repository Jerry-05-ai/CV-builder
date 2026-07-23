import React from 'react';

const ClassicTemplate = ({ data }) => {
  const info = data?.personal_information || {};
  const summary = data?.summary || '';
  const edu = data?.education || [];
  const exp = data?.experience || [];
  const projects = data?.projects || [];
  const skills = data?.skills || [];
  const certs = data?.certifications || [];
  const achievements = data?.achievements || [];
  const languages = data?.languages || [];
  const interests = data?.interests || [];

  return (
    <div className="tpl-classic">
      {/* Centered Serif Header */}
      <div className="tpl-classic-header">
        <h1 className="tpl-classic-name">{info.full_name || 'Javeria Tabbasum'}</h1>
        <div className="tpl-classic-title">{info.professional_title || 'Software Engineering Professional'}</div>
        <div className="tpl-classic-contact">
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>• {info.phone}</span>}
          {info.location && <span>• {info.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="tpl-section-title">Executive Summary</h2>
          <p style={{ fontSize: '0.925rem', textAlign: 'justify' }}>{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {exp.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="tpl-section-title">Professional Experience</h2>
          {exp.map((item, idx) => (
            <div key={idx} className="tpl-item">
              <div className="tpl-item-header">
                <span>{item.job_title}</span>
                <span style={{ fontWeight: 'normal', fontSize: '0.875rem' }}>{item.start_date} – {item.end_date || 'Present'}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                {item.company} {item.location ? `, ${item.location}` : ''}
              </div>
              {item.description && <div className="tpl-item-desc">{item.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="tpl-section-title">Education</h2>
          {edu.map((item, idx) => (
            <div key={idx} className="tpl-item">
              <div className="tpl-item-header">
                <span>{item.degree}</span>
                <span style={{ fontWeight: 'normal', fontSize: '0.875rem' }}>{item.start_year} – {item.end_year}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
                {item.institution} {item.location ? `, ${item.location}` : ''}
              </div>
              {item.description && <div className="tpl-item-desc">{item.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="tpl-section-title">Projects</h2>
          {projects.map((item, idx) => (
            <div key={idx} className="tpl-item">
              <div className="tpl-item-header">
                <span>{item.title}</span>
                {item.link && <span style={{ fontWeight: 'normal', fontSize: '0.85rem' }}>{item.link}</span>}
              </div>
              {item.description && <div className="tpl-item-desc">{item.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills & Certifications */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {skills.length > 0 && (
          <div>
            <h2 className="tpl-section-title">Skills</h2>
            <div style={{ fontSize: '0.875rem' }}>{skills.join(' • ')}</div>
          </div>
        )}

        {certs.length > 0 && (
          <div>
            <h2 className="tpl-section-title">Certifications</h2>
            <div style={{ fontSize: '0.875rem' }}>{certs.join(', ')}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
