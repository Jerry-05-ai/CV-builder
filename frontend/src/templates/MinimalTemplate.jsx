import React from 'react';

const MinimalTemplate = ({ data }) => {
  const info = data?.personal_information || {};
  const summary = data?.summary || '';
  const edu = data?.education || [];
  const exp = data?.experience || [];
  const projects = data?.projects || [];
  const skills = data?.skills || [];
  const certs = data?.certifications || [];
  const achievements = data?.achievements || [];
  const languages = data?.languages || [];

  return (
    <div className="tpl-minimal">
      {/* ATS Friendly Minimal Header */}
      <div className="tpl-minimal-header">
        <h1 className="tpl-minimal-name">{info.full_name || 'Javeria Tabbasum'}</h1>
        <div className="tpl-minimal-title">{info.professional_title || 'Software Engineering Professional'}</div>
        <div className="tpl-minimal-contact">
          {[info.email, info.phone, info.location].filter(Boolean).join('  |  ')}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 className="tpl-section-title">Summary</h2>
          <div style={{ fontSize: '0.9rem' }}>{summary}</div>
        </div>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 className="tpl-section-title">Experience</h2>
          {exp.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                <span>{item.job_title} — {item.company}</span>
                <span>{item.start_date} – {item.end_date || 'Present'}</span>
              </div>
              {item.description && <div style={{ fontSize: '0.85rem', color: '#333', marginTop: '0.2rem' }}>{item.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 className="tpl-section-title">Education</h2>
          {edu.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                <span>{item.degree} — {item.institution}</span>
                <span>{item.start_year} – {item.end_year}</span>
              </div>
              {item.description && <div style={{ fontSize: '0.85rem', color: '#333' }}>{item.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 className="tpl-section-title">Projects</h2>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</div>
              {item.description && <div style={{ fontSize: '0.85rem' }}>{item.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 className="tpl-section-title">Skills & Technologies</h2>
          <div style={{ fontSize: '0.875rem' }}>
            {skills.join(', ')}
          </div>
        </div>
      )}

      {/* Certifications & Languages */}
      {(certs.length > 0 || languages.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {certs.length > 0 && (
            <div>
              <h2 className="tpl-section-title">Certifications</h2>
              <div style={{ fontSize: '0.85rem' }}>{certs.join(', ')}</div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2 className="tpl-section-title">Languages</h2>
              <div style={{ fontSize: '0.85rem' }}>{languages.join(', ')}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
