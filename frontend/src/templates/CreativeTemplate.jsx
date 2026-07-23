import React from 'react';

const CreativeTemplate = ({ data }) => {
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
    <div className="tpl-creative">
      <div className="tpl-creative-layout">
        {/* Left Dark Sidebar */}
        <div className="tpl-creative-sidebar">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>Contact</div>
            <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {info.email && <div>✉️ {info.email}</div>}
              {info.phone && <div>📞 {info.phone}</div>}
              {info.location && <div>📍 {info.location}</div>}
            </div>
          </div>

          {/* Skills Pill Cloud */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3>Skills</h3>
              <div>
                {skills.map((skill, idx) => (
                  <span key={idx} className="tpl-creative-pill">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3>Languages</h3>
              <ul style={{ paddingLeft: '1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                {languages.map((l, idx) => <li key={idx}>{l}</li>)}
              </ul>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h3>Interests</h3>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                {interests.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="tpl-creative-main">
          {/* Main Title Banner */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h1 className="tpl-creative-name">{info.full_name || 'Javeria Tabbasum'}</h1>
            <div className="tpl-creative-title">{info.professional_title || 'Creative Specialist & AI Developer'}</div>
            {summary && (
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>{summary}</p>
            )}
          </div>

          {/* Work Experience */}
          {exp.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderBottom: '2px solid #0284c7', paddingBottom: '0.3rem', marginBottom: '0.85rem' }}>
                Work Experience
              </h2>
              {exp.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.925rem' }}>
                    <span>{item.job_title}</span>
                    <span style={{ fontSize: '0.8rem', color: '#0284c7' }}>{item.start_date} – {item.end_date || 'Present'}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{item.company}</div>
                  {item.description && <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>{item.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {edu.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderBottom: '2px solid #0284c7', paddingBottom: '0.3rem', marginBottom: '0.85rem' }}>
                Education
              </h2>
              {edu.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.925rem' }}>
                    <span>{item.degree}</span>
                    <span style={{ fontSize: '0.8rem', color: '#0284c7' }}>{item.start_year} – {item.end_year}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{item.institution}</div>
                  {item.description && <div style={{ fontSize: '0.85rem', color: '#334155' }}>{item.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderBottom: '2px solid #0284c7', paddingBottom: '0.3rem', marginBottom: '0.85rem' }}>
                Projects & Highlights
              </h2>
              {projects.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</div>
                  {item.description && <div style={{ fontSize: '0.85rem', color: '#334155' }}>{item.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
