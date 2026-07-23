import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Plus, Trash2, ArrowRight, LayoutDashboard, FileText, Settings, Layers, DollarSign, Wand2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AILoadingModal from '../components/AILoadingModal';
import { generateCVWithAI } from '../services/aiService';
import { saveCV, getFreeCVUsage, incrementCVUsage } from '../services/storageService';

const CreateCV = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Prompt Input, 2: Detailed Section Editor
  const [loading, setLoading] = useState(false);
  const [activeLoadingStep, setActiveLoadingStep] = useState(0);
  const [error, setError] = useState('');

  const usage = getFreeCVUsage(user?.id);

  // Natural Language Raw Text Input
  const [rawText, setRawText] = useState(
    'I am a BS Artificial Intelligence student. I know Python, Java, SQL, React, and Machine Learning. I created a Library Management System.'
  );

  // Structured CV Data Schema
  const [cvData, setCvData] = useState({
    id: `cv-${Date.now()}`,
    title: 'My Professional CV',
    template: 'modern-split',
    color: 'blue',
    font: 'sans',
    personalInfo: {
      name: user?.name || '',
      title: '',
      email: user?.email || '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      photo: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: []
  });

  // Handle AI Prompt Generation
  const handleGenerateAI = async () => {
    if (!rawText.trim()) {
      setError('Please describe your background in the text area before generating.');
      return;
    }

    if (!usage.hasAvailableSlot) {
      navigate('/pricing');
      return;
    }

    setError('');
    setLoading(true);

    // Animate loading step sequence
    const timer1 = setTimeout(() => setActiveLoadingStep(1), 300);
    const timer2 = setTimeout(() => setActiveLoadingStep(2), 600);
    const timer3 = setTimeout(() => setActiveLoadingStep(3), 900);

    try {
      const parsedData = await generateCVWithAI(rawText, user);
      
      const newCV = {
        ...cvData,
        title: `${parsedData.personalInfo?.name || user?.name || 'Candidate'} - CV`,
        personalInfo: {
          ...cvData.personalInfo,
          ...(parsedData.personalInfo || {}),
          name: parsedData.personalInfo?.name || user?.name || 'Candidate',
          email: parsedData.personalInfo?.email || user?.email || ''
        },
        summary: parsedData.summary || '',
        experience: parsedData.experience || [],
        education: parsedData.education || [],
        skills: parsedData.skills || [],
        projects: parsedData.projects || [],
        certifications: parsedData.certifications || [],
        languages: parsedData.languages || [],
        achievements: parsedData.achievements || []
      };

      setCvData(newCV);
      incrementCVUsage(user?.id);
      setStep(2);
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError('Failed to analyze prompt. Please try again.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setLoading(false);
    }
  };

  // Final Submit & Save
  const handleSaveAndPreview = () => {
    const saved = saveCV(cvData, user?.id);
    navigate(`/cv-preview/${saved.id}`);
  };


  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />
      <AILoadingModal isOpen={loading} activeStepIndex={activeLoadingStep} />

      <div className="container create-cv-layout" style={{ padding: '2.5rem 1.5rem', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
        
        {/* DASHBOARD SIDEBAR */}
        <aside className="card create-cv-sidebar" style={{ height: 'fit-content', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            NAVIGATION
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/dashboard" className="btn-ghost" style={{ justifyContent: 'flex-start', color: '#cbd5e1' }}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/create-cv" className="btn-primary" style={{ justifyContent: 'flex-start', padding: '0.65rem 1rem' }}>
              <Plus size={18} /> Create New CV
            </Link>
            <Link to="/templates" className="btn-ghost" style={{ justifyContent: 'flex-start', color: '#cbd5e1' }}>
              <Layers size={18} /> Templates
            </Link>
            <Link to="/pricing" className="btn-ghost" style={{ justifyContent: 'flex-start', color: '#cbd5e1' }}>
              <DollarSign size={18} /> Pricing & Limits
            </Link>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
              Free Usage Limit:
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              Free CVs Used: {usage.usedFree} / {usage.maxFree}
            </div>
            <div style={{ height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${(usage.usedFree / usage.maxFree) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="create-cv-main">
          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239,68,68,0.3)', padding: '1rem', borderRadius: '12px', color: '#fca5a5', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              ⚠️ {error}
            </div>
          )}

          {step === 1 ? (
            <div className="card glass-panel" style={{ padding: '2.5rem' }}>
              <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>STEP 1 OF 2</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                Describe Yourself in Your Own Words
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Paste or write your raw background in everyday natural language. Our AI will automatically extract and format it into structured CV sections.
              </p>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Natural Language Prompt:</label>
                <textarea
                  className="form-textarea"
                  rows={6}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="e.g. My name is Alex Mercer. I have a BS in Computer Science from Stanford..."
                />
              </div>

              <div className="create-cv-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Wand2 size={16} /> AI will write professional summary & format skills automatically
                </div>

                <button onClick={handleGenerateAI} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
                  <Sparkles size={18} /> Generate CV with AI
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: STRUCTURED SECTION EDITOR */
            <div className="card glass-panel" style={{ padding: '2rem' }}>
              <div className="create-cv-step2-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>AI EXTRACTION COMPLETE</span>
                  <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>Review & Edit CV Information</h2>
                </div>
                <button onClick={handleSaveAndPreview} className="btn-primary">
                  Preview & Choose Template <ArrowRight size={16} />
                </button>
              </div>

              {/* Personal Info Form */}
              <section style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#818cf8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Personal Information
                </h3>
                <div className="personal-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" value={cvData.personalInfo.name} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, name: e.target.value } })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Professional Title</label>
                    <input className="form-input" value={cvData.personalInfo.title} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, title: e.target.value } })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" value={cvData.personalInfo.email} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, email: e.target.value } })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={cvData.personalInfo.phone} onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, phone: e.target.value } })} />
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#818cf8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Professional Summary
                </h3>
                <textarea className="form-textarea" rows={4} value={cvData.summary} onChange={(e) => setCvData({ ...cvData, summary: e.target.value })} />
              </section>

              {/* Work Experience */}
              <section style={{ marginBottom: '2rem' }}>
                <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#818cf8', margin: 0 }}>Work Experience</h3>
                  <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }} onClick={() => setCvData({ ...cvData, experience: [...cvData.experience, { id: Date.now(), jobTitle: 'Role Title', company: 'Company Name', startDate: '2023', endDate: 'Present', description: 'Job description...' }] })}>
                    + Add Experience
                  </button>
                </div>

                {cvData.experience.map((exp, index) => (
                  <div key={index} style={{ background: '#111827', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="exp-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <input className="form-input" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => { const updated = [...cvData.experience]; updated[index].jobTitle = e.target.value; setCvData({ ...cvData, experience: updated }); }} />
                      <input className="form-input" placeholder="Company" value={exp.company} onChange={(e) => { const updated = [...cvData.experience]; updated[index].company = e.target.value; setCvData({ ...cvData, experience: updated }); }} />
                    </div>
                    <textarea className="form-textarea" rows={2} placeholder="Description" value={exp.description} onChange={(e) => { const updated = [...cvData.experience]; updated[index].description = e.target.value; setCvData({ ...cvData, experience: updated }); }} />
                  </div>
                ))}
              </section>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button onClick={handleSaveAndPreview} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
                  Save & Live Preview <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .create-cv-layout {
            grid-template-columns: 1fr !important;
            padding: 1.5rem 1rem !important;
            gap: 1.5rem !important;
          }
          .create-cv-sidebar {
            order: 2;
          }
          .create-cv-main {
            order: 1;
          }
          .create-cv-actions {
            flex-direction: column;
            align-items: stretch !important;
          }
          .create-cv-actions .btn-primary {
            width: 100%;
          }
          .create-cv-step2-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          .create-cv-step2-header .btn-primary {
            width: 100%;
          }
          .personal-info-grid {
            grid-template-columns: 1fr !important;
          }
          .section-header-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 0.75rem;
          }
          .exp-fields {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default CreateCV;