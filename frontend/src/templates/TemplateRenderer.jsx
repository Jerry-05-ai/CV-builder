import React from 'react';
import { COLOR_THEMES } from './templateColors';

const TemplateRenderer = ({ cvData, templateId = 'modern-split', colorTheme = 'blue', fontFamily = 'sans' }) => {
  const theme = COLOR_THEMES[colorTheme] || COLOR_THEMES.blue;
  
  // Normalize CV data structure safely
  const p = cvData?.personalInfo || cvData?.personal_information || {};
  const summary = cvData?.summary || '';
  const experience = cvData?.experience || [];
  const education = cvData?.education || [];
  const skills = cvData?.skills || [];
  const projects = cvData?.projects || [];
  const certifications = cvData?.certifications || [];
  const languages = cvData?.languages || [];
  const achievements = cvData?.achievements || [];

  const fontStyle = {
    fontFamily: fontFamily === 'serif' ? 'Georgia, Merriweather, serif' : 
                fontFamily === 'mono' ? '"Courier New", Consolas, monospace' : 
                '"Plus Jakarta Sans", Inter, -apple-system, sans-serif',
    minHeight: '297mm', // A4 height
    width: '100%',
    boxSizing: 'border-box'
  };

  const isDark = templateId === 'tech-dark';
  const textColor = isDark ? '#f8fafc' : '#1e293b';
  const mutedColor = isDark ? '#94a3b8' : '#64748b';
  const cardBg = isDark ? '#1e293b' : '#f8fafc';

  // Helper for Initials Avatar
  const nameStr = p.name || p.full_name || 'Candidate';
  const initials = nameStr.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  // 1. EXECUTIVE CLASSIC TEMPLATE
  if (templateId === 'executive-classic') {
    return (
      <div style={{ ...fontStyle, color: textColor, padding: '2.5rem', background: isDark ? '#0f172a' : '#ffffff' }}>
        <header style={{ borderBottom: `3px double ${theme.primary}`, paddingBottom: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.3rem', color: theme.primary, marginBottom: '0.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {nameStr}
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: mutedColor, marginBottom: '0.75rem' }}>
            {p.title || p.professional_title || 'Professional Title'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem', color: mutedColor }}>
            {p.email && <span>✉ {p.email}</span>}
            {p.phone && <span>📞 {p.phone}</span>}
            {p.location && <span>📍 {p.location}</span>}
            {p.linkedin && <span>🔗 {p.linkedin}</span>}
            {p.github && <span>💻 {p.github}</span>}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.primary, borderBottom: `1px solid ${theme.border}`, paddingBottom: '0.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
              Executive Summary
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: textColor }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.primary, borderBottom: `1px solid ${theme.border}`, paddingBottom: '0.35rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              Professional Experience
            </h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem', color: textColor }}>
                  <span>{item.jobTitle || item.role} — <em style={{ color: theme.primary, fontStyle: 'normal' }}>{item.company}</em></span>
                  <span style={{ color: mutedColor, fontSize: '0.85rem' }}>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate || 'Present'}</span>
                </div>
                {item.description && <p style={{ fontSize: '0.9rem', color: textColor, marginTop: '0.35rem', lineHeight: 1.55 }}>{item.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.primary, borderBottom: `1px solid ${theme.border}`, paddingBottom: '0.35rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              Education
            </h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                <div><strong>{item.degree}</strong>{item.institution ? `, ${item.institution}` : ''}</div>
                <span style={{ color: mutedColor, fontSize: '0.85rem' }}>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate}</span>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.primary, borderBottom: `1px solid ${theme.border}`, paddingBottom: '0.35rem', marginBottom: '0.6rem', fontWeight: 700 }}>
              Core Competencies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: theme.light, color: theme.primary, border: `1px solid ${theme.border}`, padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600 }}>
                  {typeof s === 'string' ? s : s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // 2. MODERN SPLIT TEMPLATE (2-COLUMN)
  if (templateId === 'modern-split') {
    return (
      <div style={{ ...fontStyle, color: textColor, display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '297mm', background: '#ffffff' }}>
        {/* Left Sidebar */}
        <div style={{ background: theme.light, padding: '2rem 1.5rem', borderRight: `2px solid ${theme.border}` }}>
          <h2 style={{ fontSize: '1.6rem', color: theme.primary, fontWeight: 800, marginBottom: '0.25rem' }}>{nameStr}</h2>
          <p style={{ fontSize: '0.92rem', fontWeight: 600, color: mutedColor, marginBottom: '1.5rem' }}>{p.title || p.professional_title}</p>

          <div style={{ fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', color: textColor }}>
            {p.email && <div>✉️ {p.email}</div>}
            {p.phone && <div>📞 {p.phone}</div>}
            {p.location && <div>📍 {p.location}</div>}
            {p.linkedin && <div>🔗 {p.linkedin}</div>}
            {p.github && <div>💻 {p.github}</div>}
          </div>

          {skills.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.primary, marginBottom: '0.6rem', fontWeight: 700 }}>Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ background: '#ffffff', color: theme.primary, border: `1px solid ${theme.border}`, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {typeof s === 'string' ? s : s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.primary, marginBottom: '0.5rem', fontWeight: 700 }}>Languages</h4>
              {languages.map((l, idx) => (
                <div key={idx} style={{ fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <strong>{l.name}</strong> ({l.proficiency || 'Proficient'})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div style={{ padding: '2rem' }}>
          {summary && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>Profile Summary</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: textColor }}>{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>Work Experience</h3>
              {experience.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.92rem' }}>
                    <span>{item.jobTitle} — <span style={{ color: theme.primary }}>{item.company}</span></span>
                    <span style={{ fontSize: '0.82rem', color: mutedColor }}>{item.startDate} {item.startDate && item.endDate ? '-' : ''} {item.endDate || 'Present'}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: textColor, marginTop: '0.3rem', lineHeight: 1.5 }}>{item.description}</p>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>Education</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <strong>{item.degree}</strong> {item.institution ? `— ${item.institution}` : ''}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>Key Projects</h3>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                  <strong>{proj.name}</strong>
                  <p style={{ color: textColor, margin: '0.2rem 0' }}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    );
  }

  // 3. CREATIVE GRADIENT TEMPLATE
  if (templateId === 'creative-gradient') {
    return (
      <div style={{ ...fontStyle, color: textColor, padding: '2rem', background: '#ffffff' }}>
        <header style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          color: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '1.75rem',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
        }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.35rem' }}>{nameStr}</h1>
          <p style={{ fontSize: '1.15rem', opacity: 0.95, fontWeight: 600, marginBottom: '1rem' }}>{p.title || p.professional_title || 'Creative Professional'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.85rem' }}>
            {p.email && <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>✉️ {p.email}</span>}
            {p.phone && <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>📞 {p.phone}</span>}
            {p.location && <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>📍 {p.location}</span>}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '1.5rem', background: theme.light, padding: '1.25rem', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '1rem', color: theme.primary, marginBottom: '0.4rem', fontWeight: 700 }}>About Me</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>Skills & Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {typeof s === 'string' ? s : s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>Featured Projects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: `1px solid ${theme.border}` }}>
                  <strong style={{ fontSize: '0.95rem', color: theme.primary }}>{proj.name}</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.35rem', color: textColor }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.6rem', fontWeight: 700 }}>Education</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                <strong>{item.degree}</strong> {item.institution ? `— ${item.institution}` : ''}
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }

  // 4. MINIMALIST PRO TEMPLATE
  if (templateId === 'minimalist-pro') {
    return (
      <div style={{ ...fontStyle, color: textColor, padding: '2.5rem', background: '#ffffff' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>{nameStr}</h1>
          <p style={{ fontSize: '1.1rem', color: theme.primary, fontWeight: 700, marginBottom: '0.75rem' }}>{p.title || p.professional_title}</p>
          <div style={{ fontSize: '0.85rem', color: mutedColor, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>/ {p.phone}</span>}
            {p.location && <span>/ {p.location}</span>}
            {p.linkedin && <span>/ {p.linkedin}</span>}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: theme.primary, marginBottom: '0.5rem', fontWeight: 800 }}>SUMMARY</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: '#334155' }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: theme.primary, marginBottom: '0.75rem', fontWeight: 800 }}>EXPERIENCE</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ borderLeft: `3px solid ${theme.primary}`, paddingLeft: '1rem', marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.92rem' }}>
                  <span>{item.jobTitle} <span style={{ color: mutedColor, fontWeight: 500 }}>@ {item.company}</span></span>
                  <span style={{ fontSize: '0.82rem', color: mutedColor }}>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate || 'Present'}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginTop: '0.3rem', lineHeight: 1.5 }}>{item.description}</p>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: theme.primary, marginBottom: '0.6rem', fontWeight: 800 }}>EDUCATION</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.4rem', borderLeft: `3px solid ${theme.border}`, paddingLeft: '1rem' }}>
                <strong>{item.degree}</strong> {item.institution ? `— ${item.institution}` : ''}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: theme.primary, marginBottom: '0.6rem', fontWeight: 800 }}>SKILLS</h3>
            <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
              {skills.map(s => typeof s === 'string' ? s : s.name).join('  •  ')}
            </div>
          </section>
        )}
      </div>
    );
  }

  // 5. TECH DARK TEMPLATE
  if (templateId === 'tech-dark') {
    return (
      <div style={{ ...fontStyle, color: '#f8fafc', background: '#0f172a', padding: '2.5rem', fontFamily: '"Courier New", monospace' }}>
        <header style={{ borderBottom: `2px solid ${theme.primary}`, paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '0.78rem', color: theme.primary, marginBottom: '0.3rem' }}>&gt; SYSTEM_USER / IDENTITY_PROFILE</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'sans-serif' }}>{nameStr}</h1>
          <p style={{ fontSize: '1.05rem', color: theme.primary, fontWeight: 700, fontFamily: 'sans-serif' }}>{p.title || 'Software Developer & Tech Specialist'}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.75rem' }}>
            {p.email && <span>[email: {p.email}]</span>}
            {p.github && <span>[github: {p.github}]</span>}
            {p.linkedin && <span>[linkedin: {p.linkedin}]</span>}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '1.5rem', background: '#1e293b', padding: '1.25rem', borderRadius: '8px', borderLeft: `4px solid ${theme.primary}` }}>
            <div style={{ fontSize: '0.8rem', color: theme.primary, marginBottom: '0.4rem', fontWeight: 700 }}>// EXECUTIVE BRIEF</div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#cbd5e1', fontFamily: 'sans-serif' }}>{summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: theme.primary, marginBottom: '0.6rem', fontWeight: 700 }}>// STACK_SPECIFICATIONS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {typeof s === 'string' ? s : s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: theme.primary, marginBottom: '0.6rem', fontWeight: 700 }}>// DEPLOYED_PROJECTS</div>
            {projects.map((proj, idx) => (
              <div key={idx} style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #334155' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.92rem', fontFamily: 'sans-serif' }}>{proj.name}</strong>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.3rem', fontFamily: 'sans-serif' }}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: theme.primary, marginBottom: '0.6rem', fontWeight: 700 }}>// EDUCATION</div>
            {education.map((item, idx) => (
              <div key={idx} style={{ fontSize: '0.88rem', color: '#cbd5e1', fontFamily: 'sans-serif' }}>
                <strong>{item.degree}</strong> {item.institution ? `— ${item.institution}` : ''}
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }

  // 6. ELEGANT SERIF TEMPLATE
  if (templateId === 'elegant-serif') {
    return (
      <div style={{ ...fontStyle, fontFamily: 'Georgia, serif', color: '#1e293b', padding: '2.5rem', background: '#ffffff' }}>
        <header style={{ borderBottom: `2px solid ${theme.primary}`, paddingBottom: '1.5rem', marginBottom: '1.75rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>{nameStr}</h1>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: theme.primary, marginBottom: '0.75rem' }}>{p.title || p.professional_title}</p>
          <div style={{ fontSize: '0.85rem', color: mutedColor, display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>• {p.phone}</span>}
            {p.location && <span>• {p.location}</span>}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontStyle: 'italic', color: theme.primary, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.6rem' }}>Biography & Overview</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.7, textAlign: 'justify' }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontStyle: 'italic', color: theme.primary, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Professional Positions</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <strong>{item.jobTitle}</strong>
                  <span style={{ fontStyle: 'italic', fontSize: '0.85rem', color: mutedColor }}>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate || 'Present'}</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '0.88rem', color: theme.primary, marginBottom: '0.3rem' }}>{item.company}</div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontStyle: 'italic', color: theme.primary, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.6rem' }}>Academic Credentials</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <strong>{item.degree}</strong> {item.institution ? `, ${item.institution}` : ''}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontStyle: 'italic', color: theme.primary, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.6rem' }}>Areas of Expertise</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              {skills.map(s => typeof s === 'string' ? s : s.name).join(' • ')}
            </div>
          </section>
        )}
      </div>
    );
  }

  // 7. FRESH GREEN / ACCENT HEADER CARD TEMPLATE
  if (templateId === 'fresh-green') {
    return (
      <div style={{ ...fontStyle, color: textColor, padding: '2rem', background: '#ffffff' }}>
        <header style={{ background: theme.primary, color: '#ffffff', padding: '1.75rem', borderRadius: '10px', marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{nameStr}</h1>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, opacity: 0.95, marginBottom: '0.75rem' }}>{p.title || p.professional_title}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', opacity: 0.9 }}>
            {p.email && <span>✉ {p.email}</span>}
            {p.phone && <span>📞 {p.phone}</span>}
            {p.location && <span>📍 {p.location}</span>}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Professional Summary</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {skills.length > 0 && (
            <div style={{ background: theme.light, padding: '1.25rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.95rem', color: theme.primary, marginBottom: '0.6rem', fontWeight: 700 }}>Key Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ background: '#ffffff', color: theme.primary, border: `1px solid ${theme.border}`, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {typeof s === 'string' ? s : s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div style={{ background: theme.light, padding: '1.25rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.95rem', color: theme.primary, marginBottom: '0.6rem', fontWeight: 700 }}>Education</h4>
              {education.map((item, idx) => (
                <div key={idx} style={{ fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                  <strong>{item.degree}</strong> {item.institution ? `— ${item.institution}` : ''}
                </div>
              ))}
            </div>
          )}
        </div>

        {projects.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>Projects</h3>
            {projects.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                <strong>{proj.name}</strong>
                <p style={{ color: textColor, margin: '0.2rem 0' }}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }

  // 8. BOLD ORANGE / SIDEBAR AVATAR TEMPLATE
  if (templateId === 'bold-orange') {
    return (
      <div style={{ ...fontStyle, color: textColor, display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '297mm', background: '#ffffff' }}>
        {/* Left Dark Full-height Sidebar */}
        <div style={{ background: theme.primary, color: '#ffffff', padding: '2.5rem 1.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ffffff', color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.25rem' }}>
            {initials}
          </div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.25rem', lineHeight: 1.2 }}>{nameStr}</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: '2rem', fontWeight: 600 }}>{p.title || p.professional_title}</p>

          <div style={{ fontSize: '0.85rem', opacity: 0.95, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {p.email && <div>✉ {p.email}</div>}
            {p.phone && <div>📞 {p.phone}</div>}
            {p.location && <div>📍 {p.location}</div>}
            {p.linkedin && <div>🔗 {p.linkedin}</div>}
          </div>

          {skills.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.3rem' }}>SKILLS</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.78rem' }}>
                    {typeof s === 'string' ? s : s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div style={{ padding: '2.5rem' }}>
          {summary && (
            <section style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.6rem', fontWeight: 800 }}>ABOUT ME</h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.75rem', fontWeight: 800 }}>EXPERIENCE</h3>
              {experience.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.92rem' }}>
                    <span>{item.jobTitle} — <span style={{ color: theme.primary }}>{item.company}</span></span>
                    <span style={{ fontSize: '0.82rem', color: mutedColor }}>{item.startDate} {item.startDate && item.endDate ? '-' : ''} {item.endDate || 'Present'}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', marginTop: '0.3rem', lineHeight: 1.5 }}>{item.description}</p>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.6rem', fontWeight: 800 }}>EDUCATION</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <strong>{item.degree}</strong> {item.institution ? `— ${item.institution}` : ''}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.6rem', fontWeight: 800 }}>PROJECTS</h3>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                  <strong>{proj.name}</strong>
                  <p style={{ color: textColor, margin: '0.2rem 0' }}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    );
  }

  // 9. ACADEMIC FOCUS TEMPLATE
  if (templateId === 'academic-focus') {
    return (
      <div style={{ ...fontStyle, fontFamily: 'Georgia, serif', color: textColor, padding: '2.5rem', background: '#ffffff' }}>
        <header style={{ borderBottom: `2px solid #000000`, paddingBottom: '1.25rem', marginBottom: '1.75rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{nameStr}</h1>
          <p style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>{p.title || 'Academic & AI Research Candidate'}</p>
          <div style={{ fontSize: '0.85rem', color: mutedColor }}>
            {p.email && <span>{p.email}</span>} {p.phone && <span>| {p.phone}</span>} {p.location && <span>| {p.location}</span>}
          </div>
        </header>

        {education.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              1. Education & Academic Background
            </h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>{item.degree}</span>
                  <span>{item.startDate} {item.startDate && item.endDate ? '–' : ''} {item.endDate}</span>
                </div>
                <div style={{ fontStyle: 'italic' }}>{item.institution}</div>
              </div>
            ))}
          </section>
        )}

        {summary && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '0.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>
              2. Academic Summary
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify' }}>{summary}</p>
          </section>
        )}

        {projects.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              3. Research & Technical Projects
            </h3>
            {projects.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                <strong>{proj.name}</strong>
                <p style={{ margin: '0.25rem 0 0 0', lineHeight: 1.55 }}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '0.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>
              4. Technical Skills & Tools
            </h3>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              {skills.map(s => typeof s === 'string' ? s : s.name).join(', ')}
            </div>
          </section>
        )}
      </div>
    );
  }

  // 10. MODERN PORTFOLIO TEMPLATE
  if (templateId === 'modern-portfolio') {
    return (
      <div style={{ ...fontStyle, color: textColor, padding: '2rem', background: '#ffffff' }}>
        <header style={{ borderLeft: `6px solid ${theme.primary}`, paddingLeft: '1.25rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: theme.primary, marginBottom: '0.2rem' }}>{nameStr}</h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: mutedColor, marginBottom: '0.6rem' }}>{p.title || p.professional_title || 'Portfolio Specialist'}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: textColor }}>
            {p.email && <span>✉ {p.email}</span>}
            {p.github && <span>💻 {p.github}</span>}
            {p.linkedin && <span>🔗 {p.linkedin}</span>}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '1.75rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: '1rem', color: theme.primary, marginBottom: '0.4rem', fontWeight: 800 }}>CAREER HIGHLIGHTS</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {projects.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '1rem', fontWeight: 800 }}>PORTFOLIO PROJECTS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ background: theme.light, padding: '1.1rem', borderRadius: '10px', border: `1px solid ${theme.border}` }}>
                  <strong style={{ fontSize: '1rem', color: theme.primary }}>{proj.name}</strong>
                  <p style={{ fontSize: '0.86rem', marginTop: '0.4rem', color: textColor, lineHeight: 1.5 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.75rem', fontWeight: 800 }}>TECHNICAL SKILLS</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: theme.primary, color: '#ffffff', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {typeof s === 'string' ? s : s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.3rem', marginBottom: '0.6rem', fontWeight: 800 }}>EDUCATION</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                <strong>{item.degree}</strong> {item.institution ? `— ${item.institution}` : ''}
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }

  // DEFAULT FALLBACK
  return (
    <div style={{ ...fontStyle, color: textColor, padding: '2rem' }}>
      <header style={{ borderBottom: `2px solid ${theme.primary}`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: theme.primary }}>{nameStr}</h1>
        <p style={{ fontSize: '1.05rem', color: mutedColor }}>{p.title || 'Professional Title'}</p>
      </header>
      {summary && <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{summary}</p>}
    </div>
  );
};

export default TemplateRenderer;

