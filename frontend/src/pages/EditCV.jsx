import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, Save, ArrowLeft, Eye, Plus, Trash2, LayoutDashboard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TemplateRenderer from '../templates/TemplateRenderer';
import AIFixModal from '../components/AIFixModal';
import { getCVById, saveCV } from '../services/storageService';

const EditCV = ({ user, setUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [cvData, setCvData] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const cv = getCVById(id, user.id);
      setCvData(cv);
    }
  }, [id, user]);

  if (!cvData) {
    return <div style={{ color: '#ffffff', padding: '5rem', textAlign: 'center' }}>Loading CV Editor...</div>;
  }

  const handleSave = () => {
    saveCV(cvData, user?.id);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };


  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />
      <AIFixModal 
        isOpen={aiModalOpen} 
        onClose={() => setAiModalOpen(false)}
        initialText={cvData.summary}
        sectionType="summary"
        onApply={(text) => setCvData({ ...cvData, summary: text })}
      />

      <div className="container edit-cv-layout" style={{ padding: '1.5rem 1.5rem', display: 'grid', gridTemplateColumns: '200px 1.2fr 1fr', gap: '1.5rem' }}>
        
        {/* LEFT: Sidebar Navigation Tabs */}
        <aside className="card edit-cv-sidebar" style={{ height: 'fit-content', padding: '1rem' }}>
          <Link to="/dashboard" style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          
          <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            CV SECTIONS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {[
              { id: 'personal', label: 'Personal Info' },
              { id: 'summary', label: 'Summary' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}
                style={{ justifyContent: 'flex-start', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
            <button onClick={handleSave} className="btn-secondary" style={{ width: '100%', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <Save size={15} /> {savedSuccess ? 'Saved!' : 'Save Draft'}
            </button>
            <Link to={`/cv-preview/${cvData.id}`} className="btn-primary" style={{ width: '100%', fontSize: '0.85rem', justifyContent: 'center' }}>
              <Eye size={15} /> Live Preview
            </Link>
            {/* Mobile preview toggle */}
            <button 
              onClick={() => setShowPreview(!showPreview)} 
              className="btn-ghost edit-cv-preview-toggle"
              style={{ width: '100%', fontSize: '0.82rem', marginTop: '0.5rem', justifyContent: 'center', display: 'none' }}
            >
              <Eye size={14} /> {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
        </aside>

        {/* CENTER: CV Editing Form */}
        <main className="card glass-panel edit-cv-form" style={{ padding: '1.75rem' }}>
          {activeTab === 'personal' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem' }}>Personal Details</h3>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={cvData.personalInfo.name} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, name: e.target.value } })} />
              </div>
              <div className="form-group">
                <label className="form-label">Professional Title</label>
                <input className="form-input" value={cvData.personalInfo.title} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, title: e.target.value } })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" value={cvData.personalInfo.email} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, email: e.target.value } })} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" value={cvData.personalInfo.phone} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, phone: e.target.value } })} />
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>Executive Summary</h3>
                <button onClick={() => setAiModalOpen(true)} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                  <Sparkles size={14} color="#818cf8" /> Improve with AI
                </button>
              </div>
              <textarea className="form-textarea" rows={8} value={cvData.summary} onChange={(e) => setCvData({ ...cvData, summary: e.target.value })} />
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <div className="edit-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>Work Experience</h3>
                <button className="btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => setCvData({ ...cvData, experience: [...cvData.experience, { id: Date.now(), jobTitle: 'New Role', company: 'Company', startDate: '2023', endDate: 'Present', description: 'Bullet description...' }] })}>
                  + Add Role
                </button>
              </div>
              {cvData.experience.map((exp, idx) => (
                <div key={idx} style={{ background: '#111827', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <input className="form-input" style={{ marginBottom: '0.5rem' }} value={exp.jobTitle} onChange={(e) => { const updated = [...cvData.experience]; updated[idx].jobTitle = e.target.value; setCvData({ ...cvData, experience: updated }); }} />
                  <input className="form-input" style={{ marginBottom: '0.5rem' }} value={exp.company} onChange={(e) => { const updated = [...cvData.experience]; updated[idx].company = e.target.value; setCvData({ ...cvData, experience: updated }); }} />
                  <textarea className="form-textarea" rows={3} value={exp.description} onChange={(e) => { const updated = [...cvData.experience]; updated[idx].description = e.target.value; setCvData({ ...cvData, experience: updated }); }} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem' }}>Education</h3>
              {cvData.education.map((edu, idx) => (
                <div key={idx} style={{ background: '#111827', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
                  <input className="form-input" style={{ marginBottom: '0.5rem' }} value={edu.degree} onChange={(e) => { const updated = [...cvData.education]; updated[idx].degree = e.target.value; setCvData({ ...cvData, education: updated }); }} />
                  <input className="form-input" value={edu.institution} onChange={(e) => { const updated = [...cvData.education]; updated[idx].institution = e.target.value; setCvData({ ...cvData, education: updated }); }} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem' }}>Skills & Competencies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {cvData.skills.map((s, idx) => (
                  <span key={idx} style={{ background: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.88rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {typeof s === 'string' ? s : s.name}
                    <button style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer' }} onClick={() => setCvData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== idx) })}>×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem' }}>Key Projects</h3>
              {cvData.projects.map((proj, idx) => (
                <div key={idx} style={{ background: '#111827', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
                  <input className="form-input" style={{ marginBottom: '0.5rem' }} value={proj.name} onChange={(e) => { const updated = [...cvData.projects]; updated[idx].name = e.target.value; setCvData({ ...cvData, projects: updated }); }} />
                  <textarea className="form-textarea" rows={2} value={proj.description} onChange={(e) => { const updated = [...cvData.projects]; updated[idx].description = e.target.value; setCvData({ ...cvData, projects: updated }); }} />
                </div>
              ))}
            </div>
          )}
        </main>

        {/* RIGHT: Live CV Preview */}
        <aside className={`card edit-cv-preview ${showPreview ? 'edit-cv-preview-visible' : ''}`} style={{ padding: '1rem', overflow: 'hidden', background: '#ffffff', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            LIVE PREVIEW
          </div>
          <div className="edit-cv-preview-inner" style={{ transform: 'scale(0.65)', transformOrigin: 'top left', width: '150%', height: '150%' }}>
            <TemplateRenderer cvData={cvData} templateId={cvData.template || 'modern-split'} colorTheme={cvData.color || 'blue'} fontFamily={cvData.font || 'sans'} />
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .edit-cv-layout {
            grid-template-columns: 180px 1fr 0.8fr !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 900px) {
          .edit-cv-layout {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
            gap: 1rem !important;
          }
          .edit-cv-sidebar {
            order: 0;
          }
          .edit-cv-form {
            order: 1;
          }
          .edit-cv-preview {
            order: 2;
            display: none;
          }
          .edit-cv-preview-visible {
            display: block !important;
          }
          .edit-cv-preview-toggle {
            display: inline-flex !important;
          }
          .edit-cv-preview-inner {
            transform: scale(0.5) !important;
            transform-origin: top center !important;
            width: 200% !important;
            height: 200% !important;
          }
          .edit-section-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 0.75rem;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default EditCV;