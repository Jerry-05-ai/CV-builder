import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Shield, FileText, Download, CheckCircle, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TEMPLATE_LIST } from '../templates/templateColors';

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const handleStart = () => {
    navigate('/create-cv');
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How does CVForge AI turn unstructured text into a CV?",
      a: "Our AI model analyzes your natural language input, extracts education history, roles, skills, and projects, and formats them into ATS-compliant structured sections automatically."
    },
    {
      q: "Can I customize the colors, fonts, and layout?",
      a: "Yes! CVForge AI offers 10 professional CV templates and 7 color themes. You can easily tweak font styles, reorder sections, and edit bullet points live."
    },
    {
      q: "How many free CV creations do I get?",
      a: "Every user receives 3 free full CV creations with AI extraction and PDF export. Additional CVs cost only a mock $3 fee."
    },
    {
      q: "Is the PDF export ATS-friendly?",
      a: "Absolutely. All templates are designed according to strict ATS industry standards, ensuring your resume passes applicant tracking systems cleanly."
    }
  ];

  return (
    <div className="home-page" style={{ backgroundColor: '#0b0f19', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      {/* HERO SECTION */}
      <section id="hero" style={{ padding: '5rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Glow backdrop */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="badge badge-purple" style={{ marginBottom: '1.25rem', padding: '0.4rem 1rem', fontSize: '0.82rem' }}>
            <Sparkles size={14} style={{ marginRight: '6px' }} /> NEXT-GEN AI RESUME BUILDER
          </div>

          <h1 className="hero-main-heading" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
            Turn Your Experience Into Your <br />
            <span className="gradient-text-accent">Next Opportunity.</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '680px', margin: '0 auto 2.25rem auto', lineHeight: 1.6 }}>
            Paste your raw experience in plain everyday words. Our AI structures, writes professional bullet points, and generates an ATS-ready CV in seconds.
          </p>

          <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <button onClick={handleStart} className="btn-primary" style={{ padding: '0.95rem 2.25rem', fontSize: '1.05rem', borderRadius: '12px' }}>
              <Sparkles size={20} /> Create My CV
            </button>
            <Link to="/templates" className="btn-secondary" style={{ padding: '0.95rem 2.25rem', fontSize: '1.05rem', borderRadius: '12px' }}>
              Explore 10 Templates <ArrowRight size={18} />
            </Link>
          </div>

          {/* Realistic Interactive CV Builder Mockup */}
          <div className="glass-panel hero-mockup" style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '1.5rem',
            textAlign: 'left',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="#818cf8" /> Live Interactive Preview
              </div>
            </div>

            <div className="hero-mockup-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Unstructured Raw Input */}
              <div style={{ background: '#111827', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.78rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Input (Everyday Raw Text):
                </div>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  "My name is Alex Mercer. I am a BS Artificial Intelligence student with experience in Python, Java, SQL, Machine Learning, and web development. I built an AI document summarizer and worked on backend APIs..."
                </p>
              </div>

              {/* AI Structured Output */}
              <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  ✨ Structured AI Output:
                </div>
                <div style={{ fontSize: '0.88rem', color: '#f8fafc', lineHeight: 1.6 }}>
                  <strong>Alex Mercer</strong> — <em>AI & Software Specialist</em><br />
                  • <strong>Education:</strong> BS in Artificial Intelligence<br />
                  • <strong>Key Skills:</strong> Python, Java, SQL, React, ML<br />
                  • <strong>Projects:</strong> AI Document Summarizer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="home-section-alt" style={{ padding: '5rem 0', background: '#070a12' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>EASY 4-STEP PROCESS</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>How CVForge AI Works</h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>Craft your dream CV in under 2 minutes with zero formatting hassle.</p>
          </div>

          <div className="home-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { num: '1', title: 'Paste Your Info', desc: 'Type or paste your unstructured experience or raw prompt in plain text.' },
              { num: '2', title: 'AI Extraction', desc: 'Our AI structures education, work history, and technical skills automatically.' },
              { num: '3', title: 'Choose Template', desc: 'Pick from 10 professional CV templates and customize color themes.' },
              { num: '4', title: 'Download A4 PDF', desc: 'Export high-resolution printable PDF directly to your device.' }
            ].map((step, idx) => (
              <div key={idx} className="card" style={{ background: '#111827', borderRadius: '16px', padding: '1.75rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES GRID */}
      <section id="features" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>POWERFUL CAPABILITIES</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>Engineered for Career Growth</h2>
          </div>

          <div className="home-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <Sparkles color="#818cf8" size={24} />, title: 'Smart AI Extraction', desc: 'Parses unstructured text into formatted work history and skills instantly.' },
              { icon: <FileText color="#34d399" size={24} />, title: '10 Professional Templates', desc: 'Choose from Executive, Modern, Creative, Tech Dark, and Academic templates.' },
              { icon: <Zap color="#fcd34d" size={24} />, title: 'Live A4 Preview & Colors', desc: 'Tweak 7 color palettes and font styles with instant side-by-side rendering.' },
              { icon: <Download color="#38bdf8" size={24} />, title: 'Instant PDF Export', desc: 'Client-side PDF generator produces sharp A4 documents ready to send.' }
            ].map((feat, idx) => (
              <div key={idx} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ marginBottom: '1rem' }}>{feat.icon}</div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATE GALLERY SHOWCASE */}
      <section className="home-section-alt" style={{ padding: '5rem 0', background: '#070a12' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>10 ATS-FRIENDLY DESIGNS</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>Pick Your Winning Template</h2>
          </div>

          <div className="home-templates-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {TEMPLATE_LIST.slice(0, 4).map((tpl) => (
              <div key={tpl.id} className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
                <div style={{ height: '120px', background: '#1e293b', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', fontWeight: 700 }}>
                  {tpl.name}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '0.25rem' }}>{tpl.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>{tpl.description}</p>
                <Link to="/templates" className="btn-secondary" style={{ width: '100%', fontSize: '0.82rem', padding: '0.45rem' }}>
                  View Template
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/templates" className="btn-outline" style={{ padding: '0.8rem 2rem' }}>
              Explore All 10 Templates <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>SIMPLE TRANSPARENT PRICING</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>Start Free, Upgrade Anytime</h2>
          </div>

          <div className="home-pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '840px', margin: '0 auto' }}>
            {/* Free Plan */}
            <div className="card" style={{ padding: '2.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>Free Trial</h3>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>$0</div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Ideal for getting your first CV created fast.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> 3 Free CV Creations</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> All 10 Templates Included</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> Full AI Extraction Engine</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> Client-Side A4 PDF Export</li>
              </ul>

              <button onClick={handleStart} className="btn-secondary" style={{ width: '100%' }}>
                Start Free
              </button>
            </div>

            {/* Pay Per CV */}
            <div className="card pricing-featured" style={{ padding: '2.25rem', border: '2px solid #6366f1', boxShadow: '0 0 30px rgba(99,102,241,0.3)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                POPULAR
              </div>

              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>Additional CV</h3>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>$3 <span style={{ fontSize: '1rem', color: '#94a3b8' }}>/ CV</span></div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Unlock extra CV creations after your free limit.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> +1 Additional CV Slot</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> All 10 Templates & Colors</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> AI Writing Assistant</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="#10b981" /> Mock Checkout Demo</li>
              </ul>

              <Link to="/pricing" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Create Another CV for $3
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="home-section-alt" style={{ padding: '5rem 0', background: '#070a12' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>HELP & QUESTIONS</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="card" style={{ cursor: 'pointer', padding: '1.25rem 1.5rem' }} onClick={() => toggleFaq(idx)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>{faq.q}</h4>
                  {activeFaq === idx ? <ChevronUp size={20} color="#818cf8" /> : <ChevronDown size={20} color="#94a3b8" />}
                </div>
                {activeFaq === idx && (
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.85rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section style={{ padding: '5rem 0', position: 'relative' }}>
        <div className="container">
          <div className="glass-panel home-cta-panel" style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
              Ready to Craft Your Professional CV?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              Join thousands of candidates who created job-winning resumes in under 2 minutes with CVForge AI.
            </p>
            <button onClick={handleStart} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              <Sparkles size={20} /> Build My CV Now
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .home-page .hero-main-heading {
            font-size: 2rem !important;
          }
          .home-page .hero-cta-row {
            flex-direction: column;
            align-items: center;
          }
          .home-page .hero-cta-row .btn-primary,
          .home-page .hero-cta-row .btn-secondary {
            width: 100%;
            max-width: 320px;
            justify-content: center;
          }
          .home-page .hero-mockup-grid {
            grid-template-columns: 1fr !important;
          }
          .home-page .hero-mockup {
            padding: 1rem !important;
          }
          .home-page .home-steps-grid {
            grid-template-columns: 1fr !important;
          }
          .home-page .home-features-grid {
            grid-template-columns: 1fr !important;
          }
          .home-page .home-templates-grid {
            grid-template-columns: 1fr !important;
          }
          .home-page .home-pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
          }
          .home-page .home-cta-panel {
            padding: 2rem 1.25rem !important;
          }
          .home-page .home-cta-panel h2 {
            font-size: 1.6rem !important;
          }
          .home-page .home-cta-panel p {
            font-size: 0.95rem !important;
          }
          .home-page .home-section-alt {
            padding: 3rem 0 !important;
          }
          .home-page section {
            padding: 3rem 0 !important;
          }
          .home-page .pricing-featured {
            padding: 1.75rem !important;
          }
        }
        @media (max-width: 480px) {
          .home-page .hero-main-heading {
            font-size: 1.6rem !important;
          }
          .home-page section {
            padding: 2rem 0 !important;
          }
          .home-page #hero {
            padding: 2.5rem 0 2rem 0 !important;
          }
          .home-page .pricing-featured div[style*="position: absolute"] {
            right: 10px !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Home;