import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (senha === 'admin123') {
      sessionStorage.setItem('admin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Senha incorreta!');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>🔐 Acesso do Profissional</h2>
        <form onSubmit={login}>
          <input
            type="password"
            placeholder="Senha"
            className="admin-input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className="admin-btn">
            Entrar
          </button>
        </form>
        <p className="back-link">
          <a href="/">← Voltar para área do paciente</a>
        </p>
      </div>
    </div>
  );
}
