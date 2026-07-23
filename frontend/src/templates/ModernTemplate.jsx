import React from 'react';

const ModernTemplate = ({ data }) => {
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
    <div className="tpl-modern">
      {/* Header Banner */}
      <div className="tpl-modern-header">
        <div>
          <h1 className="tpl-modern-name">{info.full_name || 'Javeria Tabbasum'}</h1>
          <div className="tpl-modern-title">{info.professional_title || 'AI & Software Developer'}</div>
        </div>
        <div className="tpl-modern-contact">
          {info.email && <div>✉️ {info.email}</div>}
          {info.phone && <div>📞 {info.phone}</div>}
          {info.location && <div>📍 {info.location}</div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="tpl-modern-summary">
          <div style={{ fontWeight: 700, color: '#4f46e5', marginBottom: '0.2rem' }}>PROFESSIONAL SUMMARY</div>
          <div>{summary}</div>
        </div>
      )}

      {/* 2-Column Main Layout */}
      <div className="tpl-modern-grid">
        {/* Main Column */}
        <div>
          {/* Experience */}
          {exp.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="tpl-section-title">Work Experience</h2>
              {exp.map((item, idx) => (
                <div key={idx} className="tpl-item">
                  <div className="tpl-item-header">
                    <span>{item.job_title}</span>
                    <span style={{ fontSize: '0.825rem', color: '#64748b' }}>{item.start_date} – {item.end_date || 'Present'}</span>
                  </div>
                  <div className="tpl-item-sub">{item.company} {item.location ? `• ${item.location}` : ''}</div>
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
                    <span style={{ fontSize: '0.825rem', color: '#64748b' }}>{item.start_year} – {item.end_year}</span>
                  </div>
                  <div className="tpl-item-sub">{item.institution} {item.location ? `• ${item.location}` : ''}</div>
                  {item.description && <div className="tpl-item-desc">{item.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="tpl-section-title">Key Projects</h2>
              {projects.map((item, idx) => (
                <div key={idx} className="tpl-item">
                  <div className="tpl-item-header">
                    <span>{item.title}</span>
                    {item.link && <span style={{ fontSize: '0.8rem', color: '#4f46e5' }}>{item.link}</span>}
                  </div>
                  {item.technologies && <div className="tpl-item-sub">Tech: {item.technologies}</div>}
                  {item.description && <div className="tpl-item-desc">{item.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="tpl-section-title">Technical Skills</h2>
              <div>
                {skills.map((skill, idx) => (
                  <span key={idx} className="tpl-skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certs.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="tpl-section-title">Certifications</h2>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.85rem' }}>
                {certs.map((c, idx) => <li key={idx} style={{ marginBottom: '0.3rem' }}>{c}</li>)}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="tpl-section-title">Achievements</h2>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.85rem' }}>
                {achievements.map((a, idx) => <li key={idx} style={{ marginBottom: '0.3rem' }}>{a}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="tpl-section-title">Languages</h2>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.85rem' }}>
                {languages.map((l, idx) => <li key={idx}>{l}</li>)}
              </ul>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h2 className="tpl-section-title">Interests</h2>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {interests.join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
