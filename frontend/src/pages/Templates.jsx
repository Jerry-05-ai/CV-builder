import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TemplateCard from '../components/TemplateCard';
import { TEMPLATE_LIST } from '../templates/templateColors';
import { getSavedCVs } from '../services/storageService';

const Templates = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTemplate, setActiveTemplate] = useState('modern-split');

  const categories = ['All', 'Executive', 'Modern', 'Creative', 'Minimal', 'Tech', 'Academic'];

  const filteredTemplates = selectedCategory === 'All' 
    ? TEMPLATE_LIST 
    : TEMPLATE_LIST.filter(t => t.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleSelectTemplate = (id) => {
    setActiveTemplate(id);
    const existing = getSavedCVs(user?.id);
    if (existing.length > 0) {
      navigate(`/cv-preview/${existing[0].id}`);
    } else {
      navigate('/create-cv');
    }
  };


  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      {/* Header */}
      <section style={{ padding: '3.5rem 0 2rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>10 ATS-READY DESIGNS</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Professional CV Templates
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Handcrafted templates optimized for applicant tracking systems (ATS) and human recruiters.
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section style={{ padding: '2rem 0 5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredTemplates.map(tpl => (
              <TemplateCard
                key={tpl.id}
                id={tpl.id}
                name={tpl.name}
                category={tpl.category}
                description={tpl.description}
                isSelected={activeTemplate === tpl.id}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Templates;
