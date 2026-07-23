import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCV from './pages/CreateCV';
import EditCV from './pages/EditCV';
import CVPreview from './pages/CVPreview';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import MockPayment from './pages/MockPayment';
import PaymentSuccess from './pages/PaymentSuccess';
import { getActiveUser } from './services/storageService';
import './styles/global.css';

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(() => getActiveUser());

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register user={user} setUser={setUser} />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-cv" 
          element={
            <ProtectedRoute user={user}>
              <CreateCV user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-cv/:id" 
          element={
            <ProtectedRoute user={user}>
              <EditCV user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cv-preview/:id" 
          element={
            <ProtectedRoute user={user}>
              <CVPreview user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route path="/templates" element={<Templates user={user} setUser={setUser} />} />
        <Route path="/pricing" element={<Pricing user={user} setUser={setUser} />} />
        <Route 
          path="/mock-payment" 
          element={
            <ProtectedRoute user={user}>
              <MockPayment user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment-success" 
          element={
            <ProtectedRoute user={user}>
              <PaymentSuccess user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

