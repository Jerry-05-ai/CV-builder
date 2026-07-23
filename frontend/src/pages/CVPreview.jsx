import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Palette, Type, ZoomIn, ZoomOut, ArrowLeft, Layers, Check, Sparkles } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TemplateRenderer from '../templates/TemplateRenderer';
import { getCVById, saveCV } from '../services/storageService';
import { TEMPLATE_LIST, COLOR_THEMES } from '../templates/templateColors';

const CVPreview = ({ user, setUser }) => {
  const { id } = useParams();
  const previewRef = useRef(null);

  const [cvData, setCvData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern-split');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedFont, setSelectedFont] = useState('sans');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const cv = getCVById(id, user?.id);
    if (cv) {
      setCvData(cv);
      setSelectedTemplate(cv.template || 'modern-split');
      setSelectedColor(cv.color || 'blue');
      setSelectedFont(cv.font || 'sans');
    }
  }, [id, user]);

  if (!cvData) {
    return <div style={{ color: '#ffffff', padding: '5rem', textAlign: 'center' }}>Loading CV Preview...</div>;
  }

  // Update Template/Color Selection
  const handleTemplateSelect = (tplId) => {
    setSelectedTemplate(tplId);
    const updated = { ...cvData, template: tplId, color: selectedColor, font: selectedFont };
    setCvData(updated);
    saveCV(updated, user?.id);
  };

  const handleColorSelect = (colId) => {
    setSelectedColor(colId);
    const updated = { ...cvData, template: selectedTemplate, color: colId, font: selectedFont };
    setCvData(updated);
    saveCV(updated, user?.id);
  };

  const handleFontSelect = (fId) => {
    setSelectedFont(fId);
    const updated = { ...cvData, template: selectedTemplate, color: selectedColor, font: fId };
    setCvData(updated);
    saveCV(updated, user?.id);
  };


  // Export PDF with html2pdf.js
  const handleDownloadPDF = () => {
    if (!previewRef.current) return;
    setExporting(true);

    const element = previewRef.current;
    const opt = {
      margin: 0,
      filename: `${cvData.personalInfo?.name || 'CV'}_CVForge.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setExporting(false);
    }).catch((err) => {
      console.error('PDF export error:', err);
      setExporting(false);
    });
  };

  const colorsList = ['blue', 'purple', 'green', 'orange', 'red', 'black', 'teal'];

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      <div className="container cv-preview-layout" style={{ padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem' }}>
        
        {/* LEFT CUSTOMIZER PANEL */}
        <aside className="cv-preview-sidebar" style={{ height: 'fit-content' }}>
          <div className="card glass-panel" style={{ padding: '1.5rem' }}>
            <Link to={`/edit-cv/${cvData.id}`} style={{ fontSize: '0.85rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <ArrowLeft size={16} /> Edit CV Information
            </Link>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
              CV Customizer Studio
            </h2>

            {/* Color Selection */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <Palette size={16} color="#818cf8" /> Accent Theme Color
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {colorsList.map((col) => {
                  const isSel = selectedColor === col;
                  const themeData = COLOR_THEMES[col];
                  return (
                    <button
                      key={col}
                      onClick={() => handleColorSelect(col)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: themeData.primary,
                        border: isSel ? '3px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isSel ? '0 0 12px ' + themeData.primary : 'none'
                      }}
                      title={col}
                    >
                      {isSel && <Check size={16} color="#ffffff" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Selection */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <Type size={16} color="#818cf8" /> Typography Font
              </label>
              <div className="cv-preview-font-options" style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { id: 'sans', label: 'Sans-Serif' },
                  { id: 'serif', label: 'Classic Serif' },
                  { id: 'mono', label: 'Tech Mono' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => handleFontSelect(f.id)}
                    className={selectedFont === f.id ? 'btn-primary' : 'btn-secondary'}
                    style={{ flex: 1, padding: '0.45rem', fontSize: '0.78rem' }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Picker Dropdown */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <Layers size={16} color="#818cf8" /> Select Template
              </label>
              <select
                className="form-select"
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
              >
                {TEMPLATE_LIST.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                ))}
              </select>
            </div>

            {/* Download PDF Button */}
            <button 
              onClick={handleDownloadPDF} 
              disabled={exporting}
              className="btn-primary" 
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              <Download size={20} /> {exporting ? 'Generating PDF...' : 'Download A4 PDF'}
            </button>
          </div>
        </aside>

        {/* RIGHT A4 DOCUMENT PREVIEW PANEL */}
        <main className="cv-preview-main">
          {/* Zoom & Controls Bar */}
          <div className="cv-preview-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: '#111827', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="cv-preview-dimension-label" style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              📄 A4 Document Dimensions (210mm × 297mm)
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button onClick={() => setZoomLevel(Math.max(60, zoomLevel - 15))} className="btn-ghost" style={{ padding: '0.35rem' }}>
                <ZoomOut size={18} />
              </button>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(Math.min(130, zoomLevel + 15))} className="btn-ghost" style={{ padding: '0.35rem' }}>
                <ZoomIn size={18} />
              </button>
            </div>
          </div>

          {/* A4 Sheet Renderer Container */}
          <div className="a4-responsive-wrapper" style={{
            background: '#070a12',
            padding: '2rem',
            borderRadius: '16px',
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
          }}>
            <div 
              ref={previewRef}
              className="a4-preview-sheet"
              style={{
                width: '210mm',
                minHeight: '297mm',
                backgroundColor: selectedTemplate === 'tech-dark' ? '#0f172a' : '#ffffff',
                boxShadow: '0 15px 45px rgba(0, 0, 0, 0.4)',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease'
              }}
            >
              <TemplateRenderer 
                cvData={cvData} 
                templateId={selectedTemplate} 
                colorTheme={selectedColor} 
                fontFamily={selectedFont} 
              />
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cv-preview-layout {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
            gap: 1rem !important;
          }
          .cv-preview-sidebar {
            order: 0;
          }
          .cv-preview-main {
            order: 1;
          }
          .cv-preview-controls {
            flex-direction: column;
            gap: 0.75rem;
          }
          .cv-preview-dimension-label {
            font-size: 0.8rem;
          }
          .cv-preview-font-options {
            flex-direction: column;
          }
          .cv-preview-font-options button {
            width: 100%;
          }
          .a4-responsive-wrapper {
            padding: 0.75rem !important;
          }
          .a4-preview-sheet {
            width: 100% !important;
            min-height: auto !important;
            transform: scale(0.4) !important;
            transform-origin: top center !important;
          }
        }
        @media (max-width: 480px) {
          .a4-preview-sheet {
            transform: scale(0.3) !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default CVPreview;