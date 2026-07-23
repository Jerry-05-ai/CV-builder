import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import { loginUserLocal, setActiveUser } from '../services/storageService';

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/login.php', formData);
      if (res.data && res.data.success && res.data.user) {
        setActiveUser(res.data.user);
        setUser(res.data.user);
        setLoading(false);
        navigate('/dashboard');
        return;
      }
    } catch (err) {
      console.log('Backend server offline. Logging in user locally in LocalStorage.');
    }

    // Client-side multi-user authentication fallback
    const result = loginUserLocal({ email: formData.email, password: formData.password });
    if (result.success) {
      setUser(result.user);
      setLoading(false);
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed.');
      setLoading(false);
    }
  };


  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden' }}>
      <Navbar user={user} setUser={setUser} />

      <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '480px' }}>
        <div className="card glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '0.5rem' }}>Welcome Back</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Sign in to manage your professional AI CVs
            </p>
          </div>

          <Notification type="error" message={error} onClose={() => setError('')} />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#818cf8', fontWeight: 600 }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
