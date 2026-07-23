import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Eye, Edit3, Trash2, Layers, DollarSign, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSavedCVs, deleteCV, getFreeCVUsage } from '../services/storageService';

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const usage = getFreeCVUsage(user?.id);

  useEffect(() => {
    if (user?.id) {
      setCvs(getSavedCVs(user.id));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      const updated = deleteCV(id, user?.id);
      setCvs(updated);
    }
  };


  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      <div className="container dashboard-layout" style={{ padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2.5rem' }}>
        
        {/* Sidebar */}
        <aside className="card dashboard-sidebar" style={{ height: 'fit-content', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            MY WORKSPACE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/dashboard" className="btn-primary" style={{ justifyContent: 'flex-start' }}>
              <FileText size={18} /> My Resumes
            </Link>
            <Link to="/create-cv" className="btn-ghost" style={{ justifyContent: 'flex-start', color: '#cbd5e1' }}>
              <Plus size={18} /> Create New CV
            </Link>
            <Link to="/templates" className="btn-ghost" style={{ justifyContent: 'flex-start', color: '#cbd5e1' }}>
              <Layers size={18} /> Templates
            </Link>
            <Link to="/pricing" className="btn-ghost" style={{ justifyContent: 'flex-start', color: '#cbd5e1' }}>
              <DollarSign size={18} /> Pricing Plans
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

        {/* Dashboard Main Area */}
        <main className="dashboard-main">
          <div className="dashboard-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                CV Workspace Dashboard
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Manage, edit, and export your AI-generated professional CVs.</p>
            </div>

            <Link to="/create-cv" className="btn-primary hide-mobile" style={{ padding: '0.75rem 1.5rem' }}>
              <Plus size={18} /> Create New CV
            </Link>
          </div>

          {/* CVs Grid */}
          {cvs.length === 0 ? (
            <div className="card glass-panel" style={{ textAlign: 'center', padding: '3.5rem' }}>
              <FileText size={48} color="#6366f1" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>No Resumes Created Yet</h3>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Click below to create your first AI-powered professional CV.</p>
              <Link to="/create-cv" className="btn-primary">
                <Sparkles size={18} /> Create My First CV
              </Link>
            </div>
          ) : (
            <div className="cv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {cvs.map((cv) => (
                <div key={cv.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="badge badge-primary">{cv.template || 'Modern Split'}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {new Date(cv.updatedAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, marginBottom: '0.35rem' }}>
                      {cv.title || cv.personalInfo?.name || 'Untitled CV'}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                      {cv.personalInfo?.title || 'Professional CV Draft'}
                    </p>
                  </div>

                  <div className="cv-card-actions" style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.85rem' }}>
                    <Link to={`/cv-preview/${cv.id}`} className="btn-secondary" style={{ flex: 1, padding: '0.45rem', fontSize: '0.82rem', justifyContent: 'center' }}>
                      <Eye size={15} /> Preview & Export
                    </Link>
                    <Link to={`/edit-cv/${cv.id}`} className="btn-ghost" style={{ padding: '0.45rem' }}>
                      <Edit3 size={16} />
                    </Link>
                    <button onClick={() => handleDelete(cv.id)} className="btn-ghost" style={{ padding: '0.45rem', color: '#fca5a5' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-layout {
            grid-template-columns: 1fr !important;
            padding: 1.5rem 1rem !important;
            gap: 1.5rem !important;
          }
          .dashboard-sidebar {
            order: 2;
          }
          .dashboard-main {
            order: 1;
          }
          .dashboard-header-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          .cv-card-actions {
            flex-wrap: wrap;
          }
        }
        @media (max-width: 480px) {
          .cv-card-actions {
            flex-direction: column;
          }
          .cv-card-actions a,
          .cv-card-actions button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Dashboard;